

class Account
{
    constructor(uname, uID, isPrivate)
    {
        this.id = uID;
        this.username = uname;
        this.follow = new Map();
        this.followers = new Map();
        this.followerRequests = new Map();
        this.private = isPrivate;
    }

    followNewUser( uID, other )
    {
        if (uID === this.id)
        {
            return false;
        }
        else if (this.follow.has(uID))
        {
            return false;
        }
        else if ( other.private )
        {
            // send friend request
            other.followerRequests.set( this.id, this);
            return false;
        }
        else
        {
            this.follow.set(uID, other);
            other.newFollower(this.id, this);
            return true;
        }

    }

    newFollower( uID, other)
    {
        if (uID === this.id)
        {
            return false;
        }
        else if (this.followers.has(uID))
        {
            return false;
        }
        else
        {
            this.followers.set(uID, other);
            return true;
        }
    }

    isFollower( uID, other )
    {
        if (this.followers.has(uID))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    isPrivate()
    {
        return this.private;
    }

    setPrivacy( isPrivate )
    {
        // private is a bool
        // true makes account private
        // false makes account public
        this.private = isPrivate;
        if (isPrivate === true)
        {
            return this.private;
        }
        else if (isPrivate === false)
        {
            return !this.private;
        }
        else
        {
            return false;
        }
    }
}

exports.Account = Account;