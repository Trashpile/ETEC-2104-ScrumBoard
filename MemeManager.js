let DataBase = require("./database");
sqlite3 = require("sqlite3").verbose();
class Meme{
    constructor(/*possible list of tags?*/memeImage, isFavorite, creatorID, name){
        this.image = memeImage;
        this.favorite = isFavorite;
        this.creator = creatorID;
        this.likes = 0;
        this.name = name;
    }
}
class MemeManager{
    constructor(){
        this.memeData = [];
    }
    addMeme(memeImageTemp,creatorID)
    {
        this.memeImage = memeImageTemp;
        this.favorite = false;
        if(creatorID)
            this.creator = creatorID;
    }
    addFavorite(memeImageTemp){
        if(!(this.memeData.has(memeImageTemp)))
            this.addMeme(memeImageTemp);
        this.memeData.get(memeImageTemp).isFavorite = true;
    }
    getMeme(index){
        const memeArray = Array.from(this.memeData);
        if(!(memeArray[index])){
            return null;
        }
        return memeArray[index].memeImage;
    }
    getFavorite(index){
        const memeArray = Array.from(this.memeData);
        if(!(memeArray[index])){
            return null;
        }
        else if(memeArray[index].isFavorite == false)
        {
            return 0;
        }
        else
        {
            return memeArray[index].memeImage;
        }
    }
    //Sort the meme map by the likes
    sortByLike()
    {
        //Convert into list to sort.
        let memeData = [];//So we don't have to reference this. each call
        for(let i = 0; i< memeData.length - 1; i++)
        {
            
            for(let j = 0; j < memeData.length - 1; j++)
            {
                if(memeData[j].likes < memeData[j+1].likes)
                {
                    let temp = memeData[j];
                    memeData[j] = memeData[j+1];
                    memeData[j+1] = temp;
                }
            }
        }
    }
    //Will refactor soon...
    //Returns a List in the callback of the top 5 memes in the database.
    giveMeTheTopFiveMemesByLikes( callback ) {
        DataBase.Database.getInstance().all( "select name, likes from memes order by likes desc", //Bulds a dictionary out of the memes
        {},
        (e,rows) => 
        {
            let L = [];
            //returns only top 5 of the order likes memes, since it returns mid in DESC-ending order.
            for(let i=0;i<5 && i < rows.length; ++i )
            { //i++???
                console.log("row",i,":",rows[i].name, " likes:", rows[i].likes);
                L.push(rows[i].name + " Likes: " + rows[i].likes);
            }
            //conn.close();
            callback(L); //Sends a list of the top five memes, to app.js ideally...
        });
    }
}
exports.MemeManager = MemeManager;
exports.Meme = Meme;