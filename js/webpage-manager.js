

export class WebpageManager {

    _formatter;
    _outputElm;

    constructor(formatter) {
        this._formatter = formatter;
        this.Setup();
    }

    Setup() {
        this._outputElm = document.getElementById("output");
        this._formatter.AddEventListener("formattedListChanged", (inst) => this.PresentValues() );
    }

    PresentValues(values) {
        this._outputElm.innerHTML = this._formatter.FormattedHtmlStr;
    }
}
