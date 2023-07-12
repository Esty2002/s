
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
                return { status: 200, data: [{ Id: 15 }, { Id: 16 }] };
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

const { createNewLead } = require('../../../modules/leads/leads-options');
jest.mock('../../../modules/leads/leads-options', () => {
    const leads = jest.requireActual('../../../modules/leads/leads-options');
    return {
        ...leads,
        insertMoreProductsItems: jest.fn((obj, result) => {
            if (obj.morePorductsItems && obj.morePorductsItems instanceof Array && result instanceof Array && result[0].Id) {
                let result = []
                obj.morePorductsItems.forEach((_, Id) => {
                    result = [...result, { Id }];
                });
                return result
            }
            else {
                throw new Error("morePoroductsItems or result not correct");
            }
        })

    }
})

describe("Check function createNewLead", () => {
    it('should the function create a lead if all the data is correct', async () => {
        const result = await createNewLead({
            supplyDate: new Date(1, 1, 2030), supplyHour: "10:20", ordererCode: 1, address: "בייטון התותח ישראל",
            mapReferenceLongitude: 0, mapReferenceLatitude: 0, clientCode: 1, baseConcretProduct: {
                id: 1, tableReference: "tbl_FinishProducts", concretAmount: 15, pump: 1, pumpPipeLength: 12, pouringType: 1,
                pouringTypesComments: ""
            }, comments: ""
        });
        console.log({ result });
    })
})