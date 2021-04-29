
class User{
    constructor(uname,passwd){
        this.username = uname;
        this.password = passwd;
        this.avatar = null;
        this.hierarchy = "user";  // "user", "mod", "admin"
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
    setHierarchy(email, hierarchy){
        if( hierarchy == "user" ||
            hierarchy == "mod" ||
            hierarchy == "admin"){
            if(this.accounts.has(email)){
                this.accounts.get(email).hierarchy = hierarchy;
                return 1;
            }
            else{    
                console.log("AccountManager.setHierarchy invalid user.");
                return 0;
            }
        }
        else{
            console.log("AccountManager.setHierarchy invalid hierarchy.")
            return 0;
        }
            
    }   
}

exports.AccountManager = AccountManager;