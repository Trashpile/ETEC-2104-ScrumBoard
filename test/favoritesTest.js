// let assert = require("assert");
// let http = require("http");
// let app = require("../app");

// function getWithResponse(url,expected,done){
//     http.get(url, (res) => {
//         assert.equal(res.statusCode, 200 );
//         let B = Buffer.alloc(0);
//         res.on("data", (b) => {
//             //a bit inefficient, but we're only doing
//             //small amounts of data
//             B = Buffer.concat([B,b]);  // B = B + b
//         });
//         res.on("end", () => {
//             let s = B.toString();
//             assert.equal(s,expected);
//             done();
//         });
//     });
// }

// describe("My tests", () => {
//     beforeEach( () => {
//         srv = app.startServer();
//     });

//     afterEach( () => {
//         app.stopServer(srv);
//     });
//     describe("Navigation tests", ()=> {
//         it("should return false if user tries to navigate to favorites page (while not logged in)", (done) => {
//             getWithResponse( "http://localhost:2021/favorites","not logged in", done );
//         });
//         it("should return true if user can navigate to favorites page (while logged in)", () => {
//             let url = "http://localhost:2021/register?username=bob@example.com&password=secret";
//             http.get(url, (res) => {
//                 assert.equal(res.statusCode, 200 );
//                 let allCookies = res.headers["set-cookie"];
//                 if( allCookies instanceof String ){
//                     //just one cookie. Make it into a list
//                     allCookies = [ allCookies ];
//                 }
//                 let cookieList=[];
//                 for(let i=0;i<allCookies.length;++i){
//                     let tmp = tough.Cookie.parse(allCookies[i])
//                     cookieList.push( tmp.key+"="+tmp.value );
//                 }
//                 http.get( "http://localhost:2021/favorites",
//                     { headers: { Cookie: cookieList.join(";") } },
//                     (res) => {
//                         assert.equal(res.statusCode, 200 );
//                         let B = Buffer.alloc(0);
//                         res.on("data", (b) => {
//                             B = Buffer.concat([B,b]);
//                         });
//                         res.on("end", () => {
//                             let s = B.toString();
//                             assert.equal(s,"bob@example.com");
//                             done();
//                         });
//                     }
//                 );
//             });
//         });
//     });
//     describe("Clicking the button", () => {
//         it("should return true if user clicks button, while logged in", () => {
//             assert.strictEqual(false, /*truth statement*/);
//         });
//         it("should return false if button is pressed while not logged in", () => {
//             assert.strictEqual(false, /*truth statement*/);
//         });
//         it("should return false if button is pressed, but not added to favorites page", () => {
//             assert.strictEqual(false, /*truth statement*/);
//         });
//         it("should return true if button is pressed and added to favorites page", () => {
//             assert.strictEqual(false, /*truth statement*/);
//         });
//     });
// });

// //Have to be logged in (base log in system should be in the base class)

// //Have to be able to navigate to favorites page

// //Have a button to be able to add it to favorites page

// //Upon clicking the button, add the meme to the favorites page