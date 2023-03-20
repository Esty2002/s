jest.mock('../../db/sql-operation', () => {
    return {
        insertBranch: jest.fn((table) => {
            if (table.BranchName === '123')
                throw new Error('can not insert branch')
            else
                return table;
        }),
        setDate: jest.fn(() => {
            return { recordset: [{ date: '01/03/2023' }] };
        }),
        checkUniqueBranch: jest.fn((code, branchname) => {
            if (code === undefined || branchname == undefined)
                throw new Error('can not insert branch')
            else
                return { recordset: [] };
        }),
        update: jest.fn(() => {
return { recordset: [] }
        })
    }
})
jest.mock('../../modules/suppliers', () => {
    return {
        getSupplier: jest.fn((value1, value2) => {
            if (value1 === undefined)
                throw new Error('can not insert branch')
            else
                return { recordset: [{ aa: 'aaa' }] }
        })
    }
})


const { insertOneBranch, checkUnique, updateDetail } = require('../../modules/branches');

describe('INSERT', () => {
    it('should call insertBranch', async () => {
        const { insertBranch, setDate, checkUniqueBranch } = jest.requireMock('../../db/sql-operation')
        const { getSupplier } = jest.requireMock('../../modules/suppliers')
        const response = await insertOneBranch({ SupplierCode: 'ffff', BranchName: 'dfdfd', Street: 'fgd', HomeNumber: '2', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
        expect(insertBranch).toHaveBeenCalled()
        expect(getSupplier).toHaveBeenCalled()
        expect(checkUniqueBranch).toHaveBeenCalled()
        expect(setDate).toHaveBeenCalled()
        expect(response).toBeDefined()
    })

    it('should return the table name object', async () => {
        const response = await insertOneBranch({ SupplierCode: 'ffff', BranchName: 'dfdfd', Street: 'fgd', HomeNumber: '3', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
        expect(response).toBeDefined()
        expect(response).toStrictEqual({
            BranchName: "dfdfd", City: "hhh", CreationDate: "01/03/2023", HomeNumber: "3", Phone1: "jjj", Street: "fgd", SupplierCode: "ffff", UserThatInsert: "hhh"
        })
    })

    describe('ERRORS', () => {
        it('should throw an error when it not suitable to sql ', async () => {
            expect.assertions(3)
            try {
                const response = await insertOneBranch({ SupplierCode: 'ffff', BranchName: '123', Street: 'fgd', HomeNumber: '3', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
            }
            catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('can not insert branch')
            }
        })
    })
})

describe('CHECK UNIQUE', () => {
    it('should call checkUniqueBranch and getSupplier', async () => {
        const { checkUniqueBranch } = jest.requireMock('../../db/sql-operation')
        const { getSupplier } = jest.requireMock('../../modules/suppliers')
        const response = await checkUnique({ SupplierCode: 'ffff', BranchName: 'dfdfd', Street: 'fgd', HomeNumber: '2', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
        expect(checkUniqueBranch).toHaveBeenCalled()
        expect(getSupplier).toHaveBeenCalled()
        expect(response).toBeDefined()
    })
    it('should return the table name object', async () => {
        const response = await checkUnique({ SupplierCode: 'ffff', BranchName: 'dfdfd', Street: 'fgd', HomeNumber: '2', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
        expect(response).toBeDefined()
        expect(response).toBeTruthy()
    })

    describe('ERRORS', () => {
        it('should throw an error when it not suitable to sql ', async () => {
            expect.assertions(3)
            try {
                const response = await checkUnique({})
            }
            catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('can not insert branch')
            }
        })
    })
})

// describe('UPDATE', () => {
//     it('should call update', async () => {
//         const { update, checkUniqueBranch } = jest.requireMock('../../db/sql-operation')
//         const response = await updateDetail('1234', { SupplierCode: 'ffff', BranchName: 'dfdfd', Street: 'fgd', HomeNumber: '2', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
//         expect(update).toHaveBeenCalled()
//         expect(checkUniqueBranch).toHaveBeenCalled()
//         expect(response).toBeDefined()
//     })

//     it('should return the table name object', async () => {
//         const response = await updateDetail('1234', { SupplierCode: 'ffff', BranchName: 'dfdfd', Street: 'fgd', HomeNumber: '3', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
//         expect(response).toBeDefined()
//         console.log(response);
//         // expect(response).toStrictEqual('1234', { BranchName: "dfdfd", City: "hhh", CreationDate: "01/03/2023", HomeNumber: "3", Phone1: "jjj", Street: "fgd", SupplierCode: "ffff", UserThatInsert: "hhh" })
//     })

//     describe('ERRORS', () => {
//         it('should throw an error when it not suitable to sql ', async () => {
//             expect.assertions(3)
//             try {
//                 const response = await updateDetail('1234', { SupplierCode: 'ffff', BranchName: '123', Street: 'fgd', HomeNumber: '3', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
//             }
//             catch (error) {
//                 expect(error).toBeDefined()
//                 expect(error).toBeInstanceOf(Error)
//                 expect(error.message).toBe('can not insert branch')
//             }
//         })
//     })
// })