import * as vscode from "vscode";
import Registration from "./registration";

/**
 * Activates the extension and calls to register commands.
 * @param context The extension context.
 */
export function activate(context: vscode.ExtensionContext) {
	Registration.registerDocumentCommand(context);
}

/**
 * Deactivates the extension.
 */
export function deactivate() {
	// Do nothing, placeholder for future dispose use
}
