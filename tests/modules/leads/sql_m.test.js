require('dotenv').config();
const { SQL_DATABASE_TEST, SQL_DATABASE } = process.env;

const { selectAllTable, newOrderer,newPouringType,selectRecordByPhoneNumber } = require('../../../modules/leads/sql/create_sql');
const { connect, myconfig, disconnect } = require('../../../services/sql/sql-connection');
beforeAll(() => {
    myconfig.database = SQL_DATABASE_TEST;
});


describe('CHECK FUNCTION selectAllTable', () => {
   
    it('should return tableName is exists', async () => {
        await connect();
        let result = await selectAllTable('test');
        await disconnect();
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Object);
        expect(result.recordsets).toBeInstanceOf(Array);
    })
    it('should return the tablename is not defiend', async () => {

        await connect();

        let result=await selectAllTable();
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
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Object);
        expect(result.recordsets).toBeInstanceOf(Array);   
        expect(result.rowsAffected[0]).toBeGreaterThanOrEqual(1);
     

    })
    

})
describe('CHECK FUNCTION selectRecordByPhoneNumber',()=>{
    

    it('should return the tableName is exists',async()=>{
        await connect();
        let result=await selectRecordByPhoneNumber("0534185749","orderers");
        await disconnect();

        expect(result).toBeInstanceOf(Object);            
        expect(result).toBeDefined();
    

    })

    
    it('should return the phone dont definde',async()=>{
        await connect();
        let result=await selectRecordByPhoneNumber();
        expect(result).toBeDefined();
        expect(result).toBe('the tableName or phoneNumber dont defined')
    
        await disconnect();

    })
    
})


describe('check function newPouringType' ,()=>{
    it('should the function insert the data to database' ,async()=>{
        await connect();
        const result = await newPouringType({name:"fence"});
        await disconnect();
        expect(result).toBeDefined();
        expect(result.rowsAffected[0]).toBeGreaterThanOrEqual(1);
        expect(result).toBeInstanceOf(Object);
        expect(result.recordset).not.toBeDefined();
        expect(result.recordsets).toBeInstanceOf(Array);
       
    })
    it('should the function can get null and dont to fall' , async()=>{
        await connect()
        const result = await newPouringType()
        await disconnect()
        expect(result).toBeDefined()
        expect(result).toBeFalsy()
        expect(result.rowsAffected).not.toBeDefined();
        expect(result.recordset).not.toBeDefined()
    })
    
    
})



    



afterAll(()=>{
    myconfig.database=SQL_DATABASE;

})