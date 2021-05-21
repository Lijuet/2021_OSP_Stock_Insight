const index = require("./scripts/crawl_index.js");

let KOREA = document.getElementById("KOREA");
KOREA.addEventListener("click", () => {
    /*크롤링 값 반환*/
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
    /*크롤링 값 반환*/

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
});
