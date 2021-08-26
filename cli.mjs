#!/usr/bin/env node

// To execute directly during development 
// chmod +x cli.mjs 
// ./cli.msj campuses --format="csv" --destination="./export-files"

import { getConfig } from "./config.mjs";
import { PlanningCenter } from "planning-center-export";
import { existsSync, mkdirSync } from "fs"
import path from "path";

const config = getConfig();
const planningCenterExport = new PlanningCenter(config);

await exportToFile(config.entity);

async function exportToFile(entity, filePath) {
  // Ensure an entity is provided
  if (!entity) {
    throw new Error(`An "entity" is required to export data from PlanningCenter`);
  }

  // Generate a default file path if one is not specified
  if (!filePath) {
    const defaultFileName = `${entity}.${config.format}`;
    const defaultFilePath = path.join(config.destination, defaultFileName); 
    filePath = defaultFilePath;  
  }

  // Create the path if it doesn't exist
  if (!existsSync(config.destination)){
    mkdirSync(config.destination, { recursive: true });
  }
  
  // Export the entity
  const result = await planningCenterExport.export(entity, filePath);

  console.log(`${entity} export complete`);
  if (result.totalCount) {
    console.log(`  ${result.totalCount} records written to:`, filePath);
  }
  if (result.parentTotalCount) {
    console.log(`  ${result.totalCount} members in ${result.parentTotalCount} groups`);
  }
}
