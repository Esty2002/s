// const { connect, disconnect } = require('../../services/db/mongo-connection')

// const { MongoDBOperations } = require('../../services/db/mongo-operations')

// const { connect, disconnect } = require('../../../services/db/sql/sql-connection')

// const { MongoDBOperations } = require('../../../services/db/sql/sql-operations')

// const url = 'mongodb://127.0.0.1:27017'

// describe('SQL OPERATIONS', () => {
//     let testDB
//     beforeAll(async () => {
//         await connect(url)
//         console.log('connected')
//         testDB = new MongoDBOperations('test', 'test')
//     })

//     afterAll(async () => {
//        // testDB.collection.drop()
//         await disconnect()
//         console.log('disconnected')
//     })

//     describe('insertone', ()=>{
//         it('should insert one document', async()=>{
//             const object1 = {key:123, value:'xxx'}
//             const result = await testDB.insertOne(object1)
//             console.log({result})
//             expect(result).toBeDefined()
//         })
//     })
// })