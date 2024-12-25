import { BaseClass } from "./base-class.js";



export class InputManager extends BaseClass {

    _generator;

    _regenerateButtonElm;
    _countValueInputElm;
    _countLabelElm;
    _countPerMatrixBox;
    _countPerMatrixElm;
    _rangeFromInputElm;
    _rangeToInputElm;
    _rangeProbabilityElm;
    _controlsElm;
    _addGroupButtonElm;
    _addRangeButtonElm;

    _matrixMode = false;
    _matrixSize = 1;
    _valueCount;
    _rangeFrom;
    _rangeTo;

    _groups = [];
    _elementsArray = [];
    _probabilitiesArray = [];

    set MatrixMode(value) {
        this.ChangeMatrixMode(value);
    }

    set MatrixSize(value) {
        this._matrixSize = value;
        this.SetMatrixSize();
    }

    get ValueStart() {
        return this._rangeFrom;
    }

    get ValueEnd() {
        return this._rangeTo;
    }

    get ValueCount() {
        return this._valueCount;
    }

    set ValueCount(value) {
        this._valueCount = this._matrixSize > 0 ? Math.ceil(value / this._matrixSize) : value;
    }

    constructor(generator) {
        super();
        this._generator = generator;
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
        this._rangeFromInputElm = document.getElementById("range-from-input");
        this._rangeToInputElm = document.getElementById("range-to-input");
        this._rangeProbabilityElm = document.getElementById("cont-numerical-weight-input");
        this._controlsElm = document.getElementById("main-controls");
        this._addGroupButtonElm = document.getElementById("add-categorical-group");
        this._addRangeButtonElm = document.getElementById("add-discrete-range");
    }

    SetEventListeners() {
        this._countValueInputElm.addEventListener("input", () => this.SetNumberOfValues());
        this._rangeFromInputElm.addEventListener("input", () => this.SetRangeFrom());
        this._rangeToInputElm.addEventListener("input", () => this.SetRangeTo());
        this._addGroupButtonElm.addEventListener("click", () => this.AddNewGroup());
        this._addRangeButtonElm.addEventListener("click", () => this.AddNewDiscreteRange());
    }

    SetNumberOfValues() {

        console.log("setting length");
        const value = parseInt(this._countValueInputElm.value);
        if (value != this._valueCount) {
            if (this._matrixMode) {
                this._valueCount = value * this._matrixSize;
            }
            else {
                this._valueCount = value;
            }
            this._generator.SequenceLength = this._valueCount;
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

    SetRangeFrom() {

        console.log("Setting from");
        const value = parseFloat(this._rangeFromInputElm.value);
        if (value !== this._rangeFrom) {
            this._rangeFrom = value;
            this._generator.RangeFrom = value;
        }
    }

    SetRangeTo() {

        console.log("Setting to");
        const value = parseFloat(this._rangeToInputElm.value);
        if (value !== this._rangeTo) {
            this._rangeTo = value;
            this._generator.RangeTo = value;
        } 
    }

    SetInputValues() {
        this._rangeFromInputElm.value = 1;
        this._rangeToInputElm.value = 1000;
    }

    AddNewGroup() {
        const groupObj = {};

        const groupElm = document.createElement("div");
        groupElm.classList.add("input-block");
        groupElm.style.gridTemplateRows = "1fr auto"

        const inputElements = document.createElement("textarea");
        inputElements.classList.add("input-textarea-field");
        inputElements.style.gridColumn = "1";
        inputElements.style.gridRowStart = "1";
        inputElements.style.gridRowEnd = "2";
        groupElm.appendChild(inputElements);

        const probabilityElm = document.createElement("div");
        probabilityElm.classList.add("weight-input-field");
        probabilityElm.style.gridColumn = "1";
        probabilityElm.style.gridRowStart = "2";
        probabilityElm.style.gridRowEnd = "3";
        groupElm.appendChild(probabilityElm);

        const probabilityLabel = document.createElement("label");
        probabilityLabel.innerHTML = "Probability<br>Weight";
        probabilityElm.appendChild(probabilityLabel);

        const inputProbability = document.createElement("input");
        inputProbability.type = "number";
        inputProbability.value = 1;
        inputProbability.min = 0;
        inputProbability.classList.add("categorical-probability");
        probabilityElm.appendChild(inputProbability);

        this._controlsElm.insertBefore(groupElm, this._addRangeButtonElm);

        groupObj.group = groupElm;
        groupObj.elementsElm = inputElements;
        groupObj.probabilityElm = inputProbability;

        inputElements.addEventListener("input", () => {
            this.GroupChanged(groupObj);
        });

        inputProbability.addEventListener("input", () => {
            this.ConstructProbabilityTable();
        });

        this._groups.push(groupObj);
    }

    GroupChanged(group) {
        const inputStr = group.elementsElm.value;
        const inputLines = inputStr.split("\n");
        const inputSentences = [];
        for (let i = 0; i < inputLines.length; i++) {
            const sentences = inputLines[i].split(",");
            for (let j = 0; j < sentences.length; j++) {
                const sentence = sentences[j].trim();
                if (sentence.length > 0) {
                    inputSentences.push(sentence);
                }
            }
        }
        const elements = [];
        for (let i = 0; i < inputSentences.length; i++) {
            const sentence = inputSentences[i];
            const sentences = sentence.split(" ");
            for (let j = 0; j < sentences.length; j++) {
                const word = sentences[j].trim();
                if (word.length > 0) {
                    elements.push(word);
                }
            }
        }

        group.elementsArray = elements;

        this.ConstructProbabilityTable();
    }


    AddNewDiscreteRange() {
        const groupObj = {};

        const groupElm = document.createElement("div");
        groupElm.classList.add("input-block");
        groupElm.style.gridTemplateRows = "auto 1fr 1fr 0.7fr auto"

        const header = document.createElement("div");
        header.classList.add("block-header");
        header.style.gridColumn = "1";
        header.style.gridRowStart = "1";
        header.style.gridRowEnd = "2";
        header.innerHTML = "Discrete Range";
        groupElm.appendChild(header);

        const probabilityElm = document.createElement("div");
        probabilityElm.classList.add("weight-input-field");
        probabilityElm.style.gridColumn = "1";
        probabilityElm.style.gridRowStart = "5";
        probabilityElm.style.gridRowEnd = "6";
        groupElm.appendChild(probabilityElm);

        const probabilityLabel = document.createElement("label");
        probabilityLabel.innerHTML = "Probability<br>Weight";
        probabilityElm.appendChild(probabilityLabel);

        const inputProbability = document.createElement("input");
        inputProbability.type = "number";
        inputProbability.value = 1;
        inputProbability.min = 0;
        inputProbability.classList.add("categorical-probability");
        probabilityElm.appendChild(inputProbability);

        this._controlsElm.insertBefore(groupElm, this._addRangeButtonElm);

        groupObj.group = groupElm;
        groupObj.elementsElm = header;
        groupObj.probabilityElm = inputProbability;

        inputProbability.addEventListener("input", () => {
            this.ConstructProbabilityTable();
        });

        this._groups.push(groupObj);
    }



    ConstructProbabilityTable() {
        const elementsArray = [];
        const probabilityArray = [];
        let probability = 0;

        const continuesRangeProbability = parseFloat(this._rangeProbabilityElm.value);
        elementsArray.push(null);
        probabilityArray.push(continuesRangeProbability);
        probability += continuesRangeProbability;

        for (let i = 0; i < this._groups.length; i++) {
            const group = this._groups[i];
            const groupElements = group.elementsArray;
            var groupProbability = parseFloat(group.probabilityElm.value);
            if (isNaN(groupProbability)) {
                groupProbability = 0;
            }
            groupProbability /= groupElements.length;
            for (let j = 0; j < groupElements.length; j++) {
                const element = groupElements[j];
                probability += groupProbability;
                elementsArray.push(element);
                probabilityArray.push(probability);
            }
        }

        this._elementsArray = elementsArray;
        if (probability == 0) {
            probability = 1;
        }
        this._probabilitiesArray = probabilityArray.map((value) => value / probability);

        this._generator.Elements = elementsArray;
        this._generator.Probabilities = this._probabilitiesArray;
    }
}
