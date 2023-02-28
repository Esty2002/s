const {connect,disconnect,getClient}=require('../../services/db/mongo-connection');
const {isConnected}=require('../helpers/mongodb-helpers');


describe('GETCLIENT',()=>{
    it('should retun a defind object',async ()=>{
        const client = await getClient();
        expect(client).toBeDefined();
    })
    it('shuold be null before connecting',async ()=>{
        const client =await getClient();
        expect(client).toBeNull();
    })
})