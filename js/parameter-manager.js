


export class ParameterManager {

    _SEQUENCE_LENGTH = 1000;
    _DECIMAL_STATE = 1;
    _DECIMAL_PLACES = 0;
    _FORMAT_STATE = 1;
    _FORMAT_ND = "2x2"
    _CONTINUOUS_RANGE_FROM = 1;
    _CONTINUOUS_RANGE_TO = 100;
    _DISCRETE_RANGE_FROM = 1;
    _DISCRETE_RANGE_TO = 100;

    _inputManager;

    _decimalState;
    _decimalPlaces;
    _formatState;
    _formatND;

    _sequenceLengthElm;
    _numericalStartValueElm;
    _numericalEndValueElm;
    _decimalStateSliderElm;
    _decimalLengthSliderElm;
    _formatStateSliderElm;
    _formatNDInputElm;

    _isSet = false;
    
    _url;

    _timeouts = {};
    _blocks = {};
    _discreteGroups = [];
    _discreteRanges = [];
    _continuousRanges = [];

    constructor(inputManager) {
        this._inputManager = inputManager;
        this._url = new URL(window.location);
        this.Setup();
    }

    Setup() {
        this.GetElements();
        this.SetEventListeners();
    }

    GetElements() {
        this._sequenceLengthElm = document.getElementById("count-value");
        this._numericalStartValueElm = document.getElementById("range-from-input");
        this._numericalEndValueElm = document.getElementById("range-to-input");
        this._decimalStateSliderElm = document.getElementById("decimals-slider");
        this._decimalLengthSliderElm = document.getElementById("length-digits-slider");
        this._formatStateSliderElm = document.getElementById("format-slider");
        this._formatNDInputElm = document.getElementById("settings-matrix-input");
    }

    SetEventListeners() {
        this._decimalStateSliderElm.addEventListener("input", () => this.DecimalChanged());
        this._decimalLengthSliderElm.addEventListener("input", () => this.DecimalChanged());
        this._formatStateSliderElm.addEventListener("input", () => this.FormatChanged());
        this._formatNDInputElm.addEventListener("input", () => this.FormatChanged());
        this._inputManager.AddEventListener("NewDiscreteGroup", (inst) => this.DiscreteGroupAdded(inst));
    }

    SetParameters() {

        let pageUrl = new URL(document.location);
        let params = new URLSearchParams(pageUrl.search);

        this.AddSequenceLength();
        this.AddDecimals(params);
        this.AddFormat(params);
        this.AddContinuousRange(params);
        this.AddDiscreteRange(params);
        this.AddDiscreteGroup(params);

        // this._numericalStartValue = params.has("n-start") ? params.get("n-start") : this._NUMERICAL_START_VALUE;
        // this._numericalStartValueElm.value = this._numericalStartValue;
        // this._numericalStartValueElm.dispatchEvent(new Event('input'));
        // this._numericalEndValueElm.value = params.has("n-end") ? params.get("n-end") : this._NUMERICAL_END_VALUE;
        // this._numericalEndValueElm.dispatchEvent(new Event('input'));

        this._isSet = true;

    }  

    AddSequenceLength() {
        this._sequenceLengthElm.value = this._SEQUENCE_LENGTH;
        this._sequenceLengthElm.dispatchEvent(new Event('input'));
    }

    AddDecimals(params) {
        if (params.has("dec")) {
            const values = params.get("dec").split(" ");
            const decimalState = parseInt(values[0]);
            const decimalPlaces = parseInt(values[1]);
            this._decimalState = isNaN(decimalState) || decimalState > 3 || decimalState < 1 ? this._DECIMAL_STATE : decimalState;
            this._decimalPlaces = isNaN(decimalPlaces) || decimalPlaces > 15 || decimalPlaces < 0 ? this._DECIMAL_PLACES : decimalPlaces;
            console.log(this._decimalState, this._decimalPlaces);
        }
        else {
            this._decimalState = this._DECIMAL_STATE;
            this._decimalPlaces = this._DECIMAL_PLACES;
        }
        this._decimalStateSliderElm.value = this._decimalState;
        this._decimalLengthSliderElm.value = this._decimalPlaces;
        this._decimalStateSliderElm.dispatchEvent(new Event('input'));
        this._decimalLengthSliderElm.dispatchEvent(new Event('input'));
    }

    AddFormat(params) {
        if (params.has("fmt")) {
            const values = params.get("fmt").split(" ");
            const formatState = parseInt(values[0]);
            if (values.length > 1) {
                this._formatND = values[1];
            }
            else {
                this._formatND = this._FORMAT_ND;
            }
            this._formatState = isNaN(formatState) || formatState > 3 || formatState < 1 ? this._FORMAT_STATE : formatState;
            this._formatNDInputElm.value = this._formatND;
            this._formatNDInputElm.dispatchEvent(new Event("input"));
        }
        else {
            this._formatState = this._FORMAT_STATE;
        }
        this._formatStateSliderElm.value = this._formatState;
        this._formatStateSliderElm.dispatchEvent(new Event("input"));
    }

    AddContinuousRange(params) {

        this.AddBlock(params, "cr", (values) => {
            const fromRange = parseFloat(values[0]);
            const toRange = parseFloat(values[1]);
            const probability = parseFloat(values[2]);
            if (isNaN(probability) == false && isNaN(fromRange) == false && isNaN(toRange) == false) {
                const block = this._inputManager.AddNewContinuousRange();
                block.Probability = probability;
                block.FromRange = fromRange;
                block.ToRange = toRange;
                this._continuousRanges.push(block);
            }
        });
        return;

        if (params.has("crc")) {
            const count = parseInt(params.get("crc"));
            if (isNaN(count) == false && count > 0) {
                for (let i = 1; i <= count; i++) {
                    const blockId = "cr" + i;
                    if (params.has(blockId)) {
                        const values = params.get(blockId).split(" ");
                        const fromRange = parseFloat(values[0]);
                        const toRange = parseFloat(values[1]);
                        const probability = parseFloat(values[2]);
                        if (isNaN(probability) == false && isNaN(fromRange) == false && isNaN(toRange) == false) {
                            const block = this._inputManager.AddNewContinuousRange();
                            block.Probability = probability;
                            block.FromRange = fromRange;
                            block.ToRange = toRange;
                        }
                    }
                }
            }
        }
    }

    AddDiscreteRange(params) {
        console.log("Add discrete range from params");
        this.AddBlock(params, "dr", (values) => {
            const fromRange = parseFloat(values[0]);
            const toRange = parseFloat(values[1]);
            const stepRange = parseFloat(values[2]);
            const probability = parseFloat(values[3]);
            console.log(fromRange, toRange, stepRange, probability);
            if (isNaN(probability) == false && isNaN(fromRange) == false && 
                isNaN(toRange) == false && isNaN(stepRange) == false) {
                const block = this._inputManager.AddNewDiscreteRange();
                block.FromRange = fromRange;
                block.StepRange = stepRange;
                block.ToRange = toRange;
                block.Probability = probability;
                this._discreteRanges.push(block);
            }
        });

        return;

        if (params.has("drc")) {
            const count = parseInt(params.get("drc"));
            if (isNaN(count) == false && count > 0) {
                for (let i = 1; i <= count; i++) {
                    const blockId = "dr" + i;
                    if (params.has(blockId)) {
                        const values = params.get(blockId).split(" ");
                        const fromRange = parseFloat(values[0]);
                        const toRange = parseFloat(values[1]);
                        const stepRange = parseFloat(values[2]);
                        const probability = parseFloat(values[3]);
                        if (isNaN(probability) == false && isNaN(fromRange) == false && isNaN(toRange) == false) {
                            const block = this._inputManager.AddNewDiscreteRange();
                            block.FromRange = fromRange;
                            block.StepRange = stepRange;
                            block.ToRange = toRange;
                            block.Probability = probability;
                        }
                    }
                }
            }
        }
    }

    AddDiscreteGroup(params) {

        this.AddBlock(params, "dg", (values) => {
            const probability = parseFloat(values[0]);
            if (isNaN(probability) == false) {
                const block = this._inputManager.AddNewGroup();
                block.Probability = probability;
                if (values.length > 1) {
                    const elements = values.slice(1, values.length);
                    block.Elements = elements;
                }
                this._discreteGroups.push(block);
                block.AddEventListener("ProbabilityChanged", (inst) => this.DiscreteGroupChanged(inst));
                block.AddEventListener("ElementsChanged", (inst) => this.DiscreteGroupChanged(inst));
                block.AddEventListener("BlockRemoved", (inst) => this.DiscreteGroupRemoved(inst));
            }
        });
        return;

        if (params.has("dgc")) {
            const count = parseInt(params.get("dgc"));
            if (isNaN(count) == false && count > 0) {
                for (let i = 1; i <= count; i++) {
                    const blockId = "dg" + i;
                    if (params.has(blockId)) {
                        const values = params.get(blockId).split(" ");
                        const probability = parseFloat(values[0]);
                        const elements = values.slice(1, values.length);
                        if (isNaN(probability) == false) {
                            const block = this._inputManager.AddNewGroup();
                            block.Probability = probability;
                            block.Elements = elements;
                        }
                    }
                }
            }
        }
    }

    AddBlock(params, key, func) {
        if (params.has(key + "c")) {
            const count = parseInt(params.get(key + "c"));
            if (isNaN(count) == false && count > 0) {
                for (let i = 1; i <= count; i++) {
                    if (params.has(key + i)) {
                        const values = params.get(key + i).split(" ");
                        func(values);
                    }
                }
            }
        }
    }

    DecimalChanged() {

        if (this._isSet == false) {
            return;
        }

        const state = parseInt(this._decimalStateSliderElm.value);
        const length = parseInt(this._decimalLengthSliderElm.value);
        if (state !== this._decimalState) {
            this._decimalState = state;  
        }
        if (length !== this._decimalPlaces) {
            this._decimalPlaces = length;
        }
        if (this._decimalState != this._DECIMAL_STATE || this._decimalPlaces != this._DECIMAL_PLACES) {
            if (this._timeouts.dec) {
                clearTimeout(this._timeouts.dec);
            }
            this._timeouts.dec = setTimeout(() => {
                this.SetParam('dec', `${this._decimalState} ${this._decimalPlaces}`);
                this.UpdateParams();
            }, 1000);    
        }
        else {
            if (this._timeouts.dec) {
                clearTimeout(this._timeouts.dec);
            }
            this.DeleteParam('dec');
            this.UpdateParams();
        }
    }

    FormatChanged() {
        if (this._isSet == false) {
            return;
        }
        const state = parseInt(this._formatStateSliderElm.value);
        const format = this._formatNDInputElm.value;
        if (state !== this._formatState) {
            this._formatState = state;
        }
        if (format !== this._formatND) {
            this._formatND = format;
        }
        if (this._formatState != this._FORMAT_STATE || this._formatND != this._FORMAT_ND) {
            if (this._timeouts.fmt) {
                clearTimeout(this._timeouts.fmt);
            }
            this._timeouts.fmt = setTimeout(() => {
                this.SetParam('fmt', `${this._formatState} ${this._formatND}`);
            }, 1000);
        }
        else {
            if (this._timeouts.fmt) {
                clearTimeout(this._timeouts.fmt);
            }
            this.DeleteParam('fmt');
        }
    }

    DiscreteRangeAdded(block) {
        this._discreteRanges.push(block);
        this.SetParam("drc", this._discreteRanges.length);
        block.AddEventListener("ProbabilityChanged", (inst) => this.DiscreteRangeChanged(inst));
        this.DiscreteRangeChanged(block);
    }

    DiscreteGroupAdded(block) {
        this._discreteGroups.push(block);
        this.SetParam("dgc", this._discreteGroups.length);
        block.AddEventListener("ProbabilityChanged", (inst) => this.DiscreteGroupChanged(inst));
        block.AddEventListener("ElementsChanged", (inst) => this.DiscreteGroupChanged(inst));
        this.DiscreteGroupChanged(block);
    }

    DiscreteGroupChanged(block) {
        if (this._isSet == false) {
            return;
        }
        const index = this._discreteGroups.indexOf(block);
        if (index == -1) {
            return;
        }
        const key = "dg" + (index + 1);
        const probability = block.Probability;
        const elements = block.Elements;
        const values = [probability, ...elements];
        const valueStr = values.join(" ");
        console.log(key, valueStr);
        if (this._timeouts[key]) {
            clearTimeout(this._timeouts[key]);
        }
        this._timeouts[key] = setTimeout(() => {
            this.SetParam(key, valueStr);
            this.UpdateParams();
        }, 1000);
    }

    DiscreteGroupRemoved(block) {
        const index = this._discreteGroups.indexOf(block);
        console.log("Remove discrete group: ", index);
        if (index < 0) {
            return;
        }
        this._discreteGroups.splice(index, 1);
        this.SetParam("dgc", this._discreteGroups.length);
        const key = "dg" + (index + 1);
        if (this._timeouts[key]) {
            clearTimeout(this._timeouts[key]);
        }
        this.DeleteParam(key);

        for (let i = index; i < this._discreteGroups.length; i++) {
            const key = "dg" + (i + 1);
            const nextKey = "dg" + (i + 2);
            const nextParam = this.GetParam(nextKey);
            this.DeleteParam(nextKey);
            this.SetParam(key, nextParam);
            console.log("Move: ", nextKey, key);
        }

        this.UpdateParams();
    }

    GetParam(param) {
        return this._url.searchParams.get(param);
    }

    SetParam(param, value) {
        this._url.searchParams.set(param, value);
    }

    DeleteParam(param) {
        this._url.searchParams.delete(param);
    }

    UpdateParams() {
        window.history.pushState({}, '', this._url);
    }

}