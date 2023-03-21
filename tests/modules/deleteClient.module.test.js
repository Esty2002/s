jest.mock('../../dal/db/sql/sql-operations', () => {
    return {
        getClientById: jest.fn((clientCode) => {
            // console.log("test : mock getClientById sql-operation");
            if (clientCode)
                return {rowsAffected:1};
            return {rowsAffected:0};
        }),
        deleteClient: jest.fn((clientCode, userName) => {
            // console.log("test : mock deleteClient sql-operation");
            if (userName && clientCode)
                return true;
            return false;
        })
    }
})

const { deletedClientByCode } = require("../../modules/deleteClient");

describe('DELETECLIENTBYCODE', () => {

    it('should be true after delete data',async () => {
        const response = await deletedClientByCode(3788, "gpree");
        expect(response).toBeTruthy();
    })

    it('shoulde return false for empty data',async () => {
        const response = await deletedClientByCode();
        expect(response).toBeFalsy();
    })

    it('should execute getClientById once' ,async () => {
        _ = await deletedClientByCode();
        const methods = jest.requireMock('../../dal/db/sql/sql-operations');
        expect(methods.getClientById).toHaveBeenCalled();
    })

    
})