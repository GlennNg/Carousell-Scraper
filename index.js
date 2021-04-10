const fetch = require('node-fetch');
const fs = require('fs');
const cheerio = require('cheerio');

//file name
let path = 'query.csv';
//Query set to search Mcycle 2A for sale
var queryURL = 'https://www.carousell.sg/categories/motorcycles-108/motorcycles-for-sale-1592/class-2a-1594/?sort_by=time_created%2Cdescending'
//rootdomain
var rootDomain = "https://www.carousell.sg"


//scrapping page
fetch(queryURL)
    .then(res => res.text())
    .then(body => {
        //parsing the body to cheerio to load HTML DOM
        const $ = cheerio.load(body);
        var anchors = []
        var links = $("a");
        links.each(function (i, link) {
            if ($(link).attr("href").substring(0, 3) == "/p/" && $(link).attr("href") != "") {
                anchors[i] = $(link).attr("href");
                writeToFile(rootDomain + $(link).attr("href"));
            }
        });
    })

//fetch description
// fetch("https://www.carousell.sg/p/honda-sport-bike-cb400m-for-sales-coe-till-15-1-2024-renewable-6-years-old-bike-liquid-cooling-4-in-line-4-stroke-engine-low-mileage-40-000km-in-tip-top-condition-comes-with-ghc-1000-km-one-month-warranty-1058507887/?t-id=GAdGoYIjvp_1618067540976&t-referrer_browse_type=categories&t-referrer_category_id=1594&t-referrer_request_id=pPgFSpyQBITcj1Vs&t-referrer_sort_by=popular&t-tap_index=5")
//     .then(res => res.text())
//     .then(body => {
//         const $ = cheerio.load(body);
//         //D_by M_iz D_bI M_iJ D_bL M_iM D_bN M_iO D_bR M_iS D_bT M_iU D_bV M_iW D_gE M_BU D_gF M_BV D_bu
//         $("div > p .D_by, .M_iz, .D_bI, .M_iJ, .D_bL, .M_iM, .D_bN, .M_iO, .D_bR, .M_iS, .D_bT, .M_iU, .D_bV, .M_iW, .D_gE, .M_BU, .D_gF, .M_BV, .D_bu").each(function (i, object) {
//             if ($(object).attr("class") == "D_by M_iz D_bI M_iJ D_bL M_iM D_bN M_iO D_bR M_iS D_bT M_iU D_bV M_iW D_gE M_BU D_gF M_BV D_bu") {
//                 console.log($(object).text())
//             }
//         })
//     })

//Fetch price
// fetch("https://www.carousell.sg/p/honda-sport-bike-cb400m-for-sales-coe-till-15-1-2024-renewable-6-years-old-bike-liquid-cooling-4-in-line-4-stroke-engine-low-mileage-40-000km-in-tip-top-condition-comes-with-ghc-1000-km-one-month-warranty-1058507887/?t-id=GAdGoYIjvp_1618067540976&t-referrer_browse_type=categories&t-referrer_category_id=1594&t-referrer_request_id=pPgFSpyQBITcj1Vs&t-referrer_sort_by=popular&t-tap_index=5")
//     .then(res => res.text())
//     .then(body => {
//         const $ = cheerio.load(body);
//         //D_by M_iz D_bI M_iJ D_bL M_iM D_bO M_iP D_bR M_iS D_bT M_iU D_bW M_iX D_C D_bt
//         $("div > p .D_by, .M_iz, .D_bI, .M_iJ, .D_bL, .M_iM, .D_bN, .M_iO, .D_bR, .M_iS, .D_bT, .M_iU, .D_bV, .M_iW, .D_gE, .M_BU, .D_gF, .M_BV, .D_bu").each(function (i, object) {
//             if ($(object).attr("class") == "D_by M_iz D_bI M_iJ D_bL M_iM D_bO M_iP D_bR M_iS D_bT M_iU D_bW M_iX D_C D_bt") {
//                 // object = $(object).attr("span").remove();
//                 console.log($(object).text())
//             }
//         })
//     })

//helper functions
function writeToFile(value) {
    fs.appendFile(path, value + "\n", function (err) {
        if (err) {
            console.log(err)
        };
        console.log('Saved!');
    });
}