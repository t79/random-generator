import { Block } from "./block.js";



export class CategoricalBlock extends Block {

    static blockId = 1;

    _textareaElm;
    _elements = [];

    set Elements(value) {
        this._elements = value;
        this._textareaElm.value = value.join(" ");
        this._textareaElm.dispatchEvent(new Event("input"));
    }

    get Elements() {
        return this._elements;
    }

    set ElementsStr(value) {
        this._elements = value.split(", ");
        this._textareaElm.value = value;
    }

    get TextareaElm() {
        return this._textareaElm;
    }

    constructor(generator) {
        super(generator);
        this.CreateBlockElements();
    }

    GenerateRawValue() {
        const index = Math.floor(this.GetRandomValue() * this._elements.length);
        return this._elements[index];
    }

    CreateBlockElements() {
        const blockElm = this.CreateBlockDiv();
        blockElm.style.gridTemplateRows = "auto 1fr auto";

        const header = this.CreateBlockHeader("Discrete Group " + CategoricalBlock.blockId++);
        header.style.gridRowStart = "1";
        header.style.gridRowEnd = "2";
        blockElm.appendChild(header);

        const textarea = this.CreateBlockTextarea();
        textarea.style.gridRowStart = "2";
        textarea.style.gridRowEnd = "3";
        blockElm.appendChild(textarea);

        const ProbabilityField = this.CreateProbabilityField();
        ProbabilityField.style.gridRowStart = "3";
        ProbabilityField.style.gridRowEnd = "4";
        blockElm.appendChild(ProbabilityField);

        textarea.addEventListener("input", (e) => {
            this.ElementsChanged();
            this.DispatchEvent("ElementsChanged");
        });

        this._blockElm = blockElm;
    }

    CreateBlockTextarea() {

        const textarea = document.createElement("textarea");
        textarea.classList.add("input-textarea-field");

        this._textareaElm = textarea;
        return textarea;
    }

    ElementsChanged() {
        const elementsStr = this._textareaElm.value;
        const elementsLines = elementsStr.split("\n");
        this._elements = [];
        for (let i = 0; i < elementsLines.length; i++) {
            const groups = elementsLines[i].split(",");
            for (let j = 0; j < groups.length; j++) {
                const elementsFromGroup = groups[j].trim().split(" ");
                for (let j = 0; j < elementsFromGroup.length; j++) {
                    const element = elementsFromGroup[j].trim();
                    if (element.length > 0) {
                        const number = parseFloat(element);
                        if (isNaN(number) == false) {
                            this._elements.push(number);
                        }
                        else {
                            this._elements.push(element);
                        }
                    }
                }
            }
        }
    }
}