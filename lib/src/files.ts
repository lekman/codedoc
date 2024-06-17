import { glob } from "glob";

/**
 * A utility class for working with files using global search patterns.
 */
export default class Files {
	/**
	 * Retrieves a list of files that match the specified include patterns and exclude patterns.
	 * @param includePatterns - The patterns to include when searching for files.
	 * @param excludePatterns - The patterns to exclude when searching for files.
	 * @param root - The root directory to start the search from. Defaults to the current working directory.
	 * @returns A promise that resolves to an array of file paths.
	 */
	public static async getFiles(
		includePatterns: string | string[],
		excludePatterns: string | string[],
		root: string = process.cwd()
	): Promise<string[]> {
		return new Promise((resolve) => {
			glob(includePatterns, {
				ignore: excludePatterns,
				cwd: root,
				nodir: true, // Exclude directories from the results
			})
				.then((files) => {
					resolve(files);
				})
				/* istanbul ignore next */
				.catch(() => {
					/* istanbul ignore next */
					resolve([]);
				});
		});
	}
}
