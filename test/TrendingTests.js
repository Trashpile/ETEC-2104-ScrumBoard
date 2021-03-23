let assert = require("assert");
let MemeManager = require("../memeManager")
let app = require("../app");
describe("Test set 2 . . .", () =>
{
    describe("Can organize a list of memes . . . . . .", () => {
        beforeEach(() => 
        {
            //console.log("Test set 2:  Adding, verifying.  Making an account Manager . . .");
            M = new MemeManager.MemeManager();
        });
        it("Should generate dummy meme values", () =>
        {
            console.log(M.spicyMemes);
            assert.strictEqual(M.spicyMemes[0], "Sad Cat1");
        });
        it("Should sort instances of class meme by ", () =>
        {
            //assert.strictEqual(A.verifyUser("bob", "secret"), false);
        });

    });
    
});