const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

const trainings = {
    mixed: require('../json/trainings/mixed.json'),
    snatch: require('../json/trainings/snatch.json'),
    ['clean-and-jerk']: require('../json/trainings/clean-and-jerk.json')
};

const [ trainingName, ...exercises ] = process.argv[2].split(',');

const testArr = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/', '_' ];

if (
    !trainings[trainingName]
    || exercises.some(ex => [ ...ex ].some(e => !testArr.includes(e)))
) {
    console.warn('Wrong user input. Example: snatch,18_65/3_70/3,1_80/2_85/2/2');
    process.exit();
}

const prevItems = trainings[trainingName];

const item = {
    id: `${trainingName}_${shortid.generate()}`,
    training: []
};

exercises.forEach(training => {
    const [ exs, ...l ] = training.split('_');
    const exercises = exs.split('/').map(e => parseInt(e, 10) - 1);
    const list = l.reduce((r, e) => {
        const [ percent, reps, repeat ] = e.split('/');
        const entry = {
            percent,
            reps
        };
        const addEntries = [];
        const num = parseInt(repeat, 10) || 1;
        for (let i = 0; i < num; i++) {
            addEntries.push(entry);
        }
        return [ ...r, ...addEntries ];
    }, []);
    item.training.push({
        exercises,
        list
    });
});

prevItems.push(item);

fs.writeFileSync(
    path.resolve('json', 'trainings', `${trainingName}.json`),
    JSON.stringify(prevItems, null, 4)
);