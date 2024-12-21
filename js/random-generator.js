import { RandomHeader } from "./random-header.js";
import { Generator } from "./generator.js";
import { WebpageManager } from "./webpage-manager.js";
import { NumberSequence } from "./number-sequence.js";


export class RandomGenerator {

    _header;
    _numberSequence;
    _settingsElm;
    _settingsColumnElm;
    _creditsElm;
    _creditsPanelElm;

    constructor() {
        this.Setup();
        this.GetElements();
        this.SetEventListeners();
    }

    Setup() {
        //this._header = new RandomHeader();
        this._numberSequence = new NumberSequence();
    }

    GetElements() {
        this._settingsElm = document.getElementById("settings-label");
        this._settingsColumnElm = document.getElementById("settings-column-container");
        this._creditsElm = document.getElementById("credits-label");
        this._creditsPanelElm = document.getElementById("credits-panel-container");
    }

    SetEventListeners() {
        this._settingsElm.addEventListener("click", () => {
            console.log("Settings clicked");
            this.ToggleSettings();
        });
        this._creditsElm.addEventListener("click", () => {
            console.log("Credits clicked");
            this.ToggleCredits();
        })

    }
    
    ToggleSettings() {
        this._settingsColumnElm.classList.toggle("settings-column-hidden");
    }

    ToggleCredits() {
        this._creditsPanelElm.classList.toggle("settings-column-hidden");
        this._settingsColumnElm.classList.add("settings-column-hidden");
    }   
}