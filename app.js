"use strict";

let express = require("express");
let AccountManager = require("./AccountManager");
let MemeManager = require("./MemeManager");
const session = require("express-session");
function startServer(){
    let app = express();
    
    app.use( express.static( "pub" ) );

    app.use(session({
        resave:false,
        saveUninitialized: false,
        secret: "fojogjhawogfjuaewouwo"
    }));
    
    let memeManager = new MemeManager.MemeManager();
    let accountManager = new AccountManager.AccountManager();
    app.get("/", (req,res) => {
        res.sendFile("/pub/index.html");
        
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
        if(req.session && req.session.username){
            let currentUser = req.session.username;
            res.send(currentUser);
        } else {
            res.send("not logged in");
        }
    });

    app.get("/favorites", (req,res) => {
        if(req.session && req.session.username){
            let currentUser = req.session.username;
            res.send(currentUser + "'s Favorites Page!");
            let index = 0;
            while(!(memeManager.getFavorite(index) == null))
            {
                if(memeManager.getFavorite(index) != 0)
                {
                    res.send(memeManager.getFavorite(index));
                }
                index++;
            }
        } else {
            res.send("not logged in");
        }
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