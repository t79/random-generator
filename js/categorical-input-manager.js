import { BaseClass } from "./base-class.js";


export class CategoricalInputManager extends BaseClass {

    _formatter;
    
    _groupContainerElm;
    _addGroupButtonElm;
    _addRangeButtonElm;

    _groups = [];

    _groupsId = 0;

    _elementsArray;
    _probabilitiesArray;

    _elementsCount;
    _matrixSize = 1;

    set MatrixMode(value) {

    }

    set MatrixSize(value) {
        this._matrixSize = value;
    }

    get Elements() {
        return this._elementsArray;
    }

    get Probabilities() {
        return this._probabilitiesArray;
    }

    set ElementsCount(value) {
        this._elementsCount = this._matrixSize > 0 ? Math.ceil(value / this._matrixSize) : value;
    }

    constructor(formatter) {
        super();
        this._formatter = formatter;
        this.Setup();
    }

    Setup() {
        this.GetElements();
        this.SetEvents();
    }

    GetElements() {
        this._groupContainerElm = document.getElementById("categorical-inputs");
        this._addGroupButtonElm = document.getElementById("categorical-add-group");
        this._addRangeButtonElm = document.getElementById("categorical-add-range");
    }

    SetEvents() {
        this._addGroupButtonElm.addEventListener("click", () => this.AddNewGroup() );
        this._addRangeButtonElm.addEventListener("click", () => this.AddNewRange());
    }

    AddNewRange() {
        const groupObj = {
            id: this._groupsId++,
            group: null,
            fromElm: null,
            toElm: null,
            stepElm: null,
            countElm: null,
            elementsArray: [],
            probabilityElm: null,
        }
        this._groups.push(groupObj);

        const group = document.createElement("div");
        group.classList.add("categorical-group");

        const rangControls = document.createElement("div");
        rangControls.classList.add("categorical-range-controls");
        group.appendChild(rangControls);

        const fromInput = document.createElement("input");
        fromInput.type = "number";
        fromInput.classList.add("categorical-range-from");
        rangControls.appendChild(fromInput);

        const toInput = document.createElement("input");
        toInput.type = "number";
        toInput.classList.add("categorical-range-to");
        rangControls.appendChild(toInput);

        const countControls = document.createElement("div");
        countControls.classList.add("categorical-range-count");
        group.appendChild(countControls);

        const stepInput = document.createElement("input");
        stepInput.type = "number";
        stepInput.classList.add("categorical-range-step");
        countControls.appendChild(stepInput);

        const countInput = document.createElement("input");
        countInput.type = "number";
        countInput.classList.add("categorical-range-count");
        countControls.appendChild(countInput);

        const inputProbability = document.createElement("input");
        inputProbability.type = "text";
        inputProbability.classList.add("categorical-probability");
        group.appendChild(inputProbability);

        this.InsertGroup(group);

        groupObj.group = group;
        groupObj.fromElm = fromInput;
        groupObj.toElm = toInput;
        groupObj.stepElm = stepInput;
        groupObj.probabilityElm = inputProbability;

        fromInput.addEventListener("input", () => {
            this.RangeChanged(groupObj)
        });
        toInput.addEventListener("input", () => {this.RangeChanged(groupObj)});
        stepInput.addEventListener("input", () => {this.RangeChanged(groupObj)});
        countInput.addEventListener("input", () => {this.RangeChanged(groupObj)});

        inputProbability.addEventListener("input", () => {
            this.ConstructProbabilityTable();
        });
    }

    RangeChanged(group) {

        var from = parseFloat(group.fromElm.value);
        if (isNaN(from)) {
            from = 0;
        }
        var to = parseFloat(group.toElm.value);
        if (isNaN(to)) {
            to = 0;
        }
        var step = parseFloat(group.stepElm.value);
        if (isNaN(step) || step === 0) {
            step = 1;
        }

        const elements = [];
        for (let i = from; i <= to; i += step) {
            elements.push(i);
        }

        console.log(elements);
        group.elementsArray = elements;

        this.ConstructProbabilityTable();
    }

    AddNewGroup() {

        const groupObj = {
            id: this._groupsId++,
            group: null,
            elementsElm: null,
            elementsArray: [],
            probabilityElm: null,
        }
        this._groups.push(groupObj);

        const group = document.createElement("div");
        group.classList.add("categorical-group");

        const inputElements = document.createElement("textarea");
        inputElements.classList.add("categorical-elements");
        group.appendChild(inputElements);

        const inputProbability = document.createElement("input");
        inputProbability.type = "text";
        inputProbability.classList.add("categorical-probability");
        group.appendChild(inputProbability);

        this.InsertGroup(group);

        groupObj.group = group;
        groupObj.elementsElm = inputElements;
        groupObj.probabilityElm = inputProbability;

        inputElements.addEventListener("input", () => {
            this.GroupChanged(groupObj);
        });

        inputProbability.addEventListener("input", () => {
            this.ConstructProbabilityTable();
        });

    }

    InsertGroup(group) {
        this._groupContainerElm.insertBefore(group, this._addRangeButtonElm);
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

    ConstructProbabilityTable() {
        const elementsArray = [];
        const probabilityArray = [];
        let probability = 0;
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

        console.log("num groups: " + this._groups.length);

        this._elementsArray = elementsArray;
        if (probability == 0) {
            probability = 1;
        }
        this._probabilitiesArray = probabilityArray.map((value) => value / probability);

        this.DispatchEvent("ElementsAndProbabilityChanged");
    }

}