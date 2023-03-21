jest.mock('../../db/sql-operation', () => {
    return {
        delBranches: jest.fn((title, code, name, date, Bname) => {
            if (name === undefined || code === undefined || Bname === undefined)
                throw new Error('can not delete branch');
            else
                return true;
        }),
        setDate: jest.fn(() => {
            return { recordset: [{ Today: '13-12-21' }] };
        })
    }
})

const { deleteBranches } = require('../../modules/branches')



//test to deleteBranch
describe('DELETE SUPPLIER', () => {
    it('should return defined answer', async () => {
        const response = await deleteBranches({ SupplierCode: '123', DisableUser: 'Sari',branchName:'Ruty' });
        expect(response).toBeDefined();
    })

    it('should called delBranches and setDate -  twice', async () => {
        _ = await deleteBranches({ SupplierCode: '123', DisableUser: 'Sari' ,branchName:'Ruty' });
        const result = jest.requireMock('../../db/sql-operation')

        expect(result.delSupllier).toHaveBeenCalled();
        expect(result.delSupllier).toHaveBeenCalledTimes(2);
        expect(result.setDate).toHaveBeenCalled();
        expect(result.setDate).toHaveBeenCalledTimes(2);
    })

    it('shoult throw Error if not get in object keys:SupplierCode or DisableUser', async () => {
        expect.assertions(3);
        try {
            const response = await deleteBranches({});
        }
        catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('can not delete branch')
        }
    })

})

