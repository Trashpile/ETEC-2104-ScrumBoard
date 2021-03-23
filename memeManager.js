class Meme
{
    constructor()
    {
        this.likes = 0;
        this.name = "Unamed Meme";
    }
}
class MemeManager
{
    constructor()
    {
        this.spicyMemes=[];
        for(let i = 0; i < this.spicyMemes.length; i++)
        {
            cat = new Meme();
            cat.likes = 10-i;
            cat.name = "Cat meme " + (i + 1);
            this.spicyMemes.append(cat);
            console.log(cat);
        }
    }
    
}
exports.MemeManager = MemeManager;