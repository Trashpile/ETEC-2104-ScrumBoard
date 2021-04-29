let assert = require("assert");
let http = require("http");
let app = require("../app");
let tough = require("tough-cookie");
let fs = require("fs");
let editH = require("../pub/editHierarchy/editHierarchyMain.js");
let accounts = require("../AccountManager.js");
let rand_users = require("../pub/editHierarchy/randUsers.js");
let acc1 = new accounts.AccountManager();
acc1.addAccount("test@example.com", "pass")

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

describe("Hierarchy Testset", () => {

    beforeEach( () => {
        cookiejar = {};
        let acc = new accounts.AccountManager();
        srv = app.startServer();
        rand_users.randUsers(acc, 15);
    });

    afterEach( () => {
        app.stopServer(srv);
    });

    it("pass on /editHierarchy access", (done) => {
        
        getOrPost("http://localhost:2021/editHierarchy", undefined, (code, data) => {
            assert.equal(code, 301);
            done();
        });
    });

    it("pass on /sendHierarchy access", (done) => {
        
        getOrPost("http://localhost:2021/sendHierarchy", undefined, (code, data) => {
            assert.equal(code, 302);
            done();
        });
    });

    it("pass on /sendSort access", (done) => {
        
        getOrPost("http://localhost:2021/sendSort", undefined, (code, data) => {
            assert.equal(code, 302);
            done();
        });
    });

    it("pass on setHierarchy set user to mod", (done) => {
        
        let t = acc1.setHierarchy("test@example.com", "mod");
        assert.equal(t, 1);
        done();
    });

    it("pass on setHierarchy set user to admin", (done) => {
        
        let t = acc1.setHierarchy("test@example.com", "admin");
        assert.equal(t, 1);
        done();
    });

    it("pass on setHierarchy set user to user", (done) => {
        
        let t = acc1.setHierarchy("test@example.com", "user");
        assert.equal(t, 1);
        done();
    });
   
    it("pass on setHierarchy fail on invalid email and valid status", (done) => {
        
        let t = acc1.setHierarchy("test1@example.com", "user");
        assert.equal(t, 0);
        done();
    });

    it("pass on setHierarchy fail to set invalid status with valid email", (done) => {
        
        let t = acc1.setHierarchy("test@example.com", "pass");
        assert.equal(t, 0);
        done();
    });

});