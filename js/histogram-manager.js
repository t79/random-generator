


export class HistogramManager {

    _generator;
    _histogramElm;

    _binsArray = [];
    _bin;
    _rangeStart = 0;
    _rangeEnd = 0;
    _width = 0;
    _digitState = 0;
    _digitLength = 0;
    _digitsChanged = false;

    constructor(generator) {
        this._generator = generator;
        this.Setup();
    }

    Setup() {
        this.GetElements();
        this.SetEventListener();
    }

    GetElements() {
        this._histogramElm = document.getElementById("histogram-container");
    }

    SetEventListener() {
        this._generator.AddEventListener("SequenceChanged", (inst) => this.Draw())
    }

    SetupHistogram() {

    }

    Draw() {

        if (this._digitState != this._generator.ValueDecimalState) {
            this._digitState = this._generator.ValueDecimalState;
            this._digitsChanged = true;
        }
        if (this._digitLength != this._generator.ValueDecimalLength) {
            this._digitLength = this._generator.ValueDecimalLength;
            this._digitsChanged = true;
        }

        const width = this._histogramElm.getBoundingClientRect().width;
        const height = this._histogramElm.getBoundingClientRect().height;
        if (width != this._width || 
            this._rangeStart != this._generator.RangeStart || 
            this._rangeEnd != this._generator.RangeEnd ||
            this._digitsChanged) {

            this._width = width;
            this._rangeStart = this._generator.RangeStart;
            this._rangeEnd = this._generator.RangeEnd;
            
            let range = this._rangeEnd - this._rangeStart + 1;
            if (range < width - 20) {
                if ((this._digitState == 1 || this._digitState == 2) &&
                    this._digitLength > 0) {
                        range *= Math.pow(10, this._digitLength);
                }
                else if (this._digitState == 3) {
                    if (range < 10) {
                        if (this._digitLength > 0)
                            range *= Math.pow(10, this._digitLength);
                        else
                            range = 1;
                    }
                    else if (range < 100) {
                        if (this._digitLength > 1)
                            range *= Math.pow(10, this._digitLength - 1);
                        else if (this._digitLength == 1)
                            range *= 10;
                        else
                            range = 1;
                    }
                }
                if (range > width - 20) {
                    range = width - 20;
                }
            }
            else {
                range = width - 20;
            }

            const binSize = (this._rangeEnd - this._rangeStart + 1) / range;
            console.log(binSize, range);

            this._binsArray = [];
            for (let i = this._rangeStart; i < this._rangeEnd; i += binSize ) {
                this._binsArray.push(i);
            }
            this._bin = d3.bin().domain([this._rangeStart, this._rangeEnd]).thresholds(this._binsArray);

            this._digitsChanged = false;
        }

        const values = this._generator.RawRandomSequence;
        const data = this._bin(values);
        const binWidth = (width - 20) / data.length;
        const max = Math.max(d3.max(data, d => d.length), 6);

        const y = d3.scaleLinear()
            .domain([0, max])
            .range([height - 10, 10]);

        const svg = d3.create("svg")
            .attr("width", width)
            .attr("height", height)
            .call(g => g.append("g")
                .selectAll("rect")
                .data(data)
                .join("rect")
                .attr("x", (d, i) => i * binWidth + 10)
                .attr("y", d => y(d.length))
                .attr("width", binWidth < 6 ? binWidth : binWidth < 12 ? binWidth - 1 : binWidth - 2)
                .attr("height", d => (height - 10) - y(d.length))
                .attr("fill", "var(--histogram-color)"));

        this._histogramElm.innerHTML = "";
        this._histogramElm.appendChild(svg.node());
    }
}