// require('dotenv').config();
// const { ObjectID } = require('bson');
// const mongoOperations = require('../../../services-leads/db/mongodb/mongo-operations');

// const { connect, disconnect } = require('../../../services-leads/db/mongodb/mongo-connection');
// const { MONGO_CONNECTION } = process.env;



// let testDB;


// describe('MongoDb Operation InsertOne', () => {
//     beforeAll(async () => {

//         testDB = mongoOperations;
//         testDB.collectionName = "leads";
//         testDB.dbName = "tests";

//         await connect(MONGO_CONNECTION);

//     })
//     it('check insert to the db the obj', async () => {
//         let num = await testDB.countDocuments();
//         num += 1;
//         const response = await testDB.insertOne({ name: "test", leadStatus: "new ", serialNumber: num, disable: false });
//         expect(response).toBeDefined();
//         expect(response).not.toBeNull();
//         expect(response).toBeInstanceOf(ObjectID);
//     })
//     it('check that the object is empty the objectID is returned', async () => {
//         const response = await testDB.insertOne();
//         expect(response).toBeDefined();
//         expect(response).not.toBeNull();
//         expect(response).toBeFalsy();
//     })
//     it('check that the function is return inserted id if the object is empty', async () => {
//         const response = await testDB.insertOne({});
//         expect(response).toBeDefined();
//         expect(response).not.toBeNull();
//         expect(response).toBeInstanceOf(ObjectID);

//     })
//     afterAll(async () => {
//         await disconnect();
//     })
// });

// describe('check function find', () => {
//     beforeAll(async () => {
//         testDB = mongoOperations;
//         testDB.collectionName = "leads";
//         testDB.dbName = "tests";
//         await connect(MONGO_CONNECTION);

//     })
//     it('check that the function return all the data', async () => {
//         const response = await testDB.find({ disable: false }, { _id: 0, serialNumber: 1, name: 1 });
//         expect(response).toBeInstanceOf(Array);
//         expect(response).toBeDefined();
//         expect(response).not.toBeNull();

//     })
//     it('check that the function return all the data if  hasnt  arguments', async () => {
//         const response = await testDB.find();
//         expect(response).toBeInstanceOf(Array);
//         expect(response).toBeDefined();
//         expect(response).not.toBeNull();
//         expect(response[0]).toBeDefined();
//         expect(response[0]).toBeInstanceOf(Object);


//     })
//     it('check that the function return all the data if hasnt all the argument', async () => {
//         const response = await testDB.find({ disable: false });
//         expect(response).toBeDefined();
//         expect(response).toBeDefined();
//         expect(response).not.toBeNull();
//         expect(response[0]).toBeDefined();
//         expect(response[0]).toBeInstanceOf(Object);
//     })
//     afterAll(async () => {
//         await disconnect();
//     })
// })
// describe('check function countDocuments', () => {
//     beforeAll(async () => {
//         testDB = mongoOperations;
//         testDB.collectionName = "leads";
//         testDB.dbName = "tests";
//         await connect(MONGO_CONNECTION);
//     })
//     it("should function return the number of the documents", async () => {
//         const response = await testDB.countDocuments();
//         expect(response).toBeDefined();
//         expect(response).not.toBeNull();
//     })
//     it("should function return the number of documents with send arguments",async()=>{
//         const response = await testDB.countDocuments(42);
//         expect(response).toBeDefined();
//         expect(response).not.toBeNull();
//     })
//     afterAll(async () => {
//         await disconnect();
//     })
// })
// describe('MongoDb Operation update', () => {
//     beforeAll(async () => {
//         testDB = mongoOperations;
//         testDB.collectionName = "lead";
//         testDB.dbName = "tests";
//         await connect(MONGO_CONNECTION)
//     })

//     it('check update the obj in the data', async () => {
        
//         const response = await testDB.updateOne({ serialNumber: "123", name: "test" })
//         expect(response).toBeDefined()
//         expect(response).toBeInstanceOf(Object)
//         expect(response).not.toBeNull()

//     })

//     it('check update obj with out argument empty', async()=>{
//         const response = await testDB.updateOne({})
//         expect(response).toBeDefined()
//         expect(response).toBeInstanceOf(Object)
//         expect(response).not.toBeNull()
//     })

//     it('check update obj with out arguments', async()=>{
//         const response = await testDB.updateOne()
//         expect(response).toBeDefined()
//         expect(response).toBeInstanceOf(Object)
//         expect(response).not.toBeNull()
//     })

//     afterAll(async () => {
//         await disconnect()
//     })
// })
// describe('check function aggregate',()=>{
//     beforeAll(async () => {
//         testDB = mongoOperations;
//         testDB.collectionName = "leads";
//         testDB.dbName = "tests";
//         await connect(MONGO_CONNECTION)
//     })
//     it('check that the function return the array of the correct data',async()=>{
//         const result=await testDB.aggregate({name:"test"},{name:1},0,5,{_id:0,name:1});
//         expect(result).toBeDefined();
//         expect(result).toBeInstanceOf(Array);
//         expect(result.length).toBeLessThanOrEqual(5);
//         expect(result[0]).toBeInstanceOf(Object);
//     })
//     it('check that the function return an empty array',async()=>{
//         const result=await testDB.aggregate({statusLead:"old",name:"test"},{_id:1},15,15,{_id:0,name:1});
//         expect(result).toBeDefined();
//         expect(result).toBeInstanceOf(Array);
//         expect(result.length).toBe(0);
//         expect(result[0]).not.toBeDefined();
//     })
//     it('check that the function return an empty array',async()=>{
//         const result=await testDB.aggregate({leadStatus:"new ",name:"test"},{_id:1},0,20);
//         expect(result).toBeDefined();
//         expect(result).toBeInstanceOf(Array);
//         expect(result.length).toBe(20);
//         expect(result[0]._id).toBeDefined();
//     })
//     afterAll(async () => {
//         await disconnect()
//     })
// })