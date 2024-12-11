import { BaseClass } from "./base-class.js";


export class Generator extends BaseClass {

    _rangeStart = 1;
    _rangeEnd = 100;
    _sequenceLength = 10;
    _isEndIncluded = false;
    _valueDecimalState = 1;
    _valueDecimalLength = 0;
    _distribution = 1;
    _rawSequence = [];
    _sequence = []

    get RangeStart() {
        return this._rangeStart;
    }
    set RangeStart(value) {
        this._rangeStart = value;
        this.GenerateRawValues();
    }   

    get RangeEnd() {
        return this._rangeEnd;
    }
    set RangeEnd(value) {
        this._rangeEnd = value;
        this.GenerateRawValues();
    }

    set SequenceLength(value) {
        this._sequenceLength = value;
        this.GenerateRawValues();
    }

    set IsEndIncluded(value) {
        this._isEndIncluded = value;
    }

    set ValueDecimalState(value) {
        this._valueDecimalState = value;
        this.GenerateValues();
    }

    set ValueDecimalLength(value) {
        this._valueDecimalLength = value;
        this.GenerateValues();
    }

    set Distribution(value) {
        this._distribution = value;
        this.GenerateRawValues();
    }

    get RandomSequence() {
        return this._sequence;
    }



    constructor() {
        super();
    }

    GenerateRawValues() {
        this._rawSequence = [];
        for (let i = 0; i < this._sequenceLength; i++) {
            this._rawSequence.push(this.GenerateRandomFloatValue());
        }
        this.GenerateValues();
    }

    GenerateValues() {
        this._sequence = [];
        for (let i = 0; i < this._sequenceLength; i++) {
            let value = this._rawSequence[i];
            value = this.TruncateValue(value);
            this._sequence.push(value);
        }
        this.DispatchEvent("SequenceChanged");
    }

    TruncateValue(value) {
        if (this._valueDecimalState == 1) {
            if (this._valueDecimalLength == 0) {
                return Math.round(value);
            }
            const multiplier = Math.pow(10, this._valueDecimalLength);
            return Math.round(value * multiplier) / multiplier;
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

    GenerateRandomFloatValue() {
        let value = 0;
        if (this._distribution == 1) {
            value = this.UniformDistribution();
        }
        else {
            value = this.NormalDistribution();
        }

        value *= this._rangeEnd - this._rangeStart;
        value += this._rangeStart;

        return value;
    }

    UniformDistribution() {
        return Math.random();
    }   

    NormalDistribution() {
        let u = 0, v = 0;
        while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
        while(v === 0) v = Math.random();
        let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
        num = num / 10.0 + 0.5; // Translate to 0 -> 1
        if (num > 1 || num < 0) return this.NormalDistribution() // resample between 0 and 1
        return num
      }



}