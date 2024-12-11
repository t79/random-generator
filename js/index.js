import { RandomGenerator } from "./random-generator.js";


document.addEventListener('readystatechange', function () {
    if (document.readyState === "complete") {
        new RandomGenerator();
    }
});