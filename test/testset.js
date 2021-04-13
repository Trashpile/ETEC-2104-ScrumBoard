let assert = require("assert");
let http = require("http");
let app = require("../app");
let suggestions = require("../suggestions")

describe("Suggestions", () => {
    let srv;

    beforeEach( () => {
        srv = app.startServer();
    });

    afterEach( () => {
        app.stopServer(srv);
    });

    describe("Get suggestions page", () => {

        it ("Should be able to get the suggestions page", (done) => {
            http.get("http://localhost:2021/suggestions", (res) => {
                assert.strictEqual(res.statusCode,200);
                done();
            })
        });
    });

    describe("Submit data", () => {
        it("Should successfully create a database table", (done) => {
            suggestions.main();
            assert.strictEqual(res.statusCode,200);
            done();
        })
        
        it("Should update the suggestions database upon pressing submit button", (done) => {
            suggestions.update("Jumanji", 23, "Other", "I think the website could use pizazz!");
            assert.strictEqual(res.statusCode,200);
            done();
        })
    });

});