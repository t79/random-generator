import { Generator } from "./generator.js";


export class RandomHeader {

    _colors = [
        {name: "red", rgb: "rgb(210, 45, 31)", hue: 5, sat: 74, satMin: 70, satMax: 78, light: 47, lightMin: 40, lightMax: 52},
        {name: "orange", rgb: "rgb(240, 147, 54)", hue: 32, sat: 89, satMin: 85, satMax: 93, light: 59, lightMin: 50, lightMax: 65},
        {name: "yellow", rgb: "rgb(252, 238, 79)", hue: 55, sat: 97, satMin: 93, satMax: 100, light: 65, lightMin: 55, lightMax: 70},
        {name: "green", rgb: "rgb(56, 127, 48)", hue: 114, sat: 45, satMin: 40, satMax: 50, light: 34, lightMin: 30, lightMax: 40},
        {name: "blue", rgb: "rgb(30, 75, 245)", hue: 227, sat: 91, satMin: 87, satMax: 96, light: 54, lightMin: 45, lightMax: 60},
        {name: "purple", rgb: "rgb(109, 18, 131)", hue: 288, sat: 76, satMin: 72, satMax: 80, light: 29, lightMin: 20, lightMax: 35}
    ];
    _colorElm = [];
    _generator;
    _headerElm;

    constructor() {
        this.Setup();
        setInterval(() => this.AnimateHeader(), 300);
    }

    Setup() {
        this._headerElm = document.querySelector("header");
        this._generator = new Generator();
        this.MakeHeaderElements();
    }

    MakeHeaderElements() {
        for (let i = 0; i < 6; i++) {
            for (let j = 2; j < 4; j++) {
                this.MakeSingleHeaderElement(i, j, 0);
                this.MakeSingleHeaderElement(i, j, 1);
            }
        }
    }

    MakeSingleHeaderElement(color, row, shift) {
        console.log("making color: " + color + " " + row);
        let elm = document.createElement("div");

        elm.style.backgroundColor = this.GenerateColor(this._colors[color]);

        elm.style.gridRowStart = row;
        elm.style.gridRowEnd = row + 1;
        elm.style.gridColumnStart  = color*2 + shift + 1;
        elm.style.gridColumnEnd = color*2 + shift + 2;
        this._headerElm.appendChild(elm);
        this._colorElm.push({elm: elm, color: this._colors[color]});
    }

    AnimateHeader() { 
        this._generator.RangeStart = 0;
        this._generator.RangeEnd = this._colorElm.length;
        const count = this._generator.RandomValue;

        this._generator.SequenceLength = Math.floor(count/8);
        const indexes = this._generator.RandomSequence;
        for (let i = 0; i < indexes.length; i++) {
            const elm = this._colorElm[indexes[i]].elm;
            elm.style.backgroundColor = this.GenerateColor(this._colorElm[indexes[i]].color);
        }
    }

    GenerateColor(color) {
        this._generator.RangeStart = color.hue - 5;
        this._generator.RangeEnd = color.hue + 5;
        let hue = this._generator.RandomValue;
        if (hue < 0) {
            hue += 360;
        } else if (hue > 360) {
            hue -= 360;
        }

        this._generator.RangeStart = color.satMin;
        this._generator.RangeEnd = color.satMax;
        let sat = this._generator.RandomValue;

        this._generator.RangeStart = color.lightMin;
        this._generator.RangeEnd = color.lightMax;
        let light = this._generator.RandomValue

        return `hsl(${hue} ${sat} ${light})`;
    }
}