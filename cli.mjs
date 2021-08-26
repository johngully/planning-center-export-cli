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

let entity;

try {
  const config = getConfig();
  let { destination, entity, filePath, format, verbose } = config;
  if (verbose) {
    console.debug(chalk.dim.bold(`Config:`), config)
  }

  const planningCenterExport = new PlanningCenter(config);
  
  
  // Ensure an entity is provided
  if (!entity) {
    console.log("ABOUT TO TROW")
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
  const result = await planningCenterExport.export(entity, filePath);

  // Write the results to the console
  console.log(`${logSymbols.success} ${chalk.green(entity)} export complete`);
  if (result.totalCount) {
    console.log(chalk.dim(`  ${chalk.yellow(result.totalCount)} records written to:`, chalk.italic(filePath)));
  }
  if (result.parentTotalCount) {
    console.log(chalk.dim(`  ${chalk.yellow(result.totalCount)} members in ${chalk.yellow(result.parentTotalCount)} groups`));
  }  
} catch(error) {
  // Write any errors to the console
  if (entity) {
    console.error(`${logSymbols.error} ${chalk.red(entity)} export failed`);
  } else {
    console.error(chalk.red(`${logSymbols.error} Export failed`))
  }
  console.error(chalk.dim(`  ${error}`));
  
}

// async function exportToFile(entity, filePath) {
  
  
// }
