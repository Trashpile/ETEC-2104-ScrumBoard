"use strict";
//Leftovers from merge??
//let MM = MemeManager.getInstance("main.sql");
//MM.truncateTable( () => {
//    MM.addMeme("2019/01/03", () => {
//        MM.addMeme("2018/01/01", () => {
//            MM.addMeme("2020/03/02", () => {
//                MM.addMeme("2019/12/25", () => {
//                    MM.addMeme("2020/10/03");
//                });
//            });
//        });
//    });
//});

//let app = express();
//app.use( express.static("pub") );
//app.get("/", (req,res) => { res.redirect("/pub/index.html"); });



//app.listen(2021);
//console.log("Listening on 2021");


let express = require("express");
let formidable = require("formidable");
let formatDate = require("./FormatDate").formatDate;


let fs = require("fs");
let AccountManager = require("./AccountManager");
let MemeManager = require("./MemeManager");
let DataBase = require("./database");
const session = require("express-session");
let conn = new sqlite3.Database("./priv/memedepository.sql");
let alt = new sqlite3.Database("./priv/tagWriteTest.sql")


function startServer(){
    let app = express();
    
    DataBase.recreateDatabase(true);
    
    app.use(express.static("pub"));

    app.use(session({
        resave:false,
        saveUninitialized: false,
        secret: "fojogjhawogfjuaewouwo"
    }));
    
    let memeManager = new MemeManager.MemeManager();
    let accountManager = new AccountManager.AccountManager();
    app.get("/", (req,res) => {
        res.render("./pub/mainpage.html");
    });
    
    app.get("/home", (req,res) => {
        if(req.session && req.session.username){
            //res.redirect("home.html");
            res.render("templates/home.ejs");
        } else {
            res.send("Not Logged In");
        }
    })

    app.get("/register", (req,res)=>{
        let uname = req.query["username"];
        let passwd = req.query["password"];

        if( uname === undefined && passwd === undefined ){
            res.send("THIS IS THE REGISTRATION PAGE.  Congrats");
            res.render("templates/home.ejs");
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

    app.get("/gallery", (req,res) => {
        res.redirect("gallery.html");
    })

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
        let reqType = req.query["reqType"];
        if (reqType === undefined)
        {
            res.status(200).send("Nothing to see here!");
        }
        else if (reqType === "OFTags")
        {
            DataBase.Database.getInstance().all("select tID, tagContent, tagType from tags", [], (e, rows) =>{
                let string = "";
                for(let i=0; i<rows.length; i++)
                {
                    if (rows[i].tagType == 1)
                    {
                        string = string + "Tag: " + rows[i].tagContent + ", ID: " + rows[i].tID + ", Aliases: " + "None" + ", Prime Alias: "  + rows[i].tID + ", Total Uses: " + "0" + "<br>"
                    }
                }
                res.status(200).send(string);
            });  
        }
        else if (reqType === "UFTags")
        {
            DataBase.Database.getInstance().all("select tID, tagContent, tagType from tags", [], (e, rows) =>{
                let string = "";
                for(let i=0; i<rows.length; i++)
                {
                    if (rows[i].tagType == 2)
                    {
                        string = string + "Tag: " + rows[i].tagContent + ", ID: " + rows[i].tID + ", Aliases: " + "None" + ", Prime Alias: "  + rows[i].tID + ", Total Uses: " + "0" + "<br>"
                    }
                }
                res.status(200).send(string);
            });
        }
        else if (reqType === "ITags")
        {
            DataBase.Database.getInstance().all("select tID, tagContent, tagType from tags", [], (e, rows) =>{
                let string = "";
                for(let i=0; i<rows.length; i++)
                {
                    if (rows[i].tagType == 3)
                    {
                        string = string + "Tag: " + rows[i].tagContent + ", ID: " + rows[i].tID + ", Aliases: " + "None" + ", Prime Alias: "  + rows[i].tID + ", Total Uses: " + "0" + "<br>"
                    }
                }
                res.status(200).send(string);
            });
        }
    });
    
    app.get("/memetags", (req,res) => {
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
                DataBase.Database.getInstance().run("insert into memes (name, uid, tid, likes, avatar) values ($name, $uid, $tid, $likes, $avatar)", 
                {$name: memelist[0], $uid: 0, $tid : 0, $likes: 0, $avatar: ""}, () =>{
                    DataBase.Database.getInstance().all("select mid, name from memes where name=$name", {$name : memelist[0]}, (e, rows) =>{
                        let memeID = rows[0].mid;
                        let memeName = rows[0].name;
                        DataBase.Database.getInstance().run( "insert into tags (tagContent, tagType) values ($tagContent, $tagType)",
                        {$tagContent: memelist[1][0], $tagType: DataBase.tagType.Unofficial}, () =>{
                            DataBase.Database.getInstance().all("select tID, tagContent from tags where tagContent=$tagContent", {$tagContent : memelist[1][0]}, (e, rows2) =>{
                                let tagID = rows2[0].tID;
                                let tagName = rows2[0].tagContent;
                                DataBase.Database.getInstance().run( "insert into memesTagJunction (mID, tID) values ($mID, $tID)",
                                {$mID: memeID, $tID: tagID}, () =>{
                                    res.status(200).send(memeName + " is tagged with: " + tagName);
                                });
                            });
                        });
                    });
                });
            }
            else
            {
                res.status(200).send("That wasn't the format!");
            }
        }
    });
    
    app.get("/writetags", (req,res) => {
        let tagstring = req.query["newTag"];
        if (tagstring === undefined)
        {
            res.status(200).send("Nothing to see here!");
        }
        else
        {
            let taglist = tagstring.split(",");
            if (taglist.length === 2)
            {
                if (taglist[1] === DataBase.tagType.Official)
                {
                    DataBase.Database.getInstance().runALT( "insert into tags (tagContent, tagType) values ($tagContent, $tagType)",
                    {$tagContent: taglist[0], $tagType: DataBase.tagType.Official}, () =>{
                        res.status(200).send("Tag has been written.");
                    });
                }
                else if (tagList[1] == DataBase.tagType.Unofficial)
                {
                    DataBase.Database.getInstance().runALT( "insert into tags (tagContent, tagType) values ($tagContent, $tagType)",
                    {$tagContent: taglist[0], $tagType: DataBase.tagType.Unofficial}, () =>{
                        res.status(200).send("Tag has been written.");
                    });
                }
                else if (tagList[1] == DataBase.tagType.Internal)
                {
                    DataBase.Database.getInstance().runALT( "insert into tags (tagContent, tagType) values ($tagContent, $tagType)",
                    {$tagContent: taglist[0], $tagType: DataBase.tagType.Internal}, () =>{
                        res.status(200).send("Tag has been written.");
                    });
                }
            }
            else
            {
            res.status(200).send("That wasn't the format!");
            }
        }
    });
    app.get("/topfivememesbylikes", (req,res) => {
        memeManager.giveMeTheTopFiveMemesByLikes( (L) => {
            res.send(L);
            //res.send( L.join("\n") ); //The list is now concatinated.
            //Render the /search template
            //The search template will take in the list
            //Display the list
            //Css will style it in the style
            
        });
    });
    //app.get("/trending", (req,res) => {
    //    //Currently under construction, doesn't actually work  . . .
    //    let M = new MemeManager.MemeManager();
    //    //Add some memes!
    //    //Default image for now
    //    let img = fs.readFileSync("avatar.png");
    //    M.memeData = 
    //    [
    //        new MemeManager.Meme(img, true, 1000, "funnymeme"),
    //        new MemeManager.Meme(img, true, 100,"sadmeme"),
    //        new MemeManager.Meme(img, true, 10,"happymeme"),
    //        new MemeManager.Meme(img, true, 10000,"catmeme"),
    //        new MemeManager.Meme(img, true, 500,"radmeme"),
    //        new MemeManager.Meme(img, true, 3000,"saddermeme"),
    //        new MemeManager.Meme(img, true, 1000,"madmeme")
    //    ]
    //    M.sortByLike();
    //    res.render( "templates/trending.ejs",
    //    { memeManager: M } );
    //});
    app.get("/search", (req,res) => { res.redirect("search.html"); });

    app.post("/searchbydate", (req,res) => {
        console.log("SEARCHING...");
        let F = formidable( {
            multiples: true
        });
        F.parse(req, (err,fields,files) => {
            let fromDate = formatDate(fields["fromDate"]);
            let toDate = formatDate(fields["toDate"]);
            let sortType = fields["sortType"];
            if(fromDate===-1){fromDate="2001/01/01"}
            if(toDate===-1){toDate="2050/01/01"}
            MM.searchMemesByDate(fromDate, toDate, sortType, (newList) => {
                console.log(newList);
                res.send(newList);
            })
        });
    })

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
