let Account = require("./Account")
class User{
    constructor(uname,passwd){
        this.username = uname;
        this.password = passwd;
        this.avatar = null;
    }
}
class AccountManager{
    constructor(){
        //this is like a Python {} dictionary
        //or like a C++ std::map<>
        //key = email address
        //value = password
        this.accounts = new Map();
        this.nextID= 0;
    }
    addAccount(email,password){
        if(this.accounts.has(email))
            return false;
        //let u = new User(email,password);
        let a = new Account.Account(email, this.nextID, password, true);
        this.nextID++;
        this.accounts.set(email,a);
        return true;
    }
    getAvatar(email){
        return this.accounts.get(email).avatar;
    }
    setAvatar(email, newavatar){
        return this.accounts.get(email).avatar = newavatar;
    }

    hasAccount(email){
        if(this.accounts.has(email))
            return true;
        else
            return false;
    }
}

exports.AccountManager = AccountManager;