"use strict";

let express = require("express");
let fs = require("fs");
let AccountManager = require("./AccountManager");
let MemeManager = require("./MemeManager");
const session = require("express-session");
let tagging = require("./tagging");
let sqlite3 = require("sqlite3").verbose();

let conn = new sqlite3.Database("./priv/memedepository.sql");
let alt = new sqlite3.Database("./priv/tagWriteTest.sql")


function startServer(){
    let app = express();
    
    let TagPool = new tagging.TagPool("./priv/tagFile.txt");
    
    app.use( express.static( "pub" ) );

    app.use(session({
        resave:false,
        saveUninitialized: false,
        secret: "fojogjhawogfjuaewouwo"
    }));
    
    let memeManager = new MemeManager.MemeManager();
    let accountManager = new AccountManager.AccountManager();
    app.get("/", (req,res) => {
        res.sendFile("This is the index page. Nothing is here ... for now.");
    });
    
    app.get("/home", (req,res) => {
        if(req.session && req.session.username){
            res.redirect("home.html");
        } else {
            res.send("Not Logged In");
        }
    })

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
    
    app.get("/tagaccess", (req,res) => {
        TagPool.readTagFile(conn, () => {
            let string = "";
            let reqType = req.query["reqType"];
            if (reqType === undefined)
            {
                res.status(200).send("Nothing to see here!");
            }
            else if (reqType === "OFTags")
            {
                for (let i = 0; i < TagPool.getOfficialTags().length; i++)
                {
                    string = string + String(TagPool.getOfficialTags()[i].getString());
                }
                res.status(200).send(string);
            }
            else if (reqType === "UFTags")
            {
                for (let i = 0; i < TagPool.getUnofficialTags().length; i++)
                {
                    string = string + String(TagPool.getUnofficialTags()[i].getString());
                }
                res.status(200).send(string);
            }
            else if (reqType === "ITags")
            {
                for (let i = 0; i < TagPool.getInternalTags().length; i++)
                {
                    string = string + String(TagPool.getInternalTags()[i].getString());
                }
                res.status(200).send(string);
            }
        });
    });
    
    app.get("/memetags", (req,res) => {
        TagPool.readTagFile(conn, () => {
            let memestring = req.query["newMeme"];
            if (memestring === undefined)
            {
                res.status(200).send("Nothing to see here!");
            }
            else
            {
                let memelist = memestring.split(";");
                memelist[1] = memelist[1].split(",");
                if (memelist.length === 2 && memelist[1].length === 5)
                {
                    let newMeme = new tagging.Meme(memelist[0], [new tagging.Tag(memelist[1][0], memelist[1][1], memelist[1][2], memelist[1][3], memelist[1][4])], []);
                    res.status(200).send(newMeme.getName() + " is tagged with: " + newMeme.getExternalTags()[0].getTagENG());
                }
                else
                {
                    res.status(200).send("That wasn't the format!");
                }
            }
            res.send();
        });
    });
    
    app.get("/writetags", (req,res) => {
        TagPool.readTagFile(conn, () => {
            let tagstring = req.query["newTag"];
            if (tagstring === undefined)
            {
                res.status(200).send("Nothing to see here!");
            }
            else
            {
                let taglist = tagstring.split(",");
                if (taglist.length === 5)
                {
                let newTag = new tagging.Tag(taglist[0], taglist[1], taglist[2], taglist[3], taglist[4]);
                TagPool.addUnofficialTag(newTag);
                TagPool.writeTagFile(alt);
                res.status(200).send("Tag has been written.");
                }
                else
                {
                res.status(200).send("That wasn't the format!");
                }
            }
        });
    });

    app.get("/trending", (req,res) => {
    
        let M = new MemeManager.MemeManager();
        //Add some memes!
        //Default image for now
        let img = fs.readFileSync("avatar.png");
        M.memeData = 
        [
            new MemeManager.Meme(img, true, 1000, "funnymeme"),
            new MemeManager.Meme(img, true, 1000,"sadmeme"),
            new MemeManager.Meme(img, true, 1000,"fatmeme"),
            new MemeManager.Meme(img, true, 1000,"catmeme"),
            new MemeManager.Meme(img, true, 1000,"radmeme"),
            new MemeManager.Meme(img, true, 1000,"saddermeme"),
            new MemeManager.Meme(img, true, 1000,"madmeme")
        ]
        M.sortByLike();
        res.render( "templates/trending.ejs",
        { memeManager: M } );
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
