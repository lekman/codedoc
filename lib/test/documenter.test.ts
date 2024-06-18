/* eslint-disable dot-notation */
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ISettings } from "../src/settings";
import { Documenter } from "../src/documenter";

// Load environment variables from .env file
dotenv.config();

describe("Documenter", () => {
	let documenter: Documenter;
	let settings: ISettings;

	// Use an environment variable
	const apiKey = process.env.API_KEY ?? "defaultApiKey";

	beforeEach(() => {
		settings = {
			apiKey,
			includePatterns: [],
			excludePatterns: [],
			model: "gpt-3.5-turbo",
			//model: "gpt-4o",
		};
		documenter = new Documenter(settings);
		jest.clearAllMocks();
	});

	it("should return the content of 'summary.md' file", () => {
		const expectedContent = "Mocked summary content";
		// Mock the fs.readFileSync method to return the expected content
		jest.spyOn(fs, "readFileSync").mockReturnValue(expectedContent);

		// eslint-disable-next-line dot-notation
		const result = documenter["template"];

		expect(result).toBe(expectedContent);
	});

	it("should return a combined AI instruction prompt", () => {
		const expectedInstruction = `I want you to help me perform overview documentation of code files. I want you to analyze the attached file, and document it using the template below, and output the result as markdown:
		\`\`\`
		This is the Mocked summary content.
		\`\`\`
		`;

		// Mock the fs.readFileSync method to return the expected content
		jest.spyOn(fs, "readFileSync").mockReturnValue("Mocked summary content");

		// eslint-disable-next-line dot-notation
		const result = documenter["instruction"];

		expect(result).toBe(expectedInstruction);
	});

	it("should upload a file", async () => {
		const filePath = path.join(__dirname, "..", "src", "files.ts");
		const result = await documenter["upload"](filePath);
		expect(result).toBeDefined();
		expect(result).toMatch("file-");
	});

	it("should create a new assistant and thread", async () => {
		await documenter["createAssistant"]();
		expect(documenter["assistant"]).toBeDefined();
		expect(documenter["thread"]).toBeDefined();
	});

	it("should add a message to the thread", async () => {
		const expected = "Test message";
		await documenter["createAssistant"]();

		const response = await documenter["addMessage"](expected);
		const message = JSON.parse(JSON.stringify(response.content[0])) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

		expect(response).toBeDefined();
		expect(response.role).toBe("user");
		expect(message.text.value).toBe(expected);
	}, 30000);

	it("should run the AI assistant and return the result", async () => {
		await documenter["createAssistant"]();

		const response = await documenter["runAssistant"]();

		expect(response).toBeDefined();
		expect(response.id).toBeDefined();
		expect(response.object).toBe("thread.run");
	}, 30000);

	it("should upload a file and return an analysis", async () => {
		const filePath = path.join(__dirname, "..", "src", "files.ts");
		await documenter["upload"](filePath);
		await documenter["createAssistant"]();
		const result = await documenter["analyze"](filePath);
		expect(result).toBeDefined();
		expect(result).toMatch("file-");
	}, 60000);
});
