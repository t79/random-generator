import { RangeBlock } from "./range-block.js";



export class ContinuousRangeBlock extends RangeBlock {

    static blockId = 1;

    constructor(generator) {
        super(generator);
        this.CreateBlockElements();
    }


    GenerateRawValue() {
        return (this._rangeTo - this._rangeFrom) * this.GetRandomValue() + this._rangeFrom;
    }

    CreateBlockElements() {
        const blockElm = this.CreateBlockDiv();
        blockElm.style.gridTemplateRows = "auto 1fr 1fr auto";

        const header = this.CreateBlockHeader("Continuous Range " + ContinuousRangeBlock.blockId++);
        header.style.gridRowStart = "1";
        header.style.gridRowEnd = "2";
        blockElm.appendChild(header);

        const from = this.CreateFromRangeField();
        from.classList.add("input-field");
        from.style.gridRowStart = "2";
        from.style.gridRowEnd = "3";
        blockElm.appendChild(from);

        const to = this.CreateToRangeField();
        to.classList.add("input-field");
        to.style.gridRowStart = "3";
        to.style.gridRowEnd = "4";
        blockElm.appendChild(to);

        const ProbabilityField = this.CreateProbabilityField();
        ProbabilityField.style.gridRowStart = "4";
        ProbabilityField.style.gridRowEnd = "5";
        blockElm.appendChild(ProbabilityField);

        blockElm.addEventListener("click", () => {
            console.log("got focus");
            blockElm.focus();
            blockElm.dispatchEvent(new Event("focus"));
        });

        blockElm.addEventListener("focusin", () => {
            console.log("got child focus");
        });
        blockElm.addEventListener("focus", () => {
            console.log("got focus it self");
        });

        this._blockElm = blockElm;
    }
}