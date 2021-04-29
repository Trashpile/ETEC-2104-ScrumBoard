let AccountManager = require("../AccountManager").AccountManager;
let assert = require("assert");

describe("AccountManager.js", () => {
    
    let AM = new AccountManager();

    before( () => {
        AM.addAccount("bob@example.com","1234");
    })

    describe("getID", () => {
        it("should return the ID of the user corresponding to the given email", () => {
            assert.strictEqual(AM.getID("bob@example.com"), 0);
        })
        it("should return -1 if the given email does not correspond to a user", () => {
            assert.strictEqual(AM.getID("alice@example.com"), -1);
        })
    })

    describe("removeAccount", () => {
        it("should return 1 if the user is removed", () => {
            assert.strictEqual(AM.removeAccount("bob@example.com"), 1);
        })
        it("should return -1 if the user does not exist", () => {
            assert.strictEqual(AM.removeAccount("alice@example.com"), -1);
        })
    })
})