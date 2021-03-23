let AccountManager = require("../AccountManager").AccountManager;
let assert = require("assert");


let accountManager = new AccountManager();
describe("My testVerifyUser Tests", () => {
    beforeEach( () => {
        accountManager.addUser("alice", "s3cr3t");
    });
    describe("verifyUser database check", () => {
        it("should return false if user doesn't exist (only password correct)", () => {
            assert.strictEqual( false, accountManager.verifyUser("bob", "s3cr3t"));
        });
        it("should return false if user doesn't exist (only user correct)", () => {
            assert.strictEqual( false, accountManager.verifyUser("alice", "OOPSE!"));
        });
        it("should return false if user doesn't exist (neither correct)", () => {
            assert.strictEqual( false, accountManager.verifyUser("bob", "OOPSE!"));
        });
        it("should return true if user does exist", () => {
            assert.strictEqual( true, accountManager.verifyUser("alice", "s3cr3t"));
        });
    });

    describe("verifyUser parameter test", () => {
        it("should return false for non-string parameters (user int)", () => {
            assert.strictEqual( false , accountManager.verifyUser(123,"s3cr3t"));
        });
        it("should return false for non-string parameters (pass int)", () => {
            assert.strictEqual( false , accountManager.verifyUser("alice", 123));
        });
    });

    describe("verifyUser missing parameter tests", () => {
        it("should return false for a missing password (w/ correct username)", () => {
            assert.strictEqual( false , accountManager.verifyUser("alice"));
        });
        it("should return false for a missing password (w/ incorrect username)", () => {
            assert.strictEqual( false , accountManager.verifyUser("bob"));
        });
        it("should return false for a missing both parameters", () => {
            assert.strictEqual( false , accountManager.verifyUser( ));
        });
    });
});