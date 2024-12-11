import { RandomHeader } from "./random-header.js";
import { Generator } from "./generator.js";
import { WebpageManager } from "./webpage-manager.js";
import { NumberSequence } from "./number-sequence.js";


export class RandomGenerator {

    _header;
    _numberSequence;
    _settingsElm;
    _settingsColumnElm;

    constructor() {
        this.Setup();
        this.GetElements();
        this.SetEventListeners();
    }

    Setup() {
        this._header = new RandomHeader();
        this._numberSequence = new NumberSequence();
    }

    GetElements() {
        this._settingsElm = document.getElementById("settings-label");
        this._settingsColumnElm = document.getElementById("settings-column-container");
    }

    SetEventListeners() {
        this._settingsElm.addEventListener("click", () => {
            console.log("Settings clicked");
            this.ToggleSettings();
        });
    }
    
    ToggleSettings() {
        console.log("Settings toggled");
        this._settingsColumnElm.classList.toggle("settings-column-hidden");
    }
}