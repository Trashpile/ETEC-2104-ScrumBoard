let assert = require("assert");
let http = require("http");
let app = require("../app");
let tough = require("tough-cookie");
let fs = require("fs");
let upload = require("../pub/upload.js");
 

describe("app.js", () => {

    beforeEach( () => {
        srv = app.startServer();
    });

    afterEach( () => {
        app.stopServer(srv);
    });

    it("returns true if the index was accessed", (done) => {
        http.get("http://localhost:2021/", (res) => {
            assert.equal(res.statusCode, 200);
            done();
        });
        
    });


    // it("register & set avatar", (done) => {
    //     let url = "http://localhost:2021/register?username=bob@example.com&password=secret";
    //     getOrPost(url,undefined,(statusCode,serverdata)=>{
    //         assert.equal(statusCode, 200 );
    //         //we are registered and logged in at this point.
    //         fs.readFile("sadcat.png", null, (err,sadcatdata) => {
    //             let msg = "avatar=" + "data:image/png;base64,"+ encodeURIComponent(sadcatdata.toString("base64"));
    //             getOrPost( "http://localhost:2021/setavatar",
    //                 msg, ( statusCode, serverdata) => {
    //                     console.log("R&S: sc=",statusCode);
    //                     assert.equal( statusCode,200 );
    //                     getOrPost( 
    //                         "http://localhost:2021/getavatar", 
    //                         undefined, 
    //                         (statusCode,avdata)=>{
    //                             assert.equal(statusCode, 200 );
    //                             fs.readFile("sadcat.png",null, (err,catdata)=>{
    //                                 assert.equal( Buffer.compare(avdata,catdata), 0);
    //                                 done();
    //                             });
    //                         }
    //                     );
    //                 }
    //             );
    //         });
    //     });
    // });
});