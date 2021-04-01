//Testing comment for debugging


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
}
exports.MemeManager = MemeManager;
exports.Meme = Meme;