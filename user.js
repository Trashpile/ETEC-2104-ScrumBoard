"use strict";

class User{
    constructor(user,pass){
        this.username = user;
        this.password = pass;
        this.isLoggedIn = false;
        this.id += 1;
    }
}

class Users{
    constructor(){
        this.users = [];
    }
    newUser(user, pass){
        let u = new User(user, pass);
        this.users.push(u);
        return u;
    }
}

exports.Users = Users;