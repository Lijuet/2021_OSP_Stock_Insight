const axios = require("axios");

async function getHtml(url, code) {
    try {
        return await axios.get(url, {
            headers: {
                Referer: "https://finance.daum.net/quotes/A" + code,
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
            },
        });
    } catch (error) {
        console.log("FAIL TO LOAD HTML");
    }
}
async function getNews(code) {
    const searchURL =
        "https://finance.daum.net/content/news?perPage=5&category=economy&searchType=all&keyword=A" +
        code;
    let newsList = [];

    let html = await getHtml(searchURL, code);
    let news = html.data["data"];

    news.filter((_news) => _news["title"] && _news["imageUrl"]).map((_news) => {
        newsList.push({
            head: _news["title"],
            link: _news["imageUrl"],
            summary: _news["summary"],
        });
    });

    return newsList;
}

module.exports = { getNews };

getNews("035420").then((ret) => {
    console.log(ret);
});
