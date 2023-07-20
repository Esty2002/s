
jest.mock('../../../services/validations/use-validations', () => {
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
        getRecord: jest.fn((name, condition) => {
            if (typeof name == "string" && condition == null || (typeof condition === 'string' && condition.includes("="))) {
                return { status: 200, data: [{ Id: 1 }] };
            }
            throw new Error(`The name ${name} or condtition ${condition} are not correct`);
        })
    }
});

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
    it('Should the function create the lead if not all the data not null', async () => {
        const result = await createNewLead({
            supplyDate: new Date(1, 1, 2023), ordererCode: 1, baseConcretProduct: [{
                id: "b1457", tableReference: "tbl_BuytonItems", concretAmount: 20, pouringType: 1,
            }], morePorductsItems: [
                { productCode: 2, amount: 25 },

            ]
        });
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
            const { getRecord } = jest.requireMock('../../../modules/leads/tables');
            expect(getRecord).toHaveBeenCalled();
            expect(error.message).toBe("Cannot read properties of null (reading 'baseConcretProduct')")
        }
    });
});

