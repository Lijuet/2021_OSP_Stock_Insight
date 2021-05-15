const axios = require("axios");
const cheerio = require("cheerio");

async function getHtml(url) {
    try {
        return await axios.get(url);
    } catch (error) {
        console.log("Fail to get html");
    }
}
async function getKoreaIndex(keyword) {
    const searchURL = "";
    let news = {
        head: "",
        link: "",
    };
    let newsList = [];

    let html = await getHtml(searchURL + keyword);
    if (html === undefined) return newsList;

    const $ = cheerio.load(html.data);

    return newsList;
}
