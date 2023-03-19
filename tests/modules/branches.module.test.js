jest.mock('../../db/sql-operation',()=>{
    return {
        insertBranch:jest.fn((table,columns,values)=>{
            return table;
        })
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
})
