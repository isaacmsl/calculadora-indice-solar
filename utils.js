const axios = require('axios').default;
const cheerio = require('cheerio');

const getAverageSolarIncidenceFromPoint = async (latitude, longitude) => {
    let sum = 0;
    let qntStations = 0;
    const latitude_dec = String(-latitude);
    const longitude_dec = String(-longitude);

    const options = {
        method: 'POST',
        url: 'http://www.cresesb.cepel.br/index.php',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
            latitude_dec,
            latitude,
            hemi_lat: '0',
            longitude_dec,
            longitude,
            formato: '1',
            lang: 'pt',
            section: 'sundata'
        }
    };

    const response = await axios.request(options);

    const $ = cheerio.load(response.data);

    $('#tb_sundata tr').each((index, element) => {
        const indexValueDirt = $(element).find('td strong').html();
        if (indexValueDirt) {
            const indexValueClean = indexValueDirt.replace(',', '.');
            sum += Number(indexValueClean);
            ++qntStations;
        }
    });

    const averageSolarIncidence = (sum/qntStations).toFixed(2);
    return averageSolarIncidence;
};

const getAverageSolarIncidenceFromCep = async (cep) => {
    const { latitude, longitude } = await getMunicipioFromCep(cep);
    const averageSolarIncidence = await getAverageSolarIncidenceFromPoint(latitude, longitude);
    return averageSolarIncidence;
};

const getMunicipioFromCep = async (cep) => {
    const viaCepResult = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
    return getMunicipioFromCodigoIBGE(viaCepResult.data.ibge);
};

const getMunicipioFromCodigoIBGE = (codigoIBGE) => {
    const municipios = require('./data/municipios.json');
    const municipiosFiltrados = municipios.filter(mun => mun.codigo_ibge == codigoIBGE);
    return municipiosFiltrados[0];
};

module.exports = {
    getMunicipioFromCep,
    getMunicipioFromCodigoIBGE,
    getAverageSolarIncidenceFromCep,
    getAverageSolarIncidenceFromPoint,
};