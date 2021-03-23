let assert = require("assert");
let http = require("http");
let app = require("../app");
let Users = require("../user").Users;
let login = require("../login").login;

let srv;
    
describe("login.js", () => {
    describe("contains", () => {

        let testusers;

        before( () => {
            testusers = new Users();
            testusers.newUser("Bob", "passwerd");

        });

        it("should return true if the list includes the user", () => {
            assert.strictEqual(function contains(testusers, "Bob"), true);
        });
    });
});

/*
function get( username,password,status,done ){
    let url = "http://localhost:2021/register";
    let tmp = [];
    if( username !== undefined )
        tmp.push("username="+encodeURIComponent(username));
    if( password !== undefined )
        tmp.push("password="+encodeURIComponent(password));
    let str = tmp.join("&");
    if( str.length > 0 )
        url += "?" + str;
    http.get(url, (res) => {
        assert.equal(res.statusCode, status );
        done();
    });
}
    
describe("Registration", () => {
    beforeEach( () => {
        srv = app.startServer();
    });
    
    afterEach( () => {
        app.stopServer(srv);
    });
    
    describe("Get registration page", () => {
        it("Should be able to get registration page", (done) => {
            get(undefined,undefined,200,done);
        });
    });
     
    describe("Register", () => {
        it( "Should be able to sign up with username and password", (done) => {
            get("bob@example.com","secret",200,done);
        });
    });
    
    describe("Register", () => {
        it( "Should detect duplicate username", (done) => {
            get("bob@example.com","secret", 200, () => {
                get( "bob@example.com","fooby", 409, done);
            });
        });
    });
    
    describe("Register", () => {
        it( "Should detect empty username", (done) => {
            get("","secret",400,done);
        });
    });
    
    describe("Register", () => {
        it( "Should detect missing username", (done) => {
            get(undefined,"secret",400,done);
        });
    });

    describe("Register", () => {
        it( "Should detect empty password", (done) => {
            get("bob@example.com","",400,done);
        });
    });

    describe("Register", () => {
        it( "Should detect missing password", (done) => {
            get("bob@example.com",undefined,400,done);
        });
    });

    describe("Register", () => {
        it( "Should fail because of embedded spaces", (done) => {
            get( "some thing" , "password" , 409 , done );
        });
    });

    describe("Register", () => {
        it( "Should fail because of no @ sign", (done) => {
            get( "something.com" , "password" , 409 , done );
        });
    });

    describe("Register", () => {
        it( "Should fail because of multiple @ signs", (done) => {
            get( "some@thing@.com" , "password" , 409 , done );
        });
    });

    describe("Register", () => {
        it( "Should detect the only one @ sign and pass", (done) => {
            get( "some@thing.com" , "password" , 200 , done );
        });
    });

    describe("Register", () => {
        it( "Should fail because of no text on the right", (done) => {
            get( "some@" , "password" , 409 , done );
        });
    });

    describe("Register", () => {
        it( "Should fail because of no text on the left", (done) => {
            get( "@.com" , "password" , 409 , done );
        });
    });
});*/