jest.mock('../../../services/db/mongo-operations', () => {
    return {
        insertOne: jest.fn((w) => {
            console.log({ test: w });
            return "123456";
        })
    }


})
const { createNewLead } = require('../../../modules/leads/create_m');
describe('CHECK FUNCTION CREATENEWLEAD', () => {
    it('should return inserted id when succeded', async () => {
        let result = await createNewLead({ phone: "088659365", date: new Date() });
        expect(result).toBeDefined();
        expect(result).toBe("123456");
    })
})