const axios = require("axios");
const cheerio = require("cheerio");

async function getHtml(url) {
    try {
        return await axios.get(url);
    } catch (error) {
        console.error(error);
    }
}

async function getKoreaIndex() {
    const naverFinaceKoreaURL = "https://finance.naver.com/sise/";
    const indexKoreaCategory = ["KOSPI", "KOSDAQ", "KPI200"];
    let indexKorea = {
        KOSPI: 0,
        KOSDAQ: 0,
        KPI200: 0,
    };

    let html = await getHtml(naverFinaceKoreaURL);
    const $ = cheerio.load(html.data);

    indexKoreaCategory.forEach((index) => {
        indexKorea[index] = $("#" + index + "_now").text();
    });

    return indexKorea;
}

async function getWorldIndex() {
    const naverFinaceWorldRootURL =
        "https://finance.naver.com/world/sise.nhn?symbol=";
    const indexWorldCategory = ["DJI@DJI", "NAS@IXIC", "SPI@SPX"];
    let indexWorld = {
        DJI: 0,
        NAS: 0,
        SPI: 0,
    };

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
            })
        );
    return indexWorld;
}

module.exports = { getKoreaIndex, getWorldIndex };

/*How TO Use Modules
getKoreaIndex().then((ret) => {
    console.log(ret);
});

getWorldIndex().then((ret) => {
    console.log(ret);
});
*/
