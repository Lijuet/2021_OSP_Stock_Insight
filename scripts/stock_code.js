const fs = require("fs");

function getCode2NameDict() {
    const file_csv = fs.readFileSync("./data/stock_code_data.csv");
    const stock_code = file_csv.toString();
    const rows = stock_code.split("\n");

    const code2name = [];
    for (let i = 1; i < rows.length; i++) {
        row = rows[i].split(",");
        const code = "0".repeat(6 - row[0].length) + row[0];

        if (code && row[1]) code2name[code] = row[1];
        if (code === "005930") code2name[code] = "삼성전자";
    }
    // console.log(code2name);
    return code2name;
}

function getName2CodeDict() {
    const file_csv = fs.readFileSync("./data/stock_code_data.csv");
    const stock_code = file_csv.toString();
    const rows = stock_code.split("\n");

    const name2code = [];
    for (let i = 1; i < rows.length; i++) {
        row = rows[i].split(",");
        const code = "0".repeat(6 - row[0].length) + row[0];

        if (code && row[1]) name2code[row[1]] = code;
        if (code === "005930") name2code["삼성전자"] = "005930";
    }
    return name2code;
}

function getCodeWithName(stockName) {
    const Name2CodeDict = getName2CodeDict();
    if (stockName in Name2CodeDict) return Name2CodeDict[stockName];
    else return -1;
}

function getNameWithCode(stockCode) {
    const Code2NameDict = getCode2NameDict(); // 먼저 Dictionary를 불러온다.
    if (stockCode in Code2NameDict) return Code2NameDict[stockCode];
    else return -1;
}

// 주식 이름 입력시 주식 코드값 얻는 방법
console.log(getCodeWithName("삼성전자"));
console.log(getCodeWithName("한진칼우"));

// 주식 코드값 입력시 주식 이름 얻는 방법
console.log(getNameWithCode("005930"));
console.log(getNameWithCode("18064K"));
