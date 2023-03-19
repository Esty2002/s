require('dotenv').config();
const { SQL_DATABASE_TEST, SQL_DATABASE } = process.env;

const { default: expect } = require('expect');
const { describe } = require('jest-circus');
const { selectAllTable, newOrderer, newPouringType, selectRecordByPhoneNumber, nameAndphone, newLeadStatus, deleteFromTable,updateStatus,updateTable} = require('../../../modules/leads/more-tables');
const { connect, myconfig, disconnect } = require('../../../services/sql/sql-connection');
beforeAll(() => {
    myconfig.database = SQL_DATABASE_TEST;
});

describe('CHECK FUNCTION updateTable', () => {
    it('should the function dont update the data if its null and dont fall', async () => {
        await connect();
        const result = await updateTable();
        await disconnect();
        expect(result).toBeDefined();
        expect(result).toBe('the tableName or obj not defined');
        expect(result.rowsAffected).not.toBeDefined();
    })
})

describe('CHECK FUNCTION newLeadStatus', () => {
    it('should the function not insert the data if its null and dont fall', async () => {
        await connect();
        const result = await newLeadStatus();
        await disconnect();
        expect(result).toBeDefined();
        expect(result).toBeFalsy();
        expect(result.rowsAffected).not.toBeDefined();

    })
    it('should the function insert the data to the database', async () => {
        await connect();
        const result = await newLeadStatus({ name: "test" });
        await disconnect();
        console.log({ result });
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Object);
        expect(result).toBeInstanceOf(Array);
        expect(result[0]).toBeGreaterThanOrEqual(1);

    })
})

describe('CHECK FUNCTION deleteFromTable', () => {
    it('should the function not fail when the serialNumber of the status not got', async () => {
        await connect();
        const result = await deleteFromTable();
        await disconnect();
        expect(result).toBeDefined()
        expect(result).toBeFalsy()
        expect(result.rowsAffected).not.toBeDefined();

    })
    it('should the function update the disable status', async () => {
        await connect();
        const result = await deleteFromTable('statusesLead',1);
        await disconnect();
        console.log({ result });
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Object);
        expect(result).toBeInstanceOf(Array);
        expect(result[0]).toBeGreaterThanOrEqual(1);
    })
})

describe('CHECK FUNCTION updateStatus', () => {
    it('should the function dont update the data if its null and dont fall', async () => {
        await connect();
        const result = await updateStatus();
        await disconnect();
        expect(result).toBeDefined()
        expect(result).toBeFalsy()
        expect(result.rowsAffected).not.toBeDefined();

    })
    it('should the function update the the status name in the table of statusesLead', async () => {
        await connect();
        const result = await updateStatus({serialNumber:1,name:"חדששש"});
        await disconnect();
        console.log({ result });
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Object);
        expect(result).toBeInstanceOf(Array);
        expect(result[0]).toBeGreaterThanOrEqual(1);
    })
})

describe('CHECK FUNCTION nameAndphone', () => {

    it('should return name and phone is exist in the tablename', async () => {
        await connect();
        let result = await nameAndphone('test');
        await disconnect();
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Array);

    })


})

describe('CHECK FUNCTION selectAllTable', () => {

    it('should return tableName is exists', async () => {
        await connect();
        let result = await selectAllTable('test');
        await disconnect();

        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Object);
        expect(result).toBeInstanceOf(Array);
    })
    it('should return the tablename is not defiend', async () => {

        await connect();

        let result = await selectAllTable();
        expect(result).toBeDefined();

        expect(result).toBe('the table name is not defiend')
        await disconnect();

    })

})


describe('check function newOrderer', () => {
    it('should the function not insert the data if its null and dont fall', async () => {
        await connect();
        const result = await newOrderer();
        await disconnect();
        expect(result).toBeDefined()
        expect(result).toBeFalsy()
        expect(result.rowsAffected).not.toBeDefined();

    })
    it('should the function insert the data to the database', async () => {
        await connect();
        const result = await newOrderer({ name: "test", phone: "0527548215" });
        await disconnect();
        console.log({ result });
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Object);
        expect(result).toBeInstanceOf(Array);
        expect(result[0]).toBeGreaterThanOrEqual(1);


    })


})
describe('CHECK FUNCTION selectRecordByPhoneNumber', () => {


    it('should return the tableName is exists', async () => {
        await connect();
        let result = await selectRecordByPhoneNumber("0534185749", "orderers");
        await disconnect();

        expect(result).toBeTruthy();
        expect(result).toBeDefined();


    })


    it('should return the phone dont definde', async () => {
        await connect();
        let result = await selectRecordByPhoneNumber();
        expect(result).toBeDefined();
        expect(result).toBe('the tableName or phoneNumber not defined')

        await disconnect();

    })

})


describe('check function newPouringType', () => {
    it('should the function insert the data to database', async () => {
        await connect();
        const result = await newPouringType({ name: "fence" });
        await disconnect();
        expect(result).toBeDefined();
        expect(result[0]).toBeGreaterThanOrEqual(1);
        expect(result).toBeInstanceOf(Object);
        expect(result.recordset).not.toBeDefined();

    })
    it('should the function can get null and dont to fall', async () => {
        await connect()
        const result = await newPouringType()
        await disconnect()
        expect(result).toBeDefined()
        expect(result).toBeFalsy()
        expect(result.rowsAffected).not.toBeDefined();
        expect(result.recordset).not.toBeDefined()
    })


})


afterAll(() => {
    myconfig.database = SQL_DATABASE;

})