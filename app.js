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

    let accountManager = new AccountManager.AccountManager();

        app.set("view engine", "ejs");
    app.use( express.static( "pub" ) );
    app.get("/", (req,res) => {
        res.redirect("/pub/index.html");
    });

    app.get("/home", (req,res) => {
        res.render( "templates/home.ejs" );
    });

    app.get("/profile", (req,res) => {
        let name = req.query["name"];
        let currentUser = req.session.username;
        let bio = req.session.bio;
        //bio = "THIS IS MY BIO!";
        //req.session.privacy = true;
        let privacy = req.session.privacy;
        res.render( "templates/profile.ejs",
        {username: name, currentUser: currentUser, privacy: privacy, bio: req.session.bio});       
    });

    app.get("/settings", (req,res) => {
        let currentUser = req.session.username;
        req.session.privacy = false;
        let privacy = req.session.privacy;
        let changeSettings = true;
        req.session.bio = "bio";
        let bio = req.session.bio;
        req.session.regenerate( () => {
            if(changeSettings)
            {
                req.session.username = req.query["currentUser"];
                req.session.privacy = req.query["privacy"];
                req.session.bio = req.query["bio"];

                currentUser = req.session.username;
                privacy = req.session.privacy;
                changeSettings = false;
                bio = req.session.bio;
                res.render( "templates/settings.ejs",
                {currentUser: currentUser, privacy: privacy, edit:changeSettings, bio: bio});
                return;
            }
            
        })
        
    });

    app.get("/register", (req,res)=>{
        let uname = req.query["username"];
        let passwd = req.query["password"];
        
        if( uname === undefined && passwd === undefined ){
            res.render( "templates/register.ejs" );
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
                //res.send("Account registered! You may now go to your profile by clicking on your avatar in the top right corner of the screen.");
                req.session.privacy = false;
                let privacy = req.session.privacy;
                req.session.bio = "This user does not have a bio yet!"
                let bio = req.session.bio
                res.render( "templates/profile.ejs",
                {username: uname, currentUser: uname, privacy: privacy, bio: bio});
                return;

            });
        }else
            res.status(409).send("Duplicate account");


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