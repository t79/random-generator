


export class FormatterSettings {

    _formatter;
    _formatSliderElm;
    _formatSingleLabelElm;
    _formatListLabelElm;
    _formatMatrixLabelElm;
    _formatMatrixInputElm;
    _formatState = 1;
    _linebreakSliderElm;
    _linebreakLabelElm;
    _linebreakMatrixDims = [];

    constructor(formatter) {
        this._formatter = formatter;
        this.Setup();
    }

    Setup() {
        this.GetElements();
        this.SetEventListeners();
    }

    GetElements() {
        this._formatSliderElm = document.getElementById("format-slider");
        this._formatSingleLabelElm = document.getElementById("settings-single-values-label");
        this._formatListLabelElm = document.getElementById("settings-list-label");
        this._formatMatrixLabelElm = document.getElementById("settings-matrix-label");
        this._formatMatrixInputElm = document.getElementById("settings-matrix-input");
        this._linebreakSliderElm = document.getElementById("linebreak-slider");
        this._linebreakLabelElm = document.getElementById("settings-linebreak-label");
    }

    SetEventListeners() {
        this._formatSliderElm.addEventListener("input", () => this.SetFormat() );
        this._formatSingleLabelElm.addEventListener("click", () => this.SetFormat(1) );
        this._formatListLabelElm.addEventListener("click", () => this.SetFormat(2) );
        this._formatMatrixLabelElm.addEventListener("click", () => this.SetFormat(3) );
        this._formatMatrixInputElm.addEventListener("input", () => this.SetMatrixFormat());
        this._linebreakSliderElm.addEventListener("input", () => this.SetLinebreak());
        this._linebreakLabelElm.addEventListener("click", () => this.SetLinebreak(1));
    }

    SetFormat(format = 0) {

        if (format == 0) {
            format = parseInt(this._formatSliderElm.value);
        }

        if (format != this._formatState) {
            this._formatState = format;

            if (this._formatState == 1) {
                this._formatSingleLabelElm.classList.add("setting-option-label-selected");
                this._formatListLabelElm.classList.remove("setting-option-label-selected");
                this._formatMatrixLabelElm.classList.remove("setting-option-label-selected");
                console.log("Single values");
            }
            else if (this._formatState == 2) {
                this._formatSingleLabelElm.classList.remove("setting-option-label-selected");
                this._formatListLabelElm.classList.add("setting-option-label-selected");
                this._formatMatrixLabelElm.classList.remove("setting-option-label-selected");
                console.log("List");
            }
            else if (this._formatState == 3) {
                this._formatSingleLabelElm.classList.remove("setting-option-label-selected");
                this._formatListLabelElm.classList.remove("setting-option-label-selected");
                this._formatMatrixLabelElm.classList.add("setting-option-label-selected");
                console.log("Matrix");
            }
        }
    }

    SetMatrixFormat() {

        const format = this._formatMatrixInputElm.value;

        const dimensions = []
        let numberStr = "";

        for (let i = 0; i < format.length; i++) {
            if (/\d/.test(format[i]) == false) {
                if (numberStr.length > 0) {
                    dimensions.push(parseInt(numberStr));
                    numberStr = "";
                }
            }
            else {
                numberStr += format[i];
            }
        }
        if (numberStr.length > 0) {
            dimensions.push(parseInt(numberStr));
        }

        this._formatter.MatrixDimensions = dimensions;
        this._linebreakMatrixDims = dimensions;
        this.FormatLinebreakLabel();

        console.log(dimensions);
    }

    FormatLinebreakLabel() {
        const linebreakPos = parseInt(this._linebreakSliderElm.value);

        let labelStr = "";
        for (let i = 0; i < this._linebreakMatrixDims.length; i++) {
            if (i == linebreakPos) {
                labelStr += '<span class="linebreak-marking">';
            }
            labelStr += this._linebreakMatrixDims[i];
            if (i < this._linebreakMatrixDims.length - 1) {
                labelStr += " x ";
            }
            else {
                labelStr += "</span>";
            }
        }
        this._linebreakLabelElm.innerHTML = labelStr;
        this._linebreakSliderElm.max = this._linebreakMatrixDims.length;
    }

    SetLinebreak(linebreak = 0) {
        if (linebreak == 0) {
            linebreak = parseInt(this._linebreakSliderElm.value);
        }





        if (parseInt(this._linebreakSliderElm.value) != this._formatter.Linebreak) {
            this._linebreakSliderElm.value = linebreak;
        }
    }
}