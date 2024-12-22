


export class CategoricalGeneratorSettings {

    _generator;
    _inputManager;

    _numberOfValueCountInputElm;
    _numberOfValues = 0;

    constructor(generator, inputManager) {
        this._generator = generator;
        this._inputManager = inputManager;
        this.Setup();
    }

    Setup() {
        this.GetElements();
        this.SetEventListeners();
    }

    GetElements() {
        this._numberOfValueCountInputElm = document.getElementById("sequence-count-value");
    }

    SetEventListeners() {
        this._inputManager.AddEventListener("ElementsAndProbabilityChanged", (inst) => {
            console.log("generator settings");
            this._generator.Elements = inst.Elements;
            this._generator.Probabilities = inst.Probabilities;
            this._generator.GenerateRawSequence();
        })
        this._numberOfValueCountInputElm.addEventListener("input", () => this.SetNumberOfValuesFromSettings());
    }

    SetNumberOfValuesFromSettings() {
        const numberOfValues = parseInt(this._numberOfValueCountInputElm.value);
        if (numberOfValues != this._numberOfValues) {
            this._numberOfValues = numberOfValues;
            this._inputManager.ElementsCount = numberOfValues;
            this._generator.SequenceLength = this._numberOfValues;
        }
    }
}