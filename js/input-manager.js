import { BaseClass } from "./base-class.js";
import { CategoricalBlock } from "./categorical-block.js";
import { DiscreteRangeBlock } from "./discrete-range-block.js";
import { ContinuousRangeBlock } from "./continuous-range-block.js";



export class InputManager extends BaseClass {

    _generator;

    _regenerateButtonElm;
    _sequenceLengthInputElm;
    _sequenceLengthElm;
    _countPerMatrixBox;
    _countPerMatrixElm;

    _addDiscreteBlockButtonElm;
    _addDiscreteRangeButtonElm;
    _addContinuRangeButtonElm;
    _decimalStateSliderElm;
    _decimalStateMaxLabelElm;
    _decimalState = 1;
    _decimalLengthSliderElm;
    _decimalLengthValueElm;
    _decimalLength = 0;
    _decimalStateMaxLabelElm;
    _decimalStateFixLabelElm;
    _decimalStatePrecisionLabelElm;


    _matrixMode = false;
    _matrixSize = 1;
    _sequenceLength;

    _blocks = [];
    _blockArray = [];
    _probabilitiesArray = [];

    set MatrixMode(value) {
        this.ChangeMatrixMode(value);
    }

    set MatrixSize(value) {
        this._matrixSize = value;
        this.SetMatrixSize();
    }

    get SequenceLength() {
        return this._sequenceLength;
    }

    set SequenceLength(value) {
        this._sequenceLength = value;
        this._generator.SequenceLength = this._sequenceLength;
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
        this._regenerateButtonElm = document.getElementById("regenerate-icon");
        this._sequenceLengthInputElm = document.getElementById("count-value");
        this._sequenceLengthElm = document.getElementById("count-value-label");
        this._countPerMatrixBox = document.getElementById("count-matrix-box");
        this._countPerMatrixElm = document.getElementById("count-per-matrix");
        this._controlsElm = document.getElementById("main-controls");
        this._addDiscreteBlockButtonElm = document.getElementById("add-discrete-group");
        this._addDiscreteRangeButtonElm = document.getElementById("add-discrete-range");
        this._addContinuRangeButtonElm = document.getElementById("add-continuous-range");
        this._decimalStateSliderElm = document.getElementById("decimals-slider");
        this._decimalStateMaxLabelElm = document.getElementById("settings-max-decimal-label");
        this._decimalLengthSliderElm = document.getElementById("length-digits-slider");
        this._decimalLengthValueElm = document.getElementById("length-digits");
        this._decimalStateMaxLabelElm = document.getElementById("settings-max-decimal-label");
        this._decimalStateFixLabelElm = document.getElementById("settings-fix-decimal-label");
        this._decimalStatePrecisionLabelElm = document.getElementById("settings-precision-label");
    }

    SetEventListeners() {
        this._regenerateButtonElm.addEventListener("click", () => this.ReGenerateSequence());
        this._sequenceLengthInputElm.addEventListener("input", () => this.SetSequenceLength());
        this._addDiscreteBlockButtonElm.addEventListener("click", () => this.MakeDiscreteGroup());
        this._addDiscreteRangeButtonElm.addEventListener("click", () => this.AddNewDiscreteRange());
        this._addContinuRangeButtonElm.addEventListener("click", () => this.AddNewContinuousRange());
        this._decimalStateSliderElm.addEventListener("input", () => this.SetDecimalState());
        this._decimalLengthSliderElm.addEventListener("input", () => this.SetDecimalLength());
    }

    ReGenerateSequence() {
        this._generator.GenerateSequence();
    }

    SetSequenceLength() {
        const value = parseInt(this._sequenceLengthInputElm.value);

        if (this._matrixMode) {
            if (value * this.MatrixSize != this._sequenceLength) {
                this.SequenceLength = value * this._matrixSize;
            }
        }
        else {
            if (value != this._sequenceLength) {
                this.SequenceLength = value;
            }
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
            this._sequenceLengthElm.innerHTML = "Number of Matrices";
            this._sequenceLengthInputElm.value = this._matrixSize > 0 ? Math.ceil(this._sequenceLength / this._matrixSize) : this._sequenceLength;
        }
        else {
            this._countPerMatrixBox.style.display = "none";
            this._sequenceLengthElm.innerHTML = "Number of Values";
            this._sequenceLengthInputElm.value = this._sequenceLength;
        }
    }

    SetMatrixSize() {
        this._countPerMatrixElm.value = this._matrixSize;
        if (this._matrixMode) {
            this._sequenceLengthInputElm.value = this._matrixSize > 0 ? Math.ceil(this._sequenceLength / this._matrixSize) : this._sequenceLength;
        }
    }

    MakeDiscreteGroup() {
        const block = this.AddNewGroup();
        this.DispatchEvent("NewDiscreteGroup", block);
    }

    AddNewGroup() {

        console.log("Adding new group");

        const block = new CategoricalBlock(this._generator);
        block.AddEventListener("ElementsChanged", () => this.GroupChanged(block));
        this.AddBlock(block);
        return block;

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

        this._controlsElm.insertBefore(groupElm, this._addDiscreteRangeButtonElm);

        groupObj.group = groupElm;
        groupObj.elementsElm = inputElements;
        groupObj.probabilityElm = inputProbability;

        inputElements.addEventListener("input", () => {
            this.GroupChanged(groupObj);
        });

        inputProbability.addEventListener("input", () => {
            this.ConstructProbabilityTable();
        });

        this._blocks.push(groupObj); 
    }

    GroupChanged(group) {
        const inputStr = group.TextareaElm.value;
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

        console.log("Elements", elements);
        group.elementsArray = elements;

        this.ConstructProbabilityTable();
    }


    AddNewDiscreteRange() {

        console.log("Adding new discrete range");

        const block = new DiscreteRangeBlock(this._generator);
        this.AddBlock(block);
        return block;

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

        this._controlsElm.insertBefore(groupElm, this._addDiscreteRangeButtonElm);

        groupObj.group = groupElm;
        groupObj.elementsElm = header;
        groupObj.probabilityElm = inputProbability;

        inputProbability.addEventListener("input", () => {
            this.ConstructProbabilityTable();
        });

        this._blocks.push(groupObj);
    }

    AddNewContinuousRange() {
        const block = new ContinuousRangeBlock(this._generator);
        this.AddBlock(block);
        return block;
    }

    AddBlock(block) {
        block.AddEventListener("ProbabilityChanged", () => this.ConstructProbabilityTable());
        block.AddEventListener("BlockRemoved", () => this.RemoveBlock(block));
        block.AddEventListener("DistributionChanged", () => this._generator.AutoGenerateSequence());
        block.BlockElm.addEventListener("focusin", () => {
            this.SetBlockFocus(block);
        });
        block.HeaderElm.addEventListener("focus", () => {
            this.SetBlockFocus(block);
        });
        this._blocks.push(block);
        this._controlsElm.insertBefore(block.BlockElm, this._addContinuRangeButtonElm);
    }

    SetBlockFocus(block) {
        block.GotFocus();
        for (let i = 0; i < this._blocks.length; i++) {
            if (this._blocks[i] != block) {
                this._blocks[i].LostFocus();
                console.log("Lost Focus", i);
            }
        }
    }

    ConstructProbabilityTable() {
        const blockArray = [];
        const probabilityArray = [];
        let probability = 0;

        for (let i = 0; i < this._blocks.length; i++) {
            const group = this._blocks[i];
            var groupProbability = group.Probability;
            if (isNaN(groupProbability) || groupProbability == 0) {
                continue;
            }

            blockArray.push(group);
            probability += groupProbability;
            probabilityArray.push(probability);
        }

        this._blockArray = blockArray;
        if (probability == 0) {
            probability = 1;
        }
        this._probabilitiesArray = probabilityArray.map((value) => value / probability);

        this._generator.Elements = blockArray;
        this._generator.Probabilities = this._probabilitiesArray;
        this._generator.AutoGenerateSequence();

        console.log("probabilities: " + this._probabilitiesArray);

    }

    RemoveBlock(block) {
        console.log("Remove Block");
        this._controlsElm.removeChild(block.BlockElm);
        this._blocks.splice(this._blocks.indexOf(block), 1);
        this.ConstructProbabilityTable();
    }

    BlockInputChanged() {

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
}
