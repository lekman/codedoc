/**
 * Represents the settings for the application.
 */
export interface ISettings {
	/**
	 * Gets the workspace configuration parameter for the codedoc extension.
	 * @param key - The key of the configuration parameter.
	 * @returns The workspace configuration parameter for the codedoc extension.
	 */
	config(key: string): string | string[] | undefined;
}

/**
 * Represents the settings for the codedoc extension.
 */
export class Settings implements ISettings {
	// #region Private Fields

	private _config: { [key: string]: string | string[] } | undefined;

	// #endregion

	/**
	 * Private constructor to enforce singleton pattern.
	 * @param config - The settings configuration for the codedoc extension.
	 */
	public constructor(config?: { [key: string]: string | string[] }) {
		this._config = config;
	}

	/**
	 * Gets the configuration for the codedoc extension.
	 * @param key - The key of the configuration parameter.
	 * @returns The workspace configuration for the codedoc extension.
	 */
	public config(key: string): string | string[] | undefined {
		if (!this._config) {
			return undefined;
		}

		// Return the configuration value using the key, if it exists
		return this._config[key];
	}
}
