// // require('../../../services/sql/sql-operations')

// jest.mock('../../../services-quotation/sql/sql-operations', () => {
//     return {
//         getAllTheContacts: jest.fn(() => {
//             return 'getAllTheContacts in the module test!';
//         })
//     }
// });

// const { allContactDataList } = require('../../../modules/quotation/read')

// describe('get all contact in the module', () => {
//     it('should call getAllTheContacts', async () => {
//         const { getAllTheContacts } = jest.requireMock('../../../services-quotation/sql/sql-operations')
//         const response = await allContactDataList()
//         expect(getAllTheContacts).toHaveBeenCalled()
//         expect(response).toBeDefined()
//         expect(response).toBeTruthy();


//     })
// })