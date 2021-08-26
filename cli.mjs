#!/usr/bin/env node

// To execute directly during development 
// chmod +x cli.mjs 
// ./cli.msj campuses --format="csv" --destination="./export-files"

import { getConfig } from "./config.mjs";
import { PlanningCenter } from "planning-center-export";
import { existsSync, mkdirSync } from "fs"
import path from "path";
import chalk from "chalk";
import logSymbols from 'log-symbols';
import DraftLog from "draftlog";

let entity;

// Create a draft console line to be updated over time
DraftLog(console);
const updateConsole = console.draft(``);

try {
  // Get the configured values from the commandline args, and configuration files
  const config = getConfig();
  let { destination, filePath, format, verbose } = config;
  entity = config.entity;
  if (verbose) {
    console.debug(chalk.dim.bold(`Config:`), config)
  }

  // Ensure an entity is provided
  if (!entity) {
    throw new Error(`An "entity" is required to export data from PlanningCenter`);
  }

  // Generate a default file path if one is not specified
  if (!filePath) {
    const defaultFileName = `${entity}.${format}`;
    const defaultFilePath = path.join(destination, defaultFileName); 
    filePath = defaultFilePath;  
  }

  // Create the path if it doesn't exist
  if (!existsSync(destination)){
    mkdirSync(destination, { recursive: true });
  }

  // Export the entity
  updateConsole(`${logSymbols.info} ${chalk.blue(entity)} export starting`);
  const planningCenterExport = new PlanningCenter(config);
  const result = await planningCenterExport.export(entity, filePath);

  // Write the results to the console
  updateConsole(`${logSymbols.success} ${chalk.green(entity)} export complete`);
  if (result.totalCount) {
    console.log(chalk.dim(`  ${chalk.yellow(result.totalCount)} records written to:`, chalk.italic(filePath)));
  }
  if (result.parentTotalCount) {
    console.log(chalk.dim(`  ${chalk.yellow(result.totalCount)} members in ${chalk.yellow(result.parentTotalCount)} groups`));
  }  
} catch(error) {
  // Write any errors to the console
  if (entity) {
    updateConsole(`${logSymbols.error} ${chalk.red(entity)} export failed`);
  } else {
    updateConsole(chalk.red(`${logSymbols.error} Export failed`));
  }
  console.error(chalk.dim(`  ${error}`));
}
