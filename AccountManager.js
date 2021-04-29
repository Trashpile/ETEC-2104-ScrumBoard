<<<<<<< HEAD
const { Account } = require("./Account");

class User{
    constructor(uname,passwd,uid){
        this.username = uname;
        this.password = passwd;
        this.uid = uid;
        this.avatar = null;
    }
}
class AccountManager{
    static id = 0;

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
        let u = new User(email,password,AccountManager.id);
        this.accounts.set(email,u);
        AccountManager.id += 1;
        return true;
    }
    removeAccount(email){
        if(this.accounts.has(email)){
            this.accounts.delete(email);
            return 1;
        }
        return -1;
    }
    getID(email){
        if(this.accounts.has(email))
            return this.accounts.get(email).uid;
        return -1;
    }
    getAvatar(email){
        return this.accounts.get(email).avatar;
    }
    setAvatar(email, newavatar){
        return this.accounts.get(email).avatar = newavatar;
=======

class AccountManager
{
    constructor()
    {
        this.users = new Map();
    }
    addAccount(email,password){
        //Access main database . . .
        
>>>>>>> EthanLowesBranch
    }
}

exports.AccountManager = AccountManager;