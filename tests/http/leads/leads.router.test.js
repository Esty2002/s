const request = require('supertest')
const { app } = require('../../../app');

jest.mock('../../../modules/leads/leads-options', () => {
    return {
        createNewLead: jest.fn((obj) => {
            if (obj.supplyDate && obj.ordererCode) {
                if (typeof obj.ordererCode !== 'number') {
                    return { status: 500, message: `cant insert a type ${typeof obj.ordererCode} to type Int` }
                }
                let data = [];
                if (obj.baseConcretProduct) {
                    obj.baseConcretProduct.forEach((_, Id) => {
                        data = [...data, { Id }];
                    });
                }
                else {
                    data = [{ Id: 8 }];
                }
                return { status: 201, data };
            }
            else {
                throw new Error("One or more required properties are not exists");
            }
        }),
    }
});

jest.mock('../../../modules/leads/tables', () => {
    return {
        newRecord: jest.fn((obj) => {
            if (obj.entityName && (obj.entityName === "Orderers" || obj.entityName === "StatusesLead" || obj.entityName === "PouringsTypes" || obj.entityName === "moreProductsItems")) {
                if (obj.values)
                    return { status: 201, data: [{ Id: 5 }] };
                else
                    return { status: 500, message: "values not exists" }
            }
            else {
                throw new Error(`the entity name ${obj.entityName} not exist`);
            }
        }),
        getRecord: jest.fn((entityName, condition) => {

            if (entityName && (entityName === "Orderers" || entityName === "StatusesLead" || entityName === "PouringsTypes" || entityName === "moreProductsItems")) {
                if (condition === 'none') {
                    return { status: 200, data: [{ all: true }, { entityName }] };
                }
                else {
                    return { status: 200, data: [{ all: false }, { entityName }, { condition }] };
                }
            }
            else {
                throw new Error(`the entity name ${entityName} not exist`);

            }
        })
    }
})

describe('Check request /leads/createnewlead', () => {
    it('Should function create the lead if the required properties is exists', async () => {
        const response = await request(app).post('/leads/createnewlead').send({
            supplyDate: new Date(1, 1, 2030), supplyHour: "10:20", ordererCode: 1, address: "בייטון ישראל",
            mapReferenceLongitude: 0, mapReferenceLatitude: 0, clientCode: 1, baseConcretProduct: [{
                id: 1, tableReference: "tbl_FinishProducts", concretAmount: 15, pump: 1, pumpPipeLength: 12, pouringType: 1,
                pouringTypesComments: ""
            }], comments: "", morePorductsItems: [
                { productCode: 1, amount: 45 },
                { productCode: 5, amount: 20 }
            ]
        });
        const { createNewLead } = jest.requireMock('../../../modules/leads/leads-options');
        expect(createNewLead).toHaveBeenCalled()
        expect(response).toBeDefined();
        expect(response.status).toBe(201);
        expect(response.serverError).toBeFalsy();
        expect(response.text).toBe("[{\"Id\":0}]");

    });
    it('Should function create many leads if the array of baseConcretProduct long more one', async () => {
        const response = await request(app).post('/leads/createnewlead').send({
            supplyDate: new Date(1, 1, 2030), supplyHour: "10:20", ordererCode: 1, address: "בייטון ישראל",
            mapReferenceLongitude: 0, mapReferenceLatitude: 0, clientCode: 1, baseConcretProduct: [{
                id: 1, tableReference: "tbl_FinishProducts", concretAmount: 15, pump: 1
            },
            {
                id: 1, tableReference: "tbl_FinishProducts"
            },
            {
                id: 1, tableReference: "tbl_BuytonItems", concretAmount: 8, pouringType: 1,
                pouringTypesComments: ""
            },
            {
                id: 1, tableReference: "tbl_BuytonItems", concretAmount: 85, pump: 45
            }]
        });
        expect(response).toBeDefined();
        expect(response.status).toBe(201);
        expect(response.serverError).toBeFalsy();
        expect(response.text).toBe("[{\"Id\":0},{\"Id\":1},{\"Id\":2},{\"Id\":3}]");
    });

    it('Should function create the lead if the ordererCode is not type number', async () => {
        const response = await request(app).post('/leads/createnewlead').send({
            supplyDate: new Date(1, 1, 2030), supplyHour: "10:20", ordererCode: "1"
        });
        expect(response).toBeDefined();
        expect(response.status).toBe(500);
        expect(response.text).toBe(`cant insert a type string to type Int`);
        expect(response.serverError).toBeTruthy();
    });

    it('Should request return status 500 if the the require items are not exists', async () => {
        const response = await request(app).post('/leads/createnewlead').send({
            ordererCode: "1", morePorductsItems: []
        });
        expect(response).toBeDefined();
        expect(response.status).toBe(500);
        expect(response.serverError).toBeTruthy();
        expect(response.text).toBe("One or more required properties are not exists")
    });
});

describe('Check request /leads/insertrecord', () => {
    it('Should request returned status 201 if the record created', async () => {
        const response = await request(app).post('/leads/insertrecord').send({ entityName: "PouringsTypes", values: { name: "Test" } });
        const { newRecord } = jest.requireMock('../../../modules/leads/tables');
        expect(newRecord).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response.status).toBe(201);
        expect(response.serverError).toBeFalsy();
        expect(response.text).toBe("[{\"Id\":5}]");
    });

    it('Should request returned status 201 if the record correct', async () => {
        const response = await request(app).post('/leads/insertrecord').send({ entityName: "moreProductsItems", values: { name: "Test" } });
        const { newRecord } = jest.requireMock('../../../modules/leads/tables');
        expect(newRecord).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response.status).toBe(201);
        expect(response.serverError).toBeFalsy();
        expect(response.text).toBe("[{\"Id\":5}]");
    });
    it('Should reques fail with status 500 if the entity name not correct', async () => {

        const response = await request(app).post('/leads/insertrecord').send({ entityName: "blabla", values: { test: "test" } });
        expect(response).toBeDefined();
        expect(response.serverError).toBeTruthy();
        expect(response.status).toBe(500);
        expect(response.text).toBe(`the entity name blabla not exist`)

    });
    it('Should request faild with status 500 if the body not contain values', async () => {
        const response = await request(app).post('/leads/insertrecord').send({ entityName: "StatusesLead" });
        const { newRecord } = jest.requireMock('../../../modules/leads/tables');
        expect(newRecord).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response.serverError).toBeTruthy();
        expect(response.status).toBe(500);
        expect(response.text).toBe("values not exists");
    })


});

describe('Check request /leads/getrecord', () => {
    it('Should request return status 200 if all the arguments are correct and the request found', async () => {
        const response = await request(app).get('/leads/getrecord/StatusesLead/none');
        expect(response).toBeDefined();
        expect(response.status).toBe(200);
        const {getRecord}=jest.requireMock('../../../modules/leads/tables');
        expect(getRecord).toHaveBeenCalled();
        expect(response.serverError).toBeFalsy();
        expect(response.text).toBe("[{\"all\":true},{\"entityName\":\"StatusesLead\"}]");
    });

    it('Should request return status 200 with the condition',async()=>{
        const response=await request(app).get('/leads/getrecord/Orderers/Id=5');
        expect(response).toBeDefined();
        expect(response.status).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response.text).toBe("[{\"all\":false},{\"entityName\":\"Orderers\"},{\"condition\":\"Id=5\"}]");
    });

    it('Should request return status 500 if the entity name not exist',async()=>{
        const response=await request(app).get('/leads/getrecord/balblabla/none');
        expect(response).toBeDefined();
        expect(response.serverError).toBeTruthy();
        expect(response.status).toBe(500);
        expect(response.text).toBe( "the entity name balblabla not exist");
    });

    it('Should request return status 200',async()=>{
        const response=await request(app).get('/leads/getrecord/bla');
        expect(response).toBeDefined();
        expect(response.status).toBe(200);
        expect(response.notFound).toBeFalsy();
        expect(response.text).toBe("request not found")
    });
});

