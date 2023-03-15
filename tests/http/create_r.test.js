const { default: expect } = require('expect')
const { response } = require('express')
const request = require('supertest')
const { app } = require('../../app')
jest.mock('../../modules/leads/mongo/create_m', () => {
    return {
        createNewLead: jest.fn((obj) => {
            return '123456'
        }),
        updateLead: jest.fn((obj) => {
            return 'updateTheLead'
        }),
        AllLeadsDetails: jest.fn(() => {
            return [{ phone: '0583286577', supplyAddress: 'chisda' }, { phone: '5555555555', supplyAddress: 'sss' }]
        })

    }

})
jest.mock('../../modules/leads/mongo_and_sql/mongo_and_sql', () => {
    return {
        getDataSynchronised: jest.fn((sql, mongo) => {
            return [{ name: 'sari', phone: '0583286577', supplyAddress: 'chisda' }, { name: 'ccc', phone: '5555555555', supplyAddress: 'sss' }]
        }),

    }

})
jest.mock('../../modules/leads/sql/create_sql', () => {
    return {
        selectAllTable: jest.fn((tablename) => {
            return 'test'
        }),
        selectRecordByPhoneNumber: jest.fn((phone, tablename) => {
            if (phone === undefined) {
                return ({ tablename: "test" })
            }
            if (tablename === undefined) {
                return ({ phone: '0583288477' })

            }

            return ({ phone: '0583288477', tablename: 'test' })



        }),
        newOrderer: jest.fn((obj = null) => {
            return 'insert'
        }),
        newPouringType: jest.fn((obj = null) => {
            return 'insertType'
        }),
        nameAndphone: jest.fn(() => {
            return ([{ name: "sari", phone: "0583286577" }, { name: "ccc", phone: "5555555555" }])
        })


    }
})
describe('/deletelead', () => {
    it('the function will change the lead to disable=true and insert the deletingDate by sending the serialNumber of the lead', async () => {
        const responseCreate = await request(app).post('/leads/createnewlead', { name: 'aaa', phone: '088776765' })
        const responseDelete = await request(app).post('/leads/deletelead', { serialNumber: responseCreate.text })
        expect(responseDelete).toBeDefined();
        expect(responseDelete.statusCode).toBe(200);
        expect(responseDelete.text).toBe('updateTheLead');
    })
    it('the function should not fail when not recieved the serialNumber of the lead', async () => {
        const response = await request(app).post('/leads/deletelead');
        expect(response.headers['content-type']).toBe('text/html; charset=utf-8');
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response.text).toBe('updateTheLead')
    })
})

describe('/updatestatuslead', () => {
    it('the function should not fail if the object is empty', async () => {
        const response = await request(app).post('/leads/updatestatuslead');
        expect(response.headers['content-type']).toBe('text/html; charset=utf-8');
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response.text).toBe('updateTheLead')
    })
    it('the function should update the status of the lead by sending the serialNumber of the lead and the other status', async () => {
        const response = await request(app).post('/leads/updatestatuslead', { serialNumber: 111, status: 'ממתין' });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('updateTheLead');
    })
})

describe('/getstatuseslead', () => {
    it('the function should get all the status leads details', async () => {
        const response = await request(app).get('/leads/getstatuseslead');
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })
    it('the function should call to selectAllTable', async () => {
        const { selectAllTable } = jest.requireMock('../../modules/leads/sql/create_sql')
        const response = await request(app).get('/leads/getAllLeadsDatails')
        expect(selectAllTable).toHaveBeenCalled()
        expect(response).toBeDefined()
    })
})

describe('getAllLeadsDatails', () => {
    it('should get all the leads datails', async () => {
        const response = await request(app).get('/leads/getAllLeadsDatails');
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })

    it('should call nameAndphone', async () => {
        const { nameAndphone } = jest.requireMock('../../modules/leads/sql/create_sql')
        const response = await request(app).get('/leads/getAllLeadsDatails')
        expect(nameAndphone).toHaveBeenCalled()
        expect(response).toBeDefined()
        // expect(nameAndphone.text).toBe('[{"name":"sari","phone":"0583286577"},{"name":"ccc","phone":"5555555555"}]');
    })

    it('should call AllLeadsDetails', async () => {
        const { AllLeadsDetails } = jest.requireMock('../../modules/leads/mongo/create_m')
        const response = await request(app).get('/leads/getAllLeadsDatails')
        expect(AllLeadsDetails).toHaveBeenCalled()
        expect(response).toBeDefined()
        // expect(nameAndphone.text).toBe('[{"name":"sari","phone":"0583286577"},{"name":"ccc","phone":"5555555555"}]');
    })

    it('should call  getDataSynchronised', async () => {
        const { getDataSynchronised } = jest.requireMock('../../modules/leads/mongo_and_sql/mongo_and_sql')
        const response = await request(app).get('/leads/getAllLeadsDatails')
        expect(getDataSynchronised).toHaveBeenCalled()
        expect(response).toBeDefined()
        expect(response.text).toBe('[{"name":"sari","phone":"0583286577","supplyAddress":"chisda"},{"name":"ccc","phone":"5555555555","supplyAddress":"sss"}]');
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
        // console.log(response,"respnse");
        expect(response).toBeDefined();
        expect(response.text).toBe('test');
        expect(response.statusCode).toBe(200);

        expect(response.serverError).toBeFalsy();
    })
})


describe('/getRowAccordingToPhone', () => {
    it('should getRowAccordingToPhone whith the deteils wich are givven', async () => {
        const response = await request(app).get('/leads/getRowAccordingToPhone?name=test?phone=0583286477')
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();

    })

    it('should the request successful without sends the deteils', async () => {
        const response = await request(app).get('/leads/getRowAccordingToPhone')
        expect(response).toBeDefined();
        expect(response.text).toBe('{"result":{"tablename":"test"}}');
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })
    it('should the request successful only whith the name ', async () => {
        const response = await request(app).get('/leads/getRowAccordingToPhone?name=test')

        expect(response).toBeDefined();
        expect(response.text).toBe('{"result":{"tablename":"test"}}');
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response).toBeTruthy();
    })
    it('should the request successful only whith the phone ', async () => {
        const response = await request(app).get('/leads/getRowAccordingToPhone?phone=0583288477')

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
        const { createNewLead } = jest.requireMock('../../modules/leads/mongo/create_m.js')
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
        const response = await request(app).post('/leads/updateLeadsDetails', { name: "test", serialNumber: '333' });
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(200)
        expect(response.text).toBe('updateTheLead')

    })

    it('should the function dont faill if the arguments is empty', async () => {
        const response = await request(app).post('/leads/updateLeadsDetails', {})
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(200)
        expect(response.text).toBe('updateTheLead')
        expect(response.serverError).toBeFalsy()

    })

    it('should the function dont faill if the arguments isnt exist', async () => {
        const response = await request(app).post('/leads/updateLeadsDetails')
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(200)
        expect(response.text).toBe('updateTheLead')
        expect(response.serverError).toBeFalsy()

    })
})
