/* eslint-disable import/prefer-default-export */
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { ISettings } from "./settings";

/**
 * The Documenter class is responsible for generating documentation for the user using the OpenAI endpoints.
 */
export class Documenter {
	// #region Private Fields

	private settings: ISettings;

	private ai: OpenAI;

	// #endregion

	/**
	 * Creates a new instance of the Generator class.
	 * @param settings - The settings object to be used by the Generator.
	 */
	public constructor(settings: ISettings) {
		this.settings = settings;
		this.ai = new OpenAI({
			apiKey: this.settings.apiKey,
		});
	}

	/**
	 * Gets the content of the 'summary.md' file.
	 * @returns The content of the 'summary.md' file.
	 */
	private markdownTemplate(): string {
		// Open the file 'summary.md' in the current directory
		const filePath = path.join(__dirname, "summary.md");
		const file = fs.readFileSync(filePath, "utf8");
		return file;
	}
}
