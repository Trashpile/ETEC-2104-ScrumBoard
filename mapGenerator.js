//made by Jared Phillips
class AccountManager{
    constructor(){
        //this is like a Python {} dictionary
        //or like a C++ std::map<>
        //key = email address
        //value = password
        this.accounts = new Map();

        let users = new Map();

        users.set('coolKid429', {userID: '0001'});
        users.set('fireWizard', {userID: '0002'});
        users.set('RagnarTheRed', {userID: '0003'});
        users.set('KiwiMatrix', {userID: '0004'});
    }
    
    
        

    findAccount(){

        
    }
}

exports.AccountManager = AccountManager;