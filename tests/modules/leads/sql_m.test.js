require('dotenv').config();
const {SQL_DATABASE_TEST}=process.env;

const {selectAllTable}=require('../../../modules/leads/sql/create_sql');
const { connect,myconfig, disconnect } = require('../../../services/sql/sql-connection');
describe('CHECK FUNCTION selectAllTable', () => {
    it('should return tableName is exists',async ()=>{

        myconfig.database=SQL_DATABASE_TEST;
        await connect();
        let result=await selectAllTable("test");
        await disconnect();
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Object);
        expect(result.data).toBeInstanceOf(Object);
    })
    // it('should return false the object is empty', async () => {
    //     const result = await createNewLead();
    //     expect(result).toBeDefined();
    //     expect(result).toBeFalsy();
    //     expect(result.date).toBe(undefined);
    // })
})