const ScraperFravega = require('./scraping/fravega.scraping');
const ScraperYuhmak = require('./scraping/yuhmak.scraping');
const ScraperCastillo = require('./scraping/castillo.scraping');
const ScraperBarbieri = require('./scraping/barbieri.scraping');

const Map = {
    "Yuhmak": ScraperYuhmak,
    "Fravega": ScraperFravega,
    "Castillo": ScraperCastillo,
    "Barbieri": ScraperBarbieri,
};

module.exports = Map;
