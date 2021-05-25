const axios = require("axios");
const cheerio = require("cheerio");

async function getHTML(url) {
    try {
        return await axios.get(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
            },
        });
    } catch (error) {
        console.log(error);
    }
}

function parsingTitle(str) {
    let flag = true;
    let pos = 0;
    let ret = "";

    let element = "";
    while (flag) {
        if (str[pos] == "\t" || str[pos] == "\n") {
            if (element.length != 0) {
                ret = element;
                flag = false;
            }
            pos++;
            continue;
        }
        element += str[pos];
        pos++;
    }

    return ret;
}

async function getNews(code) {
    let url = "https://finance.naver.com/item/main.nhn?code=" + code;

    let result = [];

    for (let i = 0; i < 11; ++i) {
        let news = {
            head: "",
            link: "",
        };

        result.push(news);
    }

    await getHTML(url).then((html) => {
        const $ = cheerio.load(html.data);

        result[0].link = "https://finance.naver.com";

        // valid test
        if ($(".sub_section.news_section").text() != "") {
            for (let i = 1; i < 6; ++i) {
                let idx = String(i);
                let tmp = $(".sub_section.news_section")
                    .children("ul:nth-child(2)")
                    .children("li:nth-child(" + idx + ")")
                    .children("span.txt")
                    .text();
                result[i].head = parsingTitle(tmp);
            }

            for (let i = 1; i < 6; ++i) {
                let idx = String(i);
                result[i].link = $(".sub_section.news_section")
                    .children("ul:nth-child(2)")
                    .children("li:nth-child(" + idx + ")")
                    .children("span.txt")
                    .children("a")
                    .attr("href");
            }

            for (let j = 6; j < 11; ++j) {
                let idx = String(j - 5);
                let tmp = $(".sub_section.news_section")
                    .children("ul.line_dot")
                    .children("li:nth-child(" + idx + ")")
                    .children("span.txt")
                    .text();
                result[j].head = parsingTitle(tmp);
            }

            for (let j = 6; j < 11; ++j) {
                let idx = String(j - 5);
                result[j].link = $(".sub_section.news_section")
                    .children("ul.line_dot")
                    .children("li:nth-child(" + idx + ")")
                    .children("span.txt")
                    .children("a")
                    .attr("href");
            }
        }
    });

    return new Promise((resolve) => {
        resolve(result);
    });
}

module.exports = { getNews };

getNews("000000").then((ret) => {
    console.log(ret);
});
