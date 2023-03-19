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
            return 'test'
        }),
        selectRecordByPhoneNumber: jest.fn((phone, tablename) => {
            if (phone === undefined) {
                return ({ tablename: "test" });
            }
            if (tablename === undefined) {
                return ({ phone: '0583288477' });

            }

            return ({ phone: '0583288477', tablename: 'test' });
        }),
        newOrderer: jest.fn((obj = null) => {
            return 'insert';
        }),
        newPouringType: jest.fn((obj = null) => {
            return 'insertType';
        }),
        nameAndphone: jest.fn(() => {
            return ([{ name: "sari", phone: "0583286577" }, { name: "ccc", phone: "5555555555" }]);
        }),
        newLeadStatus: jest.fn((obj = null) => {
            return 'insert';
        }),
        deleteFromTable: jest.fn((tableName,serialNum) => {
            return 'delete';
        }),
        updateStatus: jest.fn((obj = null) => {
            return 'update';
        }),
        updateTable :jest.fn((obj=null)=>{
            return 'update';
        })
    }
})

describe('/newstatus', () => {

    it('should the function create new status by the obj that recived', async () => {
        const response = await request(app).post('/leads/newstatus', {"name": "test" })
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })

    it('should call newLeadStatus', async () => {
        const { newLeadStatus } = jest.requireMock('../../modules/leads/more-tables')
        const response = await request(app).post('/leads/newstatus', {"name": "test" })
        expect(newLeadStatus).toHaveBeenCalled()
        expect(response).toBeDefined()
        expect(response.text).toBe('insert');
    })
    it('should the request good without parmeters sended ', async () => {
        const response = await request(app).post('/leads/newstatus');
        expect(response).toBeDefined();
        expect(response.text).toBe('insert');
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })

})

describe('/updatestatus', () => {

    it('should the function update the status name by the obj that recived', async () => {
        const response = await request(app).post('/leads/updatestatus', {"serialNumber":1, "name": "test" })
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })

    it('should call updateStatus', async () => {
        const { updateTable } = jest.requireMock('../../modules/leads/more-tables')
        const response = await request(app).post('/leads/updatestatus', {"serialNumber":1, "name": "test" })
        expect(updateTable).toHaveBeenCalled()
        expect(response).toBeDefined()
        expect(response.text).toBe('update');
    })
    it('should the request good without parmeters sended ', async () => {
        const response = await request(app).post('/leads/updatestatus');
        expect(response).toBeDefined();
        expect(response.text).toBe('update');
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })

})
// deleteorderer
describe('/deleteorderer', () => {

    it('should the function update the status ', async () => {
        const response = await request(app).post('/leads/deleteorderer',1);
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })

    it('should call deleteFromTable', async () => {
        const { deleteFromTable } = jest.requireMock('../../modules/leads/more-tables');
        const response = await request(app).post('/leads/deleteorderer', 1);
        expect(deleteFromTable).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response.text).toBe('delete');
    })
    it('should the request good without parmeters sended ', async () => {
        const response = await request(app).post('/leads/deleteorderer');
        expect(response).toBeDefined();
        expect(response.text).toBe('delete');
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })

})


describe('/deletepouringtype', () => {

    it('should the function update the status ', async () => {
        const response = await request(app).post('/leads/deletepouringtype',1);
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })

    it('should call deleteFromTable', async () => {
        const { deleteFromTable } = jest.requireMock('../../modules/leads/more-tables');
        const response = await request(app).post('/leads/deletepouringtype', 1);
        expect(deleteFromTable).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response.text).toBe('delete');
    })
    it('should the request good without parmeters sended ', async () => {
        const response = await request(app).post('/leads/deletepouringtype');
        expect(response).toBeDefined();
        expect(response.text).toBe('delete');
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })

})

describe('/deletestatus', () => {

    it('should the function update the status ', async () => {
        const response = await request(app).post('/leads/deletestatus', 1)
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })

    it('should call deleteFromTable', async () => {
        const { deleteFromTable } = jest.requireMock('../../modules/leads/more-tables')
        const response = await request(app).post('/leads/deletestatus', 1)
        expect(deleteFromTable).toHaveBeenCalled()
        expect(response).toBeDefined()
        expect(response.text).toBe('delete');
    })
    it('should the request good without parmeters sended ', async () => {
        const response = await request(app).post('/leads/deletestatus');
        expect(response).toBeDefined();
        expect(response.text).toBe('delete');
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })

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
describe('/updatepouringtype', () => {

    it('should the function update the status name by the obj that recived', async () => {
        const response = await request(app).post('/leads/updatepouringtype', {"serialNumber":1, "name": "test" })
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })

    it('should call updateStatus', async () => {
        const { updateTable } = jest.requireMock('../../modules/leads/more-tables')
        const response = await request(app).post('/leads/updatepouringtype', {"serialNumber":1, "name": "test" })
        expect(updateTable).toHaveBeenCalled()
        expect(response).toBeDefined()
        expect(response.text).toBe('update');
    })
    it('should the request good without parmeters sended ', async () => {
        const response = await request(app).post('/leads/updatepouringtype');
        expect(response).toBeDefined();
        expect(response.text).toBe('update');
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
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

describe('/getpouringtypes', () => {
    it('the function should get all the status leads details', async () => {
        const response = await request(app).get('/leads/getpouringtypes');
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })
    it('the function should call to selectAllTable', async () => {
        const { selectAllTable } = jest.requireMock('../../modules/leads/more-tables')
        const response = await request(app).get('/leads/getpouringtypes')
        expect(selectAllTable).toHaveBeenCalled()
        expect(response).toBeDefined()
    })
})
describe('/updateorderer', () => {

    it('should the function update the status name by the obj that recived', async () => {
        const response = await request(app).post('/leads/updateorderer', {"serialNumber":1, "name": "test" })
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })

    it('should call updateStatus', async () => {
        const { updateTable } = jest.requireMock('../../modules/leads/more-tables')
        const response = await request(app).post('/leads/updateorderer', {"serialNumber":1, "name": "test" })
        expect(updateTable).toHaveBeenCalled()
        expect(response).toBeDefined()
        expect(response.text).toBe('update');
    })
    it('should the request good without parmeters sended ', async () => {
        const response = await request(app).post('/leads/updateorderer');
        expect(response).toBeDefined();
        expect(response.text).toBe('update');
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
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
        const { selectAllTable } = jest.requireMock('../../modules/leads/more-tables')
        const response = await request(app).get('/leads/getleadsdatails')
        expect(selectAllTable).toHaveBeenCalled()
        expect(response).toBeDefined()
    })
})

describe('/getorderers', () => {
    it('the function should get all the status leads details', async () => {
        const response = await request(app).get('/leads/getorderers');
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })
    it('the function should call to selectAllTable', async () => {
        const { selectAllTable } = jest.requireMock('../../modules/leads/more-tables')
        const response = await request(app).get('/leads/getorderers')
        expect(selectAllTable).toHaveBeenCalled()
        expect(response).toBeDefined()
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


describe('/getordererbyphone', () => {
    it('should getordererbyphone whith the deteils wich are givven', async () => {
        const response = await request(app).get('/leads/getordererbyphone?name=test?phone=0583286477')
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();

    })

    it('should the request successful without sends the deteils', async () => {
        const response = await request(app).get('/leads/getordererbyphone')
        expect(response).toBeDefined();
        expect(response.text).toBe('{"result":{"tablename":"test"}}');
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })
    it('should the request successful only whith the name ', async () => {
        const response = await request(app).get('/leads/getordererbyphone?name=test')

        expect(response).toBeDefined();
        expect(response.text).toBe('{"result":{"tablename":"test"}}');
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response).toBeTruthy();
    })
    it('should the request successful only whith the phone ', async () => {
        const response = await request(app).get('/leads/getordererbyphone?phone=0583288477')

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
