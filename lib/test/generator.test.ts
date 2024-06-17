import { ISettings, Settings } from "../src/settings";
import Generator from "../src/generator";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

describe("Generator", () => {
	let generator: Generator;
	let settings: ISettings;

	// Use an environment variable
	const apiKey = process.env.API_KEY ?? "defaultApiKey";

	console.log(`API key: ${apiKey}`);

	beforeEach(() => {
		const config = { apiKey };
		settings = new Settings(config);
		generator = new Generator(settings);
	});

	it("should have an API key when configured", () => {
		expect(generator.hasApiKey).toBe(true);
	});

	it("should not have an API key when not configured", () => {
		generator = new Generator(new Settings({}));
		expect(generator.hasApiKey).toBe(false);
	});

	it("should generate a summary", () => {
		// TODO: Implement test for generateSummary method
	});
});
