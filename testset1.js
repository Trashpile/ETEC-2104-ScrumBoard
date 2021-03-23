let Account = require("../Account").Account;
let AccountManager = require("../AccountManager").AccountManager;
let assert = require("assert");

describe("Acceptable Status Bar Tests", () => {
    let user1;
    let user2;

    beforeEach( () => {
        user1 = new Account("HeWhoIsLoggedIn", 1000, true);
        user2 = new Account("NOTLOGGEDIN", 2000, false);
    });

    describe("EnterStatus", () => {
        it("should return true if string is less than or equal to 0 characters", () => {
            assert.strictEqual(user1.EnterStatus(""), false); // 0 characters
        });

        it("should return true if string is greater than 40 characters", () => {
            assert.strictEqual(user1.EnterStatus("1234512345123451234512345123456"), true); // 41 characters
        });

        it("should return true if user can't input status because they aren't logged in", () => {
            assert.strictEqual(user2.EnterStatus("viable string"), false); // Not logged in
        });

        it("should return true if you can input status while being logged in", () => {
            assert.strictEqual(user1.EnterStatus("this is a string"), true);
        });
    });

    describe("DeleteStatus", () => {
        it("should return true if status is deleted", () => {
            assert.strictEqual(user1.DeleteStatus(), true);
        });
    });
});
