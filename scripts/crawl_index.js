const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

async function getHtml(url) {
    try {
        return await axios.get(url);
    } catch (error) {
        console.error(error);
    }
}

const naverFinaceKoreaURL = "https://finance.naver.com/sise/";
const naverFinaceWorldRootURL =
    "https://finance.naver.com/world/sise.nhn?symbol=";
const indexKoreaCategory = ["KOSPI", "KOSDAQ", "KPI200"];
const indexWorldCategory = ["DJI@DJI", "NAS@IXIC", "SPI@SPX"];
let indexWorld = {};

async function getKoreaIndex() {
    let indexKorea = {};
    try {
        let html = await getHtml(naverFinaceKoreaURL);
        const $ = await cheerio.load(html.data);

        indexKoreaCategory.forEach((index) => {
            indexKorea[index] = $("#" + index + "_now").text();
        });
        log(indexKorea);
        return indexKorea;
    } catch {
        return {
            KOSPI: 0,
            KOSDAQ: 0,
            KPI200: 0,
        };
    }
}

async function getWorldIndex() {
    await axios
        .all(
            indexWorldCategory.map((idx) => {
                return getHtml(naverFinaceWorldRootURL + idx);
            })
        )
        .then(
            axios.spread((...responses) => {
                responses.forEach((html) => {
                    const $ = cheerio.load(html.data);
                    let name = $("div.h_area em").text();
                    let value = $("p.no_today em").children("span").text();
                    indexWorld[name.substring(0, 3)] = value;
                });
                log(indexWorld);
            })
        );
    return indexWorld;
}
log(getKoreaIndex());
log(getWorldIndex());
