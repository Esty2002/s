jest.mock('../../db/sql-operation', () => {
    return {
        insertBranch: jest.fn((table) => {
            // if(Object.keys(table) =='aaaa')
            // throw new Error('can not insert branch')
            // else
            return 'table';
        }),
        getAll: jest.fn((coulmn) => {
            return { name: 'aaaa', sum: 9 };
        }),
        allTheOption: jest.fn((table, option, text) => {
            return { name: 'aaaa', sum: 9, age: 4 };
        }),
    }
})

const {insertOneBranch}=require('../../modules/branches')

describe('insert branch to sql',()=>{
    it('should call insertBranch',async()=>{
        // const {insertBranch} = jest.requireMock('../../db/sql-operation')
        const response = await insertOneBranch('Branches',(1,2,3,4,5),('a','b','c','d','e'))
        // expect(insertBranch).toHaveBeenCalled(1)
        expect(response).toBeDefined()
    })

    it('should return the table name object', async () => {
        const response = await insertOneBranch('Branches',(1,2,3,4,5),('a','b','c','d','e'))
        expect(response).toBeDefined()
        // expect(response).toBe('Branches');
    })

    describe('ERRORS', () => {
        it('should throw an error when it not suitable to sql ', async () => {
            expect.assertions(3)
            try {
                const response = await insertOneBranch({ aaaa: "aaaaa" }, 'x')
            }
            catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('can not insert branch')
            }
        })
    })
})
