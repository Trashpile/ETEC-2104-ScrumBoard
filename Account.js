

class Account
{
    constructor(uname, uID, isLoggedIn)
    {
        this.username = uname;
        this.id = uID;
        this.isLoggedIn = isLoggedIn;
        this.currentStatus = "";
        this.friends = new Map();
        this.requestsReceived = new Map();
        this.requestsSent = new Map();
        
    }

    EnterStatus(uString){
        var str_length = uString.length;
        if (str_length <= 0){
            //No string inputted
            return false;
        }

        else if (str_length > 40){
            // More than 40 Characters
            return false;
        }

        else if (this.isLoggedIn === false){
            //Not logged in
            return false;
        }

        else{
            //Logged in, less than 40 characters, and a viable string
            this.currentStatus = uString;
            return true;
        }
    }

    DeleteStatus(){
        this.currentStatus = "";
        if (this.currentStatus !== ""){
            //Check if current status is cleared
            return false;
        }
        else{
            return true;
        }

    }

    sendFriendRequest(uID, other)
    {
        if (this.isLoggedIn === false)
        {
            //not logged in
            return false;
        }
        else if (uID == this.id || this.friends.has(uID))
        {
            // tries to send friend request to self or pre-existing friend
            return false;
        }
        else
        {
            // sends friend request to other
            this.requestsSent.set(uID, other);
            other.requestsReceived.set(this.id, this);
            return true;
        }
    }

    acceptFriendRequest(uID, other)
    {
        if (this.isLoggedIn === false)
        {
            // not logged in
            return false;
        }
        else if (uID == this.id)
        {
            // tries to accept friend request from self
            return false;
        }
        else if (this.requestsReceived.has(uID))
        {
            // accepts a friend request from a user who sent one
            this.friends.set(uID, other);
            other.friends.set(this.id, this);
            this.requestsReceived.delete(uID)
            other.requestsSent.delete(this.id);
            return true;

        }
        return false;

    }

    isFriend(uID, other)
    {
        if (this.isLoggedIn === false)
        {
            // not logged in
            return false;
        }
        // returns bool of if this user is friends with other
        return this.friends.has(uID);
    }

    hasFriendRequest(uID, other)
    {
        if (this.isLoggedIn === false)
        {
            // not logged in
            return false;
        }
        // return bool of if this user has a friend request from other
        return this.requestsReceived.has(uID);
    }

    removeFriend(uID, other)
    {
        if (this.isLoggedIn === false)
        {
            // not logged in
            return false;
        }
        else if (uID == this.id || this.friends.has(uID) == false)
        {
            // tries to unfriend self or non-friend user
            return false;
        }
        else if (this.friends.has(uID))
        {
            // unfriends a friend
            this.friends.delete(uID);
            other.friends.delete(this.id);
            return true;
        }
    }

    deleteSentRequest(uID, other)
    {
        if (this.isLoggedIn === false)
        {
            // not logged in
            return false;
        }
        else if (uID == this.id || this.requestsSent.has(uID) == false)
        {
            // tries to delete a friend request to self or to a user this user has not sent a request to
            return false;
        }
        else if (this.requestsSent.has(uID))
        {
            // deletes the friend request that this user sent to other 
            this.requestsSent.delete(uID);
            other.requestsReceived.delete(this.id);
            return true;
        }
    }

    ignoreReceivedRequest(uID, other)
    {
        if (this.isLoggedIn === false)
        {
            // not logged in
            return false;
        }
        else if (uID == this.id || this.requestsReceived.has(uID) == false)
        {
            // tries to ignore a friend request from self or a user who did not send one
            return false;
        }
        else if (this.requestsReceived.has(uID))
        {
            // ignores/declines the friend request sent by other
            this.requestsReceived.delete(uID);
            other.requestsSent.delete(this.id);
            return true;
        }
    }

    logRequestsSent()
    {
        console.log(this.requestsSent);
    }
}

exports.Account = Account;