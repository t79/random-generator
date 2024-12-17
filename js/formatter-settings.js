


export class FormatterSettings {

    _formatter;
    _inputManager;
    _formatSliderElm;
    _formatSingleLabelElm;
    _formatListLabelElm;
    _formatMatrixLabelElm;
    _formatMatrixInputElm;
    _formatState = 1;
    _linebreakSliderElm;
    _linebreakLabelElm;
    _linebreakMatrixDims = [2];

    constructor(formatter, inputManager) {
        this._formatter = formatter;
        this._inputManager = inputManager;
        this.Setup();
    }

    Setup() {
        this.GetElements();
        this.SetEventListeners();
        this.FormatLinebreakLabel();
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

        if (format === 0) {
            format = parseInt(this._formatSliderElm.value);
        }

        if (format != this._formatState) {
            this._formatState = format;

            if (this._formatState == 1) {
                this._formatSingleLabelElm.classList.add("setting-option-label-selected");
                this._formatListLabelElm.classList.remove("setting-option-label-selected");
                this._formatMatrixLabelElm.classList.remove("setting-option-label-selected");
                this._formatter.FormatMode = 1;
                this._inputManager.MatrixMode = false;
            }
            else if (this._formatState == 2) {
                this._formatSingleLabelElm.classList.remove("setting-option-label-selected");
                this._formatListLabelElm.classList.add("setting-option-label-selected");
                this._formatMatrixLabelElm.classList.remove("setting-option-label-selected");
                this._formatter.FormatMode = 2;
                this._inputManager.MatrixMode = false;
            }
            else if (this._formatState == 3) {
                this._formatSingleLabelElm.classList.remove("setting-option-label-selected");
                this._formatListLabelElm.classList.remove("setting-option-label-selected");
                this._formatMatrixLabelElm.classList.add("setting-option-label-selected");
                this._formatter.FormatMode = 3
                this._inputManager.MatrixMode = true;
            }
            this.FormatLinebreakLabel();
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
        this._inputManager.MatrixSize = dimensions.length > 0 ? dimensions.reduce((result, value) => {return result * value; },1) : 0;
        //this._linebreakSliderElm.value = 1;
        this.FormatLinebreakLabel();
        this.SetFormat(3);
        this._formatSliderElm.value = 3;
        console.log(dimensions);
    }

    FormatLinebreakLabel() {

        this._linebreakLabelElm.innerHTML = '<span class="linebreak-marking">Wrap</span>';
        return;

        if (this._formatState !== 3) {
            this._linebreakLabelElm.innerHTML = '<span class="linebreak-marking">Wrap</span>';
            return;
        }

        let labelStr = "";
        const linebreakPos = parseInt(this._linebreakSliderElm.value);

        if (linebreakPos === 0) {
            labelStr = '<span class="linebreak-marking">Wrap</span> ';
        }
        else {
            labelStr = "Wrap "
        }

        for (let i = 0; i < this._linebreakMatrixDims.length; i++) {
            if (i === 0 && linebreakPos != 0) {
                labelStr += '<span class="linebreak-marking">';
            }
            labelStr += this._linebreakMatrixDims[i];
            if (i < this._linebreakMatrixDims.length - 1) {
                labelStr += " x ";
            }
            if (i === linebreakPos + 1) {
                labelStr += "</span>";
            }
        }
        this._linebreakLabelElm.innerHTML = labelStr;
        this._linebreakSliderElm.max = this._linebreakMatrixDims.length + 1;
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