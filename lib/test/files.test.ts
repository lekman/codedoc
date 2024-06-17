import Files from "../src/files";

describe("Files", () => {
	describe("getFiles", () => {
		it("should retrieve a list of files that match the include patterns", async () => {
			const includePatterns = "**/*.ts";
			const excludePatterns = ["**/node_modules/**", "**/out/**", "**/dist/**"];
			const root = process.cwd();
			const files = await Files.getFiles(
				includePatterns,
				excludePatterns,
				root
			);
			expect(files).toBeDefined();
			expect(files.length).toBeGreaterThan(0);
		});

		it("should exclude files that match the exclude patterns", async () => {
			const includePatterns = "**/*.ts";
			const excludePatterns = "**/node_modules/**";
			const root = process.cwd();
			const files = await Files.getFiles(
				includePatterns,
				excludePatterns,
				root
			);
			expect(files).toBeDefined();
			expect(files.length).toBeGreaterThan(0);
			expect(files.every((file) => !file.includes("node_modules"))).toBe(true);
		});

		it("should return an empty array if no files match the include patterns", async () => {
			const includePatterns = "**/*.nothing";
			const excludePatterns: string[] = [];
			const root = process.cwd();
			const files = await Files.getFiles(
				includePatterns,
				excludePatterns,
				root
			);
			expect(files).toBeDefined();
			expect(files.length).toBe(0);
		});
	});
});
