"use strict";

let express = require("express");
let formidable = require("formidable");
let fs = require("fs");
let sort = require("./sort").sort;
let Meme = require("./meme").Meme;

let testList = [new Meme(2017,11,25), new Meme(2015,3,2), new Meme(2014,0,3), new Meme(2015,3,2), new Meme(2013,4,6)];

let app = express();
app.use( express.static("pub") );
app.get("/", (req,res) => { res.redirect("/pub/index.html"); });

app.post("/searchbydate", (req,res) => {
    console.log("SEARCHING...");
    let F = formidable( {
        multiples: true
    });
    F.parse(req, (err,fields,files) => {
        let fromDate = sort.stringToDate(fields["fromDate"]);
        let toDate = sort.stringToDate(fields["toDate"]);
        let sortType = fields["sortType"];
        if(fromDate===-1){fromDate=null}
        if(toDate===-1){toDate=null}
        //console.log(fromDate,"\n",toDate,"\n",sortType);
        //console.log(typeof(fromDate));
        let newList = sort.searchByDate(testList, fromDate, toDate, sortType);
        console.log(newList);
        res.send(newList);
    });
})

app.listen(2021);
console.log("Listening on 2021");