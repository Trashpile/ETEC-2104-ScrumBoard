

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

exports.Account = Account;