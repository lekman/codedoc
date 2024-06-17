import { ISettings } from "./settings";

/**
 * Represents a generator interface.
 */
export interface IGenerator {
	/**
	 * Indicates whether the generator has an API key.
	 */
	hasApiKey: boolean;

	/**
	 * Generates a summary.
	 */
	generateSummary(): void;
}

/**
 * Represents a Generator class that is responsible for generating summaries.
 */
/**
 * Represents a Generator that is responsible for generating documentation.
 */
export default class Generator implements IGenerator {
	// #region Private Fields

	private settings: ISettings;

	// #endregion

	/**
	 * Creates a new instance of the Generator class.
	 * @param settings - The settings object to be used by the Generator.
	 */
	public constructor(settings: ISettings) {
		this.settings = settings;
	}

	/**
	 * Checks if the Generator has an API key configured.
	 * @returns A boolean indicating whether the Generator has an API key configured.
	 */
	public get hasApiKey(): boolean {
		return !!this.settings.config("apiKey");
	}

	/**
	 * Generates a documentation summary.
	 */
	public generateSummary(): void {
		// TODO: Implement feature here
	}
}
