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
    let exIndex;
    exs.forEach(ex => {
        if (typeof exIndex !== 'undefined' && exIndex !== ex) {
            console.warn('Different PRs listed for on exercise: ', exs);
        }
        exIndex = ex;
    });
    let exName = '';
    Object.keys(prMap).forEach(key => {
        if (prMap[key].includes(exIndex)) {
            exName = key;
        }
    });
    return prs[exName];
}

// tests

const trainings = {
    mixed: require('../json/trainings/mixed.json'),
    snatch: require('../json/trainings/snatch.json'),
    ['clean-and-jerk']: require('../json/trainings/clean-and-jerk.json')
};

const prs = {
    snatch: 100,
    ['clean-and-jerk']: 115,
    ['front-squat']: 115,
    ['back-squat']: 130
};

function logProgram(program) {
    console.log('\n');
    console.log('NAME: ', program.name);
    program.weeks.forEach((week, index) => {
        console.log('\n');
        console.log(`WEEK ${index + 1}`);
        week.forEach(w => {
            console.log('\n');
            const training = trainings[w.name].find(entry => entry.id === w.id).training;
            training.forEach(t => {
                console.log(getExercisesHR(t.exercises), 'SATZ: ', getSetCount(t.list), 'WH: ', getReps(t.list), 'MHG: ',  getAverageWeight(t.list), 'PR: ', getPR(t.exercises, prs), 'TRAIN: ', getRepsHR(t.list));
            });
        });
    });
    console.log('\n');
}

const program = require('../json/programs/five-weeks-marjam.json');

logProgram(program);
