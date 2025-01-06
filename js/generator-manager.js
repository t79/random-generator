import { GeneratorSettingsManager } from "./generator-settings-manager.js";
import { Generator } from "./generator.js";
import { InputManager } from "./input-manager.js";


export class GeneratorManager {

    _formatter;
    _generator;
    _inputManager;
    _settingsManager;

    get InputManager() {
        return this._inputManager;
    }

    constructor(formatter) {
        this._formatter = formatter;
        this.Setup();
    }

    Setup() {
        this._generator = new Generator(this._formatter);
        this._inputManager = new InputManager(this._generator);
    }

}