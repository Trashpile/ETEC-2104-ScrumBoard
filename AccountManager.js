
class User{
    constructor(uname,passwd){
        this.username = uname;
        this.password = passwd;
        this.avatar = null;
        this.visitorList = [];
        this.numVisitors = 0;
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
    addVisitor(userPage, visitor){
        this.accounts.get(userPage).visitorList.push(visitor);
        return this.accounts.get(userPage).visitorList;
    }
}

exports.AccountManager = AccountManager;