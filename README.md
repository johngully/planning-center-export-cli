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
pce campuses --format "csv" --destination "./exported-files/"
```
