// const {connect,disconnect,getClient}=require('../../../services-leads/db/mongodb/mongo-connection');
// const {isConnected}=require('../../helpers/mongodb-helpers');


// describe('GETCLIENT',()=>{
//     it('should retun a defind object',async ()=>{
//         const client = await getClient();
//         expect(client).toBeDefined();
//     })
//     it('shuold be null before connecting',async ()=>{
//         const client =await getClient();
//         expect(client).toBeNull();
//     })
// })
// describe('CONNECTION',()=>{
//     it('should throw an error when callingisconnect before connection',async()=>{
//         try{
//             await disconnect();
//         }
//         catch (error){
//             expect(error).toBeDefined();
//             expect(error).toBeInstanceOf(Error);
//             expect(error.message).toBe("client is still null");
//         }
//     })
//     it('should connected to mongo when after calling connect()',async()=>{
//         await connect();
//         const response =await isConnected(getClient());
//         await disconnect();
//         expect(response).toBeTruthy();
//     })

// })

// describe('DISCNNECT',()=>{
//     it('disconnect',async()=>{
//         await connect();
//         await disconnect();
//         await disconnect();
//     })
// })