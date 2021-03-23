"use strict";

let express = require("express");
let AccountManager = require("./AccountManager");


function startServer(){
    let app = express();

    let accountManager = new AccountManager.AccountManager();
    app.get("/", (req,res) => {
        res.send("INDEX!");
    });

    app.get("/register", (req,res)=>{
        let uname = req.query["username"];
        let passwd = req.query["password"];

        if( uname === undefined && passwd === undefined ){
            res.send("THIS IS THE REGISTRATION PAGE");
            return;
        }
        
        else if( uname === undefined || passwd === undefined || uname.length === 0 || passwd.length === 0 ){
            res.status(400).send("Error");
            return;
        }

        else if(uname.split("@")[0] === undefined || uname.split("@")[1] === undefined)
        {
            res.status(400).send("invalis username");
            return
        }

        else if( accountManager.addAccount(uname,passwd))
            res.send("OK");
        else
            res.status(409).send("Duplicate account");

    });

    app.get("/who", (req,res) => {
        res.send("");
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