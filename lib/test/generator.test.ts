import dotenv from "dotenv";
import OpenAI from "openai";
import { ISettings, Settings } from "../src/settings";
import Generator from "../src/generator";

// Load environment variables from .env file
dotenv.config();

describe("Generator", () => {
	let generator: Generator;
	let settings: ISettings;

	// Use an environment variable
	const apiKey = process.env.API_KEY ?? "defaultApiKey";

	const blankConfig = {
		apiKey: "",
		includePatterns: [],
		excludePatterns: [],
	};

	beforeEach(() => {
		const config = {
			apiKey,
			includePatterns: ["**/*.ts"],
			excludePatterns: ["**/node_modules/**", "**/out/**", "**/dist/**"],
		};
		settings = new Settings(config);
		generator = new Generator(settings);
	});

	it("should have an API key when configured", () => {
		expect(generator.hasApiKey).toBe(true);
	});

	it("should not have an API key when not configured", () => {
		generator = new Generator(new Settings(blankConfig));
		expect(generator.hasApiKey).toBe(false);
	});

	test("generateSummary throws an exception for missing API key", async () => {
		generator = new Generator(new Settings(blankConfig));
		return expect(generator.generateSummary()).rejects.toThrow(
			"API key is required to generate a summary."
		);
	});

	it("should generate a summary", async () => {
		const result = await generator.generateSummary();

		for (const file of result) {
			console.log(file);
		}

		expect(result.length).toBeGreaterThan(0);
		expect(result).toBeDefined();
	}, 999999); // Increase timeout to 999999 ms
});
