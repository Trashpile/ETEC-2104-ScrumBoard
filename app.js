"use strict";

let express = require("express");
let fs = require("fs");
let mm = require("./memeManager");

function outputTermsAndConditions(){
    let L = [];
    L.push("These are the terms and conditions.<br>");
    L.push("By accessing, using, looking at, or thinking about");
    L.push("this site, you agree that we own <em>all</em> your");
    L.push("worldly property.");
    return L.join("\n")
}

let app = express();
app.set("view engine", "ejs");
app.use( express.static( "pub" ) );
app.get("/", (req,res) => {
    res.render("templates/header.ejs")
    res.redirect("/pub/index.html");
});
app.get("/home", (req,res) => {
    res.render( "templates/home.ejs" );
});
app.get("/profile", (req,res) => {
    res.render( "templates/profile.ejs",
                    {username: "Bob"} );
});
app.get("/online", (req,res) => {
    let U=[
        { name: "alice", status: "online" },
        { name: "bob",   status: "online" },
        { name: "carol", status: "idle" },
        { name: "dave",  status: "do not disturb" }
    ];
    res.render( "templates/online.ejs",
    { users: U } );
});
app.get("/terms", (req,res) => {
    res.render( "templates/terms.ejs",
        {outputTermsAndConditions: outputTermsAndConditions}
    );
});
app.get("/avatar", (req,res) => {
    //returns a Buffer
    let img = fs.readFileSync("avatar.png");
    res.set("Content-Type", "image/png");
    res.send(img);
} );
app.get("/login", (req,res) => {
    let name = req.query["name"];
    let passwd = req.query["passwd"];
    if( name === "alice" && passwd === "s3cr3t" ){
        res.send("OK");
    } else {
        res.send("WRONG!");
    }
});
app.get("/trending", (req,res) => {
    //let M=[
    //    { name: "alice", status: "online" },
    //    { name: "bob",   status: "online" },
    //    { name: "carol", status: "idle" },
    //    { name: "dave",  status: "do not disturb" }
    //];
    let M = new mm.MemeManager();
    res.render( "templates/trending.ejs",
    { memeManager: M } );
});
// EXAMPLE SEARCH http://localhost:2021/search?q=foo%2f
//Make get method for express
//Hard code - put somewhere else later?
app.get("/search", (req,res) => {
    let query = req.query["q"];
    console.log("YOU MADE THIS QUERY: ",query);
    res.send("Foo");
});
app.listen(2021);
console.log("Listening on 2021");