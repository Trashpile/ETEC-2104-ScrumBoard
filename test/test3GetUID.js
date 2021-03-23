let AccountManager = require("../AccountManager").AccountManager;
let assert = require("assert");


let accountManager = new AccountManager();
describe("My getUID Tests", () => {
    beforeEach( () => {
        accountManager.addUser("alice", "s3cr3t");
    });
    describe("getUID parameter test", () => {
        it("should return a -1 for non-string parameter (int)", () => {
            assert.strictEqual(-1, accountManager.getUID(123));
        });
    });
    describe("getUID missing parameter test", () => {
        it("should return -1 for missing parameter", () => {
            assert.strictEqual(-1, accountManager.getUID());
        });
    });
    describe("getUID verification tests", () => {
        it("should return a positive number if user enters an existing account", () => {
            assert(accountManager.getUID("alice") >= 0);
        });
        it("should return a -1 if user enters a non-existing account", () => {
            assert.strictEqual(-1, accountManager.getUID("bob"));
        });
    });
});