"use strict";

let express = require("express");
let tagging = require("./tagging");

function startServer(){
    let app = express();

    let TagPool = new tagging.TagPool("./priv/tagFile.txt");
    app.get("/", (req,res) => {
        res.status(200).send("This is the index page. Nothing is here ... for now.");
    });
    app.get("/tagaccess", (req,res) => {
        TagPool.readTagFile(() => {
            let string = "";
            let reqType = req.query["reqType"];
            if (reqType === undefined)
            {
                res.status(200).send("Nothing to see here!");
            }
            else if (reqType === "OFTags")
            {
                for (let i = 0; i < TagPool.getOfficialTags().length; i++)
                {
                    string = string + String(TagPool.getOfficialTags()[i].getString());
                }
                res.status(200).send(string);
            }
            else if (reqType === "UFTags")
            {
                for (let i = 0; i < TagPool.getUnofficialTags().length; i++)
                {
                    string = string + String(TagPool.getUnofficialTags()[i].getString());
                }
                res.status(200).send(string);
            }
            else if (reqType === "ITags")
            {
                for (let i = 0; i < TagPool.getInternalTags().length; i++)
                {
                    string = string + String(TagPool.getInternalTags()[i].getString());
                }
                res.status(200).send(string);
            }
        });
    });
    app.get("/memetags", (req,res) => {
        TagPool.readTagFile(() => {
            let memestring = req.query["newMeme"];
            if (memestring === undefined)
            {
                res.status(200).send("Nothing to see here!");
            }
            else
            {
                let memelist = memestring.split(";");
                memelist[1] = memelist[1].split(",");
                if (memelist.length === 2 && memelist[1].length === 5)
                {
                    let newMeme = new tagging.Meme(memelist[0], [new tagging.Tag(memelist[1][0], memelist[1][1], memelist[1][2], memelist[1][3], memelist[1][4])], []);
                    res.status(200).send(newMeme.getName() + " is tagged with: " + newMeme.getExternalTags()[0].getTagENG());
                }
                else
                {
                    res.status(200).send("That wasn't the format!");
                }
            }
            res.send();
        });
    });
    app.get("/writetags", (req,res) => {
        TagPool.readTagFile(() => {
            let tagstring = req.query["newTag"];
            if (tagstring === undefined)
            {
                res.status(200).send("Nothing to see here!");
            }
            else
            {
                let taglist = tagstring.split(",");
                if (taglist.length === 5)
                {
                let newTag = new tagging.Tag(taglist[0], taglist[1], taglist[2], taglist[3], taglist[4]);
                TagPool.addUnofficialTag(newTag);
                TagPool.writeTagFile("./priv/outputTGFile.txt");
                res.status(200).send("Tag has been written.");
                }
                else
                {
                res.status(200).send("That wasn't the format!");
                }
            }
        });
    });
    let srv = app.listen(2021);
    return srv;
}
function stopServer(srv){
    srv.close();
}

//if we're being run directly from command line
if( module  === require.main )
    startServer();

exports.startServer = startServer;
exports.stopServer = stopServer;