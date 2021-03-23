let AccountManager = require("../AccountManager").AccountManager;
let assert = require("assert");


let accountManager = new AccountManager();
describe("My isAdmin Tests", () => {
    beforeEach( () => {
        accountManager.addUser("alice", "s3cr3t");
        accountID = accountManager.getUID("alice");
    });
    describe("isAdmin wrong parameter tests", () => {
        it("should return false for non-int parameter (String)", () =>{
            assert.strictEqual(false, accountManager.isAdmin("String"));
        });
    });
    describe("isAdmin missing parameters tests", () => {
        it("should return false if missing parameter", () => {
            assert.strictEqual(false, accountManager.isAdmin());
        });
    });
    describe("isAdmin account checks", () => {
        it("should return false for a non-admin account", () => {
            assert.strictEqual(false, accountManager.isAdmin(accountID));
        });
        it("should return true for an admin account", () => {
            accountManager.setAdmin(accountID, false); //did false here because I know they are not manager
            assert.strictEqual(true, accountManager.isAdmin(accountID));
        });
        it("should return false if user doesn't exist (assuming account is 0 or positive)", () => {
            assert.strictEqual(false, accountManager.isAdmin(-1));
        });
    });
});