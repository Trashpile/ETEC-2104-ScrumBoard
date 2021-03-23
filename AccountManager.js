
class User{
    constructor(uname,passwd){
        this.username = uname;
        this.password = passwd;
    }
}
class AccountManager{
    constructor(){
        this.accounts = new Map();
    }
    addAccount(email,password){
        if(this.accounts.has(email))
            return false;
        let u = new User(email,password);
        this.accounts.set(email,u);
        return true;
    }
}
exports.AccountManager = AccountManager;