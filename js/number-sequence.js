import { Formatter } from "./formatter.js";
import { Generator } from "./generator.js";
import { WebpageManager } from "./webpage-manager.js";
import { ClipboardManager } from "./clipboard-manager.js";
import { FileManager } from "./file-manager.js";
import { GeneratorSettings } from "./generator-settings.js";
import { FormatterSettings } from "./formatter-settings.js";
import { HistogramManager } from "./histogram-manager.js";
import { InputManager } from "./input-manager.js";

export class NumberSequence {

    _generator;
    _generatorSettings;
    _formatter;
    _formatterSettings;
    _webpageManager;
    _clipboardManager;
    _fileManager;
    _inputManager;
    _histogramManager;
    _reGenerateElm;

    constructor() {
        this.Setup();
    }

    Setup() {
        this._generator = new Generator();
        this._formatter = new Formatter();
        this._inputManager = new InputManager(this._formatter);
        this._generatorSettings = new GeneratorSettings(this._generator, this._inputManager);
        this._formatterSettings = new FormatterSettings(this._formatter, this._inputManager);
        this._webpageManager = new WebpageManager(this._formatter);
        this._clipboardManager = new ClipboardManager(this._formatter);
        this._fileManager = new FileManager(this._formatter);
        this._histogramManager = new HistogramManager(this._generator);
        this.GetElements();
        this.SetEventListeners();
        this.GenerateValues();
    }

    GetElements() {
        this._reGenerateElm = document.getElementById("regenerate-icon");
    }

    SetEventListeners() {
        this._reGenerateElm.addEventListener("click", () => this.GenerateValues());
        this._generator.AddEventListener("SequenceChanged", (inst) => this.PresentValues() );
    }

    GenerateValues() {
        this._generator.GenerateRawValues();
    }

    PresentValues() {
        const values = this._generator.RandomSequence;
        this._formatter.SequenceValues = values;
    }
}