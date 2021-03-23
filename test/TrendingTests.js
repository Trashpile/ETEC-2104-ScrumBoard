let assert = require("assert");
let MemeManager = require("../memeManager")
let app = require("../app");
describe("P.H. Test-set for Trending functionality & Meme Class compatability. . .", () =>
{
    describe("Can organize a list of memes . . . . . .", () => {
        beforeEach(() => 
        {
            M = new MemeManager.MemeManager();
            //Popuate mData with dummy values.
            M.mData = 
            [
                new MemeManager.Meme(200, "funnyCat"),
                new MemeManager.Meme(3000, "sadCat"),
                new MemeManager.Meme(5, "fatCat"),
                new MemeManager.Meme(-1, "KitKat"),
                new MemeManager.Meme(10, "radCat"),
                new MemeManager.Meme(10000, "sadderCat"),
                new MemeManager.Meme(30, "madCat")
            ]
            //console.log(M.mData);
        });
        it("Should generate dummy meme values", () =>
        {
            //console.log(M.mData);
            assert.strictEqual(M.mData[0].name, "funnyCat");
            assert.strictEqual(M.mData[1].likes, 3000);
        });
        it("Should sort instances of class meme by likes", () =>
        {
            M.sortByLike();
            assert.strictEqual(M.mData[0].name, "sadderCat");
            assert.strictEqual(M.mData[0].likes, 10000);
            assert.strictEqual(M.mData[1].name, "sadCat");
            assert.strictEqual(M.mData[1].likes, 3000);
            assert.strictEqual(M.mData[2].name, "funnyCat");
            assert.strictEqual(M.mData[2].likes, 200);
            assert.strictEqual(M.mData[3].name, "madCat");
            assert.strictEqual(M.mData[3].likes, 30);
            assert.strictEqual(M.mData[4].name, "radCat");
            assert.strictEqual(M.mData[4].likes, 10);
            assert.strictEqual(M.mData[5].name, "fatCat");
            assert.strictEqual(M.mData[5].likes, 5);
            assert.strictEqual(M.mData[6].name, "KitKat");
            assert.strictEqual(M.mData[6].likes, -1);
        });

    });
    
});