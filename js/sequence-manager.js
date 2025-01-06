import { Formatter } from "./formatter.js";
import { WebpageManager } from "./webpage-manager.js";
import { ClipboardManager } from "./clipboard-manager.js";
import { FileManager } from "./file-manager.js";
import { FormatterSettings } from "./formatter-settings.js";
import { ParameterManager } from "./parameter-manager.js";
import { GeneratorManager } from "./generator-manager.js";

export class SequenceManager {

    _parameterManager;
    _generatorManager;
    _formatter;
    _formatterSettings;
    _webpageManager;
    _clipboardManager;
    _fileManager;

    constructor() {
        this.Setup();
        this._parameterManager.SetParameters();
    }

    Setup() {
        this._formatter = new Formatter();
        this._generatorManager = new GeneratorManager(this._formatter);
        this._formatterSettings = new FormatterSettings(this._formatter);
        this._webpageManager = new WebpageManager(this._formatter);
        this._clipboardManager = new ClipboardManager(this._formatter);
        this._fileManager = new FileManager(this._formatter);
        this._parameterManager = new ParameterManager(this._generatorManager.InputManager);
    }
}