let assert = require("assert");
let http = require("http");
let app = require("../app");


function get( username, password, expectedStatus, done ){
    let url = "http://localhost:2021/register?";
    url += "username="+encodeURIComponent(username);
    url += "&password="+encodeURIComponent(password);
    http.get(url, (res) => {
        assert.strictEqual(res.statusCode,expectedStatus);
        done();
    });
}

describe("Registration", () => {
    let srv;

    beforeEach( () => {
        srv = app.startServer();
    });

    afterEach( () => {
        app.stopServer(srv);
    });

    describe("Get registration page", () => {

        it ("Should be able to get the registration page", (done) => {
            http.get("http://localhost:2021/register", (res) => {
                assert.strictEqual(res.statusCode,200);
                done();
            })
        });

        it("Should let me put stuff in", (done)=>{
            get("bob@example.com","secret",200,()=>{
                get("bob@example.com","supersecret",409,done);
            })
        });

        it("Should detect empty password", (done) => {
            get("bob@example.com","",400,done);
        });

        it("Should detect empty username 1", (done) => {
            get("","secret",400,done);
        });

        it("Should reject user names that are not emails", (done) => {
            get("bobexample.com","secret",400,done);
        })

        it("Should create account if no errors", (done) => {
            get("bob@example.com","secret",200,()=>{
                get("bob@example.com","supersecret",409, done);
            })
        })
        it("Shouldn't create account if errors", (done) => {
            get("bobexample.com","secret",400,()=>{
                get("bobexample.com","supersecret",400, done);
            })
        })
    });
});