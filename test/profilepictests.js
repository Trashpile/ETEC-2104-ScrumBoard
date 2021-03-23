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

function registerNewAccount( username, password, expectedStatus, done ){
    let url = "http://localhost:2021/register?";
    url += "username="+encodeURIComponent(username);
    url += "&password="+encodeURIComponent(password);
    http.get(url, (res) => {
        assert.strictEqual(res.statusCode,expectedStatus);
        done();
    });
}

describe("Profile Picture", () => {

    beforeEach( () => {
        srv = app.startServer();
    });

    afterEach( () => {
        app.stopServer(srv);
    });
    
    it( "Should not be logged in", (done) => {
        getWithResponse( "http://localhost:2021/who","", done );
    });

    it( "Should not be able to access profile if not logged in", (done) => {
        getWithResponse("http://localhost:2021/profile", "Not Logged In", done );
    });

    it( "Should be able to change profile picture", (done) => {
        
    });
    
    
    
});