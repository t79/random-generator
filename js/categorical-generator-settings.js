


export class CategoricalGeneratorSettings {

    _generator;
    _inputManager;

    constructor(generator, inputManager) {
        this._generator = generator;
        this._inputManager = inputManager;
        this.SetEventListeners();
    }

    SetEventListeners() {
        this._inputManager.AddEventListener("ElementsAndProbabilityChanged", (inst) => {
            console.log("generator settings");
            this._generator.Elements = inst.Elements;
            this._generator.Probabilities = inst.Probabilities;
            this._generator.GenerateRawSequence();
        })
    }
}