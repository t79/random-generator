import { BaseClass } from "./base-class.js";



export class CategoricalGenerator extends BaseClass{

    _elementsArray = [];
    _probabilityArray = [];

    _sequenceLength = 100;
    _rawSequence = [];
    _sequence = [];

    set Elements(value) {
        this._elementsArray = value;
    }

    set Probabilities(value) {
        this._probabilityArray = value;
    }

    set SequenceLength(value) {
        this._sequenceLength = value;
        GenerateRawSequence();
    }

    get Sequence() {
        return this._rawSequence;
    }

    constructor() {
        super();
    }

    GenerateRawSequence() {
        this._rawSequence = Array.from({length: this._sequenceLength}, () => {
            const rand = Math.random();
            const elmIndex = this.BinarySearch(this._probabilityArray, rand);
            return this._elementsArray[elmIndex];
        });

        console.log("Generate sequence");
        this.DispatchEvent("SequenceChanged");
    }

    BinarySearch(array, value) {
        let low = 0;
        let high = array.length - 1;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if ((mid > 0 && array[mid] >= value  && array[mid - 1] < value)
                || (mid === 0 && array[0] >= value)) {
                return mid;
            } else if (array[mid] < value) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return low;
    }
}