


export class TypeSwitcher {

    _numericalManager;
    _categoricalManager;
    _typeSelectSliderElm;
    _numericalButtonElm;
    _categoricalButtonElm;
    _categoricalGroupsElm;
    _numericalRangeStartElm;
    _numericalRangeEndElm;


    constructor(numericalManager, categoricalManager) {
        this._numericalManager = numericalManager;
        this._categoricalManager = categoricalManager;
        this.Setup();
        this.ChangeSequenceType();
    }

    Setup() {
        this.GetElements();
        this.SetEventListeners();
    }

    GetElements() {
        this._typeSelectSliderElm = document.getElementById("select-slider");
        this._numericalButtonElm = document.getElementById("select-numerical");
        this._categoricalButtonElm = document.getElementById("select-categorical");
        this._categoricalGroupsElm = document.getElementById("categorical-inputs");
        this._numericalRangeStartElm = document.getElementById("start-value-box");
        this._numericalRangeEndElm = document.getElementById("end-value-box");
    }

    SetEventListeners() {
        this._typeSelectSliderElm.addEventListener("input", () => this.ChangeSequenceType("slider") );
        this._numericalButtonElm.addEventListener("click", () => this.ChangeSequenceType("numerical") );
        this._categoricalButtonElm.addEventListener("click", () => this.ChangeSequenceType("categorical") );
    }

    ChangeSequenceType(selected = "slider") {

        if (selected == "slider") {
            const value = this._typeSelectSliderElm.value;
            if (value == 1) {
                this.SwitchToNumerical();
            }
            else {
                this.SwitchToCategorical();
            }
        }
        else if (selected == "numerical") {
            this.SwitchToNumerical();
            this._typeSelectSliderElm.value = 1;
        }
        else if (selected == "categorical") {
            this.SwitchToCategorical();
            this._typeSelectSliderElm.value = 2;
        }

    }

    SwitchToNumerical() {
        this._numericalButtonElm.classList.add("select-button-selected");
        this._categoricalButtonElm.classList.remove("select-button-selected");
        this._numericalManager.Active = true;
        this._categoricalManager.Active = false;
        this.DisplayCategoricalGroups(false);
        this.DisplayNumericalRange(true);
    }

    SwitchToCategorical() {
        this._numericalButtonElm.classList.remove("select-button-selected");
        this._categoricalButtonElm.classList.add("select-button-selected");
        this._numericalManager.Active = false;
        this._categoricalManager.Active = true;
        this.DisplayCategoricalGroups(true);
        this.DisplayNumericalRange(false);
    }

    DisplayCategoricalGroups(state) {
        if (state) {
            this._categoricalGroupsElm.style.display = "flex";
        }
        else {
            this._categoricalGroupsElm.style.display = "none";
        }   
    }

    DisplayNumericalRange(state) {
        if (state) {
            this._numericalRangeStartElm.style.display = "flex";
            this._numericalRangeEndElm.style.display = "flex";
        }
        else {
            this._numericalRangeStartElm.style.display = "none";
            this._numericalRangeEndElm.style.display = "none";
        }
    }
}