const { getAverageSolarIncidenceFromCep } = require('./utils');

const cep = process.argv[2];

getAverageSolarIncidenceFromCep(cep)
    .then(response => console.log(response));