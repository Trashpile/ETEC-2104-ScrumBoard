class AccountManager{
    static instance = null;
    static accountFile = null;

    
    constructor(){
        let sqlite3 = require("sqlite3").verbose();
        let conn = new sqlite3.Database("foo.sql");
        conn.serialize()
    }

    static setFilename(fname){
        if( AccountManager.accountFile !== null )
            throw new Error("Filename initialized twice!");
        AccountManager.accountFile = fname;
    }

    static getInstance(){
        if( AccountManager.instance === null ){
            if( AccountManager.accountFile === null )
                throw new Error("No filename set");
            AccountManager.instance = new AccountManager( AccountManager.accountFile );
        }
        return AccountManager.instance;
    }

    initializeDatabase(){
        try{
            conn.run( `create table users(
                uid integer primary key,
                name varchar(32),
                password varchar(32),
                avatar blob)`,
                [], (e) => {
                    console.log("e is:",e)
                }
            );
        } finally{
            conn.close();
        }
    }

    userExists(username, password){
        try{
            conn.run( "select uid from accts where name = '"+username+"' and passwd = '"+password+"'",
                [], (e) => {
                    console.log("e is:",e)
                }
            );
        } finally{
            conn.close();
        }
    }
}

exports.AccountManager = AccountManager;