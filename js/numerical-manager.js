import { GeneratorSettings } from "./generator-settings.js";
import { Generator } from "./generator.js";
import { HistogramManager } from "./histogram-manager.js";
import { InputManager } from "./input-manager.js";



export class NumericalManager {

    _formatter;
    _generator;
    _inputManager;
    _generatorSettings;
    _histogramManager;

    _active = false;

    set Active(value) {
        this._active = value;
        this._generator.Active = value;
    }

    constructor(formatter) {
        this._formatter = formatter;
        this.Setup();
    }

    Setup() {
        this._generator = new Generator();
        this._inputManager = new InputManager(this._formatter);
        this._generatorSettings = new GeneratorSettings(this._generator, this._inputManager);
        this._histogramManager = new HistogramManager(this._generator);
    }
}