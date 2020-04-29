function getSetCount(exercise) {
    return exercise.length;
}

function getReps(exercise) {
    return exercise.reduce((result, value) => result + value.reps, 0);
}

function getAverageWeight(exercise) {
    return Math.round(exercise.reduce((result, value) => result + value.percent, 0) / exercise.length);
}

function getKilos(percent, max) {
    return Math.round((max / 2.5) * (percent / 100)) * 2.5;
}

// test

const PR = 115;

const snatches = require('../json/exercises/snatch.json');
const today = snatches['marjam-snatch-1'];
const current = today[0];
const exercise = current.list;

console.log('SET COUNT: ', getSetCount(exercise));// TODO remove dev code
console.log('WH: ', getReps(exercise));// TODO remove dev code
console.log('MHG: ', getAverageWeight(exercise));// TODO remove dev code
exercise.forEach(rep => {
    console.log('PERCENT: ', rep.percent, 'KILOS: ', getKilos(rep.percent, PR));// TODO remove dev code
});