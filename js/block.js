import { BaseClass } from "./base-class.js";



export class Block extends BaseClass {

    _generator;

    _blockElm;
    _inputProbabilityElm;
    _headerElm;
    _blockHederTitle;

    _settingsDistributionElm;
    _settingsDistributionHeaderElm;
    _distParameter1Elm;
    _distParameter1LabelElm;
    _distParameter2Elm;
    _distParameter2LabelElm;
    _distParameter3Elm;
    _distParameter3LabelElm;
    _distSelectionSliderElm;
    _distribution = 1;

    _distUniform = {p1: 0, p2: 0, clip: 0};
    _distNormal = {mean: 0, sd: 1, clip: 3};
    _distBeta = {alpha: 2, beta: 2, clip: 1};
    _distCauchy = {local: 0, scale: 1, clip: 4};
    _distChiSquare = {dof: 4, p2: 0, clip: 8};
    _distGamma = {shape: 9, scale: 0.5, clip: 16};
    _distInvGamma = {alpha: 1, beta: 1, clip: 3};
    _distLogNormal = {mu: 0, sigma: 0.25, clip: 2.5};
    _distStudentt = {dof: 1, p2: 0, clip: 3};
    _distWeibull = {shape: 1.5, scale: 1, clip: 3.5};

    _hasFocus = false;
    _rangeFrom;
    _rangeTo;

    get RangeFrom() {
        return this._rangeFrom;
    }

    get RangeTo() {
        return this._rangeTo;
    }

    get Probability() {
        return parseFloat(this._inputProbabilityElm.value);
    }
    set Probability(value) {
        this._inputProbabilityElm.value = value;
        this._inputProbabilityElm.dispatchEvent(new Event("input"));
    }
    get ProbabilityElm() {
        return this._inputProbabilityElm;
    }

    get Distribution() {
        return this._distribution;
    }

    set Distribution(value) {
        this._distribution = value;
    }

    get BlockElm() {
        return this._blockElm;
    }

    get HeaderElm() {
        return this._headerElm;
    }

    get SettingsDistributionElm() {
        return this._settingsDistributionElm;
    }

    get FirstParameter() {
        if (this._distribution == 2) {
            return this._distNormal.mean;
        }
        else if (this._distribution == 3) {
            return this._distBeta.alpha;
        }
        else if (this._distribution == 4) {
            return this._distCauchy.local;
        }
        else if (this._distribution == 5) {
            return this._distChiSquare.dof;
        }
        else if (this._distribution == 6) {
            return this._distGamma.shape;
        }
        else if (this._distribution == 7) {
            return this._distInvGamma.alpha;
        }
        else if (this._distribution == 8) {
            return this._distLogNormal.mu;
        }
        else if (this._distribution == 9) {
            return this._distStudentt.dof;
        }
        else if (this._distribution == 10) {
            return this._distWeibull.shape;
        }
    }

    set FirstParameter(value) {
        if (this._distribution == 2) {
            this._distNormal.mean = value;
        }
        else if (this._distribution == 3) {
            this._distBeta.alpha = value;
        }
        else if (this._distribution == 4) {
            this._distCauchy.local = value;
        }
        else if (this._distribution == 5) {
            this._distChiSquare.dof = value;
        }
        else if (this._distribution == 6) {
            this._distGamma.shape = value;
        }
        else if (this._distribution == 7) {
            this._distInvGamma.alpha = value;
        }
        else if (this._distribution == 8) {
            this._distLogNormal.mu = value;
        }
        else if (this._distribution == 9) {
            this._distStudentt.dof = value;
        }
        else if (this._distribution == 10) {
            this._distWeibull.shape = value;
        }
    }

    get FirstParameterName() {
        if (this._distribution == 2) {
            return "Normal Mean";
        }
        else if (this._distribution == 3) {
            return "Beta Alpha";
        }
        else if (this._distribution == 4) {
            return "Cauchy Local";
        }
        else if (this._distribution == 5) {
            return "Chi Square DoF";
        }
        else if (this._distribution == 6) {
            return "Gamma Shape";
        }
        else if (this._distribution == 7) {
            return "Inv Gamma Alpha";
        }
        else if (this._distribution == 8) {
            return "Log Normal Mu";
        }
        else if (this._distribution == 9) {
            return "Student T DoF";
        }
        else if (this._distribution == 10) {
            return "Weibull Shape";
        }
        else {
            return ".";
        }
    }

    get SecondParameter() {
        if (this._distribution == 2) {
            return Math.sqrt(this._distNormal.sd);
        }
        else if (this._distribution == 3) {
            return this._distBeta.beta;
        }
        else if (this._distribution == 4) {
            return this._distCauchy.scale;
        }
        else if (this._distribution == 5) {
            return this._distChiSquare.p2;
        }
        else if (this._distribution == 6) {
            return this._distGamma.scale;
        }
        else if (this._distribution == 7) {
            return this._distInvGamma.beta;
        }
        else if (this._distribution == 8) {
            return this._distLogNormal.sigma;
        }
        else if (this._distribution == 9) {
            return this._distStudentt.p2;
        }
        else if (this._distribution == 10) {
            return this._distWeibull.scale;
        }
    }

    set SecondParameter(value) {
        if (this._distribution == 2) {
            this._distNormal.sd = Math.pow(value, 2);
        }
        else if (this._distribution == 3) {
            this._distBeta.beta = value;
        }
        else if (this._distribution == 4) {
            this._distCauchy.scale = value;
        }
        else if (this._distribution == 6) {
            this._distGamma.scale = value;
        }
        else if (this._distribution == 7) {
            this._distInvGamma.beta = value;
        }
        else if (this._distribution == 8) {
            this._distLogNormal.sigma = value;
        }
        else if (this._distribution == 9) {
            this._distStudentt.p2 = value;
        }
        else if (this._distribution == 10) {
            this._distWeibull.scale = value;
        }

    }

    get SecondParameterName() {
        if (this._distribution == 2) {
            return "Normal SD";
        }
        else if (this._distribution == 3) {
            return "Beta Beta";
        }
        else if (this._distribution == 4) {
            return "Cauchy Scale";
        }
        else if (this._distribution == 6) {
            return "Gamma Scale";
        }
        else if (this._distribution == 7) {
            return "Inv Gamma Beta";
        }
        else if (this._distribution == 8) {
            return "Log Normal Sigma";
        }
        else if (this._distribution == 10) {
            return "Weibull Scale";
        }
        else {
            return ".";
        }
    }

    get ThirdParameter() {
        if (this._distribution == 2) {
            return this._distNormal.clip;
        }
        else if (this._distribution == 3) {
            return this._distBeta.clip;
        }
        else if (this._distribution == 4) {
            return this._distCauchy.clip;
        }
        else if (this._distribution == 5) {
            return this._distChiSquare.clip;
        }
        else if (this._distribution == 6) {
            return this._distGamma.clip;
        }
        else if (this._distribution == 7) {
            return this._distInvGamma.clip;
        }
        else if (this._distribution == 8) {
            return this._distLogNormal.clip;
        }
        else if (this._distribution == 9) {
            return this._distStudentt.clip;
        }
        else if (this._distribution == 10) {
            return this._distWeibull.clip;
        }
    }

    set ThirdParameter(value) {
        if (this._distribution == 2) {
            this._distNormal.clip = value;
        }
        else if (this._distribution == 3) {
            this._distBeta.clip = value;
        }
        else if (this._distribution == 4) {
            this._distCauchy.clip = value;
        }
        else if (this._distribution == 5) {
            this._distChiSquare.clip = value;
        }
        else if (this._distribution == 6) {
            this._distGamma.clip = value;
        }
        else if (this._distribution == 7) {
            this._distInvGamma.clip = value;
        }
        else if (this._distribution == 8) {
            this._distLogNormal.clip = value;
        }
        else if (this._distribution == 9) {
            this._distStudentt.clip= value;
        }
        else if (this._distribution == 10) {
            this._distWeibull.clip = value;
        }
    }

    constructor(generator) {
        super();
        this._generator = generator;
        this.Setup();
    }

    Setup() {
        this.GetElements();
        this.GetEvents();
    }

    GetElements() {
        this._settingsDistributionElm = document.getElementById("settings-distribution");
        this._settingsDistributionHeaderElm = document.getElementById("settings-distribution-header");
        this._distParameter1Elm = document.getElementById("settings-distribution-parameter-1-slider");
        this._distParameter1LabelElm = document.getElementById("settings-distribution-parameter-1-header");
        this._distParameter2Elm = document.getElementById("settings-distribution-parameter-2-slider");
        this._distParameter2LabelElm = document.getElementById("settings-distribution-parameter-2-header");
        this._distParameter3Elm = document.getElementById("settings-distribution-parameter-3-slider");
        this._distParameter3LabelElm = document.getElementById("settings-distribution-parameter-3-header");
        this._distSelectionSliderElm = document.getElementById("distribution-slider");
    }

    GetEvents() {
        this._distParameter1Elm.addEventListener("input", () => this.DistParameter1Changed());
        this._distParameter2Elm.addEventListener("input", () => this.DistParameter2Changed());
        this._distParameter3Elm.addEventListener("input", () => this.DistParameter3Changed());
        this._distSelectionSliderElm.addEventListener("input", () => this.DistributionSliderChanged())
    }

    DistParameter1Changed() {
        if (this._hasFocus) {
            this.FirstParameter = parseFloat(this._distParameter1Elm.value);
            this.DispatchEvent("DistributionChanged");
        }
    }

    DistParameter2Changed() {
        if (this._hasFocus) {
            this.SecondParameter = parseFloat(this._distParameter2Elm.value);
            this.DispatchEvent("DistributionChanged");
        }
    }

    DistParameter3Changed() {
        if (this._hasFocus) {
            this.ThirdParameter = parseFloat(this._distParameter3Elm.value);
            this.DispatchEvent("DistributionChanged");
        }
    }

    DistributionSliderChanged() {   
        if (this._hasFocus) {
            this._distribution = parseInt(this._distSelectionSliderElm.value);
            this.DistributionChanged();
        }     
    }

    SetDistributionSlider() {
        this._distSelectionSliderElm.value = this._distribution;
        this._settingsDistributionHeaderElm.innerHTML = this._blockHederTitle;
        this.DistributionChanged();
    }

    DistributionChanged() {
        console.log("Distribution Changed");
        this._distParameter1Elm.value = this.FirstParameter;
        this._distParameter1LabelElm.innerHTML = this.FirstParameterName;
        this._distParameter2Elm.value = this.SecondParameter;
        this._distParameter2LabelElm.innerHTML = this.SecondParameterName;
        this._distParameter3Elm.value = this.ThirdParameter;
        this.DispatchEvent("DistributionChanged");
    }

    SetBlockElm(blockElm) {
        this._blockElm = blockElm;
        this._inputProbabilityElm = this._blockElm.querySelector(".probability-input");
        this._inputProbabilityElm.addEventListener("input", () => this.ProbabilityChanged());
    }

    GetRandomValue() {
        if (this._distribution == 1) {
            return jStat.uniform.sample(0, 1);
        }
        else if (this._distribution == 2) {
            let value = 0;
            do {
                value = jStat.normal.sample(this._distNormal.mean, this._distNormal.sd);
                value /= this._distNormal.clip * 2 
                value += 0.5;
            } while( value < 0 || value >= 1 )
            return value;
        }
        else if (this._distribution == 3) {
            return jStat.beta.sample( this._distBeta.alpha, this._distBeta.beta );
        }
        else if (this._distribution == 4) {
            let value = 0;
            do {
                value = jStat.cauchy.sample( this._distCauchy.local, this._distCauchy.scale );
                value /= this._distCauchy.clip * 2;
                value += 0.5;
            } while ( value < 0 || value >= 1 )
            return value;
        }
        else if (this._distribution == 5) {
            let value = 0;
            do {
                value = jStat.chisquare.sample(this._distChiSquare.dof);
                value /= this._distChiSquare.clip;
            } while ( value < 0 || value >= 1 )
            return value;
        }
        else if (this._distribution == 6) {
            let value = 0;
            do {
                value = jStat.gamma.sample(this._distGamma.shape, this._distGamma.scale );
                value /= this._distGamma.clip;
            } while ( value < 0 || value >= 1 )
            return value;
        }
        else if (this._distribution == 7) {
            let value = 0;
            do {
                value = jStat.invgamma.sample( this._distInvGamma.alpha, this._distInvGamma.beta );
                value /= this._distInvGamma.clip;
            } while ( value < 0 || value >= 1 )
            return value;
        }
        else if (this._distribution == 8) {
            let value = 0;
            do {
                value = jStat.lognormal.sample( this._distLogNormal.mu, this._distLogNormal.sigma);
                value /= this._distLogNormal.clip;
            } while ( value < 0 || value >= 1 )
            return value;
        }
        else if (this._distribution == 9) {
            let value = 0;
            do {
                value = jStat.studentt.sample( this._distStudentt.dof);
                value /= this._distStudentt.clip * 2;
                value += 0.5;
            } while ( value < 0 || value >= 1 )
            return value;
        }
        else if (this._distribution == 10) {
            let value = 0;
            do {
                value = jStat.weibull.sample( this._distWeibull.scale, this._distWeibull.shape);
                value /= this._distLogNormal.clip;
            } while ( value < 0 || value >= 1 )
            return value;
        }
    }


    CreateBlockDiv() {
        const blockElm = document.createElement("div");
        blockElm.classList.add("input-block");

        // blockElm.addEventListener("click", () => {
        //     blockElm.focus();
        //     blockElm.dispatchEvent(new Event("focus"));
        // });

        return blockElm;
    }

    LostFocus() {
        this._blockElm.style.border = "unset";
        this._hasFocus = false;
    }

    GotFocus() {
        this._blockElm.style.border = "1px solid var(--color14)";
        this.SetDistributionSlider();
        this._hasFocus = true;
    }

    CreateBlockHeader(title) {
        const headerElm = document.createElement("div");
        headerElm.classList.add("block-header");
        headerElm.innerHTML = title;
        headerElm.style.gridColumn = "1";

        headerElm.addEventListener("click", () => {
            console.log("header got focus");
            headerElm.focus();
            headerElm.dispatchEvent(new Event("focus"));
        });
        this._headerElm = headerElm;

        return headerElm;
    }

    CreateProbabilityField() {
        const probabilityElm = document.createElement("div");
        probabilityElm.classList.add("weight-input-field");
        probabilityElm.style.gridColumn = "1";

        const probabilityLabel = document.createElement("label");
        probabilityLabel.innerHTML = "Probability<br>Weight";
        probabilityElm.appendChild(probabilityLabel);

        const inputProbability = document.createElement("input");
        inputProbability.type = "number";
        inputProbability.value = 1;
        inputProbability.min = 0;
        inputProbability.classList.add("categorical-probability");
        probabilityElm.appendChild(inputProbability);

        const trashCan = document.createElement("img");
        trashCan.src = "assets/icons/trash-can-solid.svg";
        trashCan.classList.add("trash-can-icon");
        probabilityElm.appendChild(trashCan);

        inputProbability.addEventListener("input", () => {
            this.DispatchEvent("ProbabilityChanged");
        });
        trashCan.addEventListener("click", () => {
            this.DispatchEvent("BlockRemoved");
        });

        this._inputProbabilityElm = inputProbability;
        return probabilityElm;
    }

}