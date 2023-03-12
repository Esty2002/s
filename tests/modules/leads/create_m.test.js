jest.mock('../../../services/db/mongo-operations', () => {
    return {
        insertOne: jest.fn((obj) => {
            if (obj){

                return "123456";

            }
            return false;
        })
    }
})

const { createNewLead } = require('../../../modules/leads/create_m');

describe('CHECK FUNCTION CREATENEWLEAD', () => {
    it('should return inserted id when succeded',async ()=>{
        let result=await createNewLead({phone:"088659365",date:new Date()});
        expect(result).toBeDefined();
        expect(result).toBe("123456");
    })
    it('should return false the object is empty', async () => {
        const result = await createNewLead();
        expect(result).toBeDefined();
        expect(result).toBeFalsy();
        expect(result.date).toBe(undefined);
    })
})
