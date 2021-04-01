let fs = require("fs");

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
        conn.serialize();
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
    async writeTagFile(location){
        let data1 = this.officialTags;
        let data2 = this.unofficialTags;
        let data3 = this.internalTags;
        for (let i = 0; i < data1.length; i++)
        {
            data1[i] = data1[i].getTagENG() + ":" + data1[i].getTagID() + ":" + data1[i].getAliases() + ":" + data1[i].getPrimeAlias() + ":" + data1[i].getTotalUses();
        }
        for (let i = 0; i < data2.length; i++)
        {
            data2[i] = data2[i].getTagENG() + ":" + data2[i].getTagID() + ":" + data2[i].getAliases() + ":" + data2[i].getPrimeAlias() + ":" + data2[i].getTotalUses();
        }
        for (let i = 0; i < data3.length; i++)
        {
            data3[i] = data3[i].getTagENG() + ":" + data3[i].getTagID() + ":" + data3[i].getAliases() + ":" + data3[i].getPrimeAlias() + ":" + data3[i].getTotalUses();
        }
        data1 = data1.join(",");
        data2 = data2.join(",");
        data3 = data3.join(",");
        let data = [];
        data.push(data1);
        data.push(data2);
        data.push(data3);
        data = data.join(";");
        fs.writeFile(location, data, 'utf8', (err) => {
            if (err) {
              console.error(err);
              return err;
            }
        });
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