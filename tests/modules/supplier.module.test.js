jest.mock('../../db/sql-operation', () => {
    return {
        allTheOption: jest.fn((coulmn) => {
            return {name:'aaaa',sum:9};
        }),
        getAll: jest.fn((table,option,text) => {
            return {name:'aaaa',sum:9,age:4};
        }),
    }
})
const { getSupplier,getAllSuppliers} = require('../../modules/suppliers');
describe('GETSUPPLIER', () => {

    it('should return defined object from sql', async () => {
        const response = await getallSuppliers({ option: 'SupplierCode',text:1});
        expect(response).toBeDefined();
    })

    it('if you can to connect sql', async () => {
        _ = await getallSuppliers({table:'supplier',option: 'SupplierCode',text:1});
        const methods = jest.requireMock('../../db/sql-operation')
        expect(methods.getAll).toHaveBeenCalled();
        expect(methods.getAll).toHaveBeenCalledTimes(2);
    })
    it('should return defined objrct from sql', async () => {
        const response = await getSupplier({ table:'supplier'});
        expect(response).toBeDefined();
    })

    it('if you can to connect sql', async () => {
        _ = await getSupplier({table:'supplier'}, "try");
        const methods = jest.requireMock('../../db/sql-operation')
        expect(methods.allTheOption).toHaveBeenCalled();
        expect(methods.allTheOption).toHaveBeenCalledTimes(2);
    })
    
})