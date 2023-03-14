jest.mock('../../../services/db/mongo-operations', () => {
    return {
        insertOne: jest.fn((obj) => {
            if (obj) {

                return "123456";

            }
            return false;
        }),
        find: jest.fn((obj) => {
            if (obj)
                return [{ test: "success" }]
            else
                return [{ test: "not success" }]
        }),
        countDocuments: jest.fn(()=>{
            return 10; 
        })
    }


})

const { createNewLead, getTheMustConcretItem } = require('../../../modules/leads/mongo/create_m');

describe('CHECK FUNCTION CREATENEWLEAD', () => {
    it('should return inserted id when succeded', async () => {
        let result = await createNewLead({ phone: "088659365", date: new Date() });
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
describe('check function getTheMastConcretItem',()=>{
    it('should the function return the correct data',async()=>{
        const result=await getTheMustConcretItem();
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Array);
        expect(result[0]).toBeInstanceOf(Object);
        expect(result[0].test).toBe("success");
    })
    it('should the function return success if it has arguments',async()=>{
        const result=await getTheMustConcretItem("hello to the function");
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Array);
        expect(result[0]).toBeInstanceOf(Object);
        expect(result[0].test).toBe("success");
    })
})
