import { Settings } from "../src/settings";

describe("Settings", () => {
	let settings: Settings;

	// Generate a random secret string
	const randomString = Math.random()
		.toString(36)
		.replace(/[^a-z]+/g, "")
		.substring(0, 30);

	beforeEach(() => {
		settings = new Settings({
			apiKey: randomString,
			includePatterns: ["**/*.ts"],
			excludePatterns: ["**/node_modules/**", "**/out/**", "**/dist/**"],
			model: "gpt-4o",
		});
	});

	it("should return a string value for an existing configuration", () => {
		expect(settings.apiKey).toEqual(randomString);
	});

	it("should return the correct model value", () => {
		expect(settings.model).toEqual("gpt-4o");
	});
});
