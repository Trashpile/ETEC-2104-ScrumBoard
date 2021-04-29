let formatDate = require("../FormatDate").formatDate;
let assert = require("assert");

describe("FormatDate.js", () => {
    describe("formatDate()", () => {

        it("should turn mm/dd/yyyy date into yyyy/mm/dd format", () => {
            assert.strictEqual(formatDate("01/03/2020"),"2020/01/03");
        })

        it("should return -1 if given incorrect parameters", () => {
            assert.strictEqual(formatDate("2020/01/03"),-1);
        })

        it("should return -1 if given incorrect parameters", () => {
            assert.strictEqual(formatDate("yyyy/mm/dd"),-1);
        })

        it("should return -1 if given incorrect parameters", () => {
            assert.strictEqual(formatDate("0123456789"),-1);
        })

        it("should return -1 if given incorrect parameters", () => {
            assert.strictEqual(formatDate("abc"),-1);
        })

        it("should return -1 if given incorrect parameters", () => {
            assert.strictEqual(formatDate(123),-1);
        })

        it("should return -1 if given incorrect parameters", () => {
            assert.strictEqual(formatDate(null),-1);
        })

        it("should return -1 if given incorrect parameters", () => {
            assert.strictEqual(formatDate(),-1);
        })
    })
})