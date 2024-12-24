import { CategoricalGenerator } from "./categorical-generator.js";
import { CategoricalInputManager } from "./categorical-input-manager.js";
import { CategoricalGeneratorSettings } from "./categorical-generator-settings.js";


export class CategoricalManager {

    _formatter;
    _generator;
    _inputManager;
    _generatorSettings;

    _active = false;

    set Active(value) {
        this._active = value;
        this._generatorSettings.Active = value;
    }

    constructor(formatter) {
        this._formatter = formatter;
        this.Setup();
    }

    Setup() {
        this._generator = new CategoricalGenerator(this._formatter);
        this._inputManager = new CategoricalInputManager(this._formatter);
        this._generatorSettings = new CategoricalGeneratorSettings(this._generator, this._inputManager);
    }
}