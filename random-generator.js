document.addEventListener('readystatechange', function () {
    if (document.readyState === 'interactive') {
        initGenerator();
    }
});

var t79RG = {
    Format: {
        Column: 'column',
        Normal: 'normal',
        Array: 'array'
    }
};

function initGenerator() {
    getGeneratorInputElements();
    getGeneratorOutputElements();
    getHistogramElement();
    getGeneratorSettingsElements();
    setupGeneratorInputElements();
    setupGeneratorOutputElements();
    setupGeneratorSettingsElements();
}

function generateRandom(e) {

    t79RG.generateRangeFrom = parseFloat(t79RG.inputFromNumberIntervalElm.value);
    t79RG.generateRangeTo = parseFloat(t79RG.inputToNumberIntervalElm.value);
    t79RG.generateRangeSize = t79RG.generateRangeTo - t79RG.generateRangeFrom;

    if (Number.isNaN(t79RG.generateRangeSize) || t79RG.generateRangeSize <= 0) {
        t79RG.outputGeneratedResultElm.innerText = "";
        return;
    }

    t79RG.generatedValues = [];

    let count = 0;
    if(t79RG.sequenceLengtIsRange) {
        count = t79RG.generateRangeSize
    }
    else {
        count = parseFloat(t79RG.settingsSeqLengthNumValueElm.value);
    }

    for (i = 0; i < count; i++) {
        t79RG.generatedValues.push(getRandomValue());
    }

    drawHistogram();

    formatGeneratedOutputString();

    t79RG.outputGeneratedResultElm.innerHTML = t79RG.outputString;
    
}

function formatGeneratedOutputString() {
    t79RG.outputString = "";
    let separator = " ";

    if (t79RG.outputFormat == t79RG.Format.Column) {
        separator = "<br>";
    }
    else if (t79RG.outputFormat == t79RG.Format.Array) {
        separator = ", ";
        t79RG.outputString = "["
    }

    for (i = 0; i < t79RG.generatedValues.length; i++) {
        t79RG.outputString += Math.floor(t79RG.generatedValues[i]);
        if (i < t79RG.generatedValues.length - 1) {
            t79RG.outputString += separator;
        }
    }

    if (t79RG.outputFormat == t79RG.Format.Array) {
        t79RG.outputString += "]"
    }
}

function changeFormating(e) {
    if (e == null || e.target == t79RG.settingsSeqFormatColumnRadioElm) {
        t79RG.outputFormat = t79RG.Format.Column;
        t79RG.outputGeneratedResultElm.style.columns = 10 + "ch";
        t79RG.outputGeneratedResultElm.style.textAlign = "right";
    }
    else if (e.target == t79RG.settingsSeqFormatNormalRadioElm) {
        t79RG.outputFormat = t79RG.Format.Normal;
        t79RG.outputGeneratedResultElm.style.columns = 1;
        t79RG.outputGeneratedResultElm.style.textAlign = "left";
    }
    else if (e.target == t79RG.settingsSeqFormatArrayRadioElm) {
        t79RG.outputFormat = t79RG.Format.Array;
        t79RG.outputGeneratedResultElm.style.columns = 1;
        t79RG.outputGeneratedResultElm.style.textAlign = "left";
    }

    formatGeneratedOutputString();

    t79RG.outputGeneratedResultElm.innerHTML = t79RG.outputString;
}

function getRandomValue() {
    return Math.random() * t79RG.generateRangeSize + t79RG.generateRangeFrom;
}

function drawHistogram() {

    const minValue = t79RG.generateRangeFrom;

    let tres = []

    let binSize = 1;
    if (t79RG.generateRangeSize > 100) {
        binSize = t79RG.generateRangeSize / 100;
    }

    for (i = 0; i < t79RG.generateRangeSize; i = i + binSize) {
        tres.push(minValue + i + 1)
    }

    const bins = d3.bin()
        .thresholds(tres)
        .value((d) => d)
        (t79RG.generatedValues);

    let ratio = 300/bins.length;
    for (i = 0; i < bins.length; i++) {
        bins[i].x0 = i * ratio;
    }

    const y = d3.scaleLinear()
        .domain([0, d3.max(bins, (d) => d.length)])
        .range([100, 0]);

    const svg = d3.create("svg")
        .attr("width", 300)
        .attr("height", 100)
        .attr("viewBox", [0, 0, 300, 100]);

    svg.append("g")
        .attr("fill", "black")
        .selectAll()
        .data(bins)
        .join("rect")
            .attr("x", (d) => d.x0)
            .attr("width", ratio)
            .attr("y", (d) => y(d.length))
            .attr("height", (d) => y(0) - y(d.length));

    t79RG.generatedHistogramElm.innerHTML = "";
    t79RG.generatedHistogramElm.appendChild(svg.node());
}

function getGeneratorInputElements() {
    t79RG.inputFromNumberIntervalElm = document.getElementById("number-interval-input-from-field");
    t79RG.inputToNumberIntervalElm = document.getElementById("number-interval-input-to-field");
}

function setupGeneratorInputElements() {
    t79RG.inputFromNumberIntervalElm.addEventListener("input", generateRandom);
    t79RG.inputToNumberIntervalElm.addEventListener("input", generateRandom);
}

function getGeneratorOutputElements() {
    t79RG.outputGeneratedResultElm = document.getElementById("generator-output");
}

function setupGeneratorOutputElements() {
    t79RG.generatedValues = [];
}

function getHistogramElement() {
    t79RG.generatedHistogramElm = document.getElementById("histogram");
}

function getGeneratorSettingsElements() {
    t79RG.settingsSeqLengthRangeRadioElm = document.getElementById("generator-settings-sequence-length-range");
    t79RG.settingsSeqLengthNumRadioElm = document.getElementById("generator-settings-sequence-length-num");
    t79RG.settingsSeqLengthNumValueElm = document.getElementById("generator-settings-sequence-length-num-input");
    t79RG.settingsSeqFormatColumnRadioElm = document.getElementById("generator-settings-sequence-format-column");
    t79RG.settingsSeqFormatNormalRadioElm = document.getElementById("generator-settings-sequence-format-normal");
    t79RG.settingsSeqFormatArrayRadioElm = document.getElementById("generator-settings-sequence-format-array");
}

function setupGeneratorSettingsElements() {
    t79RG.sequenceLengtIsRange = false;
    t79RG.settingsSeqLengthNumValueElm.value = 100;
    t79RG.settingsSeqLengthNumRadioElm.checked = true;
    t79RG.settingsSeqLengthRangeRadioElm.addEventListener("input", function(e) {
        t79RG.sequenceLengtIsRange = true;
        t79RG.settingsSeqLengthNumValueElm.disabled = true;
        generateRandom();
    });
    t79RG.settingsSeqLengthNumRadioElm.addEventListener("input", function(e) {
        t79RG.sequenceLengtIsRange = false;
        t79RG.settingsSeqLengthNumValueElm.disabled = false;
        generateRandom();
    });
    t79RG.settingsSeqLengthNumValueElm.addEventListener("input", generateRandom);
    t79RG.settingsSeqFormatColumnRadioElm.checked = true;
    changeFormating(null);
    t79RG.settingsSeqFormatColumnRadioElm.addEventListener("input", changeFormating);
    t79RG.settingsSeqFormatNormalRadioElm.addEventListener("input", changeFormating);
    t79RG.settingsSeqFormatArrayRadioElm.addEventListener("input", changeFormating);
}