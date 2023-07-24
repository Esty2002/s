
jest.mock('../../../services/axios', () => {
    return {
        checkObjectValidations: jest.fn((obj, entity) => {

            if (typeof obj === 'object' && typeof entity === 'string') {
                return true;
            }
            else {
                throw new Error(`The entity ${entity} is not exist`);
            }
        })
    }
});

jest.mock('../../../services/axios', () => {
    return {
        postData: jest.fn((url, body) => {
            if (url.includes("/") && typeof body === "object") {
                if (url.includes('create')) {
                    let data = []
                    if (body.values instanceof Array) {
                        body.values.forEach((_, Id) => {
                            data = [...data, { Id }]
                        });
                    }
                    else {
                        data = [{ Id: 1 }]
                    }
                    return { status: 201, data };
                }
                if (url.includes('read')) {
                    return { status: 200, data: [{ Id: 15 }, { Id: 16 }] };
                }
            }
            else {
                throw new Error(`The url ${url} or body ${body} not correct`);
            }
        })


    }
});

jest.mock('../../../modules/leads/tables', () => {
    return {
<<<<<<< HEAD
        getRecord: jest.fn((name, condition) => {
            if (typeof name == "string" && condition == null || (typeof condition === 'string' && condition.includes("="))) {
                return { status: 200, data: [{ Id: 1 }] };
            }
            throw new Error(`The name ${name} or condtition ${condition} are not correct`);
=======
        checkObjectValidations: jest.fn(() => {
            return true;
        }),
        checkObjectForUpdate: jest.fn(() => {
            return true;
>>>>>>> products2
        })
    }
});

<<<<<<< HEAD
// jest.mock('../../../modules/leads/leads-options', () => {
//     const leads = jest.requireActual('../../../modules/leads/leads-options');
//     return {
//         ...leads,
//         insertMoreProductsItems: jest.fn(async (mpi, id) => {
//             if (mpi && mpi instanceof Array && id) {
//                 let result = []
//                 mpi.forEach((_, Id) => {
//                     result = [...result, { Id }];
//                 });
//                 return result;
//             }
//             else {
//                 throw new Error("morePoroductsItems or result not correct");
//             }
//         })
=======
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
<<<<<<< HEAD:tests/modules/leads/leads-options.module.test.js
        // jest.mock('../../../services-leads/db/mongodb/mongo-operations', () => {
        //     return {
        //         insertOne: jest.fn((obj) => {
        //             if (obj) {
=======
// jest.mock('../../../services-leads/db/mongodb/mongo-operations', () => {
//     return {
//         insertOne: jest.fn((obj) => {
//             if (obj) {
>>>>>>> Tovi:tests/modules/leads/leads-options.module.js

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



<<<<<<< HEAD:tests/modules/leads/leads-options.module.test.js
        //         })

        //     })
=======
//         })
        
//     })
>>>>>>> Tovi:tests/modules/leads/leads-options.module.js

>>>>>>> products2

//     }
// })
const { createNewLead, insertMoreProductsItems } = require('../../../modules/leads/leads-options');
const leadsOptions = require('../../../modules/leads/leads-options');

describe("Check function createNewLead", () => {
    it('should the function create a lead if all the data is correct', async () => {
        const result = await createNewLead({
            supplyDate: new Date(1, 1, 2030), supplyHour: "10:20", ordererCode: 1, address: "בייטון ישראל",
            mapReferenceLongitude: 0, mapReferenceLatitude: 0, clientCode: 1, baseConcretProduct: [{
                id: 1, tableReference: "tbl_FinishProducts", concretAmount: 15, pump: 1, pumpPipeLength: 12, pouringType: 1,
                pouringTypesComments: ""
            }], comments: "", morePorductsItems: [
                { productCode: 1, amount: 45 },
                { productCode: 5, amount: 20 }
            ]
        });
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Object);
        expect(result.status).toBe(201);
        expect(result.data).toBeInstanceOf(Array);
        expect(result.data.length).toBe(2)

    });
<<<<<<< HEAD
    it('Should the function create the lead if not all the data not null', async () => {
        const result = await createNewLead({
            supplyDate: new Date(1, 1, 2023), ordererCode: 1, baseConcretProduct: [{
                id: "b1457", tableReference: "tbl_BuytonItems", concretAmount: 20, pouringType: 1,
            }], morePorductsItems: [
                { productCode: 2, amount: 25 },

            ]
        });
=======


    it('should return inserted id when succeded', async () => {
        let result = await allLeadsDetails({ filetr: {}, sort: { name: 1 }, skip: 0, limit: 0, project: { _id: 0, name: 1 } });
>>>>>>> products2
        expect(result).toBeDefined();
        const { insertMoreProductsItems } = jest.requireMock('../../../modules/leads/leads-options');
        const { postData } = jest.requireMock('../../../services/axios');
        const { getRecord } = jest.requireMock('../../../modules/leads/tables')
        expect(postData).toHaveBeenCalled();
        expect(getRecord).toHaveBeenCalled();
        // expect(insertMoreProductsItems).toHaveBeenCalled();
        expect(getRecord).toHaveReturned();
        expect(result).toBeInstanceOf(Object);
        expect(result.status).toBe(201);
        expect(result.data).toBeInstanceOf(Array);
        expect(result.data.length).toBe(1);
        expect(result.data[0].Id).toBe(0);

<<<<<<< HEAD
=======
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
>>>>>>> products2

    });
    it('Should the function create a new lead if the more products items not exist', async () => {
        const result = await createNewLead({
            supplyDate: new Date(1, 1, 2023), ordererCode: 1, baseConcretProduct: [
                { id: "b1457", tableReference: "tbl_BuytonItems", concretAmount: 20, pouringType: 1, },
                { id: 3, tableReference: "tbl_FinishProducts", concretAmount: 55, },
                { id: 8, tableReference: "tbl_FinishProducts" }]
        });
        const { checkObjectValidations } = jest.requireMock('../../../services/validations/use-validations');
        expect(result).toBeDefined();
        expect(checkObjectValidations).toHaveBeenCalled();
        expect(checkObjectValidations).toHaveReturned();
        expect(result).toBeInstanceOf(Object);
        expect(result.data).toBeInstanceOf(Array);
        expect(result.data.length).toBe(3);
    });

    it('Should function create a new lead if the base concret product is an empty array', async () => {
        const result = await createNewLead({
            supplyDate: new Date(1, 1, 2023), ordererCode: 1, comments: ""
        });
        const { checkObjectValidations } = jest.requireMock('../../../services/validations/use-validations');
        expect(result).toBeDefined();
        expect(checkObjectValidations).toHaveBeenCalled();
        expect(checkObjectValidations).toHaveReturned();
        expect(result).toBeInstanceOf(Object);
        expect(result.data).toBeInstanceOf(Array);
        expect(result.data.length).toBe(1);
    });

    it('Should function throw error if the body not exist', async () => {
        let result;
        try {
            result = await createNewLead();
        }
        catch (error) {
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(result).not.toBeDefined();
<<<<<<< HEAD:tests/modules/leads/leads-options.module.test.js
            const { getRecord } = jest.requireMock('../../../modules/leads/tables');
            expect(getRecord).toHaveBeenCalled();
            expect(error.message).toBe("Cannot read properties of null (reading 'baseConcretProduct')")
=======
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
>>>>>>> f5291c0209296599f25d5a979c5fd995441c5200:tests/modules/leads/leads-options.module.js
        }
<<<<<<< HEAD
    });
});
=======


<<<<<<< HEAD:tests/modules/leads/leads-options.module.test.js
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
>>>>>>> Tovi:tests/modules/leads/leads-options.module.js

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


<<<<<<< HEAD:tests/modules/leads/leads-options.module.test.js
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


=======
//         })

//     })
>>>>>>> Tovi:tests/modules/leads/leads-options.module.js

    })

})
<<<<<<< HEAD:tests/modules/leads/leads-options.module.test.js
>>>>>>> products2
=======
<<<<<<< HEAD:tests/modules/leads/leads-options.module.test.js
=======

>>>>>>> Tovi:tests/modules/leads/leads-options.module.js
>>>>>>> f5291c0209296599f25d5a979c5fd995441c5200:tests/modules/leads/leads-options.module.js

