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
    _distributionBetaElm;
    _distributionCauchyElm;
    _distributionChiSquaredElm;
    _distributionGammaElm;
    _distributionGammaInvElm;
    _distributionLogNormalElm;
    _distributionParetoElm;
    _distributionWeibullElm;
    _distributionParameter1SliderElm;
    _distributionParameter2SliderElm;
    _distributionParameter3SliderElm;
    _distributionParameter1ValueElm;
    _distributionParameter2ValueElm;
    _distributionParameter2ValueElm;
    _distributionParameter1HeaderElm;
    _distributionParameter2HeaderElm;
    _distributionParameter2HeaderElm;
    _distribution = 1;

    _selectableDistribution;

    constructor(generator, inputManager) {
        this._generator = generator;
        this._inputManager = inputManager;
        this.GetElements();
        this.SetEventListeners();

        this._selectableDistribution = [
            this._distributionUniformElm,
            this._distributionNormalElm,
            this._distributionBetaElm,
            this._distributionCauchyElm,
            this._distributionChiSquaredElm,
            this._distributionGammaElm,
            this._distributionGammaInvElm,
            this._distributionLogNormalElm,
            this._distributionParetoElm,
            this._distributionWeibullElm
        ];

        this.SetDistribution();
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
        this._distributionBetaElm = document.getElementById("settings-beta-label");
        this._distributionCauchyElm = document.getElementById("settings-cauchy-label");
        this._distributionChiSquaredElm = document.getElementById("settings-chi-squared-label");
        this._distributionGammaElm = document.getElementById("settings-gamma-label");
        this._distributionGammaInvElm = document.getElementById("settings-gamma-inv-label");
        this._distributionLogNormalElm = document.getElementById("settings-log-normal-label");
        this._distributionParetoElm = document.getElementById("settings-pareto-label");
        this._distributionWeibullElm = document.getElementById("settings-weibull-label");
        this._distributionParameter1SliderElm = document.getElementById("settings-distribution-parameter-1-slider");
        this._distributionParameter2SliderElm = document.getElementById("settings-distribution-parameter-2-slider");
        this._distributionParameter3SliderElm = document.getElementById("settings-distribution-parameter-3-slider");
        this._distributionParameter1ValueElm = document.getElementById("settings-distribution-parameter-1");
        this._distributionParameter2ValueElm = document.getElementById("settings-distribution-parameter-2");
        this._distributionParameter3ValueElm = document.getElementById("settings-distribution-parameter-3");
        this._distributionParameter1HeaderElm = document.getElementById("settings-distribution-parameter-1-header");
        this._distributionParameter2HeaderElm = document.getElementById("settings-distribution-parameter-2-header");
        this._distributionParameter3HeaderElm = document.getElementById("settings-distribution-parameter-3-header");
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
        this._distributionBetaElm.addEventListener("click", () => this.SetDistribution(3));
        this._distributionCauchyElm.addEventListener("click", () => this.SetDistribution(4));
        this._distributionChiSquaredElm.addEventListener("click", () => this.SetDistribution(5));
        this._distributionGammaElm.addEventListener("click", () => this.SetDistribution(6));
        this._distributionGammaInvElm.addEventListener("click", () => this.SetDistribution(7));
        this._distributionLogNormalElm.addEventListener("click", () => this.SetDistribution(8));
        this._distributionParetoElm.addEventListener("click", () => this.SetDistribution(9));
        this._distributionWeibullElm.addEventListener("click", () => this.SetDistribution(10));
        this._inputManager.AddEventListener("StartValueChanged", (inst) => { this._generator.RangeStart = this._inputManager.ValueStart });
        this._inputManager.AddEventListener("EndValueChanged", (inst) => { this._generator.RangeEnd = this._inputManager.ValueEnd });
        this._inputManager.AddEventListener("ValueCountChanged", (inst) => { this.SetNumberOfValuesFromInput() });
        this._distributionParameter1SliderElm.addEventListener("input", () => { this.DistributionParameter1() });
        this._distributionParameter2SliderElm.addEventListener("input", () => { this.DistributionParameter2() });
        this._distributionParameter3SliderElm.addEventListener("input", () => { this.DistributionParameter3() });
    }

    DistributionParameter1() {

        const value = parseFloat(this._distributionParameter1SliderElm.value);

        this._generator.FirstParameter = value;
        this._distributionParameter1ValueElm.value = value;
    }

    DistributionParameter2() {

        const value = parseFloat(this._distributionParameter2SliderElm.value);

        this._generator.SecondParameter = value;
        this._distributionParameter2ValueElm.value = value;
    }

    DistributionParameter3() {

        const value = parseFloat(this._distributionParameter3SliderElm.value);

        this._generator.ThirdParameter = value;

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
        this._generator.Distribution = distribution;

        if (distribution == 1) {
            this.HighlightSelected(this._distributionUniformElm);
            this.UpdateDistributionParameters([0, 0], [0, 0], 0, false, false, false);
        }
        else if (distribution == 2) {
            this.HighlightSelected(this._distributionNormalElm);
            this.UpdateDistributionParameters([-4, 4], [0, 4], 3, true, true, true);
        }
        else if (distribution == 3) {
           this.HighlightSelected(this._distributionBetaElm);
           this.UpdateDistributionParameters([0, 6], [0, 6], 0, true, true, false);
        }
        else if (distribution == 4) {
            this.HighlightSelected(this._distributionCauchyElm);
            this.UpdateDistributionParameters([-4.5, 4.5], [0, 6], 4, true, true, true);
        }
        else if (distribution == 5) {
            this.HighlightSelected(this._distributionChiSquaredElm);
            this.UpdateDistributionParameters([0, 9], [0, 6], 12, true, false, true);
        }
        else if (distribution == 6) {
            this.HighlightSelected(this._distributionGammaElm);
            this.UpdateDistributionParameters([0, 12], [0, 3], 22, true, true, true);
        }
        else if (distribution == 7) {
            this.HighlightSelected(this._distributionGammaInvElm);
            this.UpdateDistributionParameters([0.001, 5], [0.001, 3], 5, true, true, true);
        }
        else if (distribution == 8) {
            this.HighlightSelected(this._distributionLogNormalElm);
            this.UpdateDistributionParameters([-5, 2], [0, 3], 3, true, true, true);
        }
        else if (distribution == 9) {
            this.HighlightSelected(this._distributionParetoElm);
            this.UpdateDistributionParameters([0, 5], [0, 0], 6, true, false, true);
        }
        else if (distribution == 10) {
            this.HighlightSelected(this._distributionWeibullElm);
            this.UpdateDistributionParameters([0.001, 10], [0.001, 5], 5, true, true, true);
        }

        if (parseInt(this._distributionSliderElm.value) != this._distribution) {
            this._distributionSliderElm.value = distribution;
        }
    }

    HighlightSelected(selected) {
        for (let i = 0; i < this._selectableDistribution.length; i++) {
            if (this._selectableDistribution[i] == selected) {
                this._selectableDistribution[i].classList.add("setting-option-label-selected");
            }
            else {
                this._selectableDistribution[i].classList.remove("setting-option-label-selected");
            }
        }
    }

    UpdateDistributionParameters(minMax1, minMax2, max3, state1, state2, state3) {

        this._distributionParameter1SliderElm.min = minMax1[0];
        this._distributionParameter1SliderElm.max = minMax1[1];
        this._distributionParameter2SliderElm.min = minMax2[0];
        this._distributionParameter2SliderElm.max = minMax2[1];
        this._distributionParameter3SliderElm.max = max3;

        this._distributionParameter1SliderElm.value = this._generator.FirstParameter;
        this._distributionParameter2SliderElm.value = this._generator.SecondParameter;
        this._distributionParameter3SliderElm.value = this._generator.ThirdParameter;

        this._distributionParameter1SliderElm.disabled = state1 == false;
        this._distributionParameter1HeaderElm.style.visibility = state1 == false ? "hidden" : "visible";
        this._distributionParameter2SliderElm.disabled = state2 == false;
        this._distributionParameter2HeaderElm.style.visibility = state1 == false ? "hidden" : "visible";
        this._distributionParameter3SliderElm.disabled = state3 == false;
        this._distributionParameter3HeaderElm.style.visibility = state1 == false ? "hidden" : "visible";

    }

    SetNormalDistributionMean() {
        this._generator.NormalDistributionMean = parseFloat(this._normalDistributionMeanInputElm.value);
    }








}