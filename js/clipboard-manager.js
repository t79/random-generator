


export class ClipboardManager {

    _formatter;
    _copyButtonElm;

    constructor(formatter) {
        this._formatter = formatter;
        this.Setup();
    }

    Setup() {
        this._copyButtonElm = document.getElementById("clipboard-icon");
        this._copyButtonElm.addEventListener("click", () => {
            console.log("clipboard button clicked");
            console.log(this._formatter.FormatStr);
            this.CopyToClipboard();
        });
    }

    CopyToClipboard() {
        navigator.clipboard.writeText(this._formatter.FormattedTextStr);
    }
}