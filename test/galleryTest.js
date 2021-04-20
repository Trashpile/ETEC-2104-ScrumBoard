let assert = require("assert");
let http = require("http");
let app = require("../app");

describe("Gallery Tests", () =>
{
    beforeEach( () => {
        srv = app.startServer();
    });
    afterEach( () => {
        app.stopServer(srv);
    });
    describe("Can navigate to the gallery page of the website", () => {
        it("should return true because the page exists", (done)=> {
            http.get("http://localhost:2021/gallery", (res) => {
                assert.strictEqual(res.statusCode,302);
                done();
            })
        });
    });
});