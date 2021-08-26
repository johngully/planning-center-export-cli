# Planning Center Export CLI

## Background
A command line utility that simplifies the process of exporting data from Planning Center.  This is a thin layer over the [planning-center-export](https://www.npmjs.com/package/planning-center-export) npm package.  Please reference the [Planning Center Export GitHub project](https://github.com/johngully/planning-center-export) for more information about the inner workings the module.


## Installation

```bash
npm install -g planning-center-export-cli
pce --version
```


## Command Line Usage

```bash
pce campuses --format "csv" --destination "./exported-files"
```

## Configuration
The command line utility will use preconfigrued setting for commands to reduced repetition of arguments that don;t typically change from one call to another.  

Configurations can bee passed to the command directly, stored in environment variables, or set in a configuration file (`.planningcenterrc` or `planningcenterrc.json`). If values are configured in multiple locations they will override in the following order (most specific at the top):

`command line arguments`
```bash
pce --applicationId 01absa...uA120 --secret 97Lsn...Yn12x --pageSize 100 --format csv --destination ./exported-files
```

`environment`
```
PLANNING_CENTER_APPLICATION_ID=01absa...uA120
PLANNING_CENTER_SECRET=97Lsn...Yn12x
PLANNING_CENTER_PAGE_SIZE=100
PLANNING_CENTER_FORMAT=csv
PLANNING_CENTER_DESTINATION=./exported-files
```
`.planningcenterrc`
```json
{
  "applicationId": "01absa...uA120",
  "secret": "97Lsn...Yn12x",
  "pageSize": 100,
  "format": "json",
  "destination": "./exported-files"
}
```
> Arguments passed to the cli will override values stored in the configuration file.
