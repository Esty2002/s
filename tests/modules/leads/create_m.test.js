jest.mock('../../../services/db/mongo-operations', () => {
    return {
        insertOne: jest.fn((obj) => {
            if (obj) {

                return "123456";

            }
            return false;
        }),
        updateOne: jest.fn((obj) => {
            return "successUpdatelead";
        })

    }
})

const { createNewLead, updateLead } = require('../../../modules/leads/mongo/create_m');

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

describe('check the function updateLead', () => {
    it('should return when the function succsed', async () => {
        const result = await updateLead({ name: "testes", serialNumber: "123" });
        expect(result).toBeDefined();
        expect(result).toBe("successUpdatelead");
        expect(result).toBeTruthy()

    })

    it('should return when the function dont get arguments', async () => {
        const result = await updateLead();
        expect(result).toBeDefined();
        expect(result).toBe("successUpdatelead");
        expect(result).toBeTruthy()

    })

    it('should return when the function get empty object', async () => {
        const result = await updateLead({});
        expect(result).toBeDefined();
        expect(result).toBe("successUpdatelead");
        expect(result).toBeTruthy()

    })

})

