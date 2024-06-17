import fs from "fs";
import { ISettings } from "../src/settings";
import { Documenter } from "../src/documenter";

describe("Documenter", () => {
	let documenter: Documenter;
	let settings: ISettings;

	beforeEach(() => {
		settings = {
			apiKey: "testApiKey",
			includePatterns: [],
			excludePatterns: [],
			model: "gpt-4o",
		};
		documenter = new Documenter(settings);
	});

	it("should return the content of 'summary.md' file", () => {
		const expectedContent = "Mocked summary content";
		// Mock the fs.readFileSync method to return the expected content
		jest.spyOn(fs, "readFileSync").mockReturnValue(expectedContent);

		// eslint-disable-next-line dot-notation
		const result = documenter["markdownTemplate"]();

		expect(result).toBe(expectedContent);
	});
});
