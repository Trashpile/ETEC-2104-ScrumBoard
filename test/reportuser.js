let assert = require("assert");
let http = require("http");
let app = require("../app");
let tough = require("tough-cookie");

function getWithResponse(url,expected,done){
    http.get(url, (res) => {
        assert.equal(res.statusCode, 200 );
        let B = Buffer.alloc(0);
        res.on("data", (b) => {
            //a bit inefficient, but we're only doing
            //small amounts of data
            B = Buffer.concat([B,b]);  // B = B + b
        });
        res.on("end", () => {
            let s = B.toString();
            assert.equal(s,expected);
            done();
        });
    });
}

describe("Report User", () => {

    beforeEach( () => {
        srv = app.startServer();
    });

    afterEach( () => {
        app.stopServer(srv);
    });

    it( "Should not be able to report a user if not logged in", (done) => {
        getWithResponse("http://localhost:2021/reportuser?username=test&report=This%20user...", "Not Logged In", done );
    });

});