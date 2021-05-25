StockInsight
============
#### With the stock market gaining attention these days, A lot of people started investing in stocks. Naturally, many people try to get information about investing , but it is very difficult. As a result, many people make speculative investments only by looking at stock price charts , not value oriented investments.
#### To solve these problems our service intuitively provides the basic information necessary for stock investment. This allows beginners of stock investment to make rational investments using the entity's information.
- - -
## Features

![image](https://user-images.githubusercontent.com/79784618/119445667-2500f400-bd68-11eb-9c7e-7ece5fb49a68.png)


### Demo link
https://youtu.be/kd1oBAB685Q

### V1

1. Show Index information
    - Show major index information with refresh button
    - KOSPI, KOSDAQ, KPI200, NAS, DAJ, SPI
2. Show major stock information
    - Show stock price about entered code number.
    - Show financial indicators quarterly.
    - ROE, PER, PBR

### V2

1. Show Head News
    - Show news with head line.
2. Update search company
    - Can search either company name or code.
3. Show financial indicators of the same industry
    - Show financial indicators 
    - ROE, PER, PBR
- - -

## How to Install

1. npm install 
2. npm install --save-dev @electron-forge/cli
3. npx electron-forge import
4. npm run make

- - - 

## How to Use

1. Watch the index information
    - if you click the button 'KOREA', you can see the information of KOSPI, KOSDAQ, KPI200.
    - if you click the button 'WORLD', you can see the information of NAS, DAJ, SPI.
    - if you click the refresh button, you can see the recent information.

2. Watch the stock information
        
    1. Type the company name or code exactly and click search button

    2. You can see the stock information of searched company
        - stock price and date of today
        - stock price of the past and the figure compared to today
        - financial indicators organized quarterly
        - head news with head line
        - financial indicators of the same industry
