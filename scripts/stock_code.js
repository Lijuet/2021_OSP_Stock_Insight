const fs = require("fs");

function getCode2NameDict(fileName) {
    const file_csv = fs.readFileSync("./data/stock_code_data.csv");
    const stock_code = file_csv.toString();
    const rows = stock_code.split("\r\n");

    const code2name = [];
    for (let i = 1; i < rows.length; i++) {
        row = rows[i].split(",");
        const code = "0".repeat(6 - row[0].length) + row[0];

        code2name[code] = row[1];
    }
    return code2name;
}

function getName2CodeDict(fileName) {
    const file_csv = fs.readFileSync("./data/stock_code_data.csv");
    const stock_code = file_csv.toString();
    const rows = stock_code.split("\r\n");

    const name2code = [];
    for (let i = 1; i < rows.length; i++) {
        row = rows[i].split(",");
        const code = "0".repeat(6 - row[0].length) + row[0];

        name2code[row[1]] = code;
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
console.log(getCodeWithName("포스코엠텍"));

// 주식 코드값 입력시 주식 이름 얻는 방법
console.log(getNameWithCode("009520"));
