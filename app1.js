//made by Jared Phillips
"use strict";

let express = require("express");
let AccountManager = require("./AccountManager");


function startServer(){
    let app = express();
    app.use( express.static( "pub" ) );
    let accountManager = new AccountManager.AccountManager();
    app.get("/", (req,res) => { res.sendFile("C:/Users/jared/Desktop/sprint2/search.html"); });
    app.get("/", (req, res) => {
        res.send("INDEX!");
    });

    app.get("/register", (req,res)=>{
        let uname = req.query["username"];
        let uID = req.query["userID"];

        if( uname === undefined && uID === undefined){
            res.send("THIS IS THE REGISTRATION PAGE");
            return;
        }
        
        if( uname === undefined || uname.length === 0 || uID === undefined || uID.length === 0){
            res.status(400).send("Error");
            return;
        }
        if( accountManager.findAccount(uname, uID))
            res.send("Account Found");
        else
            res.status(409).send("Account not Found");

    });

    let srv = app.listen(2021);
    return srv;
}
function stopServer(srv){
    srv.close();
}

//if we're being run directly from command line
if( module  === require.main )
    startServer();

exports.startServer = startServer;
exports.stopServer = stopServer;