


export class FileManager {

    _formatter
    _downloadButtonElm;

    constructor(formatter) {
        this._formatter = formatter;
        this.Setup();
    }

    Setup() {
        this._downloadButtonElm = document.getElementById("download-icon");
        this._downloadButtonElm.addEventListener("click", () => {
            this.SaveToFile();
        });
    }

    SaveToFile() {

        let filename = "random-numbers-"
        filename += this._formatter.SequenceLength;
        const dimensions = this._formatter.Dimensions;
        if (dimensions.length > 0) {
            filename += "-";
            for (let i = 0; i < dimensions.length; i++) {
                filename += dimensions[i];
                if (i < dimensions.length - 1) {
                    filename += "x";
                }
            }
        }
        filename += ".txt";

        const blob = new Blob([this._formatter.FormattedTextStr], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }
}