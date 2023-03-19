// jest.mock('../../db/sql-operation',()=>{
//     return {
//         insert:jest.fn((table,columns,values)=>{
//             return table;
//         })
//     }
// })

// const {insertbranch}=require('../../modules/branches')

// describe('insert branch to sql',()=>{
//     it('should call insertBranch',async()=>{
//         const {insert} = jest.requireMock('../../db/sql-operation')
//         const response = await insert('Branches',(1,2,3,4,5),('a','b','c','d','e'))
//         expect(insert).toHaveBeenCalled()
//         expect(response).toBeDefined()
//     })

//     it('should return the table name object', async () => {
//         const response = await insertbranch('Branches',(1,2,3,4,5),('a','b','c','d','e'))
//         expect(response).toBeDefined()
//         expect(response).toBe('Branches')
//     })
// })