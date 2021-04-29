"use strict"


let report_form = require("report")

class report_handler
{
    constructor()
    {
        let reports = new Map();
    }

    generate_report(uID,reason,body)
    {
        let rID =Math.random()*1000;
        let new_form = report_form(uID,reason,body);
        for (let [k, v] of myMap)
        {
            if(v)
            let rID =Math.random()*1000;
            else
            reports.set(new_form, rID);
        }
    }

}

exports.report_handler = report_handdler;