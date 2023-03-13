const { getConnection, connect, disconnect } = require('../../db/sql-connection');
const { isConnected } = require('../helpers/sql-helpers');

describe('TEST CONNECTION', () => {
    // jest.setTimeout(500);
    // it('connect gets a wrong db_url', async () => {
    //     await connect('mongodb://127.0.0.1:27011');
    //     const myClient = getClient();
    //     const exist = await isConnected();
    //     await disconnect();
    //     expect(exist).toBeFalsy();
    // })

    it('calling disconnect before connect', async () => {
        expect.assertions(2);
        try{
            await disconnect();
        }
        catch(error){
            expect(error).toBeDefined();
            expect(error.message).toBe('client must be connected to mongo')
        }
    })

    it('connection doesn\'t exist without calling connect', async () => {
        const myConnection = await getConnection();
        const exist = await isConnected(myConnection);
        expect(myConnection).toBeNull();
        expect(exist).toBeFalsy();
    })

    it('connection exist after calling connect', async () => {
        await connect();
        const myConnection = await getConnection();
        const exist = await isConnected(myConnection);
        await disconnect();
        expect(myConnection).toBeDefined();
        expect(exist).toBeTruthy();
    })

})

// describe('DISCONNECT',()=>{
//     it('closes the connection',async()=>{
//         await connect();
//         let connected = await isConnected();
//         expect(connected).toBeTruthy();

//         await disconnect();
//         connected = await isConnected();
//         expect(connected).toBeFalsy();
//     })
// })