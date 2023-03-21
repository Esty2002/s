const { connect, disconnect, getClient } = require('../../../services/db/mongo/mongo_connection')
const { isConnected } = require('../../helpers/db_helpers/mongo_helpers')

describe(' GET CLIENT', () => {
    it('should return a defined object', () => {
        const client = getClient()
        expect(client).toBeDefined()
    })

    it('should be null before connecting', () => {
        const client = getClient()
        expect(client).toBeNull()
    })
})

describe('CONNECTION', () => {
    it('should throw an error when calling disconnect before connect', async () => {
        try {
            await disconnect()
        }
        catch (error) {
            expect(error).toBeDefined()
            expect(error.message).toBe('client is still null')
            expect(error).toBeInstanceOf(Error)
        }
    })

    it('should be connected to mongo after calling connect()', async () => {
        await connect()
        const response = await isConnected(getClient())
        await disconnect()
        expect(response).toBeTruthy()
    })

    it('should throw error when url is empty', async () => {
        try {
            await connect()
        }
        catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('connection string not in the right format.')
        }
    })

    it("should throw error when url hasn't 'mongodb'",async()=>{
        try{
            await connect('127.0.0.1:27017')
        }
        catch(error){
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('connection string not in the rigth format.')
        }
    })
})

describe('DISCONNECT', () => {
    it('', async () => {
        await connect()
        await disconnect()
        await disconnect()
    })
})
