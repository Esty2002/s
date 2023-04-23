jest.mock('../../db/sql-operation', () => {
    return {
        getAll: jest.fn((table) => {
            return {recordset:{ name: 'aaaa', sum: 9 }};
        }),
        allTheOption: jest.fn((table, option, text) => {
            if (option === undefined || text === undefined) {
                throw new Error('can not get without option or value');
            }
            else {
                return {recordset:{ name: "lll", sum: 9, age: 4 }};
            }
        }),

        delSupllier: jest.fn((SQL_DB_SUPPLIERS, SQL_DB_BRANCHES, supplierCode, disableUser, newDate) => {
            if (disableUser === undefined || supplierCode === undefined)
                throw new Error('can not delete supplier');
            else
                return true;
        }),
    }
})
jest.mock('../../services/functions', () => {
    return {
        setDate: jest.fn((stringOfDate) => {
            return '13-12-21';
        })
    }
})
const { getSupplier, getAllSuppliers, deleteSupplier } = require('../../modules/suppliers');
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
describe('DELETE SUPPLIER', () => {
    it('should return defined answer', async () => {
        const response = await deleteSupplier({ SupplierCode: '123', DisableUser: 'sari' });
        expect(response).toBeDefined();
    })
    
    it('should called delSupplier and setDate -  twice', async () => {
        _ = await deleteSupplier({ SupplierCode: '123', DisableUser: 'sari' });
        const result = jest.requireMock('../../db/sql-operation');
        const { setDate } = jest.requireMock('../../services/functions');
        expect(result.delSupllier).toHaveBeenCalled();
        expect(result.delSupllier).toHaveBeenCalledTimes(2);
        expect(setDate).toHaveBeenCalled();
        expect(setDate).toHaveBeenCalledTimes(2);
    })

    it('shoult throw Error if not get in object keys:SupplierCode or DisableUser', async () => {
        expect.assertions(3);
        try {
            const response = await deleteSupplier({});
        }
        catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('can not delete supplier')
        }
    })
})
