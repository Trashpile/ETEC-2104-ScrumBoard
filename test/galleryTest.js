//let assert = require("assert");
//let http = require("http");
//let app = require("../app");
//
//function getWithResponse(url,expected,done){
//    http.get(url, (res) => {
//        assert.equal(res.statusCode, 200 );
//        let B = Buffer.alloc(0);
//        res.on("data", (b) => {
//            //a bit inefficient, but we're only doing
//            //small amounts of data
//            B = Buffer.concat([B,b]);  // B = B + b
//        });
//        res.on("end", () => {
//            let s = B.toString();
//            assert.equal(s,expected);
//            done();
//        });
//    });
//}
//describe("Gallery Tests", () =>
//{
//    describe("Can navigate to the gallery page of the website", (done) => {
//        it("should return true because the page exists", ()=> {
//            getWithResponse( "http://localhost:2021/gallery","", done);
//        });
//    });
//});