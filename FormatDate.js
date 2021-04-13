"use strict";

function formatDate(date){
    if(typeof date !== "string"){return -1}
    if(date.length !== 10){return -1}
    if(date[2] !== "/" || date[5] !== "/"){return -1}
    let year = date.slice(6,10);
    let month = date.slice(0,2);
    let day = date.slice(3,5);
    if(year < 0 || month <= 0 || month > 12 || day <= 0 || day > 31){return -1}
    date = year.concat("/",month);
    date = date.concat("/",day);
    return date;
}

exports.formatDate = formatDate;