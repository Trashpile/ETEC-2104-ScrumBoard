let AccountManager = require("../AccountManager").AccountManager;
let assert = require("assert");


let accountManager = new AccountManager();
describe("My testAddUser Tests", () => {
    describe("addUser verification test", () => {
        it("should return true if user was added to database", () => {
            assert.strictEqual( true, accountManager.addUser("alice", "s3cr3t"));
        });
        it("should return false if username already exists in database", () => {
            assert.strictEqual( false, accountManager.addUser("alice", "s3cr3t"));
        });
    });
    describe("addUser parameter test", () => {
        it("should return false for non-string parameters (user int)", () => {
            assert.strictEqual( false , accountManager.addUser(123,"s3cr3t"));
        });
        it("should return false for non-string parameters (pass int)", () => {
            assert.strictEqual( false , accountManager.addUser("alice", 123));
        });
    });

    describe("addUser missing parameter test", () => {
        it("should return false for a missing password (w/ correct username)", () => {
            assert.strictEqual( false , accountManager.addUser("alice"));
        });
        it("should return false for a missing password (w/ incorrect username)", () => {
            assert.strictEqual( false , accountManager.addUser("bob"));
        });
        it("should return false for a missing both parameters", () => {
            assert.strictEqual( false , accountManager.addUser( ));
        });
    });
});