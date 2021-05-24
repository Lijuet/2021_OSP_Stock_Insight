const fs = require("browserify-fs");

function codeParsing(code) {
    let num = 6 - code.length;
    let ret = code;

    for (let i = 0; i < num; ++i) {
        ret = "0" + ret;
    }

    return ret;
}

function getCode2NameDict() {
    const file_csv = fs.readFileSync(
        "C:/Users/USER/Desktop/4학기 자료/Opensource/final-project/2021_OSP_Stock_Insight/data/stock_code_data.csv"
    );
    const stock_code = file_csv.toString();
    let rows = stock_code.split("\r");

    let code2name = {};
    for (let i = 1; i < rows.length; i++) {
        row = rows[i].split(",");
        let code = codeParsing(row[0]);

        if (code && row[1]) code2name[code] = row[1];
        //if (code === "005930") code2name[code] = "삼성전자";
    }
    // console.log(code2name);
    return code2name;
}

function getName2CodeDict() {
    let file_csv = fs.readFileSync("./data/stock_code_data.csv");
    let stock_code = file_csv.toString();
    let rows = stock_code.split("\n");

    let name2code = {};
    for (let i = 1; i < rows.length; i++) {
        row = String(rows[i]).split(",");
        let code = codeParsing(rows[0]);

        if (code && row[1]) name2code[row[1].split("\r")[0]] = code;
        //if (code === "005930") name2code["삼성전자"] = "005930";
    }

    return name2code;
}

function getCodeWithName(stockName) {
    //const file_csv = fs.readFileSync("./data/stock_code_data.csv");

    let stock_code = "005930,삼성전자\n035420,NAVER\n";
    //let stock_code = file_csv.toString();
    //console.log(stock_code);
    let rows = stock_code.split("\n");

    let name2code = {};
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i].split(",");
        let code = row[0];

        if (code && row[1]) name2code[row[1]] = code;
        //if (code === "005930") name2code["삼성전자"] = "005930";
    }

    if (stockName in name2code) return name2code[stockName];
    else return -1;
}

function getNameWithCode(stockCode, path) {
    const Code2NameDict = getCode2NameDict(path); // 먼저 Dictionary를 불러온다.
    if (stockCode in Code2NameDict) return Code2NameDict[stockCode];
    else return -1;
}

module.exports = { getCodeWithName, getNameWithCode };

//console.log(kosdaq["국일제지"]);

// 주식 이름 입력시 주식 코드값 얻는 방법

/*
console.log(getCodeWithName("토니모리"));

console.log(getCodeWithName("한진칼우"));

// 주식 코드값 입력시 주식 이름 얻는 방법
console.log(getNameWithCode("035420"));
console.log(getNameWithCode("18064K"));
*/
