class Meme
{
    constructor(likes, name)
    {
        this.likes = likes;
        this.name = name;
    }
}
class MemeManager
{
    constructor()
    {
        this.mData=[];
    }
///Let the most liked meme rise to the top via Bubble sort.  Will refactor to sort by other means with merge sort.
    sortByLike()
    {
        
        let mData = this.mData;//So we don't have to reference this. each call
        for(let i = 0; i< mData.length - 1; i++)
        {
            
            for(let j = 0; j < mData.length - 1; j++)
            {
                if(mData[j].likes < mData[j+1].likes)
                {
                    let temp = mData[j];
                    mData[j] = mData[j+1];
                    mData[j+1] = temp;
                }
            }
        }
    }
    
}
exports.Meme = Meme;
exports.MemeManager = MemeManager;