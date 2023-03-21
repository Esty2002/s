// const { describe } = require("yargs");

// jest.mock('../../services/sql/sql-operations' , () => {
//     return {
//         deleteReceipt :jest.fn((receiptNumber) => {
//             receiptNumber =123
//             return receiptNumber;
//         })
//     }
// })

// describe('deleteReceipt delete the  ' ,() =>{
//     it('should call deleteReceipt' ,async ()=>{
//         const {deleteReceipt}  =  jest.requireMock('../../services/sql/sql-operations');
//         const response  = await deleteReceipt(15);
//         expect(deleteReceipt).toHaveBeenCalled()
//         expect(response).toBeDefined()



//     })
// })
