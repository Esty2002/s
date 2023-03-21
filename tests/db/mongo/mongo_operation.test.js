const { connect, disconnect } = require('../../../services/db/mongo/mongo_connection')
const { MongoDBOperations } = require('../../../services/db/mongo/mongo-operation')

const url = 'mongodb://127.0.0.1:27017'

describe('MONGO OPERTION', () => {
    let testDB
    beforeAll(async () => {
        await connect(url)
        console.log('connected');
        testDB = new MongoDBOperations('test', 'test')
    })

    afterAll(async () => {
        await disconnect()
        console.log('disconnected');
    })

    describe('find', () => {
        it('find should find a documents', async () => {
            const result = await testDB.find()
            expect(result).toBeDefined()
        })
    })

})