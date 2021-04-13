

class Account
{
    constructor(uname, uID, isPrivate)
    {
        this.id = uID;
        this.username = uname;
        //this.follow = new Map();
        //this.followers = new Map();
        //this.followerRequests = new Map();
        //this.private = isPrivate;
        this.friends = new Map();
        this.requestsReceived = new Map();
        this.requestsSent = new Map();
    }

    sendFriendRequest(uID, other)
    {
        if (uID == this.id || this.friends.has(uID))
        {
            return false;
        }
        else
        {
            this.requestsSent.set(uID, other);
            other.requestsReceived.set(this.id, this);
            return true;

        }
    }

    acceptFriendRequest(uID, other)
    {
        if (uID == this.id)
        {
            return false;
        }
        else if (this.requestsReceived.has(uID))
        {
            this.friends.set(uID, other);
            other.friends.set(this.id, this);
            this.requestsReceived.delete(uID)
            other.requestsSent.delete(this.id);
            return true;

        }
        else
        {
            return false;
        }
    }

    isFriend(uID, other)
    {
        return this.friends.has(uID);
    }

    hasFriendRequest(uID, other)
    {
        return this.requestsReceived.has(uID);
    }

    removeFriend(uID, other)
    {
        if (uID == this.id || this.friends.has(uID) == false)
        {
            return false;
        }
        else if (this.friends.has(uID))
        {
            this.friends.delete(uID);
            other.friends.delete(this.id);
            return true;
        }
    }

    deleteSentRequest(uID, other)
    {
        if (uID == this.id || this.requestsSent.has(uID) == false)
        {
            return false;
        }
        else if (this.requestsSent.has(uID))
        {
            this.requestsSent.delete(uID);
            other.requestsReceived.delete(this.id);
            return true;
        }
    }

    ignoreReceivedRequest(uID, other)
    {
        if (uID == this.id || this.requestsReceived.has(uID) == false)
        {
            return false;
        }
        else if (this.requestsReceived.has(uID))
        {
            this.requestsReceived.delete(uID);
            other.requestsSent.delete(this.id);
            return true;
        }
    }

    // followNewUser( uID, other )
    // {
    //     // adds this user to other user's follower list
    //     if (uID === this.id)
    //     {
    //         return false;
    //     }
    //     else if (this.follow.has(uID))
    //     {
    //         return false;
    //     }
    //     else if ( other.private )
    //     {
    //         // send friend request
    //         other.followerRequests.set( this.id, this);
    //         return false;
    //     }
    //     else
    //     {
    //         this.follow.set(uID, other);
    //         other.newFollower(this.id, this);
    //         return true;
    //     }

    // }

    // newFollower( uID, other)
    // {
    //     // add other user to this user's follower list
    //     if (uID === this.id)
    //     {
    //         return false;
    //     }
    //     else if (this.followers.has(uID))
    //     {
    //         return false;
    //     }
    //     else
    //     {
    //         this.followers.set(uID, other);
    //         return true;
    //     }
    // }

    // isFollower( uID, other )
    // {
    //     // checks if other is a follower of this user
    //     if (this.followers.has(uID))
    //     {
    //         return true;
    //     }
    //     else
    //     {
    //         return false;
    //     }
    // }

    // isPrivate()
    // {
    //     // checks if this user is private
    //     return this.private;
    // }

    // setPrivacy( isPrivate )
    // {
    //     // private is a bool
    //     // true makes account private
    //     // false makes account public
    //     // sets a user to private or public
    //     this.private = isPrivate;
    //     if (isPrivate === true)
    //     {
    //         return this.private;
    //     }
    //     else if (isPrivate === false)
    //     {
    //         return !this.private;
    //     }
    //     else
    //     {
    //         return false;
    //     }
    // }
}

exports.Account = Account;