"use strict";

let express = require("express");
let AccountManager = require("../Account-Related-Backend/Account-Manager");
let UserVar3 = require("../Account-Related-Backend/User-Var3");
const session = require("express-session");
let fs = require("fs");
let formidable = require("formidable");

function startServer(){
    let app = express();

    app.use(session({
        resave:false,
        saveUninitialized: false,
        secret: "fojogjhawogfjuaewouwo"
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
            console.log("Missing uname or password for register: username="+uname+" password="+passwd);
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
        if(req.session && req.session.username){
            let currentUser = req.session.username;
            res.send(currentUser);
        } else {
            res.send("");
        }
    });

    app.get("/getavatar", (req,res) => {
        if(req.session && req.session.username){
            let currentUser = req.session.username;
            let avdata = accountManager.getAvatar(currentUser);
            res.set("Content-type","image/png");
            res.status(200);
            res.send(avdata);
        } else {
            fs.readFile( "smile.png", null, (err,data) => {
                if( err ){
                    console.log(err);
                    res.status(404).send("NOT FOUND!");
                } else {
                    //MIME type   category/specific
                    //image/jpeg
                    //video/mpeg4
                    //audio/mp3
                    //audio/wav
                    //text/plain
                    //text/html
                    //application/octet-stream
                    res.set("Content-type","image/png");
                    res.status(200);
                    res.send(data);
                }
            });
        }
    });
    app.post( "/setavatar", (req,res) => {
        let F = formidable( { 
            maxFieldSize: 1*1024*1024, multiples: true
        } );
        F.parse( req, (err,fields,files) => {
            let av = fields["avatar"];
            // data:image/png;base64,....

            let idx = av.indexOf(",");
            if( idx < 0 ){
                console.log("NOT BASE");
            }
            let avatar = Buffer.from( decodeURIComponent(av.substring(idx+1)),"base64");

            if(req.session && req.session.username){
                let currentUser = req.session.username;
                accountManager.setAvatar(currentUser,avatar);
                res.set("Content-type","text/plain");
                res.status(200);
                res.send("OK");
            } else{
                res.status(403);    //should use something like 403
                res.set("Content-type","text/plain");
                res.send("You are not logged in");
            }
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