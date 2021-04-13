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
        secret: "fojogjhawogfjuaewouwo"
    }));
function check(req){
    if(req!=undefined)
    {
        if(req.session.theme==undefined)
            req.session.theme = "light";

        if(req.session.privacy==undefined)
            req.session.privacy = false;

        if(req.session.bio==undefined)
            req.session.bio = "This user has no bio";
    }
      
}
    let accountManager = new AccountManager.AccountManager();

        app.set("view engine", "ejs");
    app.use( express.static( "pub" ) );
    app.get("/", (req,res) => {
        res.redirect("/pub/index.html");
    });

    app.get("/home", (req,res) => {
        if(req!= undefined)
        {
            check(req);
            res.render( "templates/home.ejs",
            {theme: req.session.theme});
        }
        else
        {
            res.render( "templates/home.ejs",
            {theme: "light"});
        }
       
    });

    app.get("/profile", (req,res) => {
        let name = req.query["name"];
        if(req!=undefined)
        {
            let currentUser = req.session.username;
            check(req)
            res.render( "templates/profile.ejs",
            {username: name, currentUser: currentUser, privacy: req.session.privacy, bio: req.session.bio, theme: req.session.theme});       
        }
        else{
            res.render( "templates/profile.ejs",
            {username: name, currentUser: "Guest", privacy: false, bio: "This user does not have a bio", theme: "light"});       
        }
    });

    app.get("/settings", (req,res) => {
        check(req);
        req.session.username = req.query["currentUser"];
        req.session.privacy = req.query["privacy"];
        req.session.bio = req.query["bio"];
        req.session.theme = req.query["theme"];

        let currentUser = req.session.username;
        let privacy = req.session.privacy;
        let bio = req.session.bio;
        let theme = req.session.theme;
        res.render( "templates/settings.ejs",
        {currentUser: currentUser, privacy: privacy, bio: bio, theme:theme});
    });

    app.get("/register", (req,res)=>{
        let uname = req.query["username"];
        let passwd = req.query["password"];
        if( uname === undefined && passwd === undefined ){
            res.render( "templates/register.ejs", {theme:req.session.theme} );
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
                req.session.privacy = false;
                let privacy = req.session.privacy;
                req.session.bio = "This user does not have a bio yet!";
                let bio = req.session.bio;
                req.session.theme = "light";
                let theme = req.session.theme;
                res.render( "templates/profile.ejs",
                {username: uname, currentUser: uname, privacy: privacy, bio: bio, theme:theme});
                return;

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