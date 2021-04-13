
class AccountManager {


    constructor(){
        this.users = new Map();
    }

    verifyUser(username, password)
    {
        if( this.users.has(username) )
        {
            return this.users.get(username) === password ;
        }
        return false;
    }

    addUser(username, password){
        if( this.users.has(username) )
            return false;
        this.users.set(username,password);
        return true;
    }

    getUID( username ){
        //stuff
    }
    isAdmin( userID ){
        return true;
    }
    setAdmin( userID, isAdmin ){
        //stuff
    }
    repost(username, password, memeID, otherUser){
        if(this.verifyUser(username,password)){
            //  continue
            return true;
        }
        else{
            //  Can't repost, not signed in
            return false;
        }
        
    }
}

exports.AccountManager = AccountManager;


//  Basic meme class used for testing the ability to repost
class Meme {
    // if 'reposter' is 'false,' this is an original post, originalPoster = owner;  (The owner of the post is the original poster)
    // if 'reposter' is a string, then this is a repost, originalPoster = reposter; (The new owner of the post, is not the original)
    constructor(accountName, memeData, reposter){
        this.owner = accountName;
        this.memeData = memeData;
        this.reposter = reposter;
        if(reposter == false){
            this.originalPoster = this.owner;
        }
        else{
            this.originalPoster = this.reposter;
        }
        this.memeID = Math.floor((Math.random() * 9999) + 1000);
        this.memeMade = true;
    }
}

exports.Meme = Meme;