"use strict";

let express = require("express");

function startServer(){
    let app = express();
    app.use( express.static( "pub" ) );
    app.get("/", (req,res) => { res.sendFile("C:/Users/jared/Desktop/sprint3/index2.html"); });

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

//This was made by jared phillips for testing my html