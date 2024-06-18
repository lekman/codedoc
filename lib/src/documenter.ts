/* eslint-disable import/prefer-default-export */
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import * as Readline from "readline";
import { ISettings } from "./settings";
import { AssistantCreateParams } from "openai/resources/beta/assistants";

/**
 * The Documenter class is responsible for generating documentation for the user using the OpenAI endpoints.
 */
export class Documenter {
	// #region Private Fields

	/**
	 * The settings object to be used by the Generator.
	 
	 */
	private settings: ISettings;

	/**
	 * The OpenAI instance used to interact with the OpenAI API.
	 */
	private ai: OpenAI;

	private assistant: OpenAI.Beta.Assistant | undefined = undefined;

	private thread: OpenAI.Beta.Thread | undefined = undefined;

	private files: string[] = [];

	private pollingInterval: NodeJS.Timeout | undefined = undefined;

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

	// #region Private Methods

	/**
	 * Gets the content of the 'summary.md' file.
	 * @returns The content of the 'summary.md' file.
	 */
	private get template(): string {
		// Open the file 'summary.md' in the current directory
		const filePath = path.join(__dirname, "summary.md");
		const file = fs.readFileSync(filePath, "utf8");
		return file;
	}

	/**
	 * Gets the AI instruction for performing overview documentation of code files.
	 * The instruction is generated using a template and returned as a string.
	 *
	 * @returns The instruction as a string.
	 */
	private get instruction(): string {
		return `I want you to help me perform overview documentation of code files. I want you to analyze the attached file, and document it using the template below, and output the result as markdown:
		\`\`\`
		This is the ${this.template}.
		\`\`\`
		`;
	}

	/**
	 * Instantiates the Assistant and Thread objects if they are not already created.
	 */
	private async createAssistant(): Promise<void> {
		if (this.assistant === undefined) {
			const assistantConfig: AssistantCreateParams = {
				name: "codedoc-assistant-v0.1",
				instructions: this.instruction,
				tools: [{ type: "code_interpreter" }], // configure the retrieval tool to retrieve files in the future
				model: this.settings.model, // associate our model level,
				tool_resources: {
					code_interpreter: {
						file_ids: this.files,
					},
				},
			};

			this.assistant = await this.ai.beta.assistants.create(assistantConfig);
		}

		if (this.thread === undefined) {
			this.thread = await this.ai.beta.threads.create();
		}
	}

	/**
	 * Uploads a file to the OpenAI API.
	 * @param filePath
	 * @returns The ID of the uploaded file.
	 */
	private async upload(filePath: string): Promise<string> {
		// Create a new file in the OpenAI API
		const file = await this.ai.files.create({
			file: fs.createReadStream(filePath),
			purpose: "assistants",
		});

		// Add the file ID to the list of files
		this.files.push(file.id);

		// Return the ID of the uploaded file
		return file.id;
	}

	/**
	 * Adds a message to the thread.
	 * @param message - The message to be added.
	 * @returns A Promise that resolves to the response from creating the message.
	 */
	private async addMessage(message: string) {
		const response = await this.ai.beta.threads.messages.create(
			this.thread?.id ?? "000",
			{
				role: "user",
				content: message,
			}
		);
		return response;
	}

	/**
	 * Runs the AI assistant and returns the result.
	 * @returns A promise that resolves to an instance of OpenAI.Beta.Threads.Runs.Run.
	 */
	private async runAssistant(): Promise<OpenAI.Beta.Threads.Runs.Run> {
		const response = await this.ai.beta.threads.runs.create(
			this.thread?.id ?? "000",
			{
				assistant_id: this.assistant?.id ?? "000",
			}
		);

		return response;
	}

	private async checkStatus(threadId: string, runId: string) {
		const runObject = await this.ai.beta.threads.runs.retrieve(threadId, runId);

		const { status } = runObject;
		console.log(runObject); // eslint-disable-line no-console
		console.log(`Current status: ${status}`); // eslint-disable-line no-console

		if (status === "completed") {
			clearInterval(this.pollingInterval);

			const messagesList = await this.ai.beta.threads.messages.list(threadId);
			const messages: OpenAI.Beta.Threads.MessageContent[][] = [];

			// eslint-disable-next-line dot-notation, prefer-destructuring
			const body = messagesList["body"];

			// eslint-disable-next-line prefer-destructuring
			const data = JSON.parse(JSON.stringify(body)).data;

			// eslint-disable-next-line dot-notation
			data.forEach((message: OpenAI.Beta.Threads.Message) => {
				messages.push(message.content);
			});

			console.dir(messages); // eslint-disable-line no-console
			//res.json({ messages });
		}
	}

	/**
	 * Analyzes a source code file using OpenAI.
	 * @param filePath The absolute path to the file to be analyzed.
	 * @returns A Promise that resolves to the analysis result.
	 */
	private async analyze(filePath: string): Promise<string> {
		const fileId = await this.upload(filePath);

		// Update assistant context with new files
		await this.ai.beta.assistants.update(this.assistant?.id ?? "000", {
			file_ids: this.files,
		} as OpenAI.Beta.AssistantUpdateParams);

		const message = {
			role: "user",
			content: "Analyze this file and add documentation using the template",
			attachments: [
				{
					file_id: fileId,
					tools: [{ type: "code_interpreter" }],
				},
			],
		};

		this.addMessage(JSON.stringify(message));
		const run = await this.runAssistant();

		const runId = run.id;
		// Check the status
		this.pollingInterval = setInterval(() => {
			this.checkStatus(this.thread?.id ?? "000", runId);
		}, 5000);

		console.dir(run); // eslint-disable-line no-console

		return JSON.stringify(run);
	}

	// #endregion

	// #region Public Methods

	// public document(path: string): Promise<string> {
	//	await this.createAssistant(); // Ensure the assistant and thread are created
	// 	const readLine = Readline.createInterface({
	// 	return new Promise((resolve, reject) => {
	// 		readline.question(question, (answer) => {
	// 			resolve(answer);
	// 		});
	// 	});
	// }

	// #endregion
}
