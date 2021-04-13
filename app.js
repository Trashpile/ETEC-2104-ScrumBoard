"use strict"

let express = require("express");
let formidable = require("formidable");
let fs = require("fs");

function startServer(){
    let app = express();

    let accountManager = new AccountManager.AccountManager();
    app.get("/", (req,res) => {
        res.send("INDEX!");
    });
  
    app.use( express.static( "pub" ) );

    app.get("/register", (req,res)=>{
        let uname = req.query["username"];
        let passwd = req.query["password"];
    });

app.post("/login", (req,res) => {
    console.log("In the login page");
    let F = formidable({
        maxFieldSize: 1000000,
        multiples: true
    });
    F.parse(req, (err,fields,files) => {
        let username = fields["username"];
        let password = fields["password"];
        if( username === undefined ){
            res.send("INVALID");
            return;
        }
        if( password === undefined ){
            res.send("INVALID");
            return;
        }
        console.log("We got:",username,password);
        res.send("Ok!");

        AccountManager.getInstance().userExists( username, password, (userExists) => {
            if(username = AccountManager.getInstance().name ){
                 res.send("OK");   
            } else {
                res.send("ACCOUNT DOES NOT EXIST");
                }
            });
    });
})

    let srv = app.listen(2021);
    return srv;

function stopServer(srv){
    srv.close();
}
exports.startServer = startServer;
exports.stopServer = stopServer;
}
