module.exports = exports = {
	root: true, // Make sure eslint picks up the config at the root of the directory
	parser: "@typescript-eslint/parser", // Specifies the ESLint parser to use TypeScript
	settings: {
		"import/resolver": {
			node: {
				extensions: [".ts", ".tsx"],
				moduleDirectory: ["src", "node_modules"],
			},
		},
	},
	plugins: ["@typescript-eslint", "jest", "jsdoc"],
	env: {
		node: true,
		es6: true,
		"jest/globals": true,
		jest: true,
	},
	parserOptions: {
		ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
		sourceType: "module", // Allows for the use of imports
		tsconfigRootDir: __dirname, // tsconfig is in the same folder as .eslintrc.js
	},
	// A list of global rulesets that are recommended for all TypeScript projects
	extends: [
		"airbnb-base",
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:import/recommended",
		"plugin:import/typescript",
		"plugin:jsdoc/recommended-typescript",
		"prettier",
	],
	rules: {
		"@typescript-eslint/no-explicit-any": "error", // Always declare types
		"class-methods-use-this": "off", // Allow class methods as they are exposed by exported object instances
		"import/extensions": [
			// Explain how imports should be resolved
			"error",
			"ignorePackages",
			{
				ts: "never",
				tsx: "never",
			},
		],
		"import/no-extraneous-dependencies": "off", // Clash with TypeScript
		"jsdoc/require-jsdoc": [
			// We require documentation for our code
			"error",
			{
				require: {
					FunctionDeclaration: true,
					MethodDefinition: true,
					ClassDeclaration: true,
				},
			},
		],
		"no-console": "error", // Disallow console output, use logging framework instead
		"no-shadow": "off", // Specific fix for allowing enums in TypeScript
		"@typescript-eslint/no-shadow": "error", // Replaces above line rule,
		"no-unused-vars": "off", // Remove standard JS rule
		"@typescript-eslint/no-unused-vars": "error", // Replace above with TypeScript rule
		"no-underscore-dangle": "off",
	},
	ignorePatterns: ["node_modules/", ".eslintrc.js", "out/"],
};
