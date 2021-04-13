"use strict";

let express = require("express");
let upload_meme = require("./pub/uploadMeme/uploadMemeMain.js");

function startServer() {
    
    let app = express();
    app.use(express.static("pub"));
    
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