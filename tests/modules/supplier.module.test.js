jest.mock('../../db/sql-operation', () => {
    return {
        getAll: jest.fn((table) => {
            return { name: 'aaaa', sum: 9 };
        }),
        allTheOption: jest.fn((table,option, text) => {
            if ( option === undefined || text === undefined) {
                throw new Error('can not get without option or value');
            }
            else {
                return { name:"lll",sum: 9, age: 4 };
            }
        }),
    }
})
const { getSupplier, getAllSuppliers } = require('../../modules/suppliers');
describe('GETALLSUPPLIER', () => {

    it('should return defined object from sql', async () => {
        const response = await getAllSuppliers();
        expect(response).toBeDefined();
    })

    it('if you can to connect sql', async () => {
        _ = await getAllSuppliers();
        const methods = jest.requireMock('../../db/sql-operation')
        expect(methods.getAll).toHaveBeenCalled();
        expect(methods.getAll).toHaveBeenCalledTimes(2);
    })

})

describe('GETSUPPLIER', () => {

    it('should return defined object from sql', async () => {
        const response = await getSupplier({ option: 'SupplierCode', text: '08-8666515' });
        expect(response).toBeDefined();
    })

    it('if you can to connect sql', async () => {
        _ = await getSupplier({ option: 'SupplierCode', text: '08-8666515' });
        const methods = jest.requireMock('../../db/sql-operation')
        expect(methods.allTheOption).toHaveBeenCalled();
        expect(methods.allTheOption).toHaveBeenCalledTimes(2);
    })

    it('get error if send empty object', async () => {
        expect.assertions(3);
        try {
            const response = await getSupplier({});
        }
        catch (error) {
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('can not get without option or value');
        }
    })
})