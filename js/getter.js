const fs = require('fs');
const path = require('path');

function getSetCount(ex) {
    return ex.length;
}

function getReps(ex) {
    return ex.reduce((r, e) => r + parseInt(e.reps, 10), 0);
}

function getAverageWeight(ex) {
    return Math.round(ex.reduce((r, e) => r + parseInt(e.percent, 10), 0) / ex.length);
}

function getKilos(percent, max) {
    return Math.round((parseInt(max, 10) / 2.5) * (parseInt(percent, 10) / 100)) * 2.5;
}

function getExercisesHR(exs) {
    const exNames = require('../json/exercise-names.json');
    let r = '';
    exs.forEach((e, i) => {
        const name = exNames[e];
        r += `${i === 0 ? '' : ' + '}${name}`;
    });
    return r;
}

function getRepsHR(list) {
    let r = '';
    list.forEach((e, i) => {
        r += `${i === 0 ? '' : ' '}${e.percent}/${e.reps}`;
    });
    return r;
}

function getPR(exs, prs) {
    const prMap = require('../json/pr-map.json');
    const prNames = exs.map(ex => {
        let prName = 'unknown';
        Object.keys(prMap).forEach(key => {
            if (prMap[key].includes(ex)) {
                prName = key;
            }
        });
        return prName;
    });

    if (!prNames.every((e, i, a) => e === a[0])) {
        console.warn('Different PRs listed for on exercise: ', exs);
    }
    return prs[prNames[0]];
}

function getTrainings() {
    const tDir = path.resolve('json', 'trainings');
    const t = fs.readdirSync(tDir);
    return t.reduce((r, e) => ({
        ...r,
        [e.replace('.json', '')]: JSON.parse(fs.readFileSync(path.join(tDir, e), 'utf-8'))
    }), {});
}

exports.getSetCount = getSetCount;
exports.getReps = getReps;
exports.getAverageWeight = getAverageWeight;
exports.getKilos = getKilos;
exports.getExercisesHR = getExercisesHR;
exports.getRepsHR = getRepsHR;
exports.getPR = getPR;
exports.getTrainings = getTrainings;
