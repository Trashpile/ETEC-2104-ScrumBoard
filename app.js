"use strict"

let express = require("express");
let formidable = require("formidable");
let fs = require("fs");

let app = express();
app.use( express.static( "pub" ) );
app.get("/", (req,res) => {res.redirect("/pub/index.html"); });

app.post("/login", (req,res) => {
    console.log("In the login page");
    let F = formidable({
        maxFieldSize: 1000000,
        multiples: true
    });
    F.parse(req, (err,fields,files) => {
        let username = fields["username"];
        let password = fields["password"];
        console.log("We got:",username,password);
        res.send("Ok!");
    });
})

app.listen(2021);
console.log("Listening on 2021")
