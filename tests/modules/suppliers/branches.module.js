// jest.mock('../../../services-supppliers/db/sql-operation', () => {
//     return {
//         insertBranch: jest.fn((table) => {
//             if (table.BranchName === '123')
//                 throw new Error('can not insert branch')
//             else
//                 return table;
//         }),
//         checkUniqueBranch: jest.fn((code, branchname) => {
//             if (code === undefined)
//                 throw new Error('can not insert branch');
//                 console.log(code.BranchName);
//             if (code.BranchName === 'aaa')
//                 return {recordset:''};
//             else
//                 return {recordset:[]};
//         }),
//         update: jest.fn(() => {
//             return {recordset:[{ hh: 'pp' }, { hh: 'jj' }] } ;
//         }),
//         getAll: jest.fn((table) => {
//             return {recordset:{ name: 'aaaa', sum: 9} };
//         }),
//         allTheOption: jest.fn((table, option, text) => {
//             if (option === undefined || text === undefined) {
//                 throw new Error('can not get without option or value');
//             }
//             else {
//                 return {recordset:{ sum: 9, age: 4 }};
//             }
//         }),
//         delBranches: jest.fn((title, code, name, date, Bname) => {
//             if (name === undefined || code === undefined || Bname === undefined)
//                 throw new Error('can not delete branch');
//             else
//                 return {recordset:true};
//         })

//     }
// })
// jest.mock('../../../modules/suppliers/suppliers', () => {
//     return {
//         getSupplier: jest.fn((value1, value2) => {
//             if (value1 === undefined)
//                 throw new Error('can not insert branch')
//             else {
//                 if (value1.text === 'aaa')
//                     return [] ;
//                 return [{ aa: 'aaa' }];
//             }
//         })
//     }
// })
// jest.mock('../../../modules/suppliers/functions', () => {
//     return {
//         setDate: jest.fn((stringOfDate) => {
//             return '01/03/2023';
//         })
//     }
// })

// const { insertOneBranch, checkUnique, updateDetail, checkValid, getAllBranches, getBranchesByCondition, deleteBranches } = require('../../../modules/suppliers/branches');

// describe('INSERT BRANCH', () => {
//     it('should call insertBranch and setDate and checkUniqueBranch and getSupplier', async () => {
//         const { insertBranch, checkUniqueBranch } = jest.requireMock('../../services-supppliers/db/sql-operation');
//         const { setDate } = jest.requireMock('../../../modules/suppliers/functions');
//         const { getSupplier } = jest.requireMock('../../../modules/suppliers/suppliers')
//         const response = await insertOneBranch({ SupplierCode: 'ffff', BranchName: 'dfdfd', Street: 'fgd', HomeNumber: '2', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
//         expect(insertBranch).toHaveBeenCalled()
//         expect(getSupplier).toHaveBeenCalled()
//         expect(checkUniqueBranch).toHaveBeenCalled()
//         expect(setDate).toHaveBeenCalled()
//         expect(response).toBeDefined()
//     })
//     it('should return inserted object', async () => {
//         const response = await insertOneBranch({ SupplierCode: 'ffff', BranchName: 'dfdfd', Street: 'fgd', HomeNumber: '3', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
//         expect(response).toBeDefined()
//         expect(response).toStrictEqual({ BranchName: 'dfdfd', City: 'hhh', CreationDate: '01/03/2023', HomeNumber: '3', Phone1: "jjj", Street: "fgd", SupplierCode: "ffff", UserThatInsert: "hhh" })
//     })
//     it('should return fasle when it not suitable to the model', async () => {
//         const response = await insertOneBranch({ BranchName: 'aaa', Street: 'fgd', HomeNumber: '3', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
//         expect(response).toBeDefined();
//         expect(response).toBeFalsy();
//     })
//     describe('ERRORS', () => {
//         it('should throw an error when it not suitable to sql ', async () => {
//             expect.assertions(3)
//             try {
//                 const response = await insertOneBranch({ SupplierCode: 'ffff', BranchName: '123', Street: 'fgd', HomeNumber: '3', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
//             }
//             catch (error) {
//                 expect(error).toBeDefined()
//                 expect(error).toBeInstanceOf(Error)
//                 expect(error.message).toBe('can not insert branch')
//             }
//         })
//     })
// })

// describe('CHECK UNIQUE BRANCH', () => {
//     it('should call checkUniqueBranch and getSupplier', async () => {
//         const { checkUniqueBranch } = jest.requireMock('../../../services-supppliers/db/sql-operation')
//         const { getSupplier } = jest.requireMock('../../../modules/suppliers/suppliers')
//         const response = await checkUnique({ SupplierCode: 1000, BranchName: 'dfdfd', Street: 'fgd', HomeNumber: '2', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
//         expect(checkUniqueBranch).toHaveBeenCalled()
//         expect(getSupplier).toHaveBeenCalled()
//         expect(response).toBeDefined()
//     })
//     it('should return true if the branch unique for his spplier', async () => {
//         const response = await checkUnique({ SupplierCode: 1000, BranchName: 'dfdfd', Street: 'fgd', HomeNumber: '2', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
//         expect(response).toBeDefined()
//         expect(response).toBeTruthy()
//     })
//     it('should return false when the supplier is not exist', async () => {
//         const response = await checkUnique({ SupplierCode: 1000, BranchName: 'aaa', Street: 'fgd', HomeNumber: '2', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
//         expect(response).toBeDefined()
//         expect(response).toBeFalsy()
//     })
//     describe('ERRORS', () => {
//         it('should throw an error when it not suitable to sql ', async () => {
//             expect.assertions(3)
//             try {
//                 const response = await checkUnique({})
//             }
//             catch (error) {
//                 expect(error).toBeDefined()
//                 expect(error).toBeInstanceOf(Error)
//                 expect(error.message).toBe('can not insert branch')
//             }
//         })
//     })
// })

// describe('CHECK VALID BRANCH', () => {
//     it('should return true if it has all the must keys', async () => {
//         const response = await checkValid({ SupplierCode: 'ffff', BranchName: 'dfdfd', Street: 'fgd', HomeNumber: '2', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
//         expect(response).toBeDefined()
//         expect(response).toBeTruthy()
//     })
//     it('should return false  if the content is empty', async () => {
//         const response = await checkValid({ SupplierCode: '', BranchName: 'dfdfd', Street: 'fgd', HomeNumber: '2', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
//         expect(response).toBeDefined()
//         expect(response).toBeFalsy()
//     })
//     it('should return false  if it has not all the must keys', async () => {
//         const response = await checkValid({ Street: 'fgd', HomeNumber: '2', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
//         expect(response).toBeDefined()
//         expect(response).toBeFalsy()
//     })
// })

// describe('UPDATE BRANCH', () => {
//     it('should call update and checkUniqueBranch', async () => {
//         const { update, checkUniqueBranch } = jest.requireMock('../../../services-supppliers/db/sql-operation')
//         const response = await updateDetail('1234', { BranchName: 'dfdfd', Street: 'fgd', HomeNumber: '2', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
//         expect(update).toHaveBeenCalled()
//         expect(checkUniqueBranch).toHaveBeenCalled()
//         expect(response).toBeDefined()
//     })

//     it('should return the updated item', async () => {
//         const response = await updateDetail('1234', { BranchName: 'dfdfd', Street: 'fgd', HomeNumber: '3', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
//         expect(response).toBeDefined()
//         expect(response).toStrictEqual([{ hh: 'pp' }, { hh: 'jj' }])
//     })

//     it('should return false when the branch is not unique to his supplier', async () => {
//         const response = await updateDetail('1234', { BranchName: 'aaa', Street: 'fgd', HomeNumber: '3', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
//         expect(response).toBeDefined();
//         expect(response).toBeFalsy();
//     })

//     describe('ERRORS', () => {
//         it('should throw an error when it not suitable to sql ', async () => {
//             expect.assertions(3)
//             try {
//                 const response = await updateDetail({})
//             }
//             catch (error) {
//                 expect(error).toBeDefined()
//                 expect(error).toBeInstanceOf(Error)
//                 expect(error.message).toBe('can not update branch')
//             }
//         })
//     })
// })

// describe('DELETE SUPPLIER', () => {
//     it('should return defined answer', async () => {
//         const response = await deleteBranches({ SupplierCode: '123', DisableUser: 'sari', BranchName: 'Ruty'  });
//         expect(response).toBeDefined();
//     })
    

//     it('should called delSupplier and setDate -  twice', async () => {
//         _ = await deleteBranches({ SupplierCode: '123', DisableUser: 'sari' , BranchName: 'Ruty' });
//         const result = jest.requireMock('../../../services-supppliers/db/sql-operation');
//         const { setDate } = jest.requireMock('../../../modules/suppliers/functions');
//         expect(result.delBranches).toHaveBeenCalled();
//         expect(result.delBranches).toHaveBeenCalledTimes(2);
//         expect(setDate).toHaveBeenCalled();
//         expect(setDate).toHaveBeenCalledTimes(2);
//     })

//     it('shoult throw Error if not get in object keys:SupplierCode or DisableUser', async () => {
//         expect.assertions(3);
//         try {
//             const response = await deleteBranches({});
//         }
//         catch (error) {
//             expect(error).toBeDefined()
//             expect(error).toBeInstanceOf(Error)
//             expect(error.message).toBe('can not delete branch')
//         }
//     })
// })

// describe('GETALLBRANCH', () => {

//     it('should return defined object from sql', async () => {
//         const response = await getAllBranches();
//         expect(response).toBeDefined();
//     })

//     it('if you can to connect sql', async () => {
//         _ = await getAllBranches();
//         const methods = jest.requireMock('../../../services-supppliers/db/sql-operation')
//         expect(methods.getAll).toHaveBeenCalled();
//         expect(methods.getAll).toHaveBeenCalledTimes(2);
//     })
   



// })

// describe('GETBRANCH', () => {
//     it('should return defined object from sql', async () => {
//         const response = await getBranchesByCondition('SupplierCode', '08-8666515');
//         expect(response).toBeDefined();

//     })

//     it('if you can to connect sql', async () => {
//         _ = await getBranchesByCondition('SupplierCode', '08-8666515');
//         const methods = jest.requireMock('../../../services-supppliers/db/sql-operation')
//         expect(methods.allTheOption).toHaveBeenCalled();
//         expect(methods.allTheOption).toHaveBeenCalledTimes(2);
//     })


//     it('get error if send miss details', async () => {
//         expect.assertions(3);
//         try {
//             const response = await getBranchesByCondition('08-8665154');
//         }
//         catch (error) {
//             expect(error).toBeDefined();
//             expect(error).toBeInstanceOf(Error);
//             expect(error.message).toBe('can not get without option or value');
//         }
//     })

// })



