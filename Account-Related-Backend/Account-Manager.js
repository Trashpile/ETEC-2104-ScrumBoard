let User = require("./User");
class AccountManager
{
    constructor()
    {
        //this is like a Python {} dictionary
        //or like a C++ std::map<>
        //key = email address
        //value = password
        this.accounts = new Map();
    }
    addAccount(email,password)
    {
        if(this.accounts.has(email))
            return false;
        let u = new User.User(email,password);
        this.accounts.set(email,u);
        return true;
        //returns true if made, false if already exits.
    }
    removeAccount(email,password)
    {
        //To Be done
    }
    changeAccountPassword(email,password)
    {
        //To Be done
    }
    changeAccountEmail(email,password)
    {
        //To Be done
    }
    getAvatar(email)
    {
        return this.accounts.get(email).avatar;//returns Avatar of email
    }
    setAvatar(email, newavatar)
    {
        return this.accounts.get(email).avatar = newavatar;//sets avatar of given email
    }
}

exports.AccountManager = AccountManager;