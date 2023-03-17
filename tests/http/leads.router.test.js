const request = require('supertest')
const { app } = require('../../app')
jest.mock('../../modules/leads/leads-options', () => {
    return {
        createNewLead: jest.fn((obj) => {
            return '123456';
        }),
        updateLead: jest.fn((obj) => {
            return 'updateTheLead';
        }),
        allLeadsDetails: jest.fn(() => {
            return [{ phone: '0583286577', supplyAddress: 'chisda' }, { phone: '5555555555', supplyAddress: 'sss' }];
        })
    }

})

jest.mock('../../modules/leads/more-tables', () => {
    return {
        selectAllTable: jest.fn((tablename) => {
            return 'test';
        }),
        selectRecordByPhoneNumber: jest.fn((phone, tablename) => {
            if (phone === undefined) {
                return ({ tablename:"test" });
            }
            if (tablename === undefined) {
                return ({ phone: '0583288477' });

            }

            return ({ phone: '0583288477', tablename: 'test' });



        }),
        newOrderer: jest.fn((obj=null) => {
            return 'insert';
        }),
        newPouringType: jest.fn((obj = null) => {
            return 'insertType';
        }),
        nameAndphone: jest.fn(() => {
            return ([{ name: "sari", phone: "0583286577" }, { name: "ccc", phone: "5555555555" }]);
        })


    }
})

describe('getleadsdetails', () => {
    it('should get all the leads datails', async () => {
        const response = await request(app).post('/leads/getleadsdetails');
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })

    it('should call allLeadsdetails', async () => {
        const { allLeadsDetails } = jest.requireMock('../../modules/leads/leads-options');
        const response = await request(app).post('/leads/getleadsdetails');
        expect(allLeadsDetails).toHaveBeenCalled();
        expect(response).toBeDefined();
    })

    
})

describe('/getalltable', () => {
    it('should get the all table whith the name wich are givven', async () => {
        const response = await request(app).get('/leads/getalltable?name=test')
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })

    it('should the request successful without sends the deteils', async () => {
        const response = await request(app).get('/leads/getalltable')
        expect(response).toBeDefined();
        expect(response.text).toBe('test');
        expect(response.statusCode).toBe(200);

        expect(response.serverError).toBeFalsy();
    })
})


describe('/getrowaccordingtophone', () => {
    it('should getRowAccordingToPhone whith the deteils wich are givven', async () => {
        const response = await request(app).get('/leads/getrowaccordingtophone?name=test?phone=0583286477')
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();

    })

    it('should the request successful without sends the deteils', async () => {
        const response = await request(app).get('/leads/getrowaccordingtophone')
        expect(response).toBeDefined();
        expect(response.text).toBe('{"result":{"tablename":"test"}}');
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })
    it('should the request successful only whith the name ', async () => {
        const response = await request(app).get('/leads/getrowaccordingtophone?name=test')

        expect(response).toBeDefined();
        expect(response.text).toBe('{"result":{"tablename":"test"}}');
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response).toBeTruthy();
    })
    it('should the request successful only whith the phone ', async () => {
        const response = await request(app).get('/leads/getrowaccordingtophone?phone=0583288477')

        expect(response).toBeDefined();
        expect(response.text).toBe('{"result":{"phone":"0583288477"}}');
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response).toBeTruthy();
    })
})
describe('/createnewlead', () => {

    it('should create a new lead with the details wich are givven', async () => {
        const response = await request(app).post('/leads/createnewlead', { "name": "test" })
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })

    it('should call createNewLead', async () => {
        const { createNewLead } = jest.requireMock('../../modules/leads/leads-options')
        const response = await request(app).post('/leads/createnewlead', { "name": "test" })
        expect(createNewLead).toHaveBeenCalled()
        expect(response).toBeDefined()
        expect(response.text).toBe('123456');
    })
    it('should the request good without parmeters sended ', async () => {
        const response = await request(app).post('/leads/createnewlead');
        expect(response).toBeDefined();
        expect(response.text).toBe('123456');
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();


    })

})
describe('check the function /neworderer', () => {
    it("should return that the function come to the path", async () => {
        const response = await request(app).post('/leads/neworderer', { name: "test", phone: "0527645487" });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response.text).toBe('insert');

    })
    it("should return that the function come to the path even the arguments not recived", async () => {
        const response = await request(app).post('/leads/neworderer');
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response.text).toBe('insert');
    })
    it("should return that the function come to the path even the arguments not recived", async () => {
        const response = await request(app).post('/leads/neworderer', { name: "test" });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response.text).toBe('insert');
    })
})
describe('check function newpouringtype', () => {
    it('should return the function insert if the arguments is exist ', async () => {
        const response = await request(app).post('/leads/newpouringtype', { name: "byton" });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200)
        expect(response.serverError).toBeFalsy()
        expect(response.text).toBe('insertType');

    })

    it('should return the function insert if the arguments is not exist ', async () => {
        const response = await request(app).post('/leads/newpouringtype');
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200)
        expect(response.serverError).toBeFalsy()
        expect(response.text).toBe('insertType');

    })

    it('should return the function insert if the arguments is not empty ', async () => {
        const response = await request(app).post('/leads/newpouringtype', {});
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200)
        expect(response.serverError).toBeFalsy()
        expect(response.text).toBe('insertType');

    })
})

describe('check function updeatLead', () => {
    it('should the function updeteOne update if it get arguments', async () => {
        const response = await request(app).post('/leads/updateleadsdetails', { name: "test", serialNumber: '333' });
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(200)
        expect(response.text).toBe('updateTheLead')

    })

    it('should the function dont faill if the arguments is empty', async () => {
        const response = await request(app).post('/leads/updateleadsdetails', {})
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(200)
        expect(response.text).toBe('updateTheLead')
        expect(response.serverError).toBeFalsy()

    })

    it('should the function dont faill if the arguments isnt exist', async () => {
        const response = await request(app).post('/leads/updateleadsdetails')
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(200)
        expect(response.text).toBe('updateTheLead')
        expect(response.serverError).toBeFalsy()

    })
})
