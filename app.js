"use strict";

let express = require("express");
let AccountManager = require("./AccountManager");
const session = require("express-session");
let fs = require("fs");
let formidable = require("formidable");

function startServer(){
    let app = express();

    app.use(session({
        resave:false,
        saveUninitialized: false,
        secret: "foo"
    }));

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
        
        if( uname === undefined || passwd === undefined || uname.length === 0 || passwd.length === 0 ){
            res.status(400).send("Error");
            return;
        }
        if( accountManager.addAccount(uname,passwd)){
            req.session.regenerate( () => {
                req.session.username = uname;
                res.send("OK");
            });
        }else
            res.status(409).send("Duplicate account");
    });

    app.get("/who", (req,res) => {
        if( req.session && req.session.username )
            res.send(req.session.username);
        else
            res.send("");
    });


    app.get("/getavatar", (req, res) => {
        fs.readFile( "joker.png", null, (err,data) => {
            if( err ){
                res.status(404).send("NOT FOUND!");
            } else {
                res.set("Content-type","image/png");
                res.status(200);
                res.send(data);
            }
        });
    });

    app.post("/setavatar", (req, res) => {
        let F = formidable( { maxFieldSize: 1*1024*1024, multiples: true } );
        F.parse( req, (err,fields,files) => {
            let av = fields["avatar"];
            let idx = av.indexOf(",");
            let avatar = Buffer.from(av.substring(idx+1),"base64");
            console.log("SRV:",avatar);
            res.status(200);
            res.send("OK");
        });
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