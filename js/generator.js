import { BaseClass } from "./base-class.js";


export class Generator extends BaseClass {

    _formatter = null;

    _rangeFrom = 0;
    _rangeTo = 0;
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
                return this.FindBlock().GenerateRawValue();
            });
        }
        else {
            this._rawSequence = [];
        }

        this.GenerateValues();
        this.FindRange();
        this.DispatchEvent("RawSequenceGenerated");
    }

    FindBlock() {
        const rand = jStat.uniform.sample(0, 1);
        let index = 0;
        for (index = 0; index < this._probabilityArray.length; index++) {
            if (rand < this._probabilityArray[index]) {
                break;
            } 
        }
        return this._elementsArray[index];
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

    FindRange() {
        if (this._elementsArray.length > 0) {
            this._rangeFrom = Math.min(...this._elementsArray.map(element => element.RangeFrom));
            this._rangeTo = Math.max(...this._elementsArray.map(element => element.RangeTo));
        }
        else {
            this._rangeFrom = 0;
            this._rangeTo = 0;
        }
    }
}