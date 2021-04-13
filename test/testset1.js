let AccountManager = require("../AccountManager").AccountManager;
let assert = require("assert");
/*
describe("My verifyUser tests", () => {

    let A;

    beforeEach( ()=>  {
        A = new AccountManager();
        A.addUser( "alice","qwerty" );
    });


    describe("verifyUser1", () => {
        it("should return false if user doesn't exist",  () => {
            assert.equal( A.verifyUser( "bob", "s3cr3t" ), false );
        });
    });


    describe("verifyUser2", () => {
        it("should return false if user doesn't exist",  () => {
            let A = new AccountManager();
            assert.equal( A.verifyUser( "bob", "s3cr3t" ), false );
        });
    });

    describe("verifyUser3", () => {
        it("should return false if user doesn't exist",  () => {
            let A = new AccountManager();
            assert.equal( A.verifyUser( "alice", "s3cr3t" ), false );
        });
    });

    describe("verifyUser4", () => {
        it("should return true if user does exist",  () => {
            let A = new AccountManager();
            A.addUser( "alice","qwerty" );
            assert.equal( A.verifyUser( "alice", "qwerty" ), true );
            
        });
    });

    describe("verifyUser5", () => {
        it("should return false if user doesn't exist",  () => {
            let A = new AccountManager();
            assert.equal( A.verifyUser( "bob", "qwerty" ), false );
        });
    });

    describe("verifyUser6", () => {
        it("should return false if missing parameters",  () => {
            let A = new AccountManager();
            assert.equal( A.verifyUser( "alice" ), false );
        });
    });

    describe("verifyUser7", () => {
        it("should return false if missing parameters",  () => {
            let A = new AccountManager();
            assert.equal( A.verifyUser( ), false );
        });
    });
    describe("verifyUser8", () => {
        it("should return true if user does exist",  () => {
            let A = new AccountManager();
            A.addUser( "alice","qwerty" );
            assert.equal( A.verifyUser( "alice", "qwerty" ), true );
        });
    });
});

describe("My addUser tests", () => {
    describe("addUser1", () => {
        it("should return true when adding new account",  () => {
            let A = new AccountManager();
            assert.equal( A.verifyUser( "bob", "s3cr3t" ), false );
            assert.equal( A.addUser( "bob", "s3cr3t" ), true );
            assert.equal( A.verifyUser( "bob", "s3cr3t" ), true );
        });
    });
    describe("addUser2", () => {
        it("If user already exists or invalid username/password (missing, not string, etc.): Returns false", () => {
            let A = new AccountManager();
            assert.equal(A.addUser( "alice","qwerty" ), true);
            assert.equal(A.addUser( "alice","qwerty" ), false);
            assert.equal(A.addUser( 20 , 25.1 ), false);
            assert.equal(A.addUser( " "," " ), false);
        })
    })
});
describe("My getUID tests", () => {
    describe("getUID1", () => {
        it("Returns unique user ID (a nonnegative number) for the given username (string)",  () => {
            let A = new AccountManager();
            A.addUser( "alice","qwerty" );
            assert.equal(typeof(A.getUID("alice")), 'number');
            
            
        });
    });
    describe("getUID2", () => {
        it("If user does not exist, returns -1",  () => {
            let A = new AccountManager();
            assert.equal(A.getUID("bruh"), -1);

            
        });
    });
});
describe("My isAdmin tests", () => {
    describe("isAdmin1", () => {
        it("userID = number",  () => {
            let A = new AccountManager();
            A.addUser( "alice","qwerty" );
            A.setAdmin(A.getUID, true);
            assert.equal(typeof(A.getUID("alice")), 'number'); 
        });
    });
    describe("isAdmin2", () => {
        it("Returns true if user is an administrator",  () => {
            let A = new AccountManager();
            A.addUser( "alice","qwerty" );
            A.setAdmin(A.getUID, true);
            assert.equal(A.isAdmin(A.getUID), true);  
        });
    });
    describe("isAdmin3", () => {
        it("Returns false if the user is not an administrator",  () => {
            let A = new AccountManager();
            A.addUser( "alice","qwerty" );
            A.setAdmin(A.getUID, false);
            assert.equal(A.isAdmin(A.getUID), false);  
        });
    });
    describe("isAdmin4", () => {
        it("Returns false for unknown or bad user ID",  () => {
            let A = new AccountManager();
            A.addUser( "alice","qwerty" );
            A.setAdmin(A.getUID, true);
            assert.equal(A.isAdmin(.5), false)
            
        });
    });
});

describe("My setAdmin tests", () => {
    describe("isAdmin1", () => {
        it("Sets or clears admin flag for user",  () => {
            let A = new AccountManager();
            A.addUser( "alice","qwerty" );
            assert.equal(A.setAdmin(A.getUID, true), true);
        });
    });
    describe("setAdmin2", () => {
        it("Sets or clears admin flag for user",  () => {
            let A = new AccountManager();
            A.addUser( "alice","qwerty" );
            assert.equal(A.setAdmin(A.getUID, false), false);
        });
    });
    describe("setAdmin3", () => {
        it("userID = number; isAdmin=boolean",  () => {
            let A = new AccountManager();
            A.addUser( "alice","qwerty" );
            assert.equal(typeof(A.getUID), 'number');
        });
    });
    describe("setAdmin4", () => {
        it("userID = number; isAdmin=boolean",  () => {
            let A = new AccountManager();
            A.addUser( "alice","qwerty" );
            assert.equal(typeof(A.isAdmin(A.getUID)), 'boolean');
        });
    });
    describe("setAdmin5", () => {
        it("Returns true for OK; false if error (i.e., unknown user)",  () => {
            let A = new AccountManager();
            A.addUser( "alice","qwerty" );
            assert.equal(A.setAdmin("unknown_user", true), false);
        });
    });
});
*/