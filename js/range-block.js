import { Block } from "./block.js";



export class RangeBlock extends Block {


    static fromId = 1;
    static toId = 1;
    _inputFromElm;
    _inputToElm;

    set FromRange(value) {
        this._rangeFrom = value;
        this._inputFromElm.value = value;
        this._inputFromElm.dispatchEvent(new Event("input"));
    }

    set ToRange(value) {
        this._rangeTo = value;
        this._inputToElm.value = value;
        this._inputToElm.dispatchEvent(new Event("input"));
    }

    get RangeFromElm() {
        return this._inputFromElm;
    }

    get RangeToElm() {
        return this._inputToElm;
    }

    constructor(generator) {
        super(generator);
    }

    CreateFromRangeField() {
        const inputField = document.createElement("div");
        inputField.style.gridColumn = "1";

        const inputId = "from-rang-input-" + RangeBlock.fromId++;

        const inputLabel = document.createElement("label");
        inputLabel.innerHTML = "From, included";
        inputLabel.htmlFor = inputId;
        inputField.appendChild(inputLabel);

        const inputFrom = document.createElement("input");
        inputFrom.type = "number";
        inputFrom.value = 0;
        inputFrom.name = inputId;
        inputFrom.id = inputId;
        inputField.appendChild(inputFrom);
        
        inputFrom.addEventListener("input", () => {
            this._rangeFrom = parseFloat(inputFrom.value);
        });

        this._inputFromElm = inputFrom;
        return inputField;
    }

    CreateToRangeField() {
        const inputField = document.createElement("div");
        inputField.style.gridColumn = "1";

        const inputId = "to-rang-input-" + RangeBlock.toId++;

        const inputLabel = document.createElement("label");
        inputLabel.innerHTML = "To, excluded";
        inputLabel.htmlFor = inputId;
        inputField.appendChild(inputLabel);

        const inputTo = document.createElement("input");
        inputTo.type = "number";
        inputTo.value = 1;
        inputTo.name = inputId;
        inputTo.id = inputId;
        inputField.appendChild(inputTo);

        inputTo.addEventListener("input", () => {
            this._rangeTo = parseFloat(inputTo.value);
        });

        this._inputToElm = inputTo;
        return inputField;
    }
}