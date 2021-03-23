"use strict";

let express = require("express");
let fs = require("fs");
let formidable = require("formidable");
//let images = require("Images");


function startServer() {
    
    let app = express();
    app.use(express.static("pub"));

    app.get("/", (req,res) => {
        res.redirect("/pub/index.html");
    });

    // app.get("/upload", (req,res) => {

    // });

    app.post("/sendimage", (req, res) => {
        console.log("accessed server /sendimage");
        let A = formidable ({
            maxFieldSize: 1*1024*1024, 
            multiples: true
        });

        A.parse (req, (err, fields, files) => {
            let image = fields["img"];
            let commaIndex = image.indexOf(",");
            image = image.substring(commaIndex + 1);
            let binaryData = Buffer.from(image, "base64");
            console.log(binaryData);
            res.send("server /sendimage");
        });
    });


    let srv = app.listen(2021);
    console.log("Listening on 2021");
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