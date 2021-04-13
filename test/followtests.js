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

    describe("sendFriendRequest", () => {
        it("should return true if user sends friend request to other user", () => {
            assert.strictEqual( W.sendFriendRequest(S.id, S), true);
        });
    });

    describe("sendFriendRequest", () => {
        it("should return false if user tries to send friend request to itself", () => {
            assert.strictEqual( W.sendFriendRequest(W.id, W), false);
        });
    });

    describe("sendFriendRequest", () => {
        it("should return false if user tries to send friend request to an existing friend", () => {
            assert.strictEqual( W.sendFriendRequest(S.id, S), true);
            assert.strictEqual( S.acceptFriendRequest(W.id, W), true);
            assert.strictEqual( W.isFriend(S.id, S), true);
            assert.strictEqual( W.sendFriendRequest(S.id, S), false);
        });
    });

    describe("acceptFriendRequest", () => {
        it("should return true if user accepts a friend request", () => {
            assert.strictEqual( S.sendFriendRequest(W.id, W), true);
            assert.strictEqual( W.acceptFriendRequest(S.id, S), true);
        });
    });

    describe("acceptFriendRequest", () => {
        it("should return false if user tries to accepts a friend request from itself", () => {
            assert.strictEqual( W.acceptFriendRequest(W.id, W), false);
        });
    });

    describe("acceptFriendRequest", () => {
        it("should return false if user tries to accepts a friend request from a user who did not send one", () => {
            assert.strictEqual( W.hasFriendRequest(S.id, S), false);
            assert.strictEqual( W.acceptFriendRequest(S.id, S), false);
        });
    });

    describe("sendFriendRequest", () => {
        it("should return false if user tries to accept a friend request from an existing friend", () => {
            assert.strictEqual( W.sendFriendRequest(S.id, S), true);
            assert.strictEqual( S.acceptFriendRequest(W.id, W), true);
            assert.strictEqual( W.isFriend(S.id, S), true);
            assert.strictEqual( W.acceptFriendRequest(S.id, S), false);
        });
    });

    describe("isFriend", () => {
        it("should return true if user is friends with other user", () => {
            assert.strictEqual( W.sendFriendRequest(S.id, S), true);
            assert.strictEqual( S.acceptFriendRequest(W.id, W), true);
            assert.strictEqual( W.friends.has(S.id), true);
            assert.strictEqual( W.isFriend(S.id, S), true);
        });
    });

    describe("isFriend", () => {
        it("should return false if other has not accepted friend request", () => {
            assert.strictEqual( W.sendFriendRequest(S.id, S), true);
            assert.strictEqual( W.friends.has(S.id), false);
            assert.strictEqual( W.isFriend(S.id, S), false);
        });
    });

    describe("isFriend", () => {
        it("should return false if user is not friends with other user", () => {
            assert.strictEqual( W.friends.has(S.id), false);
            assert.strictEqual( W.isFriend(S.id, S), false);
        });
    });

    describe("hasFriendRequest", () => {
        it("should return true if user has friend request from other user", () => {
            assert.strictEqual( S.hasFriendRequest(W.id, W), false);
            assert.strictEqual( W.sendFriendRequest(S.id, S), true);
            assert.strictEqual( S.hasFriendRequest(W.id, W), true);
        });
    });

    describe("hasFriendRequest", () => {
        it("should return false if user does not have friend request from other user", () => {
            assert.strictEqual( S.requestsReceived.has(W.id), false);
            assert.strictEqual( S.hasFriendRequest(W.id, W), false);
        });
    });

    describe("hasFriendRequest", () => {
        it("should return false if user accepted friend request from other user", () => {
            assert.strictEqual( S.requestsReceived.has(W.id), false);
            assert.strictEqual( S.hasFriendRequest(W.id, W), false);
            assert.strictEqual( W.sendFriendRequest(S.id, S), true);
            assert.strictEqual( S.hasFriendRequest(W.id, W), true);
            assert.strictEqual( S.acceptFriendRequest(W.id, W), true);
            assert.strictEqual( S.hasFriendRequest(W.id, W), false);

        });
    });

    describe("removeFriend", () => {
        it("should return true if user removes other user as a friend", () => {
            assert.strictEqual( W.isFriend(S.id, S), false);
            assert.strictEqual( W.sendFriendRequest(S.id, S), true);
            assert.strictEqual( S.acceptFriendRequest(W.id, W), true);
            assert.strictEqual( W.isFriend(S.id, S), true);
            assert.strictEqual( S.isFriend(W.id, W), true);
            assert.strictEqual( W.removeFriend(S.id, S), true);
            assert.strictEqual( W.isFriend(S.id, S), false);
            assert.strictEqual( S.isFriend(W.id, W), false);
        });
    });

    describe("removeFriend", () => {
        it("should return false if other user is not a friend", () => {
            assert.strictEqual( W.removeFriend(S.id, S), false);
        });
    });

    describe("removeFriend", () => {
        it("should return false user tries to unfriend itself", () => {
            assert.strictEqual( W.removeFriend(W.id, W), false);
        });
    });

    describe("deleteSentRequest", () => {
        it("should return true if sent friend request is deleted", () => {
            assert.strictEqual( W.sendFriendRequest(S.id, S), true);
            assert.strictEqual( S.hasFriendRequest(W.id, W), true);
            assert.strictEqual( W.deleteSentRequest(S.id, S), true);
            assert.strictEqual( S.hasFriendRequest(W.id, W), false);
        });
    });

    describe("deleteSentRequest", () => {
        it("should return false if user tries to delete a request to itself", () => {
            assert.strictEqual( W.deleteSentRequest(W.id, W), false);
        });
    });

    describe("deleteSentRequest", () => {
        it("should return false if user tries to delete a request that does not exist", () => {
            assert.strictEqual( W.deleteSentRequest(S.id, S), false);
        });
    });

    describe("deleteSentRequest", () => {
        it("should return false if user tries to delete a request that was accepted", () => {
            assert.strictEqual( W.sendFriendRequest(S.id, S), true);
            assert.strictEqual( S.acceptFriendRequest(W.id, W), true);
            assert.strictEqual( W.deleteSentRequest(S.id, S), false);
        });
    });

    describe("ignoreReceivedRequest", () => {
        it("should return true if received friend request is ignored", () => {
            assert.strictEqual( W.sendFriendRequest(S.id, S), true);
            assert.strictEqual( S.hasFriendRequest(W.id, W), true);
            assert.strictEqual( S.ignoreReceivedRequest(W.id, W), true);
            assert.strictEqual( S.hasFriendRequest(W.id, W), false);
        });
    });

    describe("ignoreReceivedRequest", () => {
        it("should return false if user tries to delete a request from itself", () => {
            assert.strictEqual( W.ignoreReceivedRequest(W.id, W), false);
        });
    });

    describe("ignoreReceivedRequest", () => {
        it("should return false if user tries to ignore a request that does not exist", () => {
            assert.strictEqual( W.ignoreReceivedRequest(S.id, S), false);
        });
    });

    describe("ignoreReceivedRequest", () => {
        it("should return false if user tries to ignore a request that was accepted", () => {
            assert.strictEqual( W.sendFriendRequest(S.id, S), true);
            assert.strictEqual( S.acceptFriendRequest(W.id, W), true);
            assert.strictEqual( S.ignoreReceivedRequest(W.id, W), false);
        });
    });

    // describe("followNewUser", () => {
    //     it("should return true if user successfully follows other user", () => {
    //         assert.strictEqual( W.followNewUser(S.id, S), true);
    //     });
    // });

    // describe("followNewUser", () => {
    //     it("should return false if user tries to follow their self", () => {
    //         assert.strictEqual( W.followNewUser(W.id, W), false);
    //     });
    // });

    // describe("followNewUser", () => {
    //     it("should return false if user tries to follow someone they are already following", () => {
    //         assert.strictEqual( W.followNewUser(S.id, S), true);
    //         assert.strictEqual( W.followNewUser(S.id, S), false);
    //     });
    // });

    // describe("isFollower", () => {
    //     it("should return true if user is in other user's follower list", () => {
    //         assert.strictEqual( S.isFollower(W.id, W), false);
    //         assert.strictEqual( W.followNewUser(S.id, S), true);
    //         assert.strictEqual( S.isFollower(W.id, W), true);
    //     });
    // });

    // describe("isPrivate", () => {
    //     it("should return true if user is set to private", () => {
    //         assert.strictEqual( S.isPrivate(), false);
    //         assert.strictEqual( S.setPrivacy(true), true);
    //         assert.strictEqual( S.isPrivate(), true);
    //     });
    // });

    // describe("isPrivate", () => {
    //     it("should return true if user is set to public", () => {
    //         assert.strictEqual( S.isPrivate(), false);
    //         assert.strictEqual( S.setPrivacy(true), true);
    //         assert.strictEqual( S.isPrivate(), true);
    //         assert.strictEqual( S.setPrivacy(false), true);
    //         assert.strictEqual( S.isPrivate(), false);
    //     });
    // });

    // describe("setPrivacy", () => {
    //     it("should return false if setPrivacy is not given a bool", () => {
    //         assert.strictEqual( S.setPrivacy("true"), false);
    //     });
    // });

    // describe("followNewUser", () => {
    //     it("should return false if other user is private", () => {
    //         assert.strictEqual( S.setPrivacy(true), true);
    //         assert.strictEqual( W.followNewUser(S.id, S), false);
    //     });
    // });

});