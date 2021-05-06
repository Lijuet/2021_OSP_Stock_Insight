/* crawl_copinfo v1.0.0 */

const axios = require("axios");
const cheerio = require("cheerio");

async function getHTML(url) {
    try {
        return await axios.get(url);
    } catch (error) {
        console.log(error);
    }
}

// result.date 값 파싱해야 함!
async function getPrice(code) {
    // 'code' is cop stock code
    let url = "https://finance.naver.com/item/main.nhn?code=";

    // return value
    let result = {
        price: "",
        date: "",
    };

    await getHTML(url + code).then((html) => {
        const $ = cheerio.load(html.data);

        // get price date in html
        result.price = $(".rate_info", "#chart_area")
            .children(".today")
            .children(".no_today")
            .children(".no_down")
            .children(".blind")
            .text();

        // get real-time in html
        result.date = $(".date", "#time").text();
    });

    // return promise obj to process asyncronization
    return new Promise((resolve) => {
        resolve(result);
    });
}

// test function
getPrice("035420").then((ret) => {
    console.log(ret.price);
});
