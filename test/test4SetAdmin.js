let AccountManager = require("../AccountManager").AccountManager;
let assert = require("assert");


let accountManager = new AccountManager();
describe("My setAdmin Tests", () => {
    beforeEach( () => {
        accountManager.addUser("alice", "s3cr3t");
        accountID = accountManager.getUID("alice");
    });
    describe("setAdmin parameter test", () => {
        it("should return false for non-int parameter (String)", () => {
            assert.strictEqual(false, accountManager.setAdmin("String", false));
        });
        it("should return false if user enters a string (isAdmin)", () => {
            assert.strictEqual(false, accountManager.setAdmin(accountID, "String"));
        });
    });
    describe("setAdmin missing parameter tests", () => {
        it("should return false for missing isAdmin", () => {
            assert.strictEqual(false, accountManager.setAdmin(accountID));
        })
        it("should return false for missing both parameters", () => {
            assert.strictEqual(false, accountManager.setAdmin());
        });
    });
    describe("setAdmin verification/flag tests", () => {
        it("should return false if user does not exist", () => {
            assert.strictEqual(false, accountManager.setAdmin(12345));
        });
        it("should return true if admin status has been changed once", () => {
            assert.strictEqual(true, accountManager.setAdmin(accountID, false));
        });
        it("should return true again if status is changed once more", () => {
            assert.strictEqual(true, accountManager.setAdmin(accountID, true));
        })
    });
});