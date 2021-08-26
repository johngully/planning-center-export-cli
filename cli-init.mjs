#!/usr/bin/env node

// To execute directly during development 
// chmod +x cli-init.mjs
// ./cli-init.msj --applicationId 01absa...uA120 --secret 97Lsn...Yn12x --pageSize 100 --format csv --destination ./exported-files

import path from "path";
import { writeFileSync } from "fs";
import chalk from "chalk";
import logSymbols from 'log-symbols';
import DraftLog from "draftlog";
import Yargs from "yargs";

// Create a draft console line to be updated over time
DraftLog(console);
const updateConsole = console.draft(`${logSymbols.info} pce-init started`);

try {
  // Get the command line parameters
  const args = Yargs(process.argv.slice(2)).argv;
  delete args._;
  delete args.$0;
  const config = { ...args };

  // Map command line parameters to .planningcenterrc
  const configFileName = ".planningcenterrc";
  const configFilePath = path.join(process.cwd(), configFileName);
  writeFileSync(configFilePath, JSON.stringify(config, null, "  "));
  
  // Write the results to the console
  updateConsole(`${logSymbols.success} pce-init completed succesfully`);
  console.error(chalk.dim(`  Created a new configuration: ${chalk.yellow(configFilePath)}`));
} 
catch(error) {
  // Write any errors to the console
  updateConsole(`${logSymbols.error} pce-init failed`);
  console.error(chalk.dim(`  ${error}`));
}
