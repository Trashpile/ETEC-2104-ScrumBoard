"use strict";

const http = require('http');
const fs = require('fs');

const port = 2021;


var types = {
    "html":"text/html",
    "js" :"application/javascript",
    "mjs":"application/javascript",
    "png":"image/png",
    "jpg":"image/jpeg",
    "txt":"text/plain",
    "css":"text/css"
}
 

function handler(req,resp){
    let path = "." + req.url;
    console.log("GET",req.url);
    
    let headers = {
        "Cache-control":"no-cache, max-age=0, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "-1",
        "Expires": "Tue, 01 Jan 1980 00:00:00 GMT",
        "Content-type": "text/plain"
    };
    
    let i = path.lastIndexOf(".");
    if( i !== -1 ){
        let suffix = path.substr(i+1);
        if( types[suffix] )
            headers["Content-type"] = types[suffix];
    }
   
    if(!fs.existsSync(path)){
        resp.writeHead(404,"Not found",{"Content-type":"text/html"});
        resp.end("<HTML>Not found</HTML>");
        return;
    } else if( fs.statSync(path).isDirectory() ){
        resp.writeHead(403,"Forbidden",{"Content-type":"text/html"});
        resp.end("<HTML>Forbidden: Directory</HTML>");
        return;
    } else {
        let str = fs.createReadStream(path);
        str.on('error',function(){
            console.log("Error in read");
            resp.writeHead(500,"Error");
            resp.end();
        });
        resp.writeHead(200,"OK",headers);
        str.pipe(resp);
    }
}


var srv = http.createServer(handler);
console.log("Listening on port",port);
srv.listen(
    {
        host:'127.0.0.1',
        port:port
    }, 
    (err) => {
        if( err !== undefined ){
            console.log("Error:",err);
        }
    }
);

