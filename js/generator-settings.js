


export class GeneratorSettings {

    _generator;
    _numberOfValueInputElm;
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
    _fromRangeInputElm;
    _toRangeInputElm;
    _distributionSliderElm;
    _distributionUniformElm;
    _distributionNormalElm;
    _distribution = 1;

    constructor(generator) {
        this._generator = generator;
        this.GetElements();
        this.SetEventListeners();
        this.SetInitValues();
    }

    GetElements() {
        this._numberOfValueInputElm = document.getElementById("count-value");
        this._numberOfValueCountInputElm = document.getElementById("sequence-count-value");
        this._decimalStateSliderElm = document.getElementById("decimals-slider");
        this._decimalStateMaxLabelElm = document.getElementById("settings-max-decimal-label");
        this._decimalStateFixLabelElm = document.getElementById("settings-fix-decimal-label");
        this._decimalStatePrecisionLabelElm = document.getElementById("settings-precision-label");
        this._decimalLengthSliderElm = document.getElementById("length-digits-slider");
        this._decimalLengthValueElm = document.getElementById("length-digits");
        this._fromRangeInputElm = document.getElementById("start-value");
        this._toRangeInputElm = document.getElementById("end-value");
        this._distributionSliderElm = document.getElementById("distribution-slider");
        this._distributionUniformElm = document.getElementById("settings-uniform-label");
        this._distributionNormalElm = document.getElementById("settings-normal-label");
    }

    SetEventListeners() {
        this._numberOfValueInputElm.addEventListener("input", () => this.SetNumberOfValuesFromInput());
        this._numberOfValueCountInputElm.addEventListener("input", () => this.SetNumberOfValuesFromSettings());
        this._decimalStateSliderElm.addEventListener("input", () => this.SetDecimalState());
        this._decimalStateMaxLabelElm.addEventListener("click", () => this.SetDecimalState(1));
        this._decimalStateFixLabelElm.addEventListener("click", () => this.SetDecimalState(2));
        this._decimalLengthSliderElm.addEventListener("input", () => this.SetDecimalLength());
        this._fromRangeInputElm.addEventListener("input", () => { this._generator.RangeStart = parseFloat(this._fromRangeInputElm.value); });
        this._toRangeInputElm.addEventListener("input", () => { this._generator.RangeEnd = parseFloat(this._toRangeInputElm.value); });
        this._distributionSliderElm.addEventListener("input", () => this.SetDistribution());
        this._distributionUniformElm.addEventListener("click", () => this.SetDistribution(1));
        this._distributionNormalElm.addEventListener("click", () => this.SetDistribution(2));
    }

    SetInitValues() {
        this._fromRangeInputElm.value = this._generator.RangeStart;
        this._toRangeInputElm.value = this._generator.RangeEnd;
    }

    SetNumberOfValuesFromSettings() {
        const numberOfValues = parseInt(this._numberOfValueCountInputElm.value);
        if (numberOfValues != this._numberOfValues) {
            this._numberOfValues = numberOfValues;
            this._numberOfValueInputElm.value = numberOfValues;
            this._generator.SequenceLength = this._numberOfValues;
        }
    }

    SetNumberOfValuesFromInput() {
        const numberOfValues = parseInt(this._numberOfValueInputElm.value);
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
        }
        else if (distribution == 2) {
            this._distributionUniformElm.classList.remove("setting-option-label-selected");
            this._distributionNormalElm.classList.add("setting-option-label-selected");
        }

        if (parseInt(this._distributionSliderElm.value) != this._distribution) {
            this._distributionSliderElm.value = distribution;
        }

        this._generator.Distribution = distribution;
    }






}