const {connect ,getClient,disconnect} =require('../../../services/db/mongo-connection')
const { isConnected } = require('../helpers/mongo-helpers')

describe('GETCLIENT',()=>{
    it('should return a define object',()=>{
        const client =getClient()
        expect(client).toBeDefined()
    })

    it('should be null before connecting',()=>{
        const client =getClient()
        expect(client).toBeNull()
    })
})

describe('CONNECTION',()=>{
    it('should throw an error when calling disconnect before connect',async()=>{
        try{
            await disconnect()
        }
        catch(error){
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe("client is still null")
        }
    })

    it('should be connect to mongo after calling connect',async ()=>{
        await connect()
        const response =await isConnected(getClient())
        await disconnect()
        expect(response).toBeTruthy()
    })

    it('should throw error when url is empty',async ()=>{
        try{
            await connect('')
        }
        catch(error){
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(Error)
            // expect(error.message).toBe('connection string is not in the right format')
        }
    })
})


describe('DISCONNECT',()=>{
    it('',async ()=>{
        await connect()
        await disconnect()
        await disconnect()
    })
})