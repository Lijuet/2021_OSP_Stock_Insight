const index = require("./scripts/crawl_index.js");
const coinfo = require("./scripts/crawl_coinfo.js");

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
let div = document.createElement("div");
div.className = "search_bar";
let button = document.querySelector("#search");
button.addEventListener("click", () => {
    let input = document.querySelector("#company_input");
    let text = input.value;

    if (text.length === 0) return;
    else {
        let co_code = coinfo.parsingTable(text);

        let today_info = document.querySelector("#today_info");
        today_info.innerHTML =
            coinfo.getPrice(co_code).result.price +
            " " +
            coinfo.getPrice(co_code).result.date;

        /* 왼쪽 테이블 변경 */
        let prev_day_sp = document.querySelector("#prev_day_sp");
        prev_day_sp.innerHTML = "test";

        let prev_week_sp = document.querySelector("#prev_week_sp");
        prev_week_sp.innerHTML = coinfo.getPrevPrice(co_code).result.prev_week;

        let prev_mon_sp = document.querySelector("#prev_mon_sp");
        prev_mon_sp.innerHTML = coinfo.getPrevPrice(co_code).result.prev_mon;

        let prev_year_sp = document.querySelector("#prev_year_sp");
        prev_year_sp.innerHTML = coinfo.getPrevPrice(co_code).result.prev_year;

        /* 오른쪽 테이블 변경 */
        let ROE_201 = document.querySelector("#ROE_20.1");
        ROE_201.innerHTML = coinfo.getFinace(co_code).result.ROE[5];

        let ROE_202 = document.querySelector("#ROE_20.2");
        ROE_202.innerHTML = coinfo.getFinace(co_code).result.ROE[6];

        let ROE_203 = document.querySelector("#ROE_20.3");
        ROE_203.innerHTML = coinfo.getFinace(co_code).result.ROE[7];

        let ROE_204 = document.querySelector("#ROE_20.4");
        ROE_204.innerHTML = coinfo.getFinace(co_code).result.ROE[8];

        let ROE_211 = document.querySelector("#ROE_21.1");
        ROE_211.innerHTML = coinfo.getFinace(co_code).result.ROE[9];

        let PER_201 = document.querySelector("#PER_20.1");
        PER_201.innerHTML = coinfo.getFinace(co_code).result.PER[5];

        let PER_202 = document.querySelector("#PER_20.2");
        PER_202.innerHTML = coinfo.getFinace(co_code).result.PER[6];

        let PER_203 = document.querySelector("#PER_20.3");
        PER_203.innerHTML = coinfo.getFinace(co_code).result.PER[7];

        let PER_204 = document.querySelector("#PER_20.4");
        PER_204.innerHTML = coinfo.getFinace(co_code).result.PER[8];

        let PER_211 = document.querySelector("#PER_21.1");
        PER_211.innerHTML = coinfo.getFinace(co_code).result.PER[9];

        let PBR_201 = document.querySelector("#PBR_20.1");
        PBR_201.innerHTML = coinfo.getFinace(co_code).result.PBR[5];

        let PBR_202 = document.querySelector("#PBR_20.2");
        PBR_202.innerHTML = coinfo.getFinace(co_code).result.PBR[6];

        let PBR_203 = document.querySelector("#PBR_20.3");
        PBR_203.innerHTML = coinfo.getFinace(co_code).result.PBR[7];

        let PBR_204 = document.querySelector("#PBR_20.4");
        PBR_204.innerHTML = coinfo.getFinace(co_code).result.PBR[8];

        let PBR_211 = document.querySelector("#PBR_21.1");
        PBR_211.innerHTML = coinfo.getFinace(co_code).result.PBR[9];
    }

    input.value = "";
});
