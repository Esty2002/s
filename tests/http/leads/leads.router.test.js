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

jest.mock('../../../modules/leads/orderers', () => {
    return {
        newOrderer: jest.fn(({ name, phone }) => {
            if (name && phone) {
                return 'insert'
            }
            else {
                throw new Error("the name or phone are not defined");
            }
        }),
        getOrderers: jest.fn(() => {
            return { entityName: "test" };
        }),
        getOrdererByPhone: jest.fn(({ phone }) => {
            if (phone) {
                return phone;
            }
            return false
        }),
        updateOrderer: jest.fn(({ set, phone }) => {
            if (set && phone) {
                return true;
            }
            else {
                throw new Error('the serial number or set are not defined');
            }
        }),
        deleteOrderer: jest.fn(({ phone }) => {
            if (phone) {
                return true;
            }
            else {
                throw new Error("the serialNumber is not defined");
            }
        })
    }
})

jest.mock('../../../modules/leads/pouring-types', () => {
    return {
        newPouringType: jest.fn(({ name }) => {
            if (name)
                return 'insertType';
            else
                throw new Error("the name of pouring type is not defined");
        }),
        getPouringTypes: jest.fn(() => {

            return "success"
        }),
        updatePouringType: jest.fn(({ set, serialNumber }) => {
            if (set && serialNumber) {
                return true;
            }
            else {
                throw new Error("the set or the serialNumber are not defined");
            }
        }),
        deletePouringType: jest.fn(({ serialNumber }) => {
            if (serialNumber) {
                return serialNumber;
            }
            else {
                throw new Error("the serialNumber is not defined");
            }
        }),

    }
})

jest.mock('../../../modules/leads/status-leads', () => {
    return {
        newLeadStatus: jest.fn(({ name }) => {
            if (name)
                return 'insert';
            else {
                throw new Error("the serialNumber is not defined");
            }
        }),
        getStatusesLead: jest.fn(() => {
            return ["name", "name", "name"];
        }),
        updateStatus: jest.fn(({ set, serialNumber }) => {
            if (set && serialNumber)
                return 'update';
            else {
                throw new Error('the set or serialNumber are not defined');
            }
        }),
        deleteStatus: jest.fn(({ serialNumber }) => {
            if (serialNumber) {
                return true;
            }
            throw new Error("the serialNumber is not defined");
        })

    }
})



describe('/getpouringtypes', () => {
    it('should the function is correct and return "success"', async () => {
        const response = await request(app).get('/leads/getpouringtypes');
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response.notFound).toBeFalsy();
        expect(response.text).toBe("success");
    })
    it('shuld the function return 404 status code when try to send params', async () => {
        const response = await request(app).get('/leads/getpouringtypes/name');
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.serverError).toBeFalsy();
        expect(response.notFound).toBeTruthy();
    })
    it('the function should call to getPouringTypes', async () => {
        const { getPouringTypes } = jest.requireMock('../../../modules/leads/pouring-types');
        const response = await request(app).get('/leads/getpouringtypes');
        expect(getPouringTypes).toHaveBeenCalled();
        expect(response).toBeDefined();
    })
})
describe('/getorderers', () => {
    it('should the function return', async () => {
        const response = await request(app).get('/leads/getorderers');
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response.notFound).toBeFalsy();
        expect(response.text).toBe('{\"entityName\":\"test\"}');
    })
    it('should the function return statusCode 404 if the params is exist', async () => {
        const response = await request(app).get('/leads/getorderers/0504178546');
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(404);
        expect(response.serverError).toBeFalsy();
        expect(response.notFound).toBeTruthy();
    })
    it('the function should call to getOrderers', async () => {
        const { getOrderers } = jest.requireMock('../../../modules/leads/orderers')
        const response = await request(app).get('/leads/getorderers')
        expect(getOrderers).toHaveBeenCalled()
        expect(response).toBeDefined()
    })
});

describe('check function /getordererbyphone', () => {
    it('should the function return the phone if it exsist', async () => {
        const response = await request(app).get('/leads/getordererbyphone/0533159687')
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response.text).toBe("{\"response\":\"0533159687\"}")

    })

    it('should the request return 404 statusCode if the params not exist', async () => {
        const response = await request(app).get('/leads/getordererbyphone')
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.notFound).toBeTruthy();
        expect(response.serverError).toBeFalsy();
    })

    it('should the function call to getOrdererByPhone', async () => {
        const { getOrdererByPhone } = jest.requireMock('../../../modules/leads/orderers')
        const response = await request(app).get('/leads/getordererbyphone/0504175111')
        expect(getOrdererByPhone).toHaveBeenCalled();
        expect(response).toBeDefined();
    })

})
describe('/getstatuseslead', () => {
    it('the function should get all the status leads details', async () => {
        const response = await request(app).get('/leads/getstatuseslead');
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response.text).toBe("[\"name\",\"name\",\"name\"]");
    })
    it('the function should call to getStatusesLead', async () => {
        const { getStatusesLead } = jest.requireMock('../../../modules/leads/status-leads')
        const response = await request(app).get('/leads/getorderers')
        expect(getStatusesLead).toHaveBeenCalled();
        expect(response).toBeDefined();
    })

})
describe('check function /deletepouringtype', () => {
    it('should the request good without parmeters sended ', async () => {
        const response = await request(app).post('/leads/deletepouringtype').send({serialNumber:"1"})
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    })
    
    it('should call deleteFromTable', async () => {
        const { deletePouringType } = jest.requireMock('../../../modules/leads/pouring-types');
        const response = await request(app).post('/leads/deletepouringtype').send({ serialNumber: 1 });
        expect(deletePouringType).toHaveBeenCalled();
        expect(response).toBeDefined();
    })
    it('should the request good without parmeters sended ', async () => {
        const response = await request(app).post('/leads/deletepouringtype');
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.notFound).toBeTruthy();
        expect(response.serverError).toBeFalsy();
    })

})
describe('check function /deleteorderer', () => {

    it('should the function update the status ', async () => {
        const response = await request(app).post('/leads/deleteorderer').send({ phone: 1 })
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })

    it('should call deleteOrderer', async () => {
        const { deleteOrderer } = jest.requireMock('../../../modules/leads/orderers');
        const response = await request(app).post('/leads/deleteorderer').send({ phone: 1 })
        expect(deleteOrderer).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response.text).toBe('true');
    })
    it('should the request return Error  without parmeters sended ', async () => {
        const response = await request(app).post('/leads/deleteorderer');
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.serverError).toBeFalsy();
    })

})

describe('/createnewlead', () => {

    it('should create a new lead with the details wich are givven', async () => {
        const response = await request(app).post('/leads/createnewlead').send({ "name": "test" });
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })

    it('should call createNewLead', async () => {
        const { createNewLead } = jest.requireMock('../../../modules/leads/leads-options')
        const response = await request(app).post('/leads/createnewlead').send({ "name": "test" });
        expect(createNewLead).toHaveBeenCalled()
        expect(response).toBeDefined()
        expect(response.text).toBe('123456');
    })
    it('should the request good without parmeters sended ', async () => {
        const response = await request(app).post('/leads/createnewlead');
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.serverError).toBeFalsy();


    })
})

describe('check the function /neworderer', () => {
    it("should return that the function come to the path", async () => {
        const response = await request(app).post('/leads/neworderer').send({ name: "test", phone: "0527645487" });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response.text).toBe('insert');

    })
    it("should return that the function come to the path even the arguments not recived", async () => {
        const response = await request(app).post('/leads/neworderer');
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.serverError).toBeFalsy();
    })
    it('should call newOrderer', async () => {
        const { newOrderer } = jest.requireMock('../../../modules/leads/orderers');
        const response = await request(app).post('/leads/neworderer').send({ name: "someone", phone: 1 })
        expect(newOrderer).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response.text).toBe('insert');
    })
})

describe('check function newpouringtype', () => {
    it('should return the function insert if the arguments is exist ', async () => {
        const response = await request(app).post('/leads/newpouringtype').send({ name: "buyton" });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200)
        expect(response.serverError).toBeFalsy()
        expect(response.text).toBe('insertType');

    })

    it('should return the function insert if the arguments is not exist ', async () => {
        const response = await request(app).post('/leads/newpouringtype');
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404)
        expect(response.serverError).toBeFalsy()

    })
    it('should call newPouringType', async () => {
        const { newPouringType } = jest.requireMock('../../../modules/leads/pouring-types');
        const response = await request(app).post('/leads/newpouringtype').send({ name: "someone" })
        expect(newPouringType).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response.text).toBe('insertType');
    })


})

describe('check function getleadsdetails', () => {
    it('should get all the leads datails', async () => {
        const response = await request(app).post('/leads/getleadsdetails').send({ filter: "test" });

        expect(response).toBeDefined();
        expect(response.status).toBe(201);
        expect(response.serverError).toBeFalsy();
        expect(response.notFound).toBeFalsy();
        expect(response.text).toBe("[{\"phone\":\"0583286577\",\"supplyAddress\":\"chisda\"},{\"phone\":\"5555555555\",\"supplyAddress\":\"sss\"}]");
    })
    it('should call allLeadsdetails', async () => {
        const { allLeadsDetails } = jest.requireMock('../../../modules/leads/leads-options');
        const response = await request(app).post('/leads/getleadsdetails').send({ filter: "test" });
        expect(allLeadsDetails).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);

    })
    it('should the function return statusCode 404 and error if the body is null ', async () => {
        const response = await request(app).post('/leads/getleadsdetails');
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
    })
});

describe('/updatepouringtype', () => {

    it('should the function update the status name by the obj that recived', async () => {
        const response = await request(app).post('/leads/updatepouringtype').send({ "serialNumber": 1, "set": "test" });
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response.text).toBe('true');

    })
    it('should the function update the status name by the obj that recived', async () => {
        const response = await request(app).post('/leads/updatepouringtype')
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(404);
        expect(response.serverError).toBeFalsy();
        expect(response.notFound).toBeTruthy();


    })
    it('should call updatePouringType', async () => {
        const { updatePouringType } = jest.requireMock('../../../modules/leads/pouring-types');
        const response = await request(app).post('/leads/updatePouringType').send({ set: "someone" })
        expect(updatePouringType).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);

    })



})
describe('/updateorderer', () => {

    it('should the function update the status name by the obj that recived', async () => {
        const response = await request(app).post('/leads/updateorderer').send({ "phone": 1, "set": "test" });
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response.notFound).toBeFalsy();
    })

    it('should call updateOrderer', async () => {
        const { updateOrderer } = jest.requireMock('../../../modules/leads/orderers')
        const response = await request(app).post('/leads/updateorderer').send({ "phone": 1, "set": "test" })
        expect(updateOrderer).toHaveBeenCalled()
        expect(response).toBeDefined()
        expect(response.text).toBe('true');
    })
    it('should the request good without parmeters sended ', async () => {
        const response = await request(app).post('/leads/updateorderer');
        expect(response).toBeDefined();
        expect(response.status).toBe(201);
        expect(response.serverError).toBeFalsy();
        expect(response.notFound).toBeTruthy();

    })

})
describe('check function updeatLead', () => {
    it('should the function updeteOne update if it get arguments', async () => {
        const response = await request(app).post('/leads/updateleadsdetails').send({ serialNumber: 5 });
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(200)
        expect(response.text).toBe('updateTheLead')

    })

    it('should the function dont faill if the arguments is empty', async () => {
        const response = await request(app).post('/leads/updateleadsdetails')
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(404)
        expect(response.serverError).toBeFalsy()

    })
    it('should call updateLead', async () => {
        const { updateLead } = jest.requireMock('../../../modules/leads/leads-options')
        const response = await request(app).post('/leads/updateleadsdetails').send({ serialNumber: 5 })
        expect(updateLead).toHaveBeenCalled()
        expect(response).toBeDefined()
        expect(response.text).toBe('updateTheLead');
    })


})

describe('/updatestatuslead', () => {
    it('the function should not fail if the object is empty', async () => {
        const response = await request(app).post('/leads/updatestatuslead');
        expect(response.headers['content-type']).toBe("application/json; charset=utf-8");
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.serverError).toBeFalsy();
        expect(response.notFound).toBeTruthy()
    })
    it('the function should update the status of the lead by sending the serialNumber of the lead and the other status', async () => {
        const response = await request(app).post('/leads/updatestatuslead').send({ serialNumber: 111, status: 'ממתין' });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('updateTheLead');
    })
    it('should call updateLead', async () => {
        const { updateLead } = jest.requireMock('../../../modules/leads/leads-options')
        const response = await request(app).post('/leads/updatestatuslead').send({ serialNumber: 5 })
        expect(updateLead).toHaveBeenCalled()
        expect(response).toBeDefined()
        expect(response.text).toBe('updateTheLead');
    })
})
describe('/deletelead', () => {
    it('the function will change the lead to disable=true and insert the deletingDate by sending the serialNumber of the lead', async () => {
        const response = await request(app).post('/leads/deletelead').send({ serialNumber: 1 })
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('updateTheLead');
    })
    it('the function should not fail when not recieved the serialNumber of the lead', async () => {
        const response = await request(app).post('/leads/deletelead');
        expect(response.headers['content-type']).toBe("application/json; charset=utf-8");
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.serverError).toBeFalsy();
    })
    it('should call updateLead', async () => {
        const { updateLead } = jest.requireMock('../../../modules/leads/leads-options')
        const response = await request(app).post('/leads/deletelead').send({ serialNumber: 5 })
        expect(updateLead).toHaveBeenCalled()
        expect(response).toBeDefined()
        expect(response.text).toBe('updateTheLead');
    })
})

describe('/newstatus', () => {

    it('should the function create new status by the obj that recived', async () => {
        const response = await request(app).post('/leads/newstatus').send({ "name": "test" });
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })

    it('should call newLeadStatus', async () => {
        const { newLeadStatus } = jest.requireMock('../../../modules/leads/status-leads')
        const response = await request(app).post('/leads/newstatus').send({ "name": "test" });
        expect(newLeadStatus).toHaveBeenCalled()
        expect(response).toBeDefined()
        expect(response.text).toBe('insert');
    })
    it('should the request good without parmeters sended ', async () => {
        const response = await request(app).post('/leads/newstatus');
        expect(response).toBeDefined();

        expect(response.statusCode).toBe(404);
        expect(response.serverError).toBeFalsy();
    })

})
describe('/deletestatus', () => {

    it('should the function update the status ', async () => {
        const response = await request(app).post('/leads/deletestatus').send({ serialNumber: 1 })
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response.text).toBe('true');
        expect(response.notFound).toBeFalsy();


    })

    it('should call deleteFromTable', async () => {
        const { deleteStatus } = jest.requireMock('../../../modules/leads/status-leads')
        const response = await request(app).post('/leads/deletestatus').send({ serialNumber: 1 })
        expect(deleteStatus).toHaveBeenCalled()
        expect(response).toBeDefined()
        expect(response.text).toBe('true');
    })
    it('should the request good without parmeters sended ', async () => {
        const response = await request(app).post('/leads/deletestatus');
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.serverError).toBeFalsy();
        expect(response.notFound).toBeTruthy();
    })

})
describe('/updatestatus', () => {

    it('should the function update the status name by the obj that recived', async () => {
        const response = await request(app).post('/leads/updatestatus').send({ "serialNumber": 1, "set": "test" });
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response.notFound).toBeFalsy();
        expect(response.text).toBe('update');


    })

    it('should call updateStatus', async () => {
        const { updateStatus } = jest.requireMock('../../../modules/leads/status-leads')
        const response = await request(app).post('/leads/updatestatus').send({ "serialNumber": 1, "set": "test" });
        expect(updateStatus).toHaveBeenCalled()
        expect(response).toBeDefined()
        expect(response.text).toBe('update');
    })
    it('should the request good without parmeters sended ', async () => {
        const response = await request(app).post('/leads/updatestatus')
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.serverError).toBeFalsy();
        expect(response.notFound).toBeTruthy();

    })

})















