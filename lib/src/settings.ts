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
