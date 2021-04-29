let MemeManager = require("../MemeManager").MemeManager;
let assert = require("assert");

describe("MemeManager.js", () => {
    describe("addMeme()", () => {

        let MM;

        beforeEach( (done) => {
            MM = MemeManager.getInstance("main.sql");
            MM.truncateTable( () => {done()} );
        })

        it("should return 1 if add is successful", (done) => {
            MM.addMeme(0,"2019/01/03", (result) => {
                assert.strictEqual(result,1);
                done();
            })
        })
        it("should return -1 if add is unsuccessful", (done) => {
            MM.addMeme(0,"01/03/2019", (result) => {
                assert.strictEqual(result,-1);
                done();
            })
        })
        it("should return -1 if add is unsuccessful", (done) => {
            MM.addMeme(0,"2019/00/32", (result) => {
                assert.strictEqual(result,-1);
                done();
            })
        })
        it("should return -1 if add is unsuccessful", (done) => {
            MM.addMeme(0,"yyyy/mm/dd", (result) => {
                assert.strictEqual(result,-1);
                done();
            })
        })
        it("should return -1 if add is unsuccessful", (done) => {
            MM.addMeme(0,1032019, (result) => {
                assert.strictEqual(result,-1);
                done();
            })
        })
    })

    describe("deleteMemesByUserID()", () => {

        let MM;

        before( (done) => {
            MM = MemeManager.getInstance("main.sql");
            MM.truncateTable( () => {
                MM.addMeme(1,"2019/01/03", () => {
                    MM.addMeme(0,"2018/01/01", () => {
                        MM.addMeme(2,"2020/03/02", () => {
                            MM.addMeme(1,"2019/12/25", () => {
                                MM.addMeme(3,"2020/10/03", () => {done()});
                            });
                        });
                    });
                });
            });
        })

        it("should return 1 if delete is successful", (done) => {
            MM.deleteMemesByUserID(1, (result) => {
                assert.strictEqual(result,1);
                done();
            })
        })
        it("should return -1 if add is unsuccessful", (done) => {
            MM.deleteMemesByUserID(4, (result) => {
                assert.strictEqual(result,-1);
                done();
            })
        })
        it("should return -1 if add is unsuccessful", (done) => {
            MM.deleteMemesByUserID(-1, (result) => {
                assert.strictEqual(result,-1);
                done();
            })
        })
    })

    describe("searchMemesByDate()", () => {
        let MM;

        before( (done) => {
            MM = MemeManager.getInstance("main.sql");
            MM.truncateTable( () => {
                MM.addMeme(1,"2019/01/03", () => {
                    MM.addMeme(0,"2018/01/01", () => {
                        MM.addMeme(2,"2020/03/02", () => {
                            MM.addMeme(1,"2019/12/25", () => {
                                MM.addMeme(3,"2020/10/03", () => {done()});
                            });
                        });
                    });
                });
            });
        })

        it("should return rows of dates between start and end dates sorted in ascending order (oldest first)", (done) => {
            MM.searchMemesByDate("2019/01/01","2020/01/01",0, (result) => {
                assert.deepStrictEqual(result,[{date: '2019/01/03'},{date: '2019/12/25'}]);
                done();
            });
        });

        it("should return rows of dates between start and end dates sorted in ascending order (oldest first)", (done) => {
            MM.searchMemesByDate("2000/01/01","2050/01/01",0, (result) => {
                assert.deepStrictEqual(result,[{date: "2018/01/01"}, {date: "2019/01/03"}, {date: "2019/12/25"}, {date: "2020/03/02"}, {date: "2020/10/03"}]);
                done();
            });
        });

        it("should return rows of dates between start and end dates sorted in descending order (newest first)", (done) => {
            MM.searchMemesByDate("2019/01/01","2020/01/01",1, (result) => {
                assert.deepStrictEqual(result,[{date: '2019/12/25'},{date: '2019/01/03'}]);
                done();
            });
        });

        it("should return -1 if given incorrect parameters", (done) => {
            MM.searchMemesByDate(0,"2020/01/01",0, (result) => {
                assert.deepStrictEqual(result,-1);
                done();
            });
        });

        it("should return -1 if given incorrect parameters", (done) => {
            MM.searchMemesByDate("01/01/2019","2020/01/01",0, (result) => {
                assert.deepStrictEqual(result,-1);
                done();
            });
        });

        it("should return -1 if given incorrect parameters", (done) => {
            MM.searchMemesByDate("2019/01/01",0,0, (result) => {
                assert.deepStrictEqual(result,-1);
                done();
            });
        });

        it("should return -1 if given incorrect parameters", (done) => {
            MM.searchMemesByDate("2019/01/01","01/01/2020",0, (result) => {
                assert.deepStrictEqual(result,-1);
                done();
            });
        });

        it("should return -1 if given incorrect parameters", (done) => {
            MM.searchMemesByDate("2019/01/01","2020/01/01","abc", (result) => {
                assert.deepStrictEqual(result,-1);
                done();
            });
        });

        it("should return -1 if given incorrect parameters", (done) => {
            MM.searchMemesByDate("2019/01/01","2020/01/01",undefined, (result) => {
                assert.deepStrictEqual(result,-1);
                done();
            });
        });


        it("should return -1 if given incorrect parameters", (done) => {
            MM.searchMemesByDate(undefined,"2020/01/01",0, (result) => {
                assert.deepStrictEqual(result,-1);
                done();
            });
        });

        it("should return -1 if given incorrect parameters", (done) => {
            MM.searchMemesByDate("2020/01/01",undefined,0, (result) => {
                assert.deepStrictEqual(result,-1);
                done();
            });
        });

        it("should return -1 if given incorrect parameters", (done) => {
            MM.searchMemesByDate(undefined,undefined,0, (result) => {
                assert.deepStrictEqual(result,-1);
                done();
            });
        });

        it("should return -1 if given incorrect parameters", (done) => {
            MM.searchMemesByDate(null,"2020/01/01",0, (result) => {
                assert.deepStrictEqual(result,-1);
                done();
            });
        });

        it("should return -1 if given incorrect parameters", (done) => {
            MM.searchMemesByDate("2020/01/01",null,0, (result) => {
                assert.deepStrictEqual(result,-1);
                done();
            });
        });

        it("should return -1 if given incorrect parameters", (done) => {
            MM.searchMemesByDate(null,null,0, (result) => {
                assert.deepStrictEqual(result,-1);
                done();
            });
        });
    });
});