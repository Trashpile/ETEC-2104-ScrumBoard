
class Account
{
    constructor(uname, uID, isLoggedIn)
    {
        this.username = uname;
        this.id = uID;
        this.isLoggedIn = isLoggedIn;
        this.currentStatus = "";
        
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
        let u = new Account(email,password);
        this.accounts.set(email,u);
        return true;
    }
    
    getAvatar(email){
        return this.accounts.get(email).avatar;
    }
    setAvatar(email, newavatar){
        return this.accounts.get(email).avatar = newavatar;
    }
    setPassword(email, newPassword){
        if(this.accounts.has(email)){
            this.accounts.get(email).id = newPassword;
            return true;
        }
        else{
            return false;
        }
    }

}

exports.AccountManager = AccountManager;







