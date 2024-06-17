/**
 * Represents the available chat models.
 */
export type ChatModel =
	| "gpt-4o"
	| "gpt-4o-2024-05-13"
	| "gpt-4-turbo"
	| "gpt-4-turbo-2024-04-09"
	| "gpt-4-0125-preview"
	| "gpt-4-turbo-preview"
	| "gpt-4-1106-preview"
	| "gpt-4-vision-preview"
	| "gpt-4"
	| "gpt-4-0314"
	| "gpt-4-0613"
	| "gpt-4-32k"
	| "gpt-4-32k-0314"
	| "gpt-4-32k-0613"
	| "gpt-3.5-turbo"
	| "gpt-3.5-turbo-16k"
	| "gpt-3.5-turbo-0301"
	| "gpt-3.5-turbo-0613"
	| "gpt-3.5-turbo-1106"
	| "gpt-3.5-turbo-0125"
	| "gpt-3.5-turbo-16k-0613";

/**
 * Represents the settings for the application.
 */
export interface ISettings {
	/**
	 * Gets the API key.
	 * @returns The API key as a string.
	 */
	apiKey: string;

	/**
	 * Gets the include patterns.
	 * @returns The include patterns as a string or string array.
	 */
	includePatterns: string | string[];

	/**
	 * Gets the exclude patterns.
	 * @returns The exclude patterns as a string or string array.
	 */
	excludePatterns: string | string[];

	model: ChatModel;
}

/**
 * Represents the settings for the codedoc extension.
 */
export class Settings implements ISettings {
	// #region Private Fields

	private _config: ISettings;

	// #endregion

	/**
	 * Private constructor to enforce singleton pattern.
	 * @param config - The settings configuration for the codedoc extension.
	 */
	public constructor(config: ISettings) {
		this._config = config;
	}

	/**
	 * Gets the API key.
	 * @returns The API key as a string.
	 */
	public get apiKey(): string {
		return this._config.apiKey;
	}

	public get model(): ChatModel {
		return this._config.model;
	}

	/**
	 * Gets the include patterns.
	 * @returns The include patterns as a string or string array.
	 */
	public get includePatterns(): string | string[] {
		return this._config.includePatterns;
	}

	/**
	 * Gets the exclude patterns.
	 * @returns The exclude patterns as a string or string array.
	 */
	public get excludePatterns(): string | string[] {
		return this._config.excludePatterns;
	}
}
