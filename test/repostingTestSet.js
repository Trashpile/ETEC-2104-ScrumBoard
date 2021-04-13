let AccountManager = require("../AccountManager").AccountManager;
let Meme = require("../AccountManager").Meme;
let assert = require("assert");

describe("repostTest (From repostingTestSet)", () => {
    describe("Basic Meme Class", () => {
        it("should return true if a Meme is successfully made",  () => {
            let A = new AccountManager();
            A.addUser("user","pass")
            let B = new Meme(A,0,false);
            assert.equal(B.memeMade, true);
            
        });
    });
    describe("User Is Signed In", () => {
        it("should return true if user attempting to repost is signed in",  () => {
            let A = new AccountManager();
            A.addUser("user","pass")
            let B = new Meme("user",0,false);
            assert.equal(A.users.has(B.owner), true);
            
        });
    });
    describe("User Is Not Signed In", () => {
        it("should return false if user is not signed in",  () => {
            let A = new AccountManager();
            let B = new Meme("user",0,false);
            assert.equal(A.users.has(B.owner), false);
        });
    });
    describe("New Meme Owner", () => {
        it("should return the name of the new poster",  () => {
            let A = new AccountManager();
            A.addUser("user","pass")
            A.addUser("origUser", "origPass")
            let B = new Meme("user",0,"mUser");
            assert.equal(B.owner, "user");
            
        });
    });
    describe("Original Meme Owner", () => {
        it("should return the name of the original poster",  () => {
            let A = new AccountManager();
            A.addUser("user","pass")
            A.addUser("origUser", "origPass")
            let B = new Meme("user",0,"origUser");
            assert.equal(B.originalPoster, "origUser");
            
            
        });
    });
});



/*
User Story 2: I would like the ability to repost memes posted by others    (2/4)

---INCOMPLETED---
COS2: A visual indication that this user is not the original poster (Maybe a 'Originally by...' tag below the meme).
        - Need to progress more into HTML files to implement

COS3: A way to quickly access the profile of the original poster by clicking the person's name.
        - Need to progress more into HTML files to implement

---COMPLETED---    
COS1: A button that if pressed, takes the meme currently being viewed, and displays it on another user's profile with the name of the original
poster       
COS4: Must be signed in to use this feature.

*/