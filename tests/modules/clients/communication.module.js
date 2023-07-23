// const {postCommunications}=require('../../../modules/clients/communication')

// jest.mock('../../../services-clients/mongo/mongo-operations',()=>{
//     return{
//         insertOne:jest.fn((obj)=>{
//             obj.insertedId=10;
//             return obj.insertedId;
//         })
//     }
// })



// describe('POSTCOMMUNICATIONS',()=>{
//     it('should return defined response',async()=>{
//         const res=await postCommunications({name:"rachel",customerCode:1000},"try");
//         expect(res).toBeDefined();
//     })

//     it('should execute insertOne twice',async ()=>{
//         _=await postCommunications({name:"rachel",customerCode:1000},"try");
//         const methods=jest.requireMock('../../../services-clients/mongo/mongo-operations')
//         expect(methods.insertOne).toHaveBeenCalled();
//         expect(methods.insertOne).toHaveBeenCalledTimes(2);
    
//     })
// })
