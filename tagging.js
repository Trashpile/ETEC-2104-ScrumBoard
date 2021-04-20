let fs = require("fs");
let db = require("./database.js")

class Meme {
    /**
    * At the moment, this class just exists to hold some tags, and also a name to identify it. When the meme class is
    * finalized, the functionality in this class will be added to it.
    */

    constructor(Name, externalTags, internalTags){
        this.Name = String(Name);
        this.externalTags = externalTags;
        this.internalTags = internalTags;
    }
    getName(){
        return this.Name;
    }
    getExternalTags(){
        return this.externalTags;
    }
    getInternalTags(){
        return this.internalTags;
    }
    addExternalTag(tag){
        if (tag.constructor.name === "Tag")
        {
            for (let i = 0; i < this.externalTags.length; i++)
            {
                if (externalTags[i].getTagID() === tag.getTagID())
                {
                    return 0;
                }
            }
            this.externalTags.push(tag);
        }
    }
    addInternalTag(tag){
        if (tag.constructor.name === "Tag")
        {
            for (let i = 0; i < this.internalTags.length; i++)
            {
                if (internalTags[i].getTagID() === tag.getTagID())
                {
                    return 0;
                }
            }
            this.internalTags.push(tag);
        }
    }
}

class TagPool {
    /**
    * This class will store all the information about the various tags used in the meme depository.
    * The tag information will be stored in a database on the web server, and the TagPool will load it when it is called. From there
    * methods can be called to extract additional information from the tags. Some tags will be official, and some can be added
    * on the fly. The official tagpool can be edited by moderators to include more tags.
    * There is a special set of tags for internal data, which is to indicate content warnings and quarantines.
    */
    constructor(tagFile){
        this.tagFile = tagFile;
        this.officialTags = [];
        this.unofficialTags = [];
        this.internalTags = [];
    } 
    async readTagFile(conn, callback){
        conn.all( "select tID, tagContent, tagType from tags",
        [],         //no parameters
        (err,rows) => 
        {
            if( err )
            {
                console.log("select error:",err);
                return;
            }
            for(let i=0; i<rows.length; i++)
            {
                //console.log("row",i,":",rows[i].tagContent);
                if (rows[i].tagType == 1)
                {
                    this.officialTags.push(new Tag(rows[i].tagContent, rows[i].tID, "None", rows[i].tID, 0));
                }
                else if (rows[i].tagType == 2)
                {
                    this.unofficialTags.push(new Tag(rows[i].tagContent, rows[i].tID, "None", rows[i].tID, 0));
                }
                else if (rows[i].tagType == 3)
                {
                    this.internalTags.push(new Tag(rows[i].tagContent, rows[i].tID, "None", rows[i].tID, 0));
                }
            }
            callback();
        });
    }
    debug(res){
        res.send(this.internalTags[0].getTagENG());
    }
    async writeTagFile(alt){
        let data1 = this.officialTags;
        let data2 = this.unofficialTags;
        let data3 = this.internalTags;
        for (let i = 0; i < data1.length; i++)
        {
            alt.run( "insert into tags (tagContent, tagType) values ($tagContent, $tagType)",
            { $tagContent: data1.getTagENG(), $tagType: db.tagType.Official }, //Parameters - use the $ sign in .run()
            (e) => {  
                console.log("error is:",e) 
            }
        );
        }
        for (let i = 0; i < data2.length; i++)
        {
            alt.run( "insert into tags (tagContent, tagType) values ($tagContent, $tagType)",
            { $tagContent: data2.getTagENG(), $tagType: db.tagType.Unfficial }, //Parameters - use the $ sign in .run()
            (e) => {  
                console.log("error is:",e) 
            }
        );
        }
        for (let i = 0; i < data3.length; i++)
        {
            alt.run( "insert into tags (tagContent, tagType) values ($tagContent, $tagType)",
            { $tagContent: data3.getTagENG(), $tagType: db.tagType.Internal }, //Parameters - use the $ sign in .run()
            (e) => {  
                console.log("error is:",e) 
            }
        );
        }
    }
    getOfficialTags(){
        return this.officialTags;
    }
    getUnofficialTags(){
        return this.unofficialTags;
    }
    getInternalTags(){
        return this.internalTags;
    }
    addUnofficialTag(tag){
        this.unofficialTags.push(tag);
    }
}

class Tag {
    /**
     * This class is mostly for storing all the data associated with a particular tag. 
     * It shouldn't have any functions, save for maybe some getters and setters.
     */
    constructor(tagENG, tagID, aliases, primeAlias, totalUses){
        this.tagENG = String(tagENG);
        this.tagID = String(tagID);
        this.aliases = String(aliases);
        this.primeAlias = String(primeAlias);
        this.totalUses = String(totalUses);
    }
    getTagENG(tagENG){
        return this.tagENG;
    }
    getTagID(tagID){
        return this.tagID;
    }
    getAliases(aliases){
        return this.aliases;
    }
    getPrimeAlias(primeAlias){
        return this.primeAlias;
    }
    getTotalUses(totalUses){
        return this.totalUses;
    }
    setTagENG(tagENG){
        this.tagENG = tagENG;
    }
    setTagID(tagID){
        this.tagID = tagID;
    }
    setAliases(aliases){
        this.aliases = aliases;
    }
    setPrimeAlias(primeAlias){
        this.primeAlias = primeAlias;
    }
    setTotalUses(totalUses){
        this.totalUses = totalUses;
    }
    getString(){
        return "Tag: " + this.tagENG + ", ID: " + this.tagID + ", Aliases: " + this.aliases + ", Prime Alias: "  + this.primeAlias + ", Total Uses: " + this.totalUses + "<br>"
    }
}

exports.Meme = Meme;
exports.TagPool = TagPool;
exports.Tag = Tag;

//The main browser will use "export" before what you want to export