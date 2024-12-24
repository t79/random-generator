import { Formatter } from "./formatter.js";
import { WebpageManager } from "./webpage-manager.js";
import { ClipboardManager } from "./clipboard-manager.js";
import { FileManager } from "./file-manager.js";
import { FormatterSettings } from "./formatter-settings.js";
import { NumericalManager } from "./numerical-manager.js";
import { CategoricalManager } from "./categorical-manager.js";
import { TypeSwitcher } from "./type-switcher.js";
import { ParameterManager } from "./parameter-manager.js";

export class SequenceManager {

    _parameterManager;
    _typeSwitcher;
    _numericalManager;
    _categoricalManager;
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
        this._parameterManager = new ParameterManager();
        this._formatter = new Formatter();
        this._numericalManager = new NumericalManager(this._formatter);
        this._categoricalManager = new CategoricalManager(this._formatter);
        this._typeSwitcher = new TypeSwitcher(this._numericalManager, this._categoricalManager)
        this._formatterSettings = new FormatterSettings(this._formatter);
        this._webpageManager = new WebpageManager(this._formatter);
        this._clipboardManager = new ClipboardManager(this._formatter);
        this._fileManager = new FileManager(this._formatter);
    }
}