
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
    }
    addAccount(email,password){
        if(this.accounts.has(email))
            return false;
        let u = new User(email,password);
        this.accounts.set(email,u);
        return true;
    }
    getAvatar(email){
        return this.accounts.get(email).avatar;
    }
    setAvatar(email, newavatar){
        return this.accounts.get(email).avatar = newavatar;
}

exports.AccountManager = AccountManager;