<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> validations
jest.mock('../../../services/axios', () => {
    return {
        getData: jest.fn((_, url) => {

            if (url === '/mongo/countdocuments/leads')
                return true;
            else
                throw new Error("the url not correct");


        }),
        postData: jest.fn((_, url, obj) => {

            switch (url) {
                case '/mongo/insertone':
                    if (obj.data && typeof obj.data.supplyDate == 'object' && typeof obj.data.SupplyAddress == 'object') {
                        return true;
                    }
                    else {
                        throw new Error("the object lead is not correct");
                    }
                case '/mongo/updateone':
                    if (obj.set && obj.filter && obj.collection === 'leads') {
                        return true;
                    }
                    else {
                        throw new Error("the obj.set or obj.filter or obj.collection are not correct");
                    }
                case '/mongo/aggregate':

                    if (obj.collection === "leads" && obj.aggregate.length == 5 && obj.aggregate[0].$match) {
                        return true;
                    }
                    else {
                        throw new Error("the collection or aggregation are not correct");
                    }
                default:
                    throw new Error('the url not correct');
            }



        })

    }
});

jest.mock('../../../services/validations/use-validations', () => {
    return {
        checkObjectValidations: jest.fn(() => {
            return true;
        }),
        checkObjectForUpdate:jest.fn(()=>{
            return true;
        })
    }
});

const { createNewLead, updateLead, allLeadsDetails } = require('../../../modules/leads/leads-options');

describe('CHECK FUNCTION CREATENEWLEAD', () => {
    it('should return inserted id when succeded', async () => {
        let result = await createNewLead({ phone: "088659365", supplyDate: new Date(), SupplyAddress: { city: "Ashdod", street: "Tarfon" } });
        expect(result).toBeDefined();
        expect(result).toBeTruthy();

    })
    it('should return false the object is empty', async () => {
        let result;
        try {
            result = await createNewLead();

        }
        catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toBe('the obj not received');
            expect(error).toBeInstanceOf(Error);
            expect(result).toBe(undefined);
        }
<<<<<<< HEAD
=======
// jest.mock('../../../services-leads/db/mongodb/mongo-operations', () => {
//     return {
//         insertOne: jest.fn((obj) => {
//             if (obj) {

//                 return "123456";

//             }
//             return false;
//         }),
//         find: jest.fn((obj) => {
//             if (obj)
//                 return [{ test: "success" }];
//             else
//                 return [{ test: "not success" }];
//         }),
//         aggregate:jest.fn((obj)=>{
//             if (obj)
//                 return [{ test: "success" }];
//             else
//                 return [{ test: "not success" }];
//         }),
//         countDocuments: jest.fn(() => {
//             return 10;

//         }),
//         updateOne: jest.fn((obj) => {
//             return "successUpdatelead";
//         })
//     }})

// const { createNewLead, getTheMustConcretItem, updateLead,allLeadsDetails } = require('../../../modules/leads/leads-options');
//     describe('CHECK FUNCTION AllLeadsDetails', () => {
//         it('should return inserted id when succeded', async () => {
//             let result = await allLeadsDetails({filetr:{name:"test"},sort:{name:1},skip:0,limit:0,project:{_id:0,name:1}});
//             expect(result).toBeDefined();
//             expect(result).toBeInstanceOf(Array);
//             expect(result.length).toBeGreaterThanOrEqual(1);


//         })
//         it('should return inserted id when succeded', async () => {
//             let result = await allLeadsDetails({filetr:{},sort:{name:1},skip:0,limit:0,project:{_id:0,name:1}});
//             expect(result).toBeDefined();
//             expect(result).toBeInstanceOf(Array);
//             expect(result.length).toBeGreaterThanOrEqual(1);



//         })
        
//     })
>>>>>>> main-dev
=======
>>>>>>> validations

    })
    it('should the function getData and function postData', async () => {
        let result = await createNewLead({ phone: "088659365", supplyDate: new Date(), SupplyAddress: { city: "Ashdod", street: "Tarfon" } });
        const { postData, getData } = jest.requireMock('../../../services/axios');
        expect(result).toBeTruthy();
        expect(postData).toHaveBeenCalled();
        expect(getData).toHaveBeenCalled();

    })
    it('should the function faild if the object not correct', async () => {
        let result;
        try {
            result = await createNewLead({ phone: "088659365", supplyDate: new Date() });

        }
        catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toBe('the object lead is not correct');
            expect(error).toBeInstanceOf(Error);
            expect(result).toBe(undefined);
        }
    })

})
describe('CHECK FUNCTION AllLeadsDetails', () => {

    it('should return inserted id when succeded', async () => {
        const result = await allLeadsDetails({ filetr: { name: "test" }, sort: { name: 1 }, skip: 0, limit: 0, project: { _id: 0, name: 1 } });
        expect(result).toBeDefined();
        expect(result).toBeTruthy();
        expect(result).toEqual(true);

    });

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> validations
    it('should return inserted id when succeded', async () => {
        let result = await allLeadsDetails({ filetr: {}, sort: { name: 1 }, skip: 0, limit: 0, project: { _id: 0, name: 1 } });
        expect(result).toBeDefined();
        expect(result).toBeTruthy();
        expect(result).toEqual(true);
    });

    it('should the postData is called', async () => {
        const { postData } = jest.requireMock('../../../services/axios');
        let result = await allLeadsDetails({ filetr: {}, sort: { name: 1 }, skip: 0, limit: 0, project: { _id: 0, name: 1 } });
        expect(result).toBeTruthy();
        expect(postData).toHaveBeenCalled();

    })
    it('should the function return error if the data is not correct', async () => {
        let result
        const { postData } = jest.requireMock('../../../services/axios');
        try {

            result = await allLeadsDetails();
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(result).not.toBeDefined();
            expect(postData).toHaveBeenCalled();
            expect(error).toBeDefined();

        }
    })
})

describe('check the function updateLead', () => {
    it('should return when the function succsed', async () => {
        const result = await updateLead({ name: "testes", serialNumber: "123" }, {});
        expect(result).toBeDefined();
        expect(result).toBeTruthy();
        expect(result).toEqual(true);

    })

    it('should return when the function succsed with many elements', async () => {
        const result = await updateLead({ name: "testes", serialNumber: "123" }, { name: "test2", serialNumber: "333" });
        expect(result).toBeDefined();
        expect(result).toBeTruthy();
        expect(result).toEqual(true);

    })



    it('should return when the function dont get arguments', async () => {
        let result;
        try {
            result = await updateLead();

        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("the obj or filter are not defined");
            expect(result).not.toBeDefined();
            expect(error).not.toBeNull();
        }


    })

    it('should return when the function get empty object', async () => {
        let result;
        try {
            result = await await updateLead({});

        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("the obj or filter are not defined");
            expect(result).not.toBeDefined()
            expect(error).not.toBeNull();
        }


<<<<<<< HEAD
=======
//     describe('CHECK FUNCTION CREATENEWLEAD', () => {
//         it('should return inserted id when succeded', async () => {
//             let result = await createNewLead({ phone: "088659365", supplyDate: new Date() });
//             expect(result).toBeDefined();
//             expect(result).toBe("123456");
//         })
//         it('should return false the object is empty', async () => {
//             let result;
//             try{
//                 result = await createNewLead();

//             }
//             catch(error){
//                 expect(error).toBeDefined();
//                 expect(error.message).toBe('the obj not received');
//                 expect(error).toBeInstanceOf(Error);
//                 expect(result).toBe(undefined);
//             }
            
//         })
        
//     })
//     describe('check function getTheMastConcretItem', () => {
//         ///לא צריך
//         it('should the function return the correct data', async () => {
//             const result = await getTheMustConcretItem();
//             expect(result).toBeDefined();
//             expect(result).toBeInstanceOf(Array);
//             expect(result[0]).toBeInstanceOf(Object);
//             expect(result[0].test).toBe("success");
//         })
//         it('should the function return success if it has arguments', async () => {
//             const result = await getTheMustConcretItem("hello to the function");
//             expect(result).toBeDefined();
//             expect(result).toBeInstanceOf(Array);
//             expect(result[0]).toBeInstanceOf(Object);
//             expect(result[0].test).toBe("success");
//         })
//     })

//     describe('check the function updateLead', () => {
//         it('should return when the function succsed', async () => {
//             const result = await updateLead({ name: "testes", serialNumber: "123" },{});
//             expect(result).toBeDefined();
//             expect(result).toBe("successUpdatelead");
//             expect(result).toBeTruthy()

//         })

//         it('should return when the function succsed with many elements', async () => {
//             const result = await updateLead({ name: "testes", serialNumber: "123" }, { name: "test2", serialNumber: "333" });
//             expect(result).toBeDefined();
//             expect(result).toBe("successUpdatelead");
//             expect(result).toBeTruthy()

//         })



//         it('should return when the function dont get arguments', async () => {
//             let result;
//             try{
//                 result = await updateLead();

//             }
//             catch(error){
//                 expect(error).toBeInstanceOf(Error);
//                 expect(error.message).toBe("the obj or filter are not defined");

//                 expect(error).not.toBeNull();
//             }
            

//         })

//         it('should return when the function get empty object', async () => {
//             let result;
//             try{
//                 result = await await updateLead({});

//             }
//             catch(error){
//                 expect(error).toBeInstanceOf(Error);
//                 expect(error.message).toBe("the obj or filter are not defined");
//                 expect(result).not.toBeDefined()
//                 expect(error).not.toBeNull();
//             }
            


//         })
>>>>>>> main-dev

//     })
=======

    })

})
>>>>>>> validations

})

