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

});

// describe("Acceptable Status Bar Tests", () => {
//     let user1;
//     let user2;

//     beforeEach( () => {
//         user1 = new Account("HeWhoIsLoggedIn", 1000, true);
//         user2 = new Account("NOTLOGGEDIN", 2000, false);
//     });

//     describe("EnterStatus", () => {
//         it("should return true if string is less than or equal to 0 characters", () => {
//             assert.strictEqual(user1.EnterStatus(""), false); // 0 characters
//         });

//         it("should return true if string is greater than 40 characters", () => {
//             assert.strictEqual(user1.EnterStatus("1234512345123451234512345123456"), true); // 41 characters
//         });

//         it("should return true if user can't input status because they aren't logged in", () => {
//             assert.strictEqual(user2.EnterStatus("viable string"), false); // Not logged in
//         });

//         it("should return true if you can input status while being logged in", () => {
//             assert.strictEqual(user1.EnterStatus("this is a string"), true);
//         });
//     });

//     describe("DeleteStatus", () => {
//         it("should return true if status is deleted", () => {
//             assert.strictEqual(user1.DeleteStatus(), true);
//         });
//     });
// });
