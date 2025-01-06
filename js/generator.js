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
    _elementsArray = [];
    _probabilityArray = [];

    _isAutoGenerating = true;
    _autoTimer = null;

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
    }

    set Probabilities(value) {
        this._probabilityArray = value;
    }

    get Elements() {
        return this._elementsArray;
    }



    constructor(formatter) {
        super();
        this._formatter = formatter;
    }

    AutoGenerateSequence() {
        if(this._isAutoGenerating) {
            if (this._autoTimer != null) {
                clearTimeout(this._autoTimer);
            }
            this._autoTimer = setTimeout(() => this.GenerateSequence(), 700);
        }
    }

    GenerateSequence() {
        this.GenerateRawSequence();
    }

    GenerateRawSequence() {
        console.log(this._sequenceLength, this._elementsArray.length, this._probabilityArray.length );
        if (this._elementsArray.length > 0 && this._probabilityArray.length > 0) {
            this._rawSequence = Array.from({length: this._sequenceLength}, () => {
                if (this._probabilityArray.length == 1) {
                    return this._elementsArray[0].GenerateRawValue();
                }
                const rand = jStat.uniform.sample(0, 1);
                return this.FindBlock(rand).GenerateRawValue();
            });
            this.GenerateValues();
        }
        else {
            this._rawSequence = [];
            this.GenerateValues();
        } 
    }

    FindBlock(rand) {
        let index = 0;
        
        for (index = 0; index < this._probabilityArray.length; index++) {
            if (rand < this._probabilityArray[index]) {
                break;
            } 
        }
        return this._elementsArray[index];
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
            this._formatter.SequenceValues = this._sequence;
        }
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