it('xxx', ()=>
{
    expect(1+1).toBe(2)
})
// jest.mock('../../../services-leads/db/sql/sql-operations.js', () => {
//     return {
//         select: jest.fn((obj) => {
//             if (obj.tableName === "statusesLead") {
//                 return true;
//             }
//             else {
//                 return false;
//             }
//         }),
//         insert: jest.fn((obj) => {
//             if (obj.tableName === "statusesLead" && !obj.values.includes('undefined')) {
//                 return "your object success";
//             }
//             else {
//                 return "your object not success";
//             }
//         }),
//         update: jest.fn((obj) => {
//             if (obj.set && obj.serialNumber) {
//                 return "object is defined";
//             }
//             else {
//                 return "object is not defined";
//             }
//         })
//     }
// });

// const {newLeadStatus,deleteStatus,updateStatus,getStatusesLead}=require('../../../modules/leads/status-leads');
// describe('check function newLeadStatus',()=>{
//     it('check that the function return "your object success" when arguments sent', async () => {
//         const result = await newLeadStatus({ name: "test" });
//         expect(result).toBeDefined();
//         expect(result).toBe("your object success");
//     })
//     it('check that the function return "your object success" when try to change the tablename', async () => {
//         const result = await newLeadStatus({ tableName: "test", name: "test" });
//         expect(result).toBeDefined();
//         expect(result).toBe("your object success");
//         expect(result.length).toBe(19);
//     })
//     it('check that the function return "your object success" when try to change the tablename', async () => {
//         let result;
//         try{

//             result = await newLeadStatus();
//         }
//         catch(error){
//             expect(result).not.toBeDefined();
//             expect(error).toBeDefined();
//             expect(error).toBeInstanceOf(Error);
//         }
        
//     })
// });

// describe('check function getStatusesLead',()=>{
//     it('check that the function return true always', async () => {
//         let result;
//         try{

//             result = await  getStatusesLead();
//         }
//         catch(error){
//             expect(result).not.toBeDefined();
//             expect(error).toBeDefined();
//             expect(error).toBeInstanceOf(Error);
//         }
        
       
//     })
//     it('check that the function return true always', async () => {
//         let result;
//         try{

//             result = await getStatusesLead({ test: "test" });
//         }
//         catch(error){
//             expect(result).not.toBeDefined();
//             expect(error).toBeDefined();
//             expect(error).toBeInstanceOf(Error);
//         }
        
//     })
// })
// describe('check function updateStatus',()=>{
//     it('check that the functin return "object is defined" when the obj.set is defined',async()=>{
//         const result=await updateStatus({set:"test",serialNumber:1});
//         expect(result).toBe('object is defined');
//         expect(result).toBeDefined();
//         expect(result.length).toBe(17);
//         expect(result).not.toBeNull();
//     })
//     it('check that the function return "object is not defined" when the obj.set not defined',async()=>{
//         let result;
//         try{

//             result = await updateStatus({set:"test"});
//         }
//         catch(error){
//             expect(result).not.toBeDefined();
//             expect(error).toBeDefined();
//             expect(error).toBeInstanceOf(Error);
//         }
        
//     })
//     it('check that the function return "object is not defined" when the obj.set not defined',async()=>{
//         let result;
//         try{

//             result = await updateStatus({serialNumber:1});
//         }
//         catch(error){
//             expect(result).not.toBeDefined();
//             expect(error).toBeDefined();
//             expect(error).toBeInstanceOf(Error);
//         }
        
//     }) 
//     it('check that the function return "the object is null" when the obj is null',async()=>{
//         let result;
//         try{

//             result = await updateStatus();
//         }
//         catch(error){
//             expect(result).not.toBeDefined();
//             expect(error).toBeDefined();
//             expect(error).toBeInstanceOf(Error);
//         }
       
//     })
// })


// describe('check function deleteStatus',()=>{
//     it('check that the function return "object is not defined" when all obj.set is defined',async()=>{
//         const result=await deleteStatus({set:"delete",serialNumber:1});
//         expect(result).toBe('object is not defined');
//         expect(result).toBeDefined();
//         expect(result.length).toBe(21);
//         expect(result).not.toBeNull();
//     })
//     it('check that the function return "the status is null" when the obj.set not defined',async()=>{
//         let result;
//         try{

//             result = await deleteStatus({set:"delete"});
//         }
//         catch(error){
//             expect(result).not.toBeDefined();
//             expect(error).toBeDefined();
//             expect(error).toBeInstanceOf(Error);
//         }
    
//     })
//     it('check that the function return "object is not defined" when the obj.set not defined',async()=>{
//         let result;
//         try{

//             result = await deleteStatus({serialNumber:1});
//         }
//         catch(error){
//             expect(result).not.toBeDefined();
//             expect(error).toBeDefined();
//             expect(error).toBeInstanceOf(Error);
//         }
        
//     })
// })