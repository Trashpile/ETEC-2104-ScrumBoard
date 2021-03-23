let Account = require("../Account").Account;
let AccountManager = require("../AccountManager").AccountManager;
let assert = require("assert");

describe("Account Tests", () => {


    let W;
    let S;

    beforeEach( () => {
        W = new Account("WhiteChicken", 1000, false);
        S = new Account("TheShadowMan", 1001, false);
    });

    describe("Follow New User", () => {
        it("should return true if user successfully follows other user", () => {
            assert.strictEqual( W.followNewUser(S.id, S), true);
        });
    });

    describe("Follow New User", () => {
        it("should return false if user tries to follow their self", () => {
            assert.strictEqual( W.followNewUser(W.id, W), false);
        });
    });

    describe("Follow New User", () => {
        it("should return false if user tries to follow someone they are already following", () => {
            assert.strictEqual( W.followNewUser(S.id, S), true);
            assert.strictEqual( W.followNewUser(S.id, S), false);
        });
    });

    describe("Follow New User", () => {
        it("should return true if user is in other user's follower list", () => {
            assert.strictEqual( S.isFollower(W.id, W), false);
            assert.strictEqual( W.followNewUser(S.id, S), true);
            assert.strictEqual( S.isFollower(W.id, W), true);
        });
    });

    describe("Follow New User", () => {
        it("should return true if user is set to private", () => {
            assert.strictEqual( S.isPrivate(), false);
            assert.strictEqual( S.setPrivate(true), true);
            assert.strictEqual( S.isPrivate(), true);
        });
    });

    describe("Follow New User", () => {
        it("should return false if other user is private", () => {
            assert.strictEqual( S.setPrivate(true), true);
            assert.strictEqual( W.followNewUser(S.id, S), false);
        });
    });

});