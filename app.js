"use strict";

let express = require("express");
let AccountManager = require("./AccountManager");
const session = require("express-session");
let fs = require("fs");
let formidable = require("formidable");

let upload_meme = require("./pub/uploadMeme/uploadMemeMain.js");


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
    let Accounts = accountManager.accounts;

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
        if(req!=undefined && accountManager.hasAccount(name))
        {
            let uname = req.session.username;
            check(req);
            res.render( "templates/profile.ejs",
            {username: name, currentUser: uname, privacy: Accounts.get(name).privacy, bio:Accounts.get(name).currentStatus, theme:req.session.theme, 
                friend:Accounts.get(uname).isFriend(Accounts.get(name).id)});       
        }
        else if(req!=undefined){
            let uname = req.session.username;
            check(req);
            res.render( "templates/profile.ejs",
            {username: undefined, currentUser: uname, privacy: true, bio:"", theme:req.session.theme, friend:false});    
           
        }
        else if (req == undefined && accountManager.hasAccount(name)){
            res.render( "templates/profile.ejs",
            {username: name, currentUser: "Guest", privacy: true, bio:"", theme: "light", friend:false});       
        }
        else{
            res.render( "templates/profile.ejs",
            {username: undefined, currentUser: "Guest", privacy: true, bio:"", theme: "light", friend:false});       
        }
    });

    app.get("/reportuser", (req,res) => {

        if(req.session && req.session.username){
            res.send("Report sent to Admin!");

            let username = req.query["username"];
            let report = req.query["report"];
        
            var nodemailer = require('nodemailer');

            var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'oopse2021@gmail.com',
                pass: 'oopse1234'
            }
            });

            var mailOptions = {
            from: 'oopse2021@gmail.com',
            to: 'oopse2021@gmail.com',
            subject: 'User Report for ' + username,
            text: report
            };

            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            });
        } else {
            res.send("Not Logged In");
        }

    })

        
    // });

    app.get("/settings", (req,res) => {
        check(req);
        //Accounts.get(req.session.username).isFriend();
        //let currentUser = req.session.username;
        let privacy = Accounts.get(req.session.username).privacy;
        let bio = Accounts.get(req.session.username).currentStatus;
        let theme = Accounts.get(req.session.username).theme;
        let newUser = req.query["newUser"];
        let friend = req.query["friend"];
        req.session.privacy = req.query["privacy"];
        req.session.bio = req.query["bio"];
        req.session.theme = req.query["theme"];
        res.render( "templates/settings.ejs",
        {privacy: privacy, bio: bio, theme:theme});
        if(req.session.privacy!=undefined && req.session.theme!=undefined && req.session.bio!=undefined){
            Accounts.get(req.session.username).SetPrivacy(req.session.privacy);
            Accounts.get(req.session.username).SetTheme(req.session.theme);
            Accounts.get(req.session.username).EnterStatus(req.session.bio);
            accountManager.addAccount(newUser,"password");
            Accounts.get(newUser).SetPrivacy(req.session.privacy);
            if(friend!="no"){
                Accounts.get(newUser).sendFriendRequest(Accounts.get(req.session.username).id, Accounts.get(req.session.username));
                Accounts.get(req.session.username).acceptFriendRequest(Accounts.get(newUser).id, Accounts.get(newUser));
            }
        }


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
                {username: uname, currentUser: uname, privacy: Accounts.get(uname).privacy, bio:Accounts.get(uname).currentStatus, theme:Accounts.get(uname).theme, friend:false});
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

    // Reserved /upload
    upload_meme.uploadMemeMain(app);
   
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