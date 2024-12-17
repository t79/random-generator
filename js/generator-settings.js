import { InputManager } from "./input-manager.js";



export class GeneratorSettings {

    _generator;
    _inputManager;
    _numberOfValueCountInputElm;
    _numberOfValues = 0;
    _decimalStateSliderElm;
    _decimalStateMaxLabelElm;
    _decimalStateFixLabelElm;
    _decimalStatePrecisionLabelElm;
    _decimalState = 1;
    _decimalLengthSliderElm;
    _decimalLengthValueElm;
    _decimalLength = 0;
    _distributionSliderElm;
    _distributionUniformElm;
    _distributionNormalElm;
    _distributionNormal2Elm;
    _distributionMoreButtonElm;
    _distributionMorePulldownElm;
    _distributionBetaAlphaSliderElm;
    _distributionBetaBetaSliderElm;
    _distribution = 1;

    constructor(generator, inputManager) {
        this._generator = generator;
        this._inputManager = inputManager;
        this.GetElements();
        this.SetEventListeners();
    }

    GetElements() {
        this._numberOfValueCountInputElm = document.getElementById("sequence-count-value");
        this._decimalStateSliderElm = document.getElementById("decimals-slider");
        this._decimalStateMaxLabelElm = document.getElementById("settings-max-decimal-label");
        this._decimalStateFixLabelElm = document.getElementById("settings-fix-decimal-label");
        this._decimalStatePrecisionLabelElm = document.getElementById("settings-precision-label");
        this._decimalLengthSliderElm = document.getElementById("length-digits-slider");
        this._decimalLengthValueElm = document.getElementById("length-digits");
        this._distributionSliderElm = document.getElementById("distribution-slider");
        this._distributionUniformElm = document.getElementById("settings-uniform-label");
        this._distributionNormalElm = document.getElementById("settings-normal-label");
        this._distributionNormal2Elm = document.getElementById("settings-normal2-label");
        this._distributionMoreButtonElm = document.getElementById("settings-more-label");
        this._distributionMorePulldownElm = document.getElementById("settings-more-pulldown");
        this._distributionBetaAlphaSliderElm = document.getElementById("settings-beta-alpha-slider");
        this._distributionBetaBetaSliderElm = document.getElementById("settings-beta-beta-slider");

    }

    SetEventListeners() {
        this._numberOfValueCountInputElm.addEventListener("input", () => this.SetNumberOfValuesFromSettings());
        this._decimalStateSliderElm.addEventListener("input", () => this.SetDecimalState());
        this._decimalStateMaxLabelElm.addEventListener("click", () => this.SetDecimalState(1));
        this._decimalStateFixLabelElm.addEventListener("click", () => this.SetDecimalState(2));
        this._decimalLengthSliderElm.addEventListener("input", () => this.SetDecimalLength());
        this._distributionSliderElm.addEventListener("input", () => this.SetDistribution());
        this._distributionUniformElm.addEventListener("click", () => this.SetDistribution(1));
        this._distributionNormalElm.addEventListener("click", () => this.SetDistribution(2));
        this._distributionMoreButtonElm.addEventListener("click", () => this.ToggleDistributionMoreOptions());
        this._inputManager.AddEventListener("StartValueChanged", (inst) => { this._generator.RangeStart = this._inputManager.ValueStart });
        this._inputManager.AddEventListener("EndValueChanged", (inst) => { this._generator.RangeEnd = this._inputManager.ValueEnd });
        this._inputManager.AddEventListener("ValueCountChanged", (inst) => { this.SetNumberOfValuesFromInput() });
        this._distributionBetaAlphaSliderElm.addEventListener("input", () => { this._generator.BetaDistributionAlpha = parseFloat(this._distributionBetaAlphaSliderElm.value); });
        this._distributionBetaBetaSliderElm.addEventListener("input", () => { this._generator.BetaDistributionBeta = parseFloat(this._distributionBetaBetaSliderElm.value); });
    }

    ToggleDistributionMoreOptions() {
        if (this._distributionMorePulldownElm.style.display === "none") {
            this._distributionMorePulldownElm.style.display = "flex";
            this._distributionMoreButtonElm.innerHTML = "Less";
            this._distributionSliderElm.max = 4;
        }
        else {
            this._distributionMorePulldownElm.style.display = "none";
            this._distributionMoreButtonElm.innerHTML = "More";
            this._distributionSliderElm.max = 2;
        }
    }

    SetNumberOfValuesFromSettings() {
        const numberOfValues = parseInt(this._numberOfValueCountInputElm.value);
        if (numberOfValues != this._numberOfValues) {
            this._numberOfValues = numberOfValues;
            this._inputManager.ValueCount = numberOfValues;
            this._generator.SequenceLength = this._numberOfValues;
        }
    }

    SetNumberOfValuesFromInput() {
        const numberOfValues = this._inputManager.ValueCount;
        if (numberOfValues != this._numberOfValues) {
            this._numberOfValues = numberOfValues;
            this._numberOfValueCountInputElm.value = numberOfValues;
            this._generator.SequenceLength = this._numberOfValues;
        }
    }

    SetDecimalState(state = 0) {

        if (state == 0) {
            state = parseInt(this._decimalStateSliderElm.value);
        }

        if (state != this._decimalState) {

            this._decimalState = state;

            if (this._decimalState == 1) {
                this._decimalStateMaxLabelElm.classList.add("setting-option-label-selected");
                this._decimalStateFixLabelElm.classList.remove("setting-option-label-selected");
                this._decimalStatePrecisionLabelElm.classList.remove("setting-option-label-selected");
            }
            else if (this._decimalState == 2) {
                this._decimalStateMaxLabelElm.classList.remove("setting-option-label-selected");
                this._decimalStateFixLabelElm.classList.add("setting-option-label-selected");
                this._decimalStatePrecisionLabelElm.classList.remove("setting-option-label-selected");
            }
            else if (this._decimalState == 3) {
                this._decimalStateMaxLabelElm.classList.remove("setting-option-label-selected");
                this._decimalStateFixLabelElm.classList.remove("setting-option-label-selected");
                this._decimalStatePrecisionLabelElm.classList.add("setting-option-label-selected");
            }
            
            if (parseInt(this._decimalStateSliderElm.value) != this._decimalState) {
                this._decimalStateSliderElm.value = state;
            }
            this._generator.ValueDecimalState = state;
        }

        
    }

    SetDecimalLength() {
        const length = parseInt(this._decimalLengthSliderElm.value);
        if (length != this._decimalLength) {
            this._decimalLength = length;
            this._decimalLengthValueElm.value = length;
            this._generator.ValueDecimalLength = this._decimalLength;
            console.log("Decimal length: " + length);
        }
    }

    SetDistribution(distribution = 0) {

        if (distribution == 0) {
            distribution = parseInt(this._distributionSliderElm.value);
        }
        this._distribution = distribution;

        if (distribution == 1) {
            this._distributionUniformElm.classList.add("setting-option-label-selected");
            this._distributionNormalElm.classList.remove("setting-option-label-selected");
            this._distributionNormal2Elm.classList.remove("setting-option-label-selected");
        }
        else if (distribution == 2) {
            this._distributionUniformElm.classList.remove("setting-option-label-selected");
            this._distributionNormalElm.classList.add("setting-option-label-selected");
            this._distributionNormal2Elm.classList.remove("setting-option-label-selected");
        }
        else if (distribution == 3) {
            this._distributionUniformElm.classList.remove("setting-option-label-selected");
            this._distributionNormalElm.classList.remove("setting-option-label-selected");
            this._distributionNormal2Elm.classList.add("setting-option-label-selected");
        }
        else if (distribution == 4) {
            this._distributionUniformElm.classList.remove("setting-option-label-selected");
            this._distributionNormalElm.classList.remove("setting-option-label-selected");
            this._distributionNormal2Elm.classList.remove("setting-option-label-selected");
            console.log("More options: Beta");
        }

        if (parseInt(this._distributionSliderElm.value) != this._distribution) {
            this._distributionSliderElm.value = distribution;
        }

        this._generator.Distribution = distribution;
    }

    SetNormalDistributionMean() {
        this._generator.NormalDistributionMean = parseFloat(this._normalDistributionMeanInputElm.value);
    }








}