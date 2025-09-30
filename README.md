# poc-api-cucumber-playwright

## Description

Proof of concept for API test automation using Cubumber, Playwright and TypeScript on [READY TO USE {REST-API}](https://restful-api.dev/) service.

## Prerequistes

* Node.js
* Visual Studio Code
  * Extensions:
    * Cucumber for Visual Studio Code
    * Playwright Test for VS Code

## Setup

1. Initialize a new Node.js project:
```
    npm init -y
```
2. Install TypeScript and TS-Node:
```   
npm install --save-dev typescript ts-node
```
3. Install Playwright:
```   
npm install --save-dev @playwright/test
```
4. Install Cucumber:
```
npm install --save-dev @cucumber/cucumber
```
5. Install Chai:
```
npm install --save-dev chai @types/chai
```
6. Install Playwright web browsers binaries:
```
npx playwright install
```
7. Add the following code to your VS Code Settings.json file to tell the editor where Cucumber can find features and steps:
```
    "cucumber.features": [
                "src/features/*.feature"                
    ],
    "cucumber.glue": [
                "src/steps/*.ts"
    ],
```

## Execution
```
npm test
```
