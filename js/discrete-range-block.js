import { RangeBlock } from "./range-block.js";



export class DiscreteRangeBlock extends RangeBlock {

    static blockId = 1;
    static stepId = 1;

    _inputStepElm;
    
    _inputStep;

    set StepRange(value) {
        this._inputStep = value;
        this._inputStepElm.value = value;
        this._inputStepElm.dispatchEvent(new Event("input"));
    }

    get RangeStepElm() {
        return this._inputStepElm;
    }

    constructor(generator) {
        super(generator);
        this._blockHederTitle = "Discrete Range " + DiscreteRangeBlock.blockId++
        this.Setup2();
    }

    Setup2() {
        this.CreateBlockElements();
    }

    GenerateRawValue() {

        const range = this._rangeTo - this._rangeFrom;
        const position = range * this.GetRandomValue();
        const numSteps = Math.floor(position / this._inputStep) * this._inputStep;
        const value = this._rangeFrom + numSteps;

        return value;
    }

    CreateBlockElements() {
        const blockElm = this.CreateBlockDiv();
        blockElm.style.gridTemplateRows = "auto 1fr 1fr 0.7fr auto";

        const header = this.CreateBlockHeader(this._blockHederTitle);
        header.style.gridRowStart = "1";
        header.style.gridRowEnd = "2";
        blockElm.appendChild(header);

        const from = this.CreateFromRangeField();
        from.classList.add("range-input-field");
        from.style.gridRowStart = "2";
        from.style.gridRowEnd = "3";
        blockElm.appendChild(from);

        const to = this.CreateToRangeField();
        to.classList.add("range-input-field");
        to.style.gridRowStart = "3";
        to.style.gridRowEnd = "4";
        blockElm.appendChild(to);

        const step = this.CreateBlockStep();
        step.style.gridRowStart = "4";
        step.style.gridRowEnd = "5";
        blockElm.appendChild(step);

        const probabilityField = this.CreateProbabilityField();
        probabilityField.style.gridRowStart = "5";
        probabilityField.style.gridRowEnd = "6";
        blockElm.appendChild(probabilityField );

        this._blockElm = blockElm;
    }

    CreateBlockStep() {
        const stepElm = document.createElement("div");
        stepElm.classList.add("step-input-field");

        const inputId = "step" + DiscreteRangeBlock.stepId++;

        const label = document.createElement("label");
        label.textContent = "Step";
        label.htmlFor = inputId;
        stepElm.appendChild(label);

        const inputStep = document.createElement("input");
        inputStep.type = "number";
        inputStep.value = 1;
        inputStep.min = 1;
        inputStep.id = inputId;
        inputStep.name = inputId;
        stepElm.appendChild(inputStep);

        inputStep.addEventListener("input", () => {
            this._inputStep = parseFloat(inputStep.value);
            this.DispatchEvent("BlockInputChanged");
        });

        this._inputStepElm = inputStep;
        return stepElm;
    }
}