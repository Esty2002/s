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
//     createTable()

//     async function createTable() {
//     await connect()
//     const result = await getConnection().request().query("CREATE TABLE try (name VARCHAR(255), age VARCHAR(255))")
//     disconnect()

// }


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


})

