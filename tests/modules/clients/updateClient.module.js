// const { updateClient } = require('../../../modules/clients/updateClient')
// jest.mock('../../../services-clients/sql/sql-operations', () => {
//     return {
//         update: jest.fn((obj) => {
//             console.log(obj, ' mock updateClient');
//             if (!obj || Object.keys(obj).length == 0) {
//                 console.log('in if');
//                 return false;
//             }
//             else {
//                 console.log('in true');
//                 return true;
//             }
//         })
//     }
// })

// describe('UPDATECLIENT', () => {
//     it('should return true after updateing data', async () => {
//         const res = await updateClient({ clientCode: '123', clientName: 'moshe' })
//         expect(res).toBeTruthy()
//     })

//     it('should return false for empty object', async () => {
//         const response = await updateClient({})
//         expect(response).toBeFalsy()
//     })


//     it('should return false for none object', async () => {
//         const response = await updateClient()
//         expect(response).toBeFalsy()
//     })

//     it('should execute update once', async () => {
//         _ = await updateClient({ clientCode: '123', clientName: 'moshe' })
//         const methods = jest.requireMock('../../../services-clients/sql/sql-operations')
//         expect(methods.update).toHaveBeenCalled()
//     })
// })