"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = require("../src/settings");
const generator_1 = __importDefault(require("../src/generator"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
describe("Generator", () => {
    var _a;
    let generator;
    let settings;
    // Use an environment variable
    const apiKey = (_a = process.env.API_KEY) !== null && _a !== void 0 ? _a : "defaultApiKey";
    console.log(`API key: ${apiKey}`);
    beforeEach(() => {
        const config = { apiKey };
        settings = new settings_1.Settings(config);
        generator = new generator_1.default(settings);
    });
    it("should have an API key when configured", () => {
        expect(generator.hasApiKey).toBe(true);
    });
    it("should not have an API key when not configured", () => {
        generator = new generator_1.default(new settings_1.Settings({}));
        expect(generator.hasApiKey).toBe(false);
    });
    it("should generate a summary", () => {
        // TODO: Implement test for generateSummary method
    });
});
//# sourceMappingURL=generator.test.js.map