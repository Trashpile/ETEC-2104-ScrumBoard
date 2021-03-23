let assert = require("assert");
let http = require("http");
let app = require("../app");
let tough = require("tough-cookie");
let fs = require("fs");

let cookiejar = {};

//if data is undefined, use get. Else, use post.
//callback will be called with the response code and
//the data returned from the HTTP request
function getOrPost( url, data, callback ){
    let method = ( data === undefined ) ? "get" : "post";
    let headers = {}
    if( data ){
        headers["Content-Type"] = "application/x-www-form-urlencoded";
        headers["Content-Length"] = data.length;
    }
    if( cookiejar ){
        let tmp=[];
        for(let k in cookiejar){
            tmp.push(k+"="+cookiejar[k]);
        }
        headers["Cookie"] = tmp.join(';');
    }
    let req = http.request(url, { headers: headers, method: method }, (res) => {
        let allCookies = res.headers["set-cookie"];
        if( !allCookies )
            allCookies = []
        if( allCookies instanceof String ){
            //just one cookie. Make it into a list
            allCookies = [ allCookies ];
        }
        for(let i=0;i<allCookies.length;++i){
            let tmp = tough.Cookie.parse(allCookies[i])
            cookiejar[tmp.key]=tmp.value;
        }
        let allData = Buffer.from([]);
        res.on('data', (data) => {
            allData = Buffer.concat([allData,data]);
        });
        res.on('end', () => {
            callback( res.statusCode, allData );
        });
    });
    if( data )
        req.write(data);
    req.end();
}
         

describe("avatar tests", () => {

    beforeEach( () => {
        srv = app.startServer();
        cookiejar = {};
    });

    afterEach( () => {
        app.stopServer(srv);
    });

    it("Should be able to get avatar", (done) => {
        getOrPost( "http://localhost:2021/getavatar", undefined, (statusCode,allData) => {
            assert.equal(statusCode, 200 );
            assert.strictEqual(allData[0],137);
            assert.strictEqual(allData[1],80);  //P
            assert.strictEqual(allData[2],78);  //N
            assert.strictEqual(allData[3],71);  //G
            fs.readFile("smile.png",null, (err,smiledata)=>{
                assert.equal( Buffer.compare(allData,smiledata), 0);
            });
            done();
        });
    });


    it("register & set avatar", (done) => {
        let url = "http://localhost:2021/register?username=bob@example.com&password=secret";
        getOrPost(url,undefined,(statusCode,serverdata)=>{
            assert.equal(statusCode, 200 );
            //we are registered and logged in at this point.
            fs.readFile("sadcat.png", null, (err,sadcatdata) => {
                let msg = "avatar=" + "data:image/png;base64,"+ encodeURIComponent(sadcatdata.toString("base64"));
                getOrPost( "http://localhost:2021/setavatar",
                    msg, ( statusCode, serverdata) => {
                        console.log("R&S: sc=",statusCode);
                        assert.equal( statusCode,200 );
                        getOrPost( 
                            "http://localhost:2021/getavatar", 
                            undefined, 
                            (statusCode,avdata)=>{
                                assert.equal(statusCode, 200 );
                                fs.readFile("sadcat.png",null, (err,catdata)=>{
                                    assert.equal( Buffer.compare(avdata,catdata), 0);
                                    done();
                                });
                            }
                        );
                    }
                );
            });
        });
    });
});

