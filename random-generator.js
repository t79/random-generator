document.addEventListener('readystatechange', function () {
    if (document.readyState === 'interactive') {
        initGenerator();
    }
});

var t79RG = {};

function initGenerator() {
    getGeneratorInputElements();
    getGeneratorOutputElements();
    setupGeneratorInputElements();
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

    for (i = 0; i < 100; i++) {
        t79RG.generatedValues.push(getRandomValue());
    }

    let outputText = "";
    for (i = 0; i < t79RG.generatedValues.length; i++) {
        outputText += t79RG.generatedValues[i] + " ";
    }

    t79RG.outputGeneratedResultElm.innerText = outputText;
}

function getRandomValue() {
    return Math.floor(Math.random() * t79RG.generateRangeSize) + t79RG.generateRangeFrom;
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