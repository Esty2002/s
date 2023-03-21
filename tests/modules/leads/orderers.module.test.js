jest.mock('../../../services/sql/sql-operations.js',()=>{
    return {
        select:jest.fn((obj)=>{
            if(obj.tableName==="orderers"){
                return true;
            }
            else{
                return false;
            }
        }),
        insert:jest.fn((obj)=>{
            if(obj.tableName==="orderers"&&!obj.values.includes('undefined')){
                return "your object success";
            }
            else{
                return "your object not success";
            }
        }),
        update:jest.fn((obj)=>{
            console.log(obj.set,obj.serialNumber);
            if(obj.set&&obj.serialNumber){
                return "object is defined";
            }
            else{
                return "object is not defined";
            }
        })
    }
});

const {newOrderer,deleteOrderer,updateOrderer,getOrdererByPhone,getOrderers}=require('../../../modules/leads/orderers');
describe('check function newOrderer',()=>{
    it('check that the function return "your object success" if the obj is defined',async()=>{
        const result=await newOrderer({tableName:"orderers",name:"test",phone:"000"});
        expect(result).toBeDefined();
        expect(result).toBe("your object success")
        expect(result.length).toBe(19);
    })
    it('check that the function return "your object not success" if the tablename is not "orderers"',async()=>{
        const result=await newOrderer({tableName:"test",values:"test"});
        expect(result).toBeDefined();
        expect(result).toBe("your object not success")
        expect(result.length).toBe(23);
    })
    it('check that the function return "your object not success" if the values is null',async()=>{
        const result=await newOrderer({tableName:"test"});
        expect(result).toBeDefined();
        expect(result).toBe("your object not success")
        expect(result.length).toBe(23);
    })
})
describe('check function getOrderers',()=>{
    it('check that the function return true always',async()=>{
        const result=await getOrderers();
        expect(result).toBeDefined();
        expect(result).toBeTruthy();
        expect(result).not.toBeNull();
    })
    it('check that the function return true always',async()=>{
        const result=await getOrderers({test:"test"});
        expect(result).toBeDefined();
        expect(result).toBeTruthy();
        expect(result).not.toBeNull();
    })
})
describe('check function getOrdererByPhone',()=>{
    it('check that the function return true in any cases',async()=>{
        const result=await getOrdererByPhone({phone:"000"});
        expect(result).toBeDefined();
        expect(result).toBeTruthy();
        expect(result).not.toBeNull();
    })
    it('check that the function return true in any cases',async()=>{
        const result=await getOrdererByPhone({});
        expect(result).toBeDefined();
        expect(result).toBeTruthy();
        expect(result).not.toBeNull();
    })
})

describe('check function updateOrderer',()=>{
    it('check that the functin return "object is defined" when the obj.set is defined',async()=>{
        const result=await updateOrderer({set:"test",serialNumber:1});
        expect(result).toBe('object is defined');
        expect(result).toBeDefined();
        expect(result.length).toBe(17);
        expect(result).not.toBeNull();
    })
    it('check that the function return "object is not defined" when the obj.set not defined',async()=>{
        const result=await updateOrderer({set:"test"});
        expect(result).toBe('object is not defined');
        expect(result).toBeDefined();
        expect(result.length).toBe(21);
        expect(result).not.toBeNull();
    })
    it('check that the function return "object is not defined" when the obj.set not defined',async()=>{
        const result=await updateOrderer({serialNumber:1});
        expect(result).toBe('object is not defined');
        expect(result).toBeDefined();
        expect(result.length).toBe(21);
        expect(result).not.toBeNull();
    })
})

describe('check function deleteOrderer' ,()=>{
    it('check that the function return "object is not defined" when all obj.set is defined',async()=>{
        const result=await deleteOrderer({set:"delete",serialNumber:1});
        expect(result).toBe('object is not defined');
        expect(result).toBeDefined();
        expect(result.length).toBe(21);
        expect(result).not.toBeNull();
    })
    it('check that the function return "false" when the obj.set not defined',async()=>{
        const result=await deleteOrderer({set:"delete"});
        expect(result).toBeFalsy();
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
    })
    it('check that the function return "object is not defined" when the obj.set not defined',async()=>{
        const result=await deleteOrderer({serialNumber:1});
        expect(result).toBe('object is not defined');
        expect(result).toBeDefined();
        expect(result.length).toBe(21);
        expect(result).not.toBeNull();
    })
})