"use strict";

class Meme{
    constructor(year,month_minus_one,day){
        this.date = new Date(year,month_minus_one,day);
    }
}

exports.Meme = Meme;