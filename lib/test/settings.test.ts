import { Settings } from "../src/settings";

describe("Settings", () => {
	let settings: Settings;

	// Generate a random secret string
	const randomString = Math.random()
		.toString(36)
		.replace(/[^a-z]+/g, "")
		.substring(0, 30);

	beforeEach(() => {
		const config = { apiKey: randomString };
		settings = new Settings(config);
	});

	it("should return a string value for an existing configuration", () => {
		expect(settings.config("apiKey")).toEqual(randomString);
	});

	it("should return undefined for non-existing configuration parameter", () => {
		expect(settings.config("nonExistingKey")).toBeUndefined();
	});

	it("should return undefined for an undefined configuration", () => {
		settings = new Settings();
		expect(settings.config("apiKey")).toBeUndefined();
	});
});
