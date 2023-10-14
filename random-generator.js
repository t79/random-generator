document.addEventListener('readystatechange', function () {
    if (document.readyState === 'interactive') {
        initGenerator();
    }
});

var t79RG = {};

function initGenerator() {
    getGeneratorInputElements();
    getGeneratorOutputElements();
    getGeneratorSettingsElements();
    setupGeneratorInputElements();
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

function getGeneratorSettingsElements() {
    t79RG.settingsSeqLengthRangeRadioElm = document.getElementById("generator-settings-sequence-length-range");
    t79RG.settingsSeqLengthNumRadioElm = document.getElementById("generator-settings-sequence-length-num");
    t79RG.settingsSeqLengthNumValueElm = document.getElementById("generator-settings-sequence-length-num-input");
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
    t79RG.settingsSeqLengthNumValueElm.addEventListener("input", generateRandom)
}