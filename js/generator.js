import { BaseClass } from "./base-class.js";


export class Generator extends BaseClass {

    _formatter = null;

    _rangeFrom;
    _rangeTo;
    _sequenceLength;
    _valueDecimalState = 1;
    _valueDecimalLength = 0;
    _distribution = 1;
    _rawSequence = [];
    _sequence = [];
    _elementsArray = [null];
    _probabilityArray = [1];

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

    get RangeFrom() {
        return this._rangeFrom;
    }
    set RangeFrom(value) {
        this._rangeFrom = value;
        this.GenerateRawSequence();
    }   

    get RangeTo() {
        return this._rangeTo;
    }
    set RangeTo(value) {
        this._rangeTo = value;
        this.GenerateRawSequence();
    }

    set SequenceLength(value) {
        this._sequenceLength = value;
        this.GenerateRawSequence();
    }

    get ValueDecimalState() {
        return this._valueDecimalState;
    }
    set ValueDecimalState(value) {
        this._valueDecimalState = value;
        this.GenerateValues();
    }

    get ValueDecimalLength() {
        return this._valueDecimalLength;
    }
    set ValueDecimalLength(value) {
        this._valueDecimalLength = value;
        this.GenerateValues();
    }

    set Distribution(value) {
        this._distribution = value;
        this.GenerateRawSequence();
    }

    get RandomSequence() {
        return this._sequence;
    }

    get RawRandomSequence() {
        return this._rawSequence;
    }

    get RandomValue() {
        return this._rawSequence[0]
        //return this.GenerateRandomFloatValue();
    }

    set Elements(value) {
        this._elementsArray = value;
        this.GenerateRawSequence();
    }

    set Probabilities(value) {
        this._probabilityArray = value;
        this.GenerateRawSequence();
    }

    set Probabilities(value) {
        this._probabilityArray = value;
        this.GenerateRawSequence();
    }

    get Elements() {
        return this._elementsArray;
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
        this.GenerateRawSequence();
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

        this.GenerateRawSequence();
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
        this.GenerateRawSequence();
    }


    constructor(formatter) {
        super();
        this._formatter = formatter;
    }

    GenerateRawSequence() {

        this._rawSequence = Array.from({length: this._sequenceLength}, () => {
            if (this._elementsArray.length <= 1) {
                return this.GenerateContinuousValue();
            }
            else {
                const rand = Math.random();
                if (rand < this._probabilityArray[0]) {
                    return this.GenerateContinuousValue();
                }
                else {
                    const elmIndex = this.BinarySearch(this._probabilityArray, rand);
                    return this._elementsArray[elmIndex];
                }
            }
        });

        this.GenerateValues();
    }

    BinarySearch(array, value) {
        let low = 0;
        let high = array.length - 1;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if ((mid > 0 && array[mid] > value  && array[mid - 1] <= value)
                || (mid === 0 && array[0] > value)) {
                return mid;
            } else if (array[mid] < value) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return low;
    }

    GenerateContinuousValue() {
        if (this._distribution == 1) {
            return jStat.uniform.sample(this._rangeFrom, this._rangeTo);
        }
        else if (this._distribution == 2) {
            let value = 0;
            do {
                value = jStat.normal.sample(this._distNormal.mean, this._distNormal.sd);
                value /= this._distNormal.clip * 2 
                value += 0.5;
            } while( value < 0 || value >= 1 )
            value *= this._rangeTo - this._rangeFrom;
            value += this._rangeFrom;
            return value;
        }
        else if (this._distribution == 3) {
            let value = jStat.beta.sample( this._distBeta.alpha, this._distBeta.beta );
            value *= this._rangeTo - this._rangeFrom;
            value += this._rangeFrom;
            return value;
        }
        else if (this._distribution == 4) {
            let value = 0;
            do {
                value = jStat.cauchy.sample( this._distCauchy.local, this._distCauchy.scale );
                value /= this._distCauchy.clip * 2;
                value += 0.5;
            } while ( value < 0 || value >= 1 )
            value *= this._rangeTo - this._rangeFrom;
            value += this._rangeFrom;
            return value;
        }
        else if (this._distribution == 5) {
            let value = 0;
            do {
                value = jStat.chisquare.sample(this._distChiSquare.dof);
                value /= this._distChiSquare.clip;
            } while ( value < 0 || value >= 1 )
            value *= this._rangeTo - this._rangeFrom;
            value += this._rangeFrom;
            return value;
        }
        else if (this._distribution == 6) {
            let value = 0;
            do {
                value = jStat.gamma.sample(this._distGamma.shape, this._distGamma.scale );
                value /= this._distGamma.clip;
            } while ( value < 0 || value >= 1 )
            value *= this._rangeTo - this._rangeFrom;
            value += this._rangeFrom;
            return value;
        }
        else if (this._distribution == 7) {
            let value = 0;
            do {
                value = jStat.invgamma.sample( this._distInvGamma.alpha, this._distInvGamma.beta );
                value /= this._distInvGamma.clip;
            } while ( value < 0 || value >= 1 )
            value *= this._rangeTo - this._rangeFrom;
            value += this._rangeFrom;
            return value;
        }
        else if (this._distribution == 8) {
            let value = 0;
            do {
                value = jStat.lognormal.sample( this._distLogNormal.mu, this._distLogNormal.sigma);
                value /= this._distLogNormal.clip;
            } while ( value < 0 || value >= 1 )
            value *= this._rangeTo - this._rangeFrom;
            value += this._rangeFrom;
            return value;
        }
        else if (this._distribution == 9) {
            let value = 0;
            do {
                value = jStat.studentt.sample( this._distStudentt.dof);
                value /= this._distStudentt.clip * 2;
                value += 0.5;
            } while ( value < 0 || value >= 1 )
            value *= this._rangeTo - this._rangeFrom;
            value += this._rangeFrom;
            return value;
        }
        else if (this._distribution == 10) {
            let value = 0;
            do {
                value = jStat.weibull.sample( this._distWeibull.scale, this._distWeibull.shape);
                value /= this._distLogNormal.clip;
            } while ( value < 0 || value >= 1 )
            value *= this._rangeTo - this._rangeFrom;
            value += this._rangeFrom;
            return value;
        }
    }

    GenerateValues() {
        this._sequence = this._rawSequence.map(value => this.TruncateValue(value));
        if (this._formatter != null) {

        console.log("generating values");
            this._formatter.SequenceValues = this._sequence;
        }
        //this.DispatchEvent("SequenceChanged");
    }

    TruncateValue(value) {

        if (isNaN(value)) {
            return value;
        }

        if (this._valueDecimalState == 0) {
            return Math.floor(value);
        }

        if (this._valueDecimalState == 1) {
            if (this._valueDecimalLength == 0) {
                return Math.floor(value);
            }
            const multiplier = Math.pow(10, this._valueDecimalLength);
            return Math.floor(value * multiplier) / multiplier;
        }
        else if (this._valueDecimalState == 2) {
            return value.toFixed(this._valueDecimalLength)
        }
        else if (this._valueDecimalState == 3) {
            if (this._valueDecimalLength == 0) {
                return 0;
            }
            return value.toPrecision(this._valueDecimalLength);
        }
    }
}