"use strict";

let express = require("express");
let formidable = require("formidable");
let MemeManager = require("./MemeManager").MemeManager;
let formatDate = require("./FormatDate").formatDate;

let MM = MemeManager.getInstance("main.sql");
MM.truncateTable( () => {
    MM.addMeme("2019/01/03", () => {
        MM.addMeme("2018/01/01", () => {
            MM.addMeme("2020/03/02", () => {
                MM.addMeme("2019/12/25", () => {
                    MM.addMeme("2020/10/03");
                });
            });
        });
    });
});

let app = express();
app.use( express.static("pub") );
app.get("/", (req,res) => { res.redirect("/pub/index.html"); });

app.get("/search", (req,res) => { res.redirect("search.html"); });

app.post("/searchbydate", (req,res) => {
    console.log("SEARCHING...");
    let F = formidable( {
        multiples: true
    });
    F.parse(req, (err,fields,files) => {
        let fromDate = formatDate(fields["fromDate"]);
        let toDate = formatDate(fields["toDate"]);
        let sortType = fields["sortType"];
        if(fromDate===-1){fromDate="2001/01/01"}
        if(toDate===-1){toDate="2050/01/01"}
        MM.searchMemesByDate(fromDate, toDate, sortType, (newList) => {
            console.log(newList);
            res.send(newList);
        })
    });
})

app.listen(2021);
console.log("Listening on 2021");