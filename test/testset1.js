let sort = require("../sort").sort;
let Meme = require("../meme").Meme;
let assert = require("assert");

describe("sort.js", () => {
    describe("searchByDate()", () => {

        let testList;

        before( () => {
            testList = [new Meme(2017,11,25), new Meme(2015,3,2), new Meme(2014,0,3), new Meme(2015,3,2), new Meme(2013,4,6)];
        });

        it("should return slice of given array of Meme objects between start and end dates, which is sorted", () => {
            let expectedList = [new Meme(2015,3,2), new Meme(2015,3,2), new Meme(2014,0,3)];
            let resultList = sort.searchByDate(testList, new Date(2014,0,1), new Date(2016,0,1), sort.sortType.DECREASING);
            assert.deepStrictEqual(resultList, expectedList);
        });
        it("should return slice of given array of Meme objects between start and end dates, which is sorted", () => {
            let expectedList = [new Meme(2014,0,3), new Meme(2015,3,2), new Meme(2015,3,2)];
            let resultList = sort.searchByDate(testList, new Date(2014,0,1), new Date(2016,0,1), sort.sortType.INCREASING);
            assert.deepStrictEqual(resultList, expectedList);
        });
        it("should return sorted array of Meme objects if start and end dates are undefined", () => {
            let expectedList = [new Meme(2017,11,25), new Meme(2015,3,2), new Meme(2015,3,2), new Meme(2014,0,3), new Meme(2013,4,6)];
            let resultList = sort.searchByDate(testList, undefined, undefined, sort.sortType.DECREASING);
            assert.deepStrictEqual(resultList, expectedList);
        });
        it("should return sorted array of Meme objects if start and end dates are null", () => {
            let expectedList = [new Meme(2017,11,25), new Meme(2015,3,2), new Meme(2015,3,2), new Meme(2014,0,3), new Meme(2013,4,6)];
            let resultList = sort.searchByDate(testList, null, null, sort.sortType.DECREASING);
            assert.deepStrictEqual(resultList, expectedList);
        });
        it("should return sorted slice of given array of Meme objects that starts at start_date if start_date is defined and end_date is null", () => {
            let expectedList = [new Meme(2017,11,25), new Meme(2015,3,2), new Meme(2015,3,2), new Meme(2014,0,3)];
            let resultList = sort.searchByDate(testList, new Date(2014,0,1), null, sort.sortType.DECREASING);
            assert.deepStrictEqual(resultList, expectedList);
        });
        it("should return sorted slice of given array of Meme objects that ends at end_date if end_date is defined and start_date is null", () => {
            let expectedList = [new Meme(2015,3,2), new Meme(2015,3,2), new Meme(2014,0,3), new Meme(2013,4,6)];
            let resultList = sort.searchByDate(testList, null, new Date(2016,0,1), sort.sortType.DECREASING);
            assert.deepStrictEqual(resultList, expectedList);
        });
        it("should return an empty array if start_date is after end_date", () => {
            let resultList = sort.searchByDate(testList, new Date(2016,0,1), new Date(2014,0,1), sort.sortType.DECREASING);
            assert.deepStrictEqual(resultList, []);
        });
        it("should return -1 if missing parameters", () => {
            assert.strictEqual(sort.searchByDate(testList, new Date(2014,0,1), new Date(2016,0,1)), -1);
        });
        it("should return -1 if missing parameters", () => {
            assert.strictEqual(sort.searchByDate(), -1);
        });
        it("should return -1 if input array is not an array", () => {
            assert.strictEqual(sort.searchByDate(undefined, new Date(2014,0,1), new Date(2016,0,1), sort.sortType.DECREASING), -1);
        });
        it("should return -1 if input array is not an array", () => {
            assert.strictEqual(sort.searchByDate("abc", new Date(2014,0,1), new Date(2016,0,1), sort.sortType.DECREASING), -1);
        });
        it("should return -1 if input array is not an array", () => {
            assert.strictEqual(sort.searchByDate(4, new Date(2014,0,1), new Date(2016,0,1), sort.sortType.DECREASING), -1);
        });
        it("should return -1 if start_date is neither a Date object nor null/undefined", () => {
            assert.strictEqual(sort.searchByDate(testList, "abc", new Date(2016,0,1), sort.sortType.DECREASING), -1);
        });
        it("should return -1 if end_date is neither a Date object nor null/undefined", () => {
            assert.strictEqual(sort.searchByDate(testList, new Date(2014,0,1), "abc", sort.sortType.DECREASING), -1);
        });
        it("should return -1 if sort_type is neither \"increasing\" nor \"decreasing\"", () => {
            assert.strictEqual(sort.searchByDate(testList, new Date(2014,0,1), new Date(2016,0,1), "abc"), -1);
        });
        it("should return -1 if sort_type is neither \"increasing\" nor \"decreasing\"", () => {
            assert.strictEqual(sort.searchByDate(testList, new Date(2014,0,1), new Date(2016,0,1), 4), -1);
        });
    });


    describe("stringToDate()", () => {        
        it("should return a Date object when given a correctly formatted string (mm/dd/yyyy)", () => {
            let string = "03/02/2017";
            assert.deepStrictEqual(sort.stringToDate(string), new Date(2017,2,2));
        });
        it("should return -1 when given an incorrectly formatted string", () => {
            let string = "2017/03/02";
            assert.strictEqual(sort.stringToDate(string), -1);
        });
        it("should return -1 when given an incorrectly formatted string", () => {
            let string = "03/02/17";
            assert.strictEqual(sort.stringToDate(string), -1);
        });
        it("should return -1 when given an incorrectly formatted string", () => {
            let string = "03/ab/17";
            assert.strictEqual(sort.stringToDate(string), -1);
        });
        it("should return -1 when given a non string value", () => {
            assert.strictEqual(sort.stringToDate(4), -1);
        });
        it("should return -1 when given a non string value", () => {
            assert.strictEqual(sort.stringToDate(null), -1);
        });
        it("should return -1 when given a non string value", () => {
            assert.strictEqual(sort.stringToDate(undefined), -1);
        });
        it("should return -1 when missing parameter", () => {
            assert.strictEqual(sort.stringToDate(), -1);
        });
    });
});