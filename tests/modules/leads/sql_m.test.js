require('dotenv').config();
const {SQL_DATABASE_TEST,SQL_DATABASE}=process.env;

const {selectAllTable,selectRecordByPhoneNumber}=require('../../../modules/leads/sql/create_sql');
const { connect,myconfig, disconnect } = require('../../../services/sql/sql-connection');
beforeAll(()=>{
    myconfig.database=SQL_DATABASE_TEST;

})
describe('CHECK FUNCTION selectAllTable', () => {
    it('should return tableName is exists',async ()=>{

        await connect();
        let result=await selectAllTable("test");
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Object);
        expect(result.recordset).toBeInstanceOf(Array);        
        await disconnect();

    })
    it('should return the tablename is not defiend', async () => {

        await connect();

        let result=await selectAllTable();
        expect(result).toBeDefined();

        expect(result).toBe('the table name is not defiend')
        await disconnect();

    })

})
describe('CHECK FUNCTION selectRecordByPhoneNumber',()=>{
    

    it('should return the tableName is exists',async()=>{
        myconfig.database=SQL_DATABASE_TEST;
        await connect();
        let result=await selectRecordByPhoneNumber('0583288477',"test");
        console.log(result);
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Object);
        expect(result.recordset).toBeInstanceOf(Array);        
        await disconnect();

    })

    it('should return the phone dont definde',async()=>{
        myconfig.database=SQL_DATABASE_TEST;
        await connect();
        let result=await selectRecordByPhoneNumber();
        expect(result).toBeDefined();
        expect(result).toBe('the tableName or phoneNumber dont defined')
    
        await disconnect();

    })
    



})
afterAll(()=>{
    myconfig.database=SQL_DATABASE;

})