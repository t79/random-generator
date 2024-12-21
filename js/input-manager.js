import { BaseClass } from "./base-class.js";



export class InputManager extends BaseClass {

    _formatter;

    _regenerateButtonElm;
    _countValueInputElm;
    _countLabelElm;
    _countPerMatrixBox;
    _countPerMatrixElm;
    _startValueInputElm;
    _endValueInputElm;

    _matrixMode = false;
    _matrixSize = 1;
    _valueCount = 1000;
    _valueStart;
    _valueEnd;

    set MatrixMode(value) {
        this.ChangeMatrixMode(value);
    }

    set MatrixSize(value) {
        this._matrixSize = value;
        this.SetMatrixSize();
    }

    get ValueStart() {
        return this._valueStart;
    }

    get ValueEnd() {
        return this._valueEnd;
    }

    get ValueCount() {
        return this._valueCount;
    }

    set ValueCount(value) {
        this._valueCount = this._matrixSize > 0 ? Math.ceil(value / this._matrixSize) : value;
    }

    constructor(formatter) {
        super();
        this._formatter = formatter;
        this.Setup();
    }

    Setup() {
        this.GetElements();
        this.SetEventListeners();
        this.SetMatrixSize();
    }

    GetElements() {
        //this._regenerateButtonElm = document.getElementById("regenerate-icon");
        this._countValueInputElm = document.getElementById("count-value");
        this._countLabelElm = document.getElementById("count-value-label");
        this._countPerMatrixBox = document.getElementById("count-matrix-box");
        this._countPerMatrixElm = document.getElementById("count-per-matrix");
        this._startValueInputElm = document.getElementById("start-value");
        this._endValueInputElm = document.getElementById("end-value");
    }

    SetEventListeners() {
        this._countValueInputElm.addEventListener("input", () => this.SetNumberOfValues());
        this._startValueInputElm.addEventListener("input", () => this.SetStartValue());
        this._endValueInputElm.addEventListener("input", () => this.SetEndValue());
    }

    SetNumberOfValues() {
        const value = parseInt(this._countValueInputElm.value);
        if (value != this._valueCount) {
            if (this._matrixMode) {
                this._valueCount = value * this._matrixSize;
            }
            else {
                this._valueCount = value;
            }
            this.DispatchEvent("ValueCountChanged");
        }
        
    }

    ChangeMatrixMode(mode) {
        if (mode != this._matrixMode) {
            this._matrixMode = mode;
            this.ChangeMatrix();
        }
    }

    ChangeMatrix() {
        if (this._matrixMode) {
            this._countPerMatrixBox.style.display = "flex";
            this._countLabelElm.innerHTML = "Number of Matrices";
            this._countValueInputElm.value = this._matrixSize > 0 ? Math.ceil(this._valueCount / this._matrixSize) : this._valueCount;
        }
        else {
            this._countPerMatrixBox.style.display = "none";
            this._countLabelElm.innerHTML = "Number of Values";
            this._countValueInputElm.value = this._valueCount;
        }
    }

    SetMatrixSize() {
        this._countPerMatrixElm.value = this._matrixSize;
        if (this._matrixMode) {
            this._countValueInputElm.value = this._matrixSize > 0 ? Math.ceil(this._valueCount / this._matrixSize) : this._valueCount;
        }
    }

    SetStartValue() {
        const value = parseFloat(this._startValueInputElm.value);
        if (value !== this._valueStart) {
            this._valueStart = value;
            this.DispatchEvent("StartValueChanged");
        }
    }

    SetEndValue() {
        const value = parseFloat(this._endValueInputElm.value);
        if (value !== this._valueEnd) {
            this._valueEnd = value;
            this.DispatchEvent("EndValueChanged");
        } 
    }

    SetInputValues() {
        this._startValueInputElm.value = 1;
        this._endValueInputElm.value = 1000;
    }
}
