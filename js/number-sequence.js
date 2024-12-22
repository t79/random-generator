import { Formatter } from "./formatter.js";
import { Generator } from "./generator.js";
import { WebpageManager } from "./webpage-manager.js";
import { ClipboardManager } from "./clipboard-manager.js";
import { FileManager } from "./file-manager.js";
import { GeneratorSettings } from "./generator-settings.js";
import { FormatterSettings } from "./formatter-settings.js";
import { HistogramManager } from "./histogram-manager.js";
import { InputManager } from "./input-manager.js";
import { CategoricalInputManager } from "./categorical-input-manager.js";
import { CategoricalGenerator } from "./categorical-generator.js";
import { CategoricalGeneratorSettings } from "./categorical-generator-settings.js";

export class NumberSequence {

    _generator;
    _categoricalGenerator;
    _generatorSettings;
    _categoricalGeneratorSettings;
    _formatter;
    _formatterSettings;
    _webpageManager;
    _clipboardManager;
    _fileManager;
    _inputManager;
    _categoricalInputManager;
    _histogramManager;
    _reGenerateElm;
    _typeSelectSliderElm;
    _numericalButtonElm;
    _categoricalButtonElm;

    constructor() {
        this.Setup();
    }

    Setup() {
        this._generator = new Generator();
        this._categoricalGenerator = new CategoricalGenerator();
        this._formatter = new Formatter();
        this._inputManager = new InputManager(this._formatter);
        this._categoricalInputManager = new CategoricalInputManager(this._formatter);
        this._generatorSettings = new GeneratorSettings(this._generator, this._inputManager);
        this._categoricalGeneratorSettings = new CategoricalGeneratorSettings(this._categoricalGenerator, this._categoricalInputManager);
        this._formatterSettings = new FormatterSettings(this._formatter, this._inputManager, this._categoricalInputManager);
        this._webpageManager = new WebpageManager(this._formatter);
        this._clipboardManager = new ClipboardManager(this._formatter);
        this._fileManager = new FileManager(this._formatter);
        this._histogramManager = new HistogramManager(this._generator);
        this.GetElements();
        this.SetEventListeners();
        this.GenerateValues();
        this.ChangeSequenceType();
    }

    GetElements() {
        this._reGenerateElm = document.getElementById("regenerate-icon");
        this._typeSelectSliderElm = document.getElementById("select-slider");
        this._numericalButtonElm = document.getElementById("select-numerical");
        this._categoricalButtonElm = document.getElementById("select-categorical");
    }

    SetEventListeners() {
        this._reGenerateElm.addEventListener("click", () => this.GenerateValues());
        this._generator.AddEventListener("SequenceChanged", (inst) => this.PresentValues() );
        this._categoricalGenerator.AddEventListener("SequenceChanged", (inst) => this.PresentElements());
        this._typeSelectSliderElm.addEventListener("input", () => this.ChangeSequenceType("slider") );
        this._numericalButtonElm.addEventListener("click", () => this.ChangeSequenceType("numerical") );
        this._categoricalButtonElm.addEventListener("click", () => this.ChangeSequenceType("categorical") );
    }

    GenerateValues() {
        this._generator.GenerateRawValues();
        this._categoricalInputManager.Generate();
    }

    PresentValues() {
        const values = this._generator.RandomSequence;
        this._formatter.SequenceValues = values;
    }

    PresentElements() {
        console.log(this._categoricalGenerator.Sequence);
        const elements = this._categoricalGenerator.Sequence;
        this._formatter.SequenceValues = elements;
    }

    ChangeSequenceType(selected = "slider") {

        if (selected == "slider") {
            const value = this._typeSelectSliderElm.value;
            if (value == 1) {
                this.SwitchToNumerical();
            }
            else {
                this.SwitchToCategorical();
            }
        }
        else if (selected == "numerical") {
            this.SwitchToNumerical();
            this._typeSelectSliderElm.value = 1;
        }
        else if (selected == "categorical") {
            this.SwitchToCategorical();
            this._typeSelectSliderElm.value = 2;
        }

    }

    SwitchToNumerical() {
        this._numericalButtonElm.style.fontWeight = "bold";
        this._categoricalButtonElm.style.fontWeight = "normal";
    }

    SwitchToCategorical() {
        this._numericalButtonElm.style.fontWeight = "normal";
        this._categoricalButtonElm.style.fontWeight = "bold";
    }
}