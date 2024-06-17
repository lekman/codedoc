import * as vscode from "vscode";
import generator from "../../lib/src/generator";

/**
 * Class responsible for registering the document command and handling missing API key.
 */
export default class Registration {
	/**
	 * Handles the case when the API key is missing.
	 * Shows an error message and allows the user to open the settings to set the API key.
	 */
	private static handleMissingApiKey() {
		vscode.window
			.showErrorMessage(
				"API Key not set. Please set your OpenAI API Key in the settings.",
				"Open Settings"
			)
			.then((selection) => {
				if (selection === "Open Settings") {
					vscode.commands.executeCommand(
						"workbench.action.openSettings",
						"codedoc.apiKey"
					);
				}
			});
	}

	/**
	 * Registers the document command with the provided extension context.
	 * @param context The extension context.
	 */
	public static registerDocumentCommand(context: vscode.ExtensionContext) {
		const disposable = vscode.commands.registerCommand(
			"codedoc.document",
			() => {
				vscode.window.showInformationMessage(
					"Generating Documentation Summary..."
				);

				// Ensure that we have an API key set before proceeding
				if (!generator.hasApiKey) {
					this.handleMissingApiKey();
					return;
				}

				generator.generateSummary();
			}
		);

		context.subscriptions.push(disposable);
	}
}
