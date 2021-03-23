"use strict";

const sortType = {
    INCREASING: "increasing",   //oldest
    DECREASING: "decreasing",   //most recent
};

//list must be an array of Meme objects
//start_date and end_date must be Date objects
//sort_type must be "increasing" or "decreasing"
function searchByDate(list, start_date, end_date, sort_type){
    if(!(list instanceof Array)){return -1}
    if(sort_type != sortType.INCREASING && sort_type != sortType.DECREASING){return -1}
    if(!(start_date instanceof Date) && start_date){return -1}
    if(!(end_date instanceof Date) && end_date){return -1}
    let sliced_list = [];
    if(start_date && end_date){
        for(let i=0;i<list.length;i++){
            if(list[i].date>start_date && list[i].date<end_date){
                sliced_list.push(list[i]);
            }
        }
    }else if(start_date){
        for(let i=0;i<list.length;i++){
            if(list[i].date>start_date){
                sliced_list.push(list[i]);
            }
        }
    }else if(end_date){
        for(let i=0;i<list.length;i++){
            if(list[i].date<end_date){
                sliced_list.push(list[i]);
            }
        }
    }else{
        sliced_list = list;
    }
    if(sort_type===sortType.INCREASING){
        sliced_list.sort(function(a, b){return a.date - b.date});
    }
    else if(sort_type===sortType.DECREASING){
        sliced_list.sort(function(a, b){return b.date - a.date});
    }
    return sliced_list
};

//string format: "mm/dd/yyyy"
function stringToDate(string){
    if(typeof string !== "string"){return -1}
    if(string.length!==10){return -1}
    if(string[2]!=="/" || string[5]!=="/"){return -1}
    let year = string.slice(6,10);
    let month = string.slice(0,2);
    let day = string.slice(3,5);
    if(Number(year)===NaN || Number(month)===NaN || Number(year)===NaN){return -1}
    return new Date(year, month-1, day); //The Date object stores months from 0 -> 11 (i.e. Jan is 0 and Dec is 11)
}

/*let startDate = new Date(2014,0,1);
let endDate = new Date(2016,1,1);
let testList = [new Date(2017,11,25), new Date(2015,3,2), new Date(2014,0,3), new Date(2015,3,2), new Date(2013,4,6)];
let newList = searchByDate(testList, startDate, endDate, sortType.INCREASING);
console.log(newList);

let teststring = "03/02/2017"
console.log(stringToDate(teststring));*/

exports.sort = {sortType, searchByDate, stringToDate};