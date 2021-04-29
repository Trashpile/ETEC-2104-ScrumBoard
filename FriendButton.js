
let accounts = [];
accounts.push(new Account("WhiteChicken", 1000, false));
accounts.push(new Account("TheShadowMan", 1001, false));
accounts.push(new Account("Primis", 1002, false));
accounts.push(new Account("krazykathryn", 1003, false));

let myAccount = null;
let otherAccount = null;

function send_retract()
{
    let elem = document.getElementById("sendButton");
    if (elem.value == "Send Friend Request")
    {
        // send friend request from myAccount to otherAccount
        myAccount.sendFriendRequest(otherAccount.id, otherAccount);
        console.log(myAccount.username + " sent a friend request to " + otherAccount.username);
        myAccount.logRequestsSent();
        elem.value = "Retract Request";
    }
    else
    {
        // retract friend request sent to otherAccount from myAccount
        myAccount.deleteSentRequest(otherAccount.id, otherAccount);
        console.log(myAccount.username + " retracted the friend request sent to " + otherAccount.username);
        myAccount.logRequestsSent();
        elem.value = "Send Friend Request";
    }
        
}

function load_accounts(id)
{
    let select = document.getElementById(id);
    for (let i = 0; i < accounts.length; i++)
    {
        let opt = accounts[i].username;
        let elem = document.createElement("option");
        elem.text = opt;
        elem.value = opt;
        select.add(elem);
    }
}

function login_logout()
{
    let elem = document.getElementById("loginButton");
    if (elem.value == "Login")
    {
        // login
        let value = document.getElementById("loginSelect").value;
        for (let i = 0; i < accounts.length; i++)
        {
            if (value == accounts[i].username)
            {
                hide("loginSelect");
                myAccount = accounts[i];
                myAccount.isLoggedIn = true;
                console.log(myAccount.username + " logged in");
                show("pageSelect");
                elem.value = "Logout";
                return;
            }
        }
        console.log("Please select a valid user");
    }
    else
    {
        // logout
        show("loginSelect");
        console.log(myAccount.username + " logged out");
        myAccount.isLoggedIn = false;
        myAccount = null;
        document.getElementById("pageSelect").value = "Select Account Page";
        hide("pageSelect");
        hide("sendButton");
        hide("requestsReceived");
        hide("acceptButton");
        hide("ignoreButton");
        hide("removeButton");
        hide("acceptButtonOnPage");
        hide("ignoreButtonOnPage");
        elem.value = "Login";
    }
}

function goto_page()
{
    let value = document.getElementById("pageSelect").value;
    if (value == myAccount.username)
    {
        // my page
        hide("sendButton");
        hide("removeButton");
        show("requestsReceived");
        //show("acceptButton");
        //show("ignoreButton");
        document.getElementById("requestsReceived").options.length=1;
        myAccount.requestsReceived.forEach(load_friend_requests);
        console.log("This is my page!");
        return;
    }
    for (let i = 0; i < accounts.length; i++)
    {
        if (value == accounts[i].username)
        {
            // go to selected user's page
            show("sendButton");
            hide("requestsReceived");
            hide("acceptButton");
            hide("ignoreButton");
            hide("removeButton");
            hide("acceptButtonOnPage");
            hide("ignoreButtonOnPage");
            otherAccount = accounts[i];
            console.log("Welcome to " + otherAccount.username + "'s Page!");
            if (myAccount.isFriend(otherAccount.id, otherAccount))
            {
                hide("sendButton");
                show("removeButton");
            }
            else if (myAccount.requestsSent.has(otherAccount.id))
                document.getElementById("sendButton").value = "Retract Request";
            else if (myAccount.hasFriendRequest(otherAccount.id, otherAccount))
            {
                hide("sendButton");
                show("acceptButtonOnPage");
                show("ignoreButtonOnPage");
            }
            else
                document.getElementById("sendButton").value = "Send Friend Request";
            return;
        }
    }
    hide("sendButton");
    hide("requestsReceived");
    hide("acceptButton");
    hide("ignoreButton");
    hide("removeButton");
    hide("acceptButtonOnPage");
    hide("ignoreButtonOnPage");
}

function acceptRequest(accepted)
{
    let value = document.getElementById("requestsReceived").value;
    let tempAccount;
    for (let i = 0; i < accounts.length; i++)
    {
        if (value == accounts[i].username)
        {
            tempAccount = accounts[i];
        }
    }
    if (accepted)
    {
        myAccount.acceptFriendRequest(tempAccount.id, tempAccount);
        document.getElementById("requestsReceived").options.length=1;
        myAccount.requestsReceived.forEach(load_friend_requests);
        hide("acceptButton");
        hide("ignoreButton");
        console.log(myAccount.username + " accepted " + otherAccount.username + "'s friend request!");
    }
    else
    {
        myAccount.ignoreReceivedRequest(tempAccount.id, tempAccount);
        document.getElementById("requestsReceived").options.length=1;
        myAccount.requestsReceived.forEach(load_friend_requests);
        hide("acceptButton");
        hide("ignoreButton");
        console.log(myAccount.username + " ignored " + otherAccount.username + "'s friend request.");
    }
}

function acceptRequestOnPage(accepted)
{
    if (accepted)
    {
        myAccount.acceptFriendRequest(otherAccount.id, otherAccount);
        hide("acceptButtonOnPage");
        hide("ignoreButtonOnPage");
        show("removeButton");
        console.log(myAccount.username + " accepted " + otherAccount.username + "'s friend request!");
    }
    else
    {
        myAccount.ignoreReceivedRequest(otherAccount.id, otherAccount);
        hide("acceptButtonOnPage");
        hide("ignoreButtonOnPage");
        document.getElementById("sendButton").value = "Send Friend Request";
        show("sendButton");
        console.log(myAccount.username + " ignored " + otherAccount.username + "'s friend request.");
    }
}

function show(id)
{
    document.getElementById(id).style.display = 'inline';
}

function hide(id)
{
    document.getElementById(id).style.display = 'none';
}

function load_friend_requests(value, key, map)
{
    let select = document.getElementById("requestsReceived");
    let opt = value.username;
    let elem = document.createElement("option");
    elem.text = opt;
    elem.value = opt;
    select.add(elem);
}

function check_request_selection()
{
    let value = document.getElementById("requestsReceived").value;
    if (value == "Friend Requests")
    {
        hide("acceptButton");
        hide("ignoreButton");
    }
    else
    {
        show("acceptButton");
        show("ignoreButton");
    }
}

function deleteFriend()
{
    myAccount.removeFriend(otherAccount.id, otherAccount);
    hide("removeButton");
    show("sendButton");
    document.getElementById("sendButton").value = "Send Friend Request";
    console.log(myAccount.username + " removed " + otherAccount.username + " as a friend");
}