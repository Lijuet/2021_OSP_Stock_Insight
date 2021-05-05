const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

const naverFinaceKoreaURL = "https://finance.naver.com/sise/";
const naverFinaceWorldURL = "https://finance.naver.com/world/";
const indexKoreaCategory = ["KOSPI", "KOSDAQ", "KPI200"];

const getHtml = async (url) => {
    try {
        return await axios.get(url);
    } catch (error) {
        console.error(error);
    }
};

getHtml(naverFinaceKoreaURL)
    .then((html) => {
        let indexKorea = {};
        const $ = cheerio.load(html.data);

        indexKoreaCategory.forEach((index) => {
            indexKorea[index] = $("#" + index + "_now").text();
        });

        return indexKorea;
    })
    .then((res) => log(res));
