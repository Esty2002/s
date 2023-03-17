jest.mock('../../db/sql-operation',()=>{
    return {
        insert:jest.fn((table)=>{
            if(ta)
            return table;
        })
    }
})

const {insertbranch} = require('../../modules/branches')

describe('insert branch to sql',()=>{
    it('should call insertBranch',async()=>{
        const {insertBranch} = jest.requireMock('../../db/sql-operation')
        const response = await insertBranch({a:'a',b:'b',c:'c',d:'d',e:'e'})
        expect(insertBranch).toHaveBeenCalled()
        expect(response).toBeDefined()
    })

    it('should return the table name object', async () => {
        const response = await insertbranch({a:'a',b:'b',c:'c',d:'d',e:'e'})
        expect(response).toBeDefined()
        expect(response).toBe('Branches')
    })
    describe('ERRORS', () => {
        it('should throw an error when it not suitable to sql ', async () => {
            expect.assertions(3)
            try {
                const response = await insertOne({aaaa:"aaaaa"}, 'x')
            }
            catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('can not insert branch')
            }
        })
    })
})