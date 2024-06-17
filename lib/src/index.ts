import * as settings from "./settings";
import * as generator from "./generator";

export namespace codedoc {
	export import Settings = settings.Settings;
	export import ISettings = settings.ISettings;
	export import ChatModel = settings.ChatModel;
	export import IGenerator = generator.IGenerator;
	export import Generator = generator.Generator;
}
