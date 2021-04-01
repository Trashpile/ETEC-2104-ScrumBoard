let assert = require("assert");
let http = require("http");
let app = require("../app");
let fs = require("fs");

let srv;

/**
 * This reads the data from a webserver, and compares it to some data given.
 * @param {string} url The url to get from.
 * @param {string} expected What data the webserver should return. 
 * @param {int} status What status the webserver should return.
 * @param {callback} done Called when we're done.
 */
 function getDataAndStatus(url,expected, status, done){
    http.get(url, (res) => {
        if (status !== undefined)
        {
        assert.strictEqual(res.statusCode, status);
        }
        if (expected !== undefined)
        {
        let B = Buffer.alloc(0);
        res.on("data", (b) => {
            B = Buffer.concat([B,b]);  // B = B + b
        });
        res.on("end", () => {
            let s = B.toString();
            assert.strictEqual(s,expected);
            done();
        });
        }
        else
        {
            done();
        }
    });
}
    
describe("Tagging", () => {
    beforeEach( () => {
        srv = app.startServer();
    });
    
    afterEach( () => {
        app.stopServer(srv);
    });
    
    describe("TagFile should load on each page that requires it.", () => {
        it("TagFile loads on /tagaccess", (done) => {
            getDataAndStatus("http:/localhost:2021/tagaccess", undefined, 200, done);
        });
        it("TagFile loads on /memetags", (done) => {
            getDataAndStatus("http:/localhost:2021/memetags", undefined, 200, done);
        });
        it("TagFile loads on /writetags", (done) => {
            getDataAndStatus("http:/localhost:2021/writetags", undefined, 200, done);
        });
    });
    describe("TagFile properly loads from the file holding the tags.", () => {
        it("TagFile loads official tags correctly", (done) => {
            getDataAndStatus("http:/localhost:2021/tagaccess?reqType=OFTags", "Tag: Meme, ID: 1, Aliases: None, Prime Alias: 1, Total Uses: 0<br>Tag: tagme, ID: 7, Aliases: None, Prime Alias: 7, Total Uses: 0<br>", 200, done);
        });
        it("TagFile loads unofficial tags correctly", (done) => {
            getDataAndStatus("http:/localhost:2021/tagaccess?reqType=UFTags", "Tag: Crud, ID: 8, Aliases: None, Prime Alias: 8, Total Uses: 0<br>", 200, done);
        });
        it("TagFile loads internal tags correctly", (done) => {
            getDataAndStatus("http:/localhost:2021/tagaccess?reqType=ITags", "Tag: Frozen, ID: 2, Aliases: None, Prime Alias: 2, Total Uses: 0<br>Tag: Risque, ID: 3, Aliases: None, Prime Alias: 3, Total Uses: 0<br>Tag: Quarantined, ID: 4, Aliases: None, Prime Alias: 4, Total Uses: 0<br>Tag: Contentious, ID: 5, Aliases: None, Prime Alias: 5, Total Uses: 0<br>Tag: No Download, ID: 6, Aliases: None, Prime Alias: 6, Total Uses: 0<br>", 200, done);
        });
    });
    describe("If a new tag is added to the tag pool, it correctly writes it to the tag file. (At the moment, this is a different file for test purposes.)", () => {
        it("TagFile writes unofficial tags correctly", (done) => {
            fs.writeFile("./priv/outputTGFile.txt", "", 'utf8', (err) => {
                getDataAndStatus("http:/localhost:2021/writetags?newTag=Crap,19,None,19,0", "Tag has been written.", 200, () => {
                    fs.readFile("./priv/outputTGFile.txt", 'utf8' , (err, data) => {
                        assert.strictEqual(data, "Meme:1:None:1:0,tagme:7:None:7:0;Crud:8:None:8:0,Crap:19:None:19:0;Frozen:2:None:2:0,Risque:3:None:3:0,Quarantined:4:None:4:0,Contentious:5:None:5:0,No Download:6:None:6:0");
                        done();
                    });
                });
            });
        });
    });
    describe("If the new tag does not have the correct amount of parameters, it is not written.", () => {
        it("TagFile does not write with too few parameters.", (done) => {
            getDataAndStatus("http:/localhost:2021/writetags?newTag=Crap,19,None,19", "That wasn't the format!", 200, done);
        });
        it("TagFile does not write with too many parameters.", (done) => {
            getDataAndStatus("http:/localhost:2021/writetags?newTag=Crap,19,None,19,0,12,Absolutely,69", "That wasn't the format!", 200, done);
        });
    });
    describe("Memes can also hold tags.", () => {
        it("A properly created meme will hold tags.", (done) => {
            getDataAndStatus("http:/localhost:2021/memetags?newMeme=MyAwesomeMeme;Crap,19,None,19,0", "MyAwesomeMeme is tagged with: Crap", 200, done);
        });
        it("A improperly created meme will not hold tags.", (done) => {
            getDataAndStatus("http:/localhost:2021/memetags?newMeme=MyAwesomeMeme;Crap,None,19,0", "That wasn't the format!", 200, done);
        });
    });
});