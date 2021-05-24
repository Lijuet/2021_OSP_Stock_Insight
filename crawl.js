const index = require("./scripts/crawl_index.js");
const coinfo = require("./scripts/crawl_coinfo.js");
const code = require("./scripts/crawl_code.js");
const news = require("./scripts/crawl_head.js");
//console.log(code.getCodeWithName("삼성전자"));

/* 1. 버튼 클릭 -> index 값 반환 */
/* 현재 클릭된 버튼 타입(KOREA/WORLD) */
let button_type = true;

let KOREA = document.getElementById("KOREA");
KOREA.addEventListener("click", () => {
    /*KOSPI/KOSDAQ/KPI200 값 반환*/
    button_type = true;
    index.getKoreaIndex().then((indexKorea) => {
        console.log(indexKorea);
        let first = document.querySelector("#first_info");
        first.innerHTML = "KOSPI  " + indexKorea.KOSPI;

        let second = document.querySelector("#second_info");
        second.innerHTML = "KOSDAQ  " + indexKorea.KOSDAQ;

        let third = document.querySelector("#third_info");
        third.innerHTML = "KPI200  " + indexKorea.KPI200;
    });
});

let WORLD = document.getElementById("WORLD");
WORLD.addEventListener("click", () => {
    /*DJI/NAS/SPI 값 반환*/
    button_type = false;
    index.getWorldIndex().then((ret) => {
        let first = document.querySelector("#first_info");
        first.innerHTML = "DJI  " + ret.DJI;

        let second = document.querySelector("#second_info");
        second.innerHTML = "NAS  " + ret.NAS;

        let third = document.querySelector("#third_info");
        third.innerHTML = "SPI  " + ret.SPI;
    });
});

/* 새로 고침 */
let refresh = document.getElementById("refresh");
refresh.addEventListener("click", () => {
    /*크롤링 값 반환*/
    if (button_type === true) {
        /*KOREA 일때*/
        index.getKoreaIndex().then((indexKorea) => {
            console.log(indexKorea);
            let first = document.querySelector("#first_info");
            first.innerHTML = "KOSPI  " + indexKorea.KOSPI;
            let second = document.querySelector("#second_info");
            second.innerHTML = "KOSDAQ  " + indexKorea.KOSDAQ;
            let third = document.querySelector("#third_info");
            third.innerHTML = "KPI200  " + indexKorea.KPI200;
        });
    } else {
        /*WORLD 일때*/
        index.getWorldIndex().then((ret) => {
            let first = document.querySelector("#first_info");
            first.innerHTML = "DJI  " + ret.DJI;
            let second = document.querySelector("#second_info");
            second.innerHTML = "NAS  " + ret.NAS;
            let third = document.querySelector("#third_info");
            third.innerHTML = "SPI  " + ret.SPI;
        });
    }
});

/* 2. 기업 검색 -> 정보 반환 */
/*기업 검색 했을때*/
let search = document.getElementById("search");
search.addEventListener("click", () => {
    let input = document.querySelector("#company_input");
    let text = input.value;
    let falg = true;

    if (String(text).length === 0) return;

    let co_code = "";
    let flag = true;

    co_code = code.getCode(text);
    if (co_code.length < 6) {
        co_code = text;
    }

    coinfo.getPrice(co_code).then((ret) => {
        if (ret.name === "") {
            let today_price = document.getElementById("today_price");
            today_price.innerHTML = "알 수 없는 기업 Unknown Coporation";

            let today_date = document.getElementById("today_date");
            today_date.innerHTML = ret.date;
        } else {
            let today_price = document.getElementById("today_price");
            let today_date = document.getElementById("today_date");
            today_price.innerHTML = ret.name + " " + ret.price;
            today_date.innerHTML = ret.date;
        }
    });

    /* 왼쪽 테이블 변경 */

    coinfo.getPrevPrice(co_code).then((ret) => {
        if (ret.today != "") {
            let prev_day_sp = document.querySelector("#prev_day_sp");
            prev_day_sp.innerHTML = ret.prev_day;
            let prev_week_sp = document.querySelector("#prev_week_sp");
            prev_week_sp.innerHTML = ret.prev_week;
            let prev_mon_sp = document.querySelector("#prev_mon_sp");
            prev_mon_sp.innerHTML = ret.prev_mon;
            let prev_year_sp = document.querySelector("#prev_year_sp");
            prev_year_sp.innerHTML = ret.prev_year;
            let prev_day_rate = document.getElementById("prev_day_ra");
            prev_day_rate.innerHTML = String(ret.day_rate);
            let prev_week_rate = document.getElementById("prev_week_ra");
            prev_week_rate.innerHTML = String(ret.week_rate);
            let prev_mon_rate = document.getElementById("prev_mon_ra");
            prev_mon_rate.innerHTML = String(ret.mon_rate);
            let prev_year_rate = document.getElementById("prev_year_ra");
            prev_year_rate.innerHTML = String(ret.year_rate);

            if (ret.day_rate > 0) {
                prev_day_rate.innerHTML = "+" + prev_day_rate.innerHTML;
                prev_day_rate.style.color = "red";
            }

            if (ret.week_rate > 0) {
                prev_week_rate.innerHTML = "+" + prev_week_rate.innerHTML;
                prev_week_rate.style.color = "red";
            }

            if (ret.mon_rate > 0) {
                prev_mon_rate.innerHTML = "+" + prev_mon_rate.innerHTML;
                prev_mon_rate.style.color = "red";
            }

            if (ret.year_rate > 0) {
                prev_year_rate.innerHTML = "+" + prev_year_rate.innerHTML;
                prev_year_rate.style.color = "red";
            }

            if (ret.day_rate < 0) {
                prev_day_rate.style.color = "blue";
            }

            if (ret.week_rate < 0) {
                prev_week_rate.style.color = "blue";
            }

            if (ret.mon_rate < 0) {
                prev_mon_rate.style.color = "blue";
            }

            if (ret.year_rate < 0) {
                prev_year_rate.style.color = "blue";
            }

            if (ret.day_rate === 0) {
                prev_day_rate.style.color = "black";
            }

            if (ret.week_rate === 0) {
                prev_week_rate.style.color = "black";
            }

            if (ret.mon_rate === 0) {
                prev_mon_rate.style.color = "black";
            }

            if (ret.year_rate === 0) {
                prev_year_rate.style.color = "black";
            }
        }
    });
    /* 오른쪽 테이블 변경 */
        
    coinfo.getTradeCompare(co_code).then((ret) => {
        let cop1 = document.getElementById("co1");
        cop1.innerHTML = ret[0].name;
        let cop2 = document.getElementById("co2");
        cop2.innerHTML = ret[1].name;
        let cop3 = document.getElementById("co3");
        cop3.innerHTML = ret[2].name;
        let cop4 = document.getElementById("co4");
        cop4.innerHTML = ret[3].name;

        let cop1_PER = document.getElementById("PER_co1");
        let cop1_ROE = document.getElementById("ROE_co1");
        let cop1_PBR = document.getElementById("PBR_co1");
        cop1_PER.innerHTML = ret[0].PER;
        cop1_ROE.innerHTML = ret[0].ROE;
        cop1_PBR.innerHTML = ret[0].PBR;

        let cop2_PER = document.getElementById("PER_co2");
        let cop2_ROE = document.getElementById("ROE_co2");
        let cop2_PBR = document.getElementById("PBR_co2");
        cop2_PER.innerHTML = ret[1].PER;
        cop2_ROE.innerHTML = ret[1].ROE;
        cop2_PBR.innerHTML = ret[1].PBR;

        let cop3_PER = document.getElementById("PER_co3");
        let cop3_ROE = document.getElementById("ROE_co3");
        let cop3_PBR = document.getElementById("PBR_co3");
        cop3_PER.innerHTML = ret[2].PER;
        cop3_ROE.innerHTML = ret[2].ROE;
        cop3_PBR.innerHTML = ret[2].PBR;

        let cop4_PER = document.getElementById("PER_co4");
        let cop4_ROE = document.getElementById("ROE_co4");
        let cop4_PBR = document.getElementById("PBR_co4");
        cop4_PER.innerHTML = ret[3].PER;
        cop4_ROE.innerHTML = ret[3].ROE;
        cop4_PBR.innerHTML = ret[3].PBR;
    });
    

    coinfo.getFinance(co_code).then((ret) => {
        if (ret.ROE.length != 0) {
            let ROE_201 = document.getElementById("ROE_20.1");
            ROE_201.innerHTML = ret.ROE[5];
            let ROE_202 = document.getElementById("ROE_20.2");
            ROE_202.innerHTML = ret.ROE[6];
            let ROE_203 = document.getElementById("ROE_20.3");
            ROE_203.innerHTML = ret.ROE[7];
            let ROE_204 = document.getElementById("ROE_20.4");
            ROE_204.innerHTML = ret.ROE[8];
            let ROE_211 = document.getElementById("ROE_21.1");
            ROE_211.innerHTML = ret.ROE[9];
            let PER_201 = document.getElementById("PER_20.1");
            PER_201.innerHTML = ret.PER[5];
            let PER_202 = document.getElementById("PER_20.2");
            PER_202.innerHTML = ret.PER[6];
            let PER_203 = document.getElementById("PER_20.3");
            PER_203.innerHTML = ret.PER[7];
            let PER_204 = document.getElementById("PER_20.4");
            PER_204.innerHTML = ret.PER[8];
            let PER_211 = document.getElementById("PER_21.1");
            PER_211.innerHTML = ret.PER[9];
            let PBR_201 = document.getElementById("PBR_20.1");
            PBR_201.innerHTML = ret.PBR[5];
            let PBR_202 = document.getElementById("PBR_20.2");
            PBR_202.innerHTML = ret.PBR[6];
            let PBR_203 = document.getElementById("PBR_20.3");
            PBR_203.innerHTML = ret.PBR[7];
            let PBR_204 = document.getElementById("PBR_20.4");
            PBR_204.innerHTML = ret.PBR[8];
            let PBR_211 = document.getElementById("PBR_21.1");
            PBR_211.innerHTML = ret.PBR[9];
        }
        
    });

    news.getNews(co_code).then((ret) => {
        let root = ret[0].link;
        for (let i = 1; i < 11; ++i) {
            let idx = String(i);
            let head = document.getElementById("news" + idx + "_list");
            head.innerHTML = ret[i].head;
            head.setAttribute(
                "onclick",
                'window.open("' + root + ret[i].link + '")'
            );
        }
    });
        
        
    

   

    input.value = "";
});
