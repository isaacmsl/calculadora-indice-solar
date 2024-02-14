const { 
    getAverageSolarIncidenceFromPoint,
    getAverageSolarIncidenceFromCep,
} = require('./utils');

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
        const averageSolarIncidence = await getAverageSolarIncidenceFromPoint(latitude, longitude);
        res.send(averageSolarIncidence);
    } catch (e) {
        console.error(`Error at /. Reason: ${e.message}`);
        res.status(e.response.status).end();
    }
    
});

app.get('/cep/:cep', async (req, res) => {
    const { cep } = req.params;
    try {
        const averageSolarIncidence = await getAverageSolarIncidenceFromCep(cep);
        res.send(averageSolarIncidence);
    } catch (e) {
        console.error(`Error at /cep/:cep. Reason: ${e.message}`);
        res.status(e.response.status).end();
    }
});

app.listen(port);