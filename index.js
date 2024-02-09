const axios = require('axios').default;
const cheerio = require('cheerio');

let sum = 0;
let qntStations = 0;

const latitude = process.argv[2];
const latitude_dec = String(-latitude);
const longitude = process.argv[3];
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

axios.request(options).then(function (response) {
    const $ = cheerio.load(response.data);

    $('#tb_sundata tr').each((index, element) => {
        const indexValueDirt = $(element).find('td strong').html();
        if (indexValueDirt) {
            const indexValueClean = indexValueDirt.replace(',', '.');
            sum += Number(indexValueClean);
            ++qntStations;
        }
    });
    
    const average = (sum/qntStations).toFixed(2);
    console.log(average);
}).catch(function (error) {
  console.error(error);
});