let assert = require("assert");
let http = require("http");
let app = require("../app");
let tough = require("tough-cookie");
let fs = require("fs");
let upload_meme = require("../pub/uploadMeme/uploadMemeMain.js")

let AccountManager = require("../AccountManager.js");

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

let acc = new AccountManager.AccountManager();
acc.addAccount("test@email.com", "pword");
acc.setIsLoggedIn("test@email.com");
status = acc.getIsLoggedIn("test@email.com");

describe("upload tests", () => {

    beforeEach( () => {
        
        cookiejar = {};
        srv = app.startServer();
        
        console.log(status)
    });

    afterEach( () => {
        app.stopServer(srv);
    });

    it("pass if the setCookie page access DENIED", (done) => {
        
        getOrPost("http://localhost:2021/setCookie?", undefined, (code, data) => {
            assert.equal(code, 403);
            done();
            });
        });
    
    it("pass if the upload page access DENIED", (done) => {
        getOrPost("http://localhost:2021/upload", undefined, (code, data) => {
            assert.equal(code, 403);
            done();
            });
        });

    it("pass if the setCookie page can be accessed", (done) => {
        getOrPost("http://localhost:2021/setCookie?loggedIn=" + status, undefined, (code, data) => {
            assert.equal(code, 200 );
            done();
            });
        });

    it("pass if the upload page can be accessed", (done) => {
        getOrPost("http://localhost:2021/upload", undefined, (code, data) => {
            assert.equal(code, 200 );
            done();
            });
        });
    
});


    // it("pass if sent png file", (done) => {
    //     let newread = new FileReader();
    //     let F = fileInput.prop("files")[0];
    //     newread.onload = () => {
    //         $.post(
    //             "/sendimage",
    //             {
    //                 img: newread.result
    //             },
    //             (data, status, xhr) =>{
    //                 console.log("On preview click", data, status);
    //             }
    //         );
    //     };
    //     http.get("http://localhost:2021/upload", (res) => {
    //         assert.equal(res.statusCode, 200);
    //         done();
    //     });
        
    // });


    // it("register & set avatar", (done) => {
    //     let url = "http://localhost:2021/register?username=bob@example.com&password=secret";
    //     getOrPost(url,undefined,(statusCode,serverdata)=>{
    //         assert.equal(statusCode, 200 );
    //         //we are registered and logged in at this point.
    //         fs.readFile("sadcat.png", null, (err,sadcatdata) => {
    //             let msg = "avatar=" + "data:image/png;base64,"+ encodeURIComponent(sadcatdata.toString("base64"));
    //             getOrPost( "http://localhost:2021/setavatar",
    //                 msg, ( statusCode, serverdata) => {
    //                     console.log("R&S: sc=",statusCode);
    //                     assert.equal( statusCode,200 );
    //                     getOrPost( 
    //                         "http://localhost:2021/getavatar", 
    //                         undefined, 
    //                         (statusCode,avdata)=>{
    //                             assert.equal(statusCode, 200 );
    //                             fs.readFile("sadcat.png",null, (err,catdata)=>{
    //                                 assert.equal( Buffer.compare(avdata,catdata), 0);
    //                                 done();
    //                             });
    //                         }
    //                     );
    //                 }
    //             );
    //         });
    //     });
    // });
// });
// fs.readFile('../test.png', (err, data) => {
//         let str = data.toString('base64')
//         data = Buffer.from(str, 'base64');
//         console.log(data);
//     });

// for(let i = 0; i<png.length; i++)
// {

// }
