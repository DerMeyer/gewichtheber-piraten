const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

// Input example: snatch,18_65/3_70/3,1_80/2_85/2/2

const [ trainingName, ...exercises ] = process.argv[2].split(',');

// test input

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

console.log(JSON.stringify(item, null, 4));// TODO remove dev code
