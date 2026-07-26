<div align="center">
  <img
    src="https://raw.githubusercontent.com/LizardByte/.github/refs/heads/master/branding/logos/logo.svg"
    alt="LizardByte icon"
    width="256"
  />
  <h1 align="center">gamepad-helper</h1>
  <h4 align="center">Helper library for Gamepad API.</h4>
</div>

<div align="center">
  <a href="https://github.com/LizardByte/gamepad-helper"><img src="https://img.shields.io/github/stars/lizardbyte/gamepad-helper.svg?logo=github&style=for-the-badge" alt="GitHub stars"></a>
  <a href="https://www.npmjs.com/package/@lizardbyte/gamepad-helper"><img src="https://img.shields.io/npm/v/%40lizardbyte%2Fgamepad-helper?style=for-the-badge&logo=npm&label=npm%20version" alt="NPM Version"></a>
  <a href="https://www.npmjs.com/package/@lizardbyte/gamepad-helper"><img src="https://img.shields.io/npm/dm/%40lizardbyte%2Fgamepad-helper?style=for-the-badge&logo=npm&label=npm%20downloads/m" alt="NPM Monthly Downloads"></a>
  <a href="https://github.com/LizardByte/gamepad-helper/actions/workflows/_ci-node.yml?query=branch%3Amaster"><img src="https://img.shields.io/github/actions/workflow/status/lizardbyte/gamepad-helper/_ci-node.yml.svg?branch=master&label=CI%20build&logo=github&style=for-the-badge" alt="GitHub Workflow Status (CI)"></a>
  <a href="https://codecov.io/gh/LizardByte/gamepad-helper"><img src="https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fapp.lizardbyte.dev%2Fdashboard%2Fshields%2Fcodecov%2Fgamepad-helper.json&style=for-the-badge&logo=codecov" alt="Codecov"></a>
  <a href="https://sonarcloud.io/project/overview?id=LizardByte_gamepad-helper"><img src="https://img.shields.io/sonar/quality_gate/LizardByte_gamepad-helper.svg?server=https%3A%2F%2Fsonarcloud.io&style=for-the-badge&logo=sonarqubecloud&label=sonarcloud" alt="SonarCloud"></a>
</div>

## Overview

Helper library for Gamepad API. Helps with detecting type of gamepad and mapping to buttons and icons.

## Installation

### Install via NPM registry

1. Add the dependency to your package.json file:
   ```bash
   npm install @lizardbyte/gamepad-helper --ignore-scripts
   ```

### Install via GitHub Package Registry

1. Add a `.npmrc` file to the root of your project with the following contents.
   ```
   //npm.pkg.github.com/:_authToken=TOKEN
   @lizardbyte:registry=https://npm.pkg.github.com
   ```

   Replace `TOKEN` with a valid GitHub token with read access to the package registry.

   See
   [Authenticating with a personal access token](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-with-a-personal-access-token)
   for more information or alternative methods of authentication.

2. Add the dependency to your package.json file:
   ```bash
   npm install @lizardbyte/gamepad-helper --ignore-scripts
   ```

## Attribution

- Button Icons and Controls were created by Zacksly (Licensed under CC BY 3.0 - https://zacksly.itch.io)
