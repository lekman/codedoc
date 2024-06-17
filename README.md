# CodeDoc

[![CI: codedoc](https://github.com/lekman/codedoc/actions/workflows/ci.lib.yml/badge.svg)](https://github.com/lekman/codedoc/actions/workflows/ci.lib.yml)
[![CodeQL](https://github.com/lekman/codedoc/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/lekman/codedoc/actions/workflows/github-code-scanning/codeql)
[![codecov](https://codecov.io/gh/lekman/codedoc/graph/badge.svg?token=6QM9WGSIFF)](https://codecov.io/gh/lekman/codedoc)

A plugin for automating developer documentation generation in Visual Studio Code.

## Usage

Install the extension from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=lekman.codedoc).

Run the `CodeDoc: Generate Documentation` command to generate documentation for the current workspace.

- Open the command palette with `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS).
- Type `CodeDoc: Generate Documentation` and press `Enter`.
- If you have not created an [OpenAI token](https://platform.openai.com/account/api-keys), you will be prompted to do so.

## Configuration

TODO.

## Stand-alone Tool

The `codedoc` command-line tool can be used to generate documentation for any project.

Create an `.npmrc` file in the root of the project with the following content:

```plaintext
@lekman:registry=https://npm.pkg.github.com
always-auth=true
```

Install the tool from npmjs:

```bash
npm install @lekman/codedoc
```
