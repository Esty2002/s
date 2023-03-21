jest.mock('../../../services/sql/sql-operations.js', () => {
    return {
        select: jest.fn((obj) => {
            console.log(obj.tableName);
            if (obj.tableName === "statusesLead") {
                return true;
            }
            else {
                return false;
            }
        }),
        insert: jest.fn((obj) => {
            console.log(obj.tableName, "obj.table", obj.values);
            if (obj.tableName === "statusesLead" && !obj.values.includes('undefined')) {
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

const {newLeadStatus,deleteStatus,updateStatus,getStatusesLead}=require('../../../modules/leads/status-leads');
describe('check function newLeadStatus',()=>{
    it('check that the function return "your object success" when arguments sent', async () => {
        const result = await newLeadStatus({ name: "test" });
        expect(result).toBeDefined();
        expect(result).toBe("your object success");
        expect(result.length).toBe(19);
    })
    it('check that the function return "your object success" when try to change the tablename', async () => {
        const result = await newLeadStatus({ tableName: "test", name: "test" });
        expect(result).toBeDefined();
        expect(result).toBe("your object success");
        expect(result.length).toBe(19);
    })
    it('check that the function return "your object success" when try to change the tablename', async () => {
        const result = await newLeadStatus();
        expect(result).toBeDefined();
        expect(result).toBe("the object is null");
        expect(result.length).toBe(18);
    })
});

describe('check function getStatusesLead',()=>{
    it('check that the function return true always', async () => {
        const result = await getStatusesLead();
        expect(result).toBeDefined();
        expect(result).toBeTruthy();
        expect(result).not.toBeNull();
    })
    it('check that the function return true always', async () => {
        const result = await getStatusesLead({ test: "test" });
        expect(result).toBeDefined();
        expect(result).toBeTruthy();
        expect(result).not.toBeNull();
    })
})
describe('check function updateStatus',()=>{
    it('check that the functin return "object is defined" when the obj.set is defined',async()=>{
        const result=await updateStatus({set:"test",serialNumber:1});
        expect(result).toBe('object is defined');
        expect(result).toBeDefined();
        expect(result.length).toBe(17);
        expect(result).not.toBeNull();
    })
    it('check that the function return "object is not defined" when the obj.set not defined',async()=>{
        const result=await updateStatus({set:"test"});
        expect(result).toBe('object is not defined');
        expect(result).toBeDefined();
        expect(result.length).toBe(21);
        expect(result).not.toBeNull();
    })
    it('check that the function return "object is not defined" when the obj.set not defined',async()=>{
        const result=await updateStatus({serialNumber:1});
        expect(result).toBe('object is not defined');
        expect(result).toBeDefined();
        expect(result.length).toBe(21);
        expect(result).not.toBeNull();
    }) 
    it('check that the function return "the object is null" when the obj is null',async()=>{
        const result=await updateStatus();
        expect(result).toBe('the object is null');
        expect(result).toBeDefined();
        expect(result.length).toBe(18);
        expect(result).not.toBeNull();
    })
})


describe('check function deleteStatus',()=>{
    it('check that the function return "object is not defined" when all obj.set is defined',async()=>{
        const result=await deleteStatus({set:"delete",serialNumber:1});
        expect(result).toBe('object is not defined');
        expect(result).toBeDefined();
        expect(result.length).toBe(21);
        expect(result).not.toBeNull();
    })
    it('check that the function return "the status is null" when the obj.set not defined',async()=>{
        const result=await deleteStatus({set:"delete"});
        expect(result).toBe("the status is null");
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
    })
    it('check that the function return "object is not defined" when the obj.set not defined',async()=>{
        const result=await deleteStatus({serialNumber:1});
        expect(result).toBe('object is not defined');
        expect(result).toBeDefined();
        expect(result.length).toBe(21);
        expect(result).not.toBeNull();
    })
})