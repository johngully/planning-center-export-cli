import { defaultsDeep } from "lodash-es";
import dotenv from "dotenv";
import Yargs from "yargs";
import { sync } from "find-up";
import { readFileSync } from "fs";

const defaultConfig = {
  destination: "./",
  format: "json"
};

function getConfigFromUserArgs() {
  // Get from user command line args
  // When calling the cli expect the following format (tabs and attributes are optional)
  // {command} {entity} {tab} --{attribute1} {attribute1Value} --{attribute2} {attribute2Value}
  //
  // Example:
  // pce campuses --pageSize 50 --destination ./exported-files
  // 
  const args = Yargs(process.argv.slice(2)).argv;
  const entity = args._[0];
  const tab = args._[1];
  delete args._;
  delete args.$0;
  const config = { 
    entity, 
    ...tab && { tab }, // This line will only add the tab key if it has a value
    ...args 
  }
  return config;
}

function getConfigFromFile() {
  let config = {}
  let configPath = ""
  try {
    configPath = sync([".planningcenterrc", "planningcenterrc.json"]);
    if (!configPath) {
      return; // this will cause the finally block to execute 
    } else {
      config = JSON.parse(readFileSync(configPath));
    }
  } catch(error) {
    console.error(`There was an error while attempting to load configuration:`, configPath);
  } finally {
    return config;
  }
}

function getConfigFromEnvironment() {
  dotenv.config();
  return {
    applicationId: process.env.PLANNING_CENTER_CLI_APPLICATION_ID,
    secret: process.env.PLANNING_CENTER_CLI_SECRET,
    pageSize: process.env.PLANNING_CENTER_CLI_PAGE_SIZE,
    format: process.env.PLANNING_CENTER_CLI_FORMAT,
    destination: process.env.PLANNING_CENTER_CLI_DESTINATION,
  };
}

export function getConfig() {
  const fileConfig = getConfigFromFile();
  const environmentConfig = getConfigFromEnvironment();
  const userConfig = getConfigFromUserArgs();
  const config = defaultsDeep(userConfig, environmentConfig, fileConfig, defaultConfig);
  validateConfig(config);
  return config;
}

export function validateConfig(config) {
  if (!config.applicationId) {
    throw new Error(`The PlanningCenter "applicationId" must be provided as an argument or configuration`);
  }

  if (!config.secret) {
    throw new Error(`The PlanningCenter "secret" must be provided as an argument or configuration`);
  }

  if (!config.entity) {
    throw new Error(`The PlanningCenter "entity" must be provided as an argument or configuration`);
  }
  
  return true;
}
