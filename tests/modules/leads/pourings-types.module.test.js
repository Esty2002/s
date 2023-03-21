jest.mock('../../../services/sql/sql-operations.js', () => {
    return {
        select: jest.fn((obj) => {
            console.log(obj.tableName);
            if (obj.tableName === "puringsTypes") {
                return true;
            }
            else {
                return false;
            }
        }),
        insert: jest.fn((obj) => {
            console.log(obj.tableName, "obj.table", obj.values);
            if (obj.tableName === "puringsTypes" && !obj.values.includes('undefined')) {
                return "your object success";
            }
            else {
                return "your object not success";
            }
        }),
        update: jest.fn((obj) => {
            console.log(obj.set, obj.serialNumber);
            if (obj.set && obj.serialNumber) {
                return "object is defined";
            }
            else {
                return "object is not defined";
            }
        })
    }
});

const { newPouringType, updatePouringType, deletePouringType, getPouringTypes } = require('../../../modules/leads/pouring-types');
describe('check function newPouringType', () => {
    it('check that the function return "your object success" when arguments sent', async () => {
        const result = await newPouringType({ name: "test" });
        expect(result).toBeDefined();
        expect(result).toBe("your object success");
        expect(result.length).toBe(19);
    })
    it('check that the function return "your object success" when try to change the tablename', async () => {
        const result = await newPouringType({ tableName: "test", name: "test" });
        expect(result).toBeDefined();
        expect(result).toBe("your object success");
        expect(result.length).toBe(19);
    })
    it('check that the function return "your object success" when try to change the tablename', async () => {
        const result = await newPouringType();
        expect(result).toBeDefined();
        expect(result).toBe("the object is null");
        expect(result.length).toBe(18);
    })
})

describe('check function getPouringTypes', () => {
    it('check that the function return true always', async () => {
        const result = await getPouringTypes();
        expect(result).toBeDefined();
        expect(result).toBeTruthy();
        expect(result).not.toBeNull();
    })
    it('check that the function return true always', async () => {
        const result = await getPouringTypes({ test: "test" });
        expect(result).toBeDefined();
        expect(result).toBeTruthy();
        expect(result).not.toBeNull();
    })

})
describe('check function updatePouringType',()=>{
    it('check that the functin return "object is defined" when the obj.set is defined',async()=>{
        const result=await updatePouringType({set:"test",serialNumber:1});
        expect(result).toBe('object is defined');
        expect(result).toBeDefined();
        expect(result.length).toBe(17);
        expect(result).not.toBeNull();
    })
    it('check that the function return "object is not defined" when the obj.set not defined',async()=>{
        const result=await updatePouringType({set:"test"});
        expect(result).toBe('object is not defined');
        expect(result).toBeDefined();
        expect(result.length).toBe(21);
        expect(result).not.toBeNull();
    })
    it('check that the function return "object is not defined" when the obj.set not defined',async()=>{
        const result=await updatePouringType({serialNumber:1});
        expect(result).toBe('object is not defined');
        expect(result).toBeDefined();
        expect(result.length).toBe(21);
        expect(result).not.toBeNull();
    }) 
    it('check that the function return "the object is null" when the obj is null',async()=>{
        const result=await updatePouringType();
        expect(result).toBe('the object is null');
        expect(result).toBeDefined();
        expect(result.length).toBe(18);
        expect(result).not.toBeNull();
    })
})
describe('check function deletePouringType',()=>{
    it('check that the function return "object is not defined" when all obj.set is defined',async()=>{
        const result=await deletePouringType({set:"delete",serialNumber:1});
        expect(result).toBe('object is not defined');
        expect(result).toBeDefined();
        expect(result.length).toBe(21);
        expect(result).not.toBeNull();
    })
    it('check that the function return "false" when the obj.set not defined',async()=>{
        const result=await deletePouringType({set:"delete"});
        expect(result).toBeFalsy();
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
    })
    it('check that the function return "object is not defined" when the obj.set not defined',async()=>{
        const result=await deletePouringType({serialNumber:1});
        expect(result).toBe('object is not defined');
        expect(result).toBeDefined();
        expect(result.length).toBe(21);
        expect(result).not.toBeNull();
    })
})