const res = require("express/lib/response");
const { getConnection, connect, disconnect } = require("../../services/sql/sql-connection");


describe('SQL OPERATIONS', () => {
    let testconfig = {
        server: 'TB6-18\\MSSQLSERVER',  //update me 
        port: 1433,
        user: 'project', //update me
        password: '1234',  //update me
        database: 'Bytontests',
        options: {
            trustServerCertificate: true
        }
    };
    beforeAll(async () => {
        await connect(testconfig)

    })


    afterAll(async () => {
        await disconnect(testconfig)
    })


    describe('selectAreaAndPriceByItemCode', () => {
        it('it should return area and price of item code', async () => {
            const result = await getConnection().request().query(`SELECT areaName,price FROM priceList WHERE itemCode=2`)
            expect(result).toBeDefined()
            expect(result.output).toEqual({})
        })
        it('it should throw error when the itemCode is not a number', async () => {
            try {
                const result = await getConnection().request().query(`SELECT areaName,price FROM priceList WHERE itemCode='a'`)
            }
            catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)

            }
        })
    })


    describe('selectProductAndPricesByAreaName', () => {
        it('it should return product and prices of areaName', async () => {
            const result = await getConnection().request().query(`SELECT itemCode,price FROM priceList WHERE areaName='ashdod'`)
            expect(result).toBeDefined()
            // console.log("result ",result);
            // expect(result.output).toEqual({})
        })
        it('it should throw error when the areaName is not a string', async () => {
            try {
                const result = await getConnection().request().query('SELECT itemCode,price FROM priceList WHERE areaName=1')
            }
            catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)

            }
        })
    })

    describe('selectProductByAreaName', () => {
        it('it should return product  of areaName', async () => {
            const result = await getConnection().request().query(`SELECT itemCode FROM priceList WHERE areaName='ashdod'`)
            expect(result).toBeDefined()
            // console.log("result ",result);
            // expect(result.output).toEqual({})
        })
        it('it should throw error when the areaName is not a string', async () => {
            try {
                const result = await getConnection().request().query('SELECT itemCode FROM priceList WHERE areaName=1')
            }
            catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)

            }
        })
    })

    describe('selectAreaByClientOrSupplyCode', () => {
        it('it should return areaName of client or supply code', async () => {
            const result = await getConnection().request().query('SELECT areaName FROM priceList WHERE priceListCode=100')
            expect(result).toBeDefined()
            // console.log("result ",result);
            // expect(result.output).toEqual({})
        })
        it('it should throw error when the areaName is not a string', async () => {
            try {
                const result = await getConnection().request().query(`SELECT areaName FROM priceList WHERE priceListCode='100'`)
            }
            catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)

            }
        })
    })

    describe('selectAreaByClientOrSupplyCode', () => {
        it('it should return areaName of client or supply code', async () => {
            const result = await getConnection().request().query('SELECT areaName FROM priceList WHERE priceListCode=100')
            expect(result).toBeDefined()
            // console.log("result ",result);
            // expect(result.output).toEqual({})
        })
        it('it should throw error when the priceListCode is not a number', async () => {
            try {
                const result = await getConnection().request().query(`SELECT areaName FROM priceList WHERE priceListCode='100'`)
            }
            catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)

            }
        })
    })

    describe('addPriceList', () => {

        it('should insert one row to the table when the values sends according to them types', async () => {
            const result = await getConnection().request().query(`INSERT INTO TESTS VALUES ('tovi',15,'ashdod')`)
            console.log(result, " result");
            expect(result).toBeDefined()
            expect(result.rowsAffected).toEqual([1])
        })

        it('should throw an eror when the values send with out maching', async () => {
            try {
                const result = await getConnection().request().query(`INSERT INTO TESTS VALUES (tovi,15,'ashdod')`)
                console.log(result, " result");
            } catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(Error);
            }
        })

        it('should throw an eror when not all the values send', async () => {
            try {
                const result = await getConnection().request().query(`INSERT INTO TESTS VALUES (tovi,15)`)
                console.log(result, " result");
            } catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(Error);
            }
        })
    })

    describe('updatePriceList', () => {

        it('it should update the values when the is mach things tothe conditintion', async () => {
            const result = await getConnection().request().query(`UPDATE TESTS SET name='lalai' where age=15`)
            console.log(result, 'result from u[pdate');
            expect(result).toBeDefined()
            expect(result.output).toEqual({})
        })

        it('it should not effect when the condition is not mach', async () => {
            const result = await getConnection().request().query(`UPDATE TESTS SET name='lalai' where age=12`)
            console.log(result, 'result from u[pdate');
            expect(result).toBeDefined()
            expect(result.rowsAffected).toEqual([0])
        })
        it('it should throw an error when the argument ar not mach o the vakues that the table expect to get', async () => {
            try {

                const result = await getConnection().request().query(`UPDATE TESTS SET name=15 where age=12`)
            } catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(Error);
            }
        })
    })

    describe('deletePriceList', () => {
        it('it should update the value age to be 0', async () => {
            const result = await getConnection().request().query(`UPDATE TESTS SET age=0 where city='ashdod'`)
            expect(result).toBeDefined()
            console.log(result);
            expect(result.output).toEqual({})
        })
        it('it should throw an error when the argument ar not mach o the vakues that the table expect to get', async () => {
            try {

                const result = await getConnection().request().query(`UPDATE age SET name=15 where age=12`)
            } catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(Error);
            }
        })
    })


})

