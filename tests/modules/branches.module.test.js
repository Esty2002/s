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
            //צריך לסדר את זה!!
        }),
        checkUniqueBranch: jest.fn((code, branchname) => {
            if (code === undefined)
                throw new Error('can not insert branch')
            if (code.BranchName == 'aaa')
                return ''
            else
                return { recordset: [] };
        }),
        update: jest.fn(() => {
            return { recordset: [{ hh: 'pp' }, { hh: 'jj' }] }
        }),
        getAll: jest.fn((coulmn) => {
            return { name: 'aaaa', sum: 9 };
        }),
        allTheOption: jest.fn((table, option, text) => {
            return { name: 'aaaa', sum: 9, age: 4 };
        }),
    }
})
jest.mock('../../modules/suppliers', () => {
    return {
        getSupplier: jest.fn((value1, value2) => {
            if (value1 === undefined)
                throw new Error('can not insert branch')
            else {
                if (value1.text === 'aaa')
                    return { recordset: [] }
                return { recordset: [{ aa: 'aaa' }] }
            }
        })
    }
})

const { insertOneBranch, checkUnique, updateDetail ,checkValid} = require('../../modules/branches');

describe('INSERT BRANCH', () => {
    it('should call insertBranch and setDate and checkUniqueBranch and getSupplier', async () => {
        const { insertBranch, setDate, checkUniqueBranch } = jest.requireMock('../../db/sql-operation')
        const { getSupplier } = jest.requireMock('../../modules/suppliers')
        const response = await insertOneBranch({ SupplierCode: 'ffff', BranchName: 'dfdfd', Street: 'fgd', HomeNumber: '2', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
        expect(insertBranch).toHaveBeenCalled()
        expect(getSupplier).toHaveBeenCalled()
        expect(checkUniqueBranch).toHaveBeenCalled()
        expect(setDate).toHaveBeenCalled()
        expect(response).toBeDefined()
    })

    it('should return inserted object', async () => {
        const response = await insertOneBranch({ SupplierCode: 'ffff', BranchName: 'dfdfd', Street: 'fgd', HomeNumber: '3', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
        expect(response).toBeDefined()
        expect(response).toStrictEqual({ BranchName: "dfdfd", City: "hhh", CreationDate: "01/03/2023", HomeNumber: "3", Phone1: "jjj", Street: "fgd", SupplierCode: "ffff", UserThatInsert: "hhh" })
    })
    it('should return fasle when it not suitable to the model', async () => {
        const response = await insertOneBranch({ BranchName: 'aaa', Street: 'fgd', HomeNumber: '3', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
        expect(response).toBeDefined();
        expect(response).toBeFalsy()
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

describe('CHECK UNIQUE BRANCH', () => {
    it('should call checkUniqueBranch and getSupplier', async () => {
        const { checkUniqueBranch } = jest.requireMock('../../db/sql-operation')
        const { getSupplier } = jest.requireMock('../../modules/suppliers')
        const response = await checkUnique({ SupplierCode: 'ffff', BranchName: 'dfdfd', Street: 'fgd', HomeNumber: '2', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
        expect(checkUniqueBranch).toHaveBeenCalled()
        expect(getSupplier).toHaveBeenCalled()
        expect(response).toBeDefined()
    })
    it('should return true if the branch unique for his spplier', async () => {
        const response = await checkUnique({ SupplierCode: 'ffff', BranchName: 'dfdfd', Street: 'fgd', HomeNumber: '2', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
        expect(response).toBeDefined()
        expect(response).toBeTruthy()
    })
    it('should return false when the supplier is not exist', async () => {
        const response = await checkUnique({ SupplierCode: 'aaa', BranchName: 'dfdfd', Street: 'fgd', HomeNumber: '2', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
        expect(response).toBeDefined()
        expect(response).toBeFalsy()
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

describe('CHECK VALID BRANCH', () => {
    it('should return true if it has all the must keys', async () => {
        const response = await checkValid({ SupplierCode: 'ffff', BranchName: 'dfdfd', Street: 'fgd', HomeNumber: '2', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
        expect(response).toBeDefined()
        expect(response).toBeTruthy()
    })
    it('should return false  if it has not all the must keys', async () => {
        const response = await checkValid({ Street: 'fgd', HomeNumber: '2', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
        expect(response).toBeDefined()
        expect(response).toBeFalsy()
    })
})

describe('UPDATE BRANCH', () => {
    it('should call update and checkUniqueBranch', async () => {
        const { update, checkUniqueBranch } = jest.requireMock('../../db/sql-operation')
        const response = await updateDetail('1234', { BranchName: 'dfdfd', Street: 'fgd', HomeNumber: '2', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
        expect(update).toHaveBeenCalled()
        expect(checkUniqueBranch).toHaveBeenCalled()
        expect(response).toBeDefined()
    })

    it('should return the updated item', async () => {
        const response = await updateDetail('1234', { BranchName: 'dfdfd', Street: 'fgd', HomeNumber: '3', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
        expect(response).toBeDefined()
        expect(response).toStrictEqual({ recordset: [{ hh: 'pp' }, { hh: 'jj' }] })
    })

    it('should return false when the branch is not unique to his supplier', async () => {
        const response = await updateDetail('1234', { BranchName: 'aaa', Street: 'fgd', HomeNumber: '3', City: 'hhh', Phone1: 'jjj', UserThatInsert: 'hhh' })
        expect(response).toBeDefined();
        expect(response).toBeFalsy();
    })

    describe('ERRORS', () => {
        it('should throw an error when it not suitable to sql ', async () => {
            expect.assertions(3)
            try {
                const response = await updateDetail({})
            }
            catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('can not update branch')
            }
        })
    })
})
