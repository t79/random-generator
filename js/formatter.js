import { BaseClass } from "./base-class.js";


export class Formatter extends BaseClass {

    _formatMode = 1;
    _outputElm;
    _settingsElm;
    _matrixDimensions = [2];
    _linebreak = 0;
    _sequenceValues = [];
    _sequenceIndex = 0;
    _formattedHtmlStr = "";
    _formattedTextStr = "";

    set MatrixDimensions(value) {
        this._matrixDimensions = value;
        this.Format();
    }

    set SequenceValues(value) {
        this._sequenceValues = value;
        this.Format();
    }  
    
    set FormatMode(value) {
        this._formatMode = value;
        this.Format();
    }

    set Linebreak(value) {
        this._linebreak = value;
        this.Format();
    }

    get FormattedHtmlStr() {
        return this._formattedHtmlStr;
    }

    get FormattedTextStr() {
        return this._formattedTextStr;
    }

    get SequenceLength() {
        return this._sequenceValues.length;
    }

    get Dimensions() {
        return this._matrixDimensions;
    }

    constructor() {
        super();
        this.Setup();
    }

    Setup() {
        this._outputElm = document.getElementById("output");
        this._settingsElm = document.getElementById("settings-column-container");

        const resizeWatcher = new ResizeObserver(entries => {
            this.SetOutputWidth();
        });
        resizeWatcher.observe(this._settingsElm)

    }

    SetOutputWidth() {
        const settingsWith = this._settingsElm.getBoundingClientRect().width;
        this._outputElm.style.width = "calc(100% - " + settingsWith + "px)";
    }

    Format() {
        if (this._formatMode === 1) {
            this.FormatNormal();
        }
        else if (this._formatMode === 2) {
            this.FormatList()
        }
        else if (this._formatMode === 3) {
            this.FormatMatrix();
        }
        this.SetOutputWidth();
    }

    FormatNormal() {
        this._formattedHtmlStr = this._sequenceValues.join(" ");
        this._formattedTextStr = this._formattedHtmlStr ;
        this._outputElm.style.whiteSpace = "normal";
        this.DispatchEvent("formattedListChanged");
    }

    FormatList() {
        this._formattedHtmlStr = "[" + this._sequenceValues.join(", ") + "]";
        this._formattedTextStr = this._formattedHtmlStr;
        this._outputElm.style.whiteSpace = "normal";
        this.DispatchEvent("formattedListChanged");
    }

    FormatMatrix() {

        let result = {
            html: "",
            text: ""
        }

        result.html += "[";
        result.text += "[";

        for (let index = 0; this._sequenceIndex < this._sequenceValues.length && 
            this._matrixDimensions.length > 0; index++) {

            if (index > 0) {
                result.html += ", ";
                result.text += ",";
                if (this._linebreak >= 1) {
                    result.html += "<br>";
                    result.text += "\n";
                }
            }

            
            const callResult = this.MakeMatrixList(this._matrixDimensions, 2, true);
            result.html += callResult.html;
            result.text += callResult.text;
        }
        result.html += "]";
        result.text += "]";

        this._sequenceIndex = 0;
        this._formattedHtmlStr = result.html;
        this._formattedTextStr = result.text;

        this._outputElm.style.whiteSpace = "wrap";
        this.DispatchEvent("formattedListChanged");
    }

    MakeMatrixList(dim, level, last) {

        let result = {
            html: "",
            text: ""
        }

        if (dim.length == 1) {
            result.html = "[";
            result.text = "[";
            for (let i = 0; i < dim[0]; i++) {
                if (this._sequenceIndex < this._sequenceValues.length) {
                    result.html += this._sequenceValues[this._sequenceIndex];
                    result.text += this._sequenceValues[this._sequenceIndex];
                    this._sequenceIndex++;

                    if (i < dim[0] - 1 && this._sequenceIndex < this._sequenceValues.length) {
                        result.html += ",";
                        result.text += ",";
                    }
                }
            }
            result.html += "]";
            result.text += "]";
            return result;
        }
        else {

            result.html += "<span>[</span>";
            result.text += "[";
            for (let i = 0; i < dim[0]; i++) {
                if (this._sequenceIndex < this._sequenceValues.length) {
                    const callResult= this.MakeMatrixList(dim.slice(1, dim.length), level + 1, false);
                    result.html += callResult.html;
                    result.text += callResult.text;
                    if (i < dim[0] - 1 && this._sequenceIndex < this._sequenceValues.length) {
                        result.html += "<span>,</span>";
                        result.text += ",";
                    }
                    if (level <= this._linebreak && i < dim[0] - 1) {
                        result.html += "<br>";
                        result.text += "\n";
                    }
                }
            }
            result.html += "<span>]</span>";
            result.text += "]";
            if (level <= this._linebreak  && last == false && false) {
                str += " ---- <br>"
            }
            return result;
        }
    }
}


