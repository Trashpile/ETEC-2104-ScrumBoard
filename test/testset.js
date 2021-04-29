let assert = require("assert");
let http = require("http");
let app = require("../app");
let suggestions = require("../suggestions");
let password = require("../password")

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

describe("Password tests", () => {
    let srv;

    beforeEach( () => {
        srv = app.startServer();
    });

    afterEach( () => {
        app.stopServer(srv);
    });

    describe("Get password page", () => {

        it ("Should be able to get the password page", (done) => {
            http.get("http://localhost:2021/password", (res) => {
                assert.strictEqual(res.statusCode,200);
                done();
            })
        });

        it ("Should be able to get the change password page", (done) => {
            http.get("http://localhost:2021/changepassword", (res) => {
                assert.strictEqual(res.statusCode,200);
                done();
            })
        });

        it ("Should be able to get the forgot password page", (done) => {
            http.get("http://localhost:2021/forgotpassword", (res) => {
                assert.strictEqual(res.statusCode,200);
                done();
            })
        });
    });

    describe("Submitting data", () => {
        it("Should successfully create a database table", (done) => {
            password.main();
            assert.strictEqual(res.statusCode,200);
            done();
        })
        
        it("Should update the user database upon changing the password", (done) => {
            password.update("MetalGearSolid6", "ReturnofLiquid");
            assert.strictEqual(res.statusCode,200);
            done();
        })
    });
});