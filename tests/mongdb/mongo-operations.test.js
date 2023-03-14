require('dotenv').config();


const { connect, disconnect } = require('../../services/db/mongo-connection');
const { MONGO_CONNECTION } = process.env;
const  MongoDBOperations  = require('../../services/db/mongo-operations');


let testDB;
 

describe('MongoDb Operation update', () => {
    beforeAll(async () => {
        testDB = MongoDBOperations;
        testDB.collectionName = "lead";
        testDB.dbName = "tests";
        await connect(MONGO_CONNECTION)
    })

    it('check update the obj in the data', async () => {
        
        const response = await testDB.updateOne({ serialNumber: "123", name: "test" })
        expect(response).toBeDefined()
        expect(response).toBeInstanceOf(Object)
        expect(response).not.toBeNull()

    })

    it('check update obj with out argument empty', async()=>{
        const response = await testDB.updateOne({})
        expect(response).toBeDefined()
        expect(response).toBeInstanceOf(Object)
        expect(response).not.toBeNull()
    })

    it('check update obj with out arguments', async()=>{
        const response = await testDB.updateOne()
        expect(response).toBeDefined()
        expect(response).toBeInstanceOf(Object)
        expect(response).not.toBeNull()
    })

    afterAll(async () => {
        await disconnect()
    })
})







