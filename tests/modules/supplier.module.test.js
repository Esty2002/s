jest.mock('../../db/sql-operation', () => {
    return {
        delSupllier: jest.fn((SQL_DB_SUPPLIERS,SQL_DB_BRANCHES, supplierCode, disableUser,newDate) => {
            if (disableUser === undefined || supplierCode === undefined)
                throw new Error('can not delete supplier');
            else
                return true;
        }),
        setDate: jest.fn(() => {
            return { recordset: [{ Today: '13-12-21' }] };
        })
    }
})
const { getSupplier,getAllSuppliers,deleteSupplier} = require('../../modules/suppliers');

describe('DELETE SUPPLIER', () => {
    it('should return defined answer', async () => {
        const response = await deleteSupplier({ SupplierCode: '123', DisableUser: 'sari' });
        expect(response).toBeDefined();
    })

    it('should called delSupplier and setDate -  twice', async () => {
        _ = await deleteSupplier({ SupplierCode: '123', DisableUser: 'sari' });
        const result = jest.requireMock('../../db/sql-operation')

        expect(result.delSupllier).toHaveBeenCalled();
        expect(result.delSupllier).toHaveBeenCalledTimes(2);
        expect(result.setDate).toHaveBeenCalled();
        expect(result.setDate).toHaveBeenCalledTimes(2);
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
