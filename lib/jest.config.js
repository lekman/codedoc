module.exports = {
	// Set up basic configuration for Jest
	preset: "ts-jest",
	testEnvironment: "node",
	transform: {
		// process `*.tsx` files with `ts-jest`
		"^.+\\.tsx?$": [
			"ts-jest",
			{
				diagnostics: {
					warnOnly: true,
				},
			},
		],
	},
	moduleNameMapper: {
		"\\.(css|gif|ttf|eot|svg|png)$": "jest-transform-stub",
	},

	// Use the 'coverage' folder for JUnit reports, remember to add this to .gitignore
	reporters: [
		"default",
		"jest-trx-results-processor", // Use .trx for SonarQube
		["jest-junit", { outputDirectory: "coverage" }],
	],
	testMatch: ["**/?(*.)+(spec|test).+(ts|tsx|js)"],

	// Configure coverage reports
	collectCoverage: true,
	collectCoverageFrom: ["src/**/*.{ts,tsx}", "!**/index.ts"],
	coverageDirectory: "coverage",
	coverageReporters: ["json-summary", "json", "lcov", "text", "clover"],
};
