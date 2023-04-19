jest.mock('../../../services-price-list/db/mongo-operations', () => {
    return {
        updateOne: jest.fn((obj) => {
            return {"updateOne": obj};
        }),
        findOne: jest.fn((obj) => {
            if (obj)
                return { test: "success" };
            else
                return null;
        })
        ,
        insertOne: jest.fn((obj) => {
            if (obj) {

                return "123456";

            }
            return false;
        })
    }
});

const { insertArea, findSupplierOrClient,updateSupplierOrClient, updateArea } = require('../../../modules/price-list/areas')

describe('CHECK FUNCTION insertArea', () => {

    it('should return ObjectId when we inserted', async () => {
        let result = await insertArea({ name: "Moshe", age: 8 })
        expect(result).toBeDefined()
        expect(result).not.toBeNull()
        expect(result).toBe("123456")
        expect(result).toBeTruthy()
    })
    
    it('should return ObjectId when we inserted any element', async () => {
        let result = await insertArea()
        expect(result).toBeDefined()
        expect(result).toBeFalsy()
        expect(result).not.toBeNull()
    })

    it('should return ObjectId when we inserted empty obj', async () => {
        let result = await insertArea({})
        expect(result).toBeDefined()
        expect(result).not.toBeNull()
        expect(result).toBe("123456")
        expect(result).toBeTruthy()
    })
})


describe('CHECK FUNCTION findAreaBySupplierOrClientCode', () => {

    it('should return ObjectId when we try to find', async () => {
        let result = await findAreaBySupplierOrClientCode()
        expect(result).toBeDefined()
        expect(result).toBeInstanceOf(Object)
    })

    it('should return ObjectId when we try to find with elements', async () => {
        let result = await findAreaBySupplierOrClientCode({ supplierOrClientCode: "123456" })
        expect(result).toBeDefined()
        expect(result).toBeInstanceOf(Object)
    })

    
})
describe('CHECK FUNCTION findSupplierOrClient', () => {

    it('should return ObjectId when we try to find', async () => {
        let result = await findSupplierOrClient()
        expect(result).toBeDefined()
        expect(result).toBeInstanceOf(Object)
    })

    it('should return ObjectId when we try to find with elements', async () => {
        let result = await findSupplierOrClient({ supplierOrClientCode: "123456" })
        expect(result).toBeDefined()
        expect(result).toBeInstanceOf(Object)
    })
})


describe('CHECK FUNCTION updateSupplierOrClient', () => {

    it('should function when we gave any thing ', async () => {
        let result = await updateSupplierOrClient()
        expect(result).toBeDefined()
        expect(result).not.toBeNull()
    })

    it('should function when we gave all element ', async () => {
        let result = await updateSupplierOrClient({ supplierOrClientCode: "123456" })
        expect(result).toBeDefined()
        expect(result).not.toBeNull()
    })

})

describe('CHECK FUNCTION updateArea', () => {

    it('should function when we gave any thing ', async () => {
        let result = await updateArea()
        expect(result).toBeDefined()
        expect(result).not.toBeNull()
    })

    it('should function when we gave element ', async () => {
        let result = await updateArea({ supplierOrClientCode: "123456" }, "Moshe")
        expect(result).toBeDefined()
        expect(result).not.toBeNull()
    })
})
