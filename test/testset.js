let assert = require("assert");
let http = require("http");
let app = require("../app");

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

    //describe("Submit data", () => {
        //it("Should submit data upon pressing the submit button", (done) => {
            //unknown
        //})
    //});

});