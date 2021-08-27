# Planning Center Export CLI

## Background
A command line utility that simplifies the process of exporting data from Planning Center.  This is a thin layer over the [planning-center-export](https://www.npmjs.com/package/planning-center-export) npm package.  Please reference the [Planning Center Export GitHub project](https://github.com/johngully/planning-center-export) for more information about the inner workings the module.


## Quick start
These are the minimal steps required to get up and running on the command line.
```bash
npm install -g planning-center-export-cli
pce-init --applicationId 01absa...uA120 --secret 97Lsn...Yn12x
pce campuses
```

## Installation and Setup
The easiest way to get setup is to install the package globally.  This will ensure that the Planning Center Export commands are available at any location on the command line.  This will install two command `pce-init` for easy setup and configuration and `pce` for exporting data from the Planning Center API.

`pce-init`

This command will create a `.planningcenterrc` file in the current working directory.  It takes all of the available configuration options and maps them to a configuration file for you.

**Basic configuration options**:
```bash
pce-init --applicationId "01absa...uA120" --secret "97Lsn...Yn12x"
```

**All valid configuration options**:
```bash
pce-init --applicationId "01absa...uA120" --secret "97Lsn...Yn12x" --pageSize 100 --format "csv" --destination "./exported-files" --tab "care_ministry"
```

## Command Line Usage
The `pce` command requires a single parameter that specifies which "entity" should be exported.  Any of the available configurations can be passed directly to the command, and will overried any values specified in configuration files.

**Basic export**
```bash
pce campuses
```
**All valid export options**
```bash
pce peopleTabs care_ministry --applicationId "01absa...uA120" --secret "97Lsn...Yn12x" --pageSize 100 --format "csv" --destination "./exported-files" --tab "care_ministry"
```

## Supported Export Entities
The primary parameter to the `pce` command is the "entity" that will be exported.  This is the list of [currently supported entities](https://github.com/johngully/planning-center-export/blob/main/planningCenterEnums.mjs):

`campuses`, `checkins`, `emails`, `events`, `eventTimes`, `groups`, `groupMembers`, `groupTypes`, `headcounts`, `households`, `people`, `peopleStats`, `peopleTabs`

> **People Tab Data**
> Data stored in custom tabs can be exported using the `peopleTabs` entity in combination with the name (`slug`) of the tab.  Both the entity and the tab must be specified when exporting this data.
>
> `pce peopleTabs care_minisitry`
>
> or
>
> `pce peopleTabs --tab care_ministry`

## Configuration
The command line utility will use preconfigured settings for commands to reduced repetition of arguments that don't typically change from one call to another.

Configurations can be passed to the command directly, stored in environment variables, or set in a configuration file (`.planningcenterrc` or `planningcenterrc.json`). If values are configured in multiple locations they will override in the following order (most specific at the top):

**Configuration using command line arguments**
```bash
pce --applicationId 01absa...uA120 --secret 97Lsn...Yn12x --pageSize 100 --format csv --destination ./exported-files
```

**Configuration using environment variables**
```
PLANNING_CENTER_APPLICATION_ID=01absa...uA120
PLANNING_CENTER_SECRET=97Lsn...Yn12x
PLANNING_CENTER_PAGE_SIZE=100
PLANNING_CENTER_FORMAT=csv
PLANNING_CENTER_DESTINATION=./exported-files
```
**Configuration using** `.planningcenterrc`
```json
{
  "applicationId": "01absa...uA120",
  "secret": "97Lsn...Yn12x",
  "pageSize": 100,
  "format": "json",
  "destination": "./exported-files"
}
```

## Configuration Details

### Application ID

The [PlanningCenter Application ID](https://api.planningcenteronline.com/oauth/applications) for your specific account with PlanningCenter.
##### REQUIRED: **REQUIRED**
##### DEFAULT VALUE: **N/A**

### Secret

The [PlanningCenter Secret Key](https://api.planningcenteronline.com/oauth/applications) for your specific account with PlanningCenter.
##### REQUIRED: **REQUIRED**
##### DEFAULT VALUE: **N/A**

### Page Size 

The number of records that should be returned per page from the API.  Planning Center limits the maximum amount to 100 per page.
##### REQUIRED: **OPTIONAL**
##### DEFAULT VALUE: **100**

### Format

The data format that the Planning Center data will translated into.  Currently the PlanningCenterExport package support `json` and `csv`.
##### REQUIRED: **OPTIONAL**
##### DEFAULT VALUE: **json**

### Destination

The path where files should be exported.
##### REQUIRED: **OPTIONAL**
##### DEFAULT VALUE: **./** *(the current working directory)*

### Tab

The slug name of the Planning Center custom tab.  This is used to export data stored in custom tabs and fields configured for "People".  This attribute can also be specified as an optional second parameter after the entity.  If provided more than once, the value in `--tab` will be used.
##### REQUIRED: **OPTIONAL**
##### DEFAULT VALUE: **N/A**
