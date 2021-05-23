/* crawl_copinfo v1.0.0 */

const axios = require("axios");
const cheerio = require("cheerio");

async function getHTML(url) {
    try {
        return await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"    },
    });
    } catch (error) {
        console.log(error);
    }
}

function parsingTable(str) {
    let idx = 0;
    let pos = 0;
    let ret = [];

    let element = "";
    while (idx < 10) {
        if (str[pos] == "\t" || str[pos] == "\n") {
            if (element.length != 0) {
                ret.push(element);
                idx++;
            }

            element = "";
            pos++;
            continue;
        }
        element += str[pos];
        pos++;
    }

    return ret;
}

function getRate(today, prev)
{
    let today_split = today.split(',');
    let prev_split = prev.split(',');

    let today_num = "";
    let prev_num = "";

    for (let i=0; i<today_split.length; ++i)
    {
        today_num = today_num + today_split[i];
    }

    for (let i=0; i<prev_split.length; ++i)
    {
        prev_num = prev_num + prev_split[i];
    }

    return Number(today_num) - Number(prev_num);
}
// result.date 값 파싱해야 함!
async function getPrice(code) {
    // 'code' is cop stock code
    let url = "https://finance.naver.com/item/main.nhn?code=" + code;
    // return value
    let result = {
        name: "",
        price: "",
        date: "",
    };

    await getHTML(url).then((html) => {
        const $ = cheerio.load(html.data);

        // get price date in html
        result.name = $(".new_totalinfo")
            .children(".h_company")
            .children(".wrap_company")
            .children("h2")
            .text();

        result.price = $(".rate_info", "#chart_area")
            .children(".today")
            .children(".no_today")
            .children(".no_down")
            .children(".blind")
            .text();

        if (result.price === "") {
            result.price = $(".rate_info", "#chart_area")
                .children(".today")
                .children(".no_today")
                .children(".no_up")
                .children(".blind")
                .text();
        }

        if (result.price === "")
        {
            result.price = $(".rate_info", "#chart_area")
                .children(".today")
                .children(".no_today")
                .children(".X")
                .children(".blind")
                .text();
        }
        // get real-time in html
        result.date = $(".date", "#time").text().slice(0, 10);
    });

    // return promise obj to process asyncronization
    return new Promise((resolve) => {
        resolve(result);
    });
}

async function getFinance(code) {
    // 'code' is cop stock code
    let url = "https://finance.naver.com/item/main.nhn?code=" + code;

    // return value
    let result = {
        PER: [],
        PBR: [],
        ROE: [],
    };

    await getHTML(url).then((html) => {
        const $ = cheerio.load(html.data);

        // crawlling ROE
        let tmp1 = $("div.section.cop_analysis")
            .children("div.sub_section")
            .children("table.tb_type1")
            .children("tbody")
            .children("tr:nth-child(6)")
            .children("td")
            .text();

        // crawlling PER
        let tmp2 = $("div.section.cop_analysis")
            .children("div.sub_section")
            .children("table.tb_type1")
            .children("tbody")
            .children("tr:nth-child(11)")
            .children("td")
            .text();

        // crawlling PBR
        let tmp3 = $("div.section.cop_analysis")
            .children("div.sub_section")
            .children("table.tb_type1")
            .children("tbody")
            .children("tr:nth-child(13)")
            .children("td")
            .text();

        // parsing tmp to make array
        if (tmp1 != "")
        {
            result.ROE = parsingTable(tmp1);
            result.PER = parsingTable(tmp2);
            result.PBR = parsingTable(tmp3);
        }
 
    });

    return new Promise((resolve) => {
        resolve(result);
    });
}

async function getPrevPrice(code) {
    let url =
        "https://finance.naver.com/item/sise_day.nhn?code=" + code + "&page=";

    // return value
    let result = {
        today: "",
        prev_day: "",
        prev_week: "",
        prev_mon: "",
        prev_year: "",

        day_rate: 0,
        week_rate: 0,
        mon_rate: 0,
        year_rate: 0,
    };

    // prev day and week
    await getHTML(url + "1").then((html) => {
        const $ = cheerio.load(html.data);

        result.today = $("table.type2")
            .children("tr:nth-child(3)")
            .children("td:nth-child(2)")
            .text();

        result.prev_day = $("table.type2")
            .children("tr:nth-child(4)")
            .children("td:nth-child(2)")
            .text();

        result.prev_week = $("table.type2")
            .children("tr:nth-child(11)")
            .children("td:nth-child(2)")
            .text();
    });

    await getHTML(url + "3").then((html) => {
        const $ = cheerio.load(html.data);
        result.prev_mon = $("table.type2")
            .children("tr:nth-child(4)")
            .children("td:nth-child(2)")
            .text();
    });

    await getHTML(url + "27").then((html) => {
        const $ = cheerio.load(html.data);
        result.prev_year = $("table.type2")
            .children("tr:nth-child(4)")
            .children("td:nth-child(2)")
            .text();
        
    });

    return new Promise((resolve) => {

        result.day_rate = getRate(result.today, result.prev_day);
        result.week_rate = getRate(result.today, result.prev_week);
        result.mon_rate = getRate(result.today, result.prev_mon);
        result.year_rate = getRate(result.today, result.prev_year);
        
        resolve(result);
    });
}

module.exports = { getPrice, getFinance, getPrevPrice };
// test functions
getPrice("000").then((ret) => {
    console.log(ret);
});
getFinance("000").then((ret) => {
    console.log(ret);
});

getPrevPrice("000").then((ret) => {
    console.log(ret);
});
