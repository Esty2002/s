jest.mock('../../db/sql-operation',()=>{
    return {
        // insertBranch:jest.fn((columns,values)=>{
        //     return table;
        // }),
        getAll: jest.fn((table) => {
            return { name: 'aaaa', sum: 9 };
        }),
        allTheOption: jest.fn((table,option, text) => {
            if (option === undefined || text === undefined) {
                throw new Error('can not get without option or value');
            }
            else {
                return {  sum: 9, age: 4 };
            }
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
})

const { getAllBranches, getBranchesByCondition } = require('../../modules/branches');

describe('get all the branches',()=>{

    it('should return defined object from sql', async () => {
        const response = await getAllBranches();
        expect(response).toBeDefined();
    })

    it('if you can to connect sql', async () => {
        _ = await getAllBranches();
        const methods = jest.requireMock('../../db/sql-operation')
        expect(methods.getAll).toHaveBeenCalled();
        expect(methods.getAll).toHaveBeenCalledTimes(2);
    })
})
describe('GETBRANCH', () => {

    it('should return defined object from sql', async () => {
        const response = await getBranchesByCondition( 'SupplierCode','08-8666515' );
        expect(response).toBeDefined();
    })

    it('if you can to connect sql', async () => {
        _ = await getBranchesByCondition('SupplierCode',  '08-8666515' );
        const methods = jest.requireMock('../../db/sql-operation')
        expect(methods.allTheOption).toHaveBeenCalled();
        expect(methods.allTheOption).toHaveBeenCalledTimes(2);
    })


    it('get error if send miss details', async () => {
        expect.assertions(3);
        try {
            const response = await getBranchesByCondition('08-8665154');
        }
        catch (error) {
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('can not get without option or value');
        }
    })
 
})



