const { getAverageSolarIncidenceFromPoint } = require('./utils');

const latitude = process.argv[2];
const longitude = process.argv[3];

getAverageSolarIncidenceFromPoint(latitude, longitude)
    .then(response => console.log(response));