


export class ParameterManager {

    _SEQUENCE_LENGTH = 1000;
    _NUMERICAL_START_VALUE = 0;
    _NUMERICAL_END_VALUE = 100;

    _sequenceLength;
    _numericalStartValue;
    _numericalEndValue;

    _sequenceLengthElm;
    _numericalStartValueElm;
    _numericalEndValueElm;

    constructor() {
        this.Setup();
    }

    Setup() {
        this.GetElements();
        this.SetEventListeners();
    }

    GetElements() {
        this._sequenceLengthElm = document.getElementById("count-value");
        this._numericalStartValueElm = document.getElementById("start-value");
        this._numericalEndValueElm = document.getElementById("end-value");
    }

    SetEventListeners() {
        this._sequenceLengthElm.addEventListener("input", () => this.SequenceLengthChanged());
        this._numericalStartValueElm.addEventListener("input", () => this.NumericalStartValueChanged() );
        this._numericalEndValueElm.addEventListener("input", () => this.NumericalEndValueChanged());
    }

    SetParameters() {

        let pageUrl = new URL(document.location);
        let params = new URLSearchParams(pageUrl.search);

        this._sequenceLength = params.has("seq-length") ? params.get("seq-length") : this._SEQUENCE_LENGTH;
        this._sequenceLengthElm.value = this._sequenceLength;
        this._sequenceLengthElm.dispatchEvent(new Event('input'));
        this._numericalStartValue = params.has("n-start") ? params.get("n-start") : this._NUMERICAL_START_VALUE;
        this._numericalStartValueElm.value = this._numericalStartValue;
        this._numericalStartValueElm.dispatchEvent(new Event('input'));
        this._numericalEndValueElm.value = params.has("n-end") ? params.get("n-end") : this._NUMERICAL_END_VALUE;
        this._numericalEndValueElm.dispatchEvent(new Event('input'));

    }

    SequenceLengthChanged() {
        const value = parseInt(this._sequenceLengthElm.value);
        if (value !== this._sequenceLength) {
            this._sequenceLength = value;
            const url = new URL(window.location);
            url.searchParams.set('seq-length', value);
            window.history.pushState({}, '', url);
        }
    }   

    NumericalStartValueChanged() {
        const value = parseFloat(this._numericalStartValueElm.value);
        if (value !== this._numericalStartValue) {
            this._numericalStartValue = value;
            const url = new URL(window.location);
            url.searchParams.set('n-start', value);
            window.history.pushState({}, '', url);
        }
    }

    NumericalEndValueChanged() {
        const value = parseFloat(this._numericalEndValueElm.value);
        if (value !== this._numericalEndValue) {
            this._numericalEndValue = value;
            const url = new URL(window.location);
            url.searchParams.set('n-end', value);
            window.history.pushState({}, '', url);
        }
    }
}