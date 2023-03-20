jest.mock('../../db/sql-operation', () => {
    return {
        insertBranch: jest.fn((table) => {
            // if(Object.keys(table) =='aaaa')
            // throw new Error('can not insert branch')
            // else
            return 'table';
        }),
        setDate: jest.fn(() => {
            return '01/03/2023';
        }),
        getAll: jest.fn((coulmn) => {
            return { name: 'aaaa', sum: 9 };
        }),
        allTheOption: jest.fn((table, option, text) => {
            return { name: 'aaaa', sum: 9, age: 4 };
        }),
    }
})

jest.mock('../../modules/branches', () => {
    return {
        checkUnique: jest.fn((code) => {
            return true;
        })
    }
})

const { insertBranch } = require('../../modules/branches')

describe('insert branch to sql', () => {
    it('should call insertBranch', async () => {
        const { insertBranch, setDate } = jest.requireMock('../../db/sql-operation')
        const { checkUnique } = jest.requireMock('../../modules/branches')
        const response = await insertBranch({ a: 'a', b: 'b', c: 'c', d: 'd', e: 'e' })
        expect(insertBranch).toHaveBeenCalled()
        expect(checkUnique).toHaveBeenCalled()
        expect(setDate).toHaveBeenCalled()
        expect(response).toBeDefined()
    })

    it('should return the table name object', async () => {
        const response = await insertBranch({ a: 'a', b: 'b', c: 'c', d: 'd', e: 'e' })
        expect(response).toBeDefined()
        expect(response).toBe('Branches')
    })

    describe('ERRORS', () => {
        it('should throw an error when it not suitable to sql ', async () => {
            expect.assertions(3)
            try {
                const response = await insertBranch({ aaaa: "aaaaa" }, 'x')
            }
            catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('can not insert branch')
            }
        })
    })
})