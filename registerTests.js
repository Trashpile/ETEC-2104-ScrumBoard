let assert = require("assert");
let http = require("http");
let app = require("./app");
let tough = require("tough-cookie");

/**
 * Fetch some data from a webserver and return it to the caller.
 * @param {string} url The url to fetch from 
 * @param {string} expected Expected response from webserver
 * @param {callback} done Called when the request completes. 
 */
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

describe("Who", () => {

    beforeEach( () => {
        srv = app.startServer();
    });

    afterEach( () => {
        app.stopServer(srv);
    });
    
    it( "Should not be logged in", (done) => {
        getWithResponse( "http://localhost:2021/who","", done );
    });

    it("Register", (done) => {
        let url = "http://localhost:2021/register?username=bob@example.com&password=secret";
        http.get(url, (res) => {
            assert.equal(res.statusCode, 200 );
            let allCookies = res.headers["set-cookie"];
            if( allCookies instanceof String ){
                //just one cookie. Make it into a list
                allCookies = [ allCookies ];
            }
            let cookieList=[];
            for(let i=0;i<allCookies.length;++i){
                let tmp = tough.Cookie.parse(allCookies[i])
                cookieList.push( tmp.key+"="+tmp.value );
            }
            http.get( "http://localhost:2021/who",
                { headers: { Cookie: cookieList.join(";") } },
                (res) => {
                    assert.equal(res.statusCode, 200 );
                    let B = Buffer.alloc(0);
                    res.on("data", (b) => {
                        B = Buffer.concat([B,b]);
                    });
                    res.on("end", () => {
                        let s = B.toString();
                        assert.equal(s,"bob@example.com");
                        done();
                    });
                }
            );
        });
    });
});

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
            registerNewAccount("bob@example.com","secret",200,()=>{
                registerNewAccount("bob@example.com","supersecret",409,done);
            })
        });

        it("Should detect empty password", (done) => {
            registerNewAccount("bob@example.com","",400,done);
        });

        it("Should detect empty username 1", (done) => {
            registerNewAccount("","secret",400,done);
        });
    });
});

///http://localhost:2021/register?username=bob%34example.com&password=secret