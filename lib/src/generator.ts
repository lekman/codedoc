import { ISettings } from "./settings";
import Files from "./files";
// import { Documenter } from "./documenter";

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
export class Generator implements IGenerator {
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
		return !!this.settings.apiKey;
	}

	/**
	 * Generates a documentation summary.
	 */
	public async generateSummary(): Promise<string[]> {
		if (!this.hasApiKey) {
			throw new Error("API key is required to generate a summary.");
		}

		return new Promise((resolve, reject) => {
			// Call files and return the result, or handle an error
			Files.getFiles(
				this.settings.includePatterns,
				this.settings.excludePatterns
			)
				.then((files) => {
					// const doc = new Documenter(this.settings);
					// console.dir(doc);
					// console.dir(files);
					resolve(files);
				})
				/* istanbul ignore next */
				.catch((error) => {
					/* istanbul ignore next */
					reject(error);
				});
		});
	}
}
