require('dotenv').config();
const { SQL_DATABASE_TEST,SQL_DATABASE } = process.env;
const {select,insert,update}=require('../../services/sql/sql-operations');
const { connect, myconfig, disconnect } = require('../../services/sql/sql-connection');

beforeAll(() => {
    myconfig.database = SQL_DATABASE_TEST;
    myconfig.server="TB6-23\\MSSQLSERVER"
});
describe('check function select',()=>{
    it('check that the function return an array with parameters when sents values',async()=>{
        connect();
        const result=await select({columns:"name",tableName:"orderers",where:"name='test'"});
        disconnect()
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Array);
        expect(result[0]).toBeInstanceOf(Object);
        expect(result.length).toBeGreaterThanOrEqual(1);


        
    })
    it('check that the function return "crash" if the table is not exist',async()=>{
        connect();
        const result=await select({columns:"name",tableName:"stam",where:"name='test'"});
        disconnect();

        expect(result).toBeDefined();
        expect(result.length).toBe(5);
        expect(result).toBe('crash');
    })
    it('check that the function return "crash" if the arguments not defined',async()=>{
        connect();
        const result=await select({});
        disconnect();

        expect(result).toBeDefined();
        expect(result.length).toBe(5);
        expect(result).toBe('crash');
    })
})
describe('check function insert',()=>{
    it('check that the function return an array with one argument when sent values',async()=>{
        connect();
        const result=await insert({tableName:"orderers",values:"'test','0556748822',GETDATE(),0,NULL"});
        disconnect();
        expect(result).toBeDefined();
        expect(result.length).toBe(1);
        expect(result).toBeInstanceOf(Array);
        expect(result).not.toBeNull();
        expect(result[0]).toBe(1);
    })
    it('check that the function return "crash" if the table name not exist',async()=>{
        connect();
        const result=await insert({tableName:'stam',values:"'test'"});
        disconnect();
        expect(result).toBe('crash');
        expect(result).toBeDefined();
        expect(result.length).toBe(5);
    })
    it('check that the function return crash if the arguments is not defined',async()=>{
        connect();
        const result=await insert();
        disconnect();
        expect(result).toBe('crash');
        expect(result).toBeDefined();
        expect(result.length).toBe(5);
    })
})
describe('check function update',()=>{
    it('check that the function return an array with one argument when sent values',async()=>{
        connect();
        const result=await update({tableName:"orderers",set:"name='test'",where:"serialNumber=2"});
        disconnect();
        expect(result).toBeDefined();
        expect(result.length).toBe(1);
        expect(result).toBeInstanceOf(Array);
        expect(result).not.toBeNull();
        expect(result[0]).toBe(1);
    })
    it('check that the function return an array with one argument when sent values',async()=>{
        connect();
        const result=await update({tableName:"orderers",set:"name='test'",where:"disable=1"});
        disconnect();
        expect(result).toBeDefined();
        expect(result.length).toBe(1);
        expect(result).toBeInstanceOf(Array);
        expect(result).not.toBeNull();
        expect(result[0]).toBeGreaterThanOrEqual(0);
    })
    it('check that the function return crash if the arguments is not defined',async()=>{
        connect();
        const result=await update({});
        disconnect();
        expect(result).toBe('crash');
        expect(result).toBeDefined();
        expect(result.length).toBe(5);
    })

})
afterAll(()=>{
    myconfig.database=SQL_DATABASE;
    myconfig.server="TB6-25\\MSSQLSERVER"


})
