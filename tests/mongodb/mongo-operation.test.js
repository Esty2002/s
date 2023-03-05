require('dotenv').config();
const { ObjectID } = require('bson');
const { connect, disconnect } = require('../../services/db/mongo-connection');
const { MONGO_CONNECTION } = process.env;
const { mongoOperations } = require('../../services/db/mongo-operations');

describe('MongoDb Operation InsertOne', () => {
    let testDB
    beforeAll(async () => {
        testDB = mongoOperations;
        testDB.collectionName = "leads";
        testDB.dbName = "tests";
        await connect(MONGO_CONNECTION);

    })
    it('check insert to the db the obj', async () => {
        const response = await testDB.insertOne({ name: "test", leadStatus: "new " });
        expect(response).toBeDefined();
        expect(response).not.toBeNull();
        expect(response).toBeInstanceOf(ObjectID);
    })
    it('check that the object is empty the objectID is returned',async()=>{
        const response = await testDB.insertOne();
        expect(response).toBeDefined();
        expect(response).not.toBeNull();
        expect(response).toBeFalsy();
    })
    if('check that the function is return inserted id if the object is empty',async()=>{
        const response=await testDB.insertOne({});
        expect(response).toBeDefined();
        expect(response).not.toBeNull();
        expect(response).toBeInstanceOf(ObjectID);

    })
    afterAll(async () => {
        await disconnect();

    })


})
