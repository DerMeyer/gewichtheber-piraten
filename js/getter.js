function getSetCount(ex) {
    return ex.length;
}

function getReps(ex) {
    return ex.reduce((r, e) => r + e.reps, 0);
}

function getAverageWeight(ex) {
    return Math.round(ex.reduce((r, e) => r + e.percent, 0) / ex.length);
}

function getKilos(percent, max) {
    return Math.round((max / 2.5) * (percent / 100)) * 2.5;
}

// test

const PR = 115;

const snatch = require('../json/exercises/snatch.json');
const today = snatch.find(e => e.id === 1);
const current = today.training[0];
const exercise = current.list;

console.log('SET COUNT: ', getSetCount(exercise));// TODO remove dev code
console.log('WH: ', getReps(exercise));// TODO remove dev code
console.log('MHG: ', getAverageWeight(exercise));// TODO remove dev code
exercise.forEach(rep => {
    console.log('PERCENT: ', rep.percent, 'KILOS: ', getKilos(rep.percent, PR));// TODO remove dev code
});