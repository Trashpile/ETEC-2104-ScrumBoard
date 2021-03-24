
class Meme{
    constructor(/*possible list of tags?*/memeImage, isFavorite, creatorID){
        this.image = memeImage;
        this.favorite = isFavorite;
        this.creator = creatorID;
    }
}
class MemeManager{
    constructor(){
        this.memeData = new Map();
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
        const memeArray = Array.from(this);
        if(!(memeArray[index])){
            return NULL;
        }
        return memeArray[index].memeImage;
    }
    getFavorite(index){
        const memeArray = Array.from(this);
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
}
exports.MemeManager = MemeManager;