const fs = require('fs');
const path = require('path');
const { getTrainings, getExercisesHR, getSetCount, getReps, getAverageWeight, getPR, getRepsHR } = require('../js/getter');

const programName = process.argv[2];

if (!programName) {
    console.warn('no program name');
    process.exit();
}

const program = JSON.parse(fs.readFileSync(path.resolve('json', 'programs', `${programName}.json`), 'utf-8'));

const trainings = getTrainings();

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

logProgram(program);