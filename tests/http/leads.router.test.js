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
            return [{ "phone": "0583286577", "supplyAddress": "chisda" }, { "phone": "5555555555", "supplyAddress": "sss" }];
        })
    }

})

jest.mock('../../modules/leads/orderers', () => {
    return {
        newOrderer: jest.fn((tablename) => {
            return 'test';
        }),
        getOrderers: jest.fn(() => {
            return { tablename: "test" };
        }),
        getOrdererByPhone: jest.fn(({ phone }) => {
            if(phone){
                return phone;
            }
            return false
        }),
        updateOrderer: jest.fn((obj) => {
            if (obj) {
                return true;
            }
            return false;
        }),
        deleteOrderer: jest.fn((obj) => {
            if (obj) {
                return true;
            }
            return false;
        })
    }
})

jest.mock('../../modules/leads/pouring-types', () => {
    return {
        newPouringType: jest.fn((obj = null) => {
            return 'insertType';
        }),
        getPouringTypes: jest.fn(() => {
            return "success"
        }),
        updatePouringType: jest.fn((obj) => {
            return obj.set;
        }),
        deletePouringType: jest.fn((obj) => {
            if (obj) {
                return obj;
            }
            return null;
        }),




    }
})

jest.mock('../../modules/leads/status-leads', () => {
    return {
        newLeadStatus: jest.fn((obj = null) => {
            return 'insert';
        }),
        getStatusesLead: jest.fn(() => {
            return ["name", "name", "name"];
        }),
        updateStatus: jest.fn((obj) => {
            if (obj.set)
                return obj.set;
            return null;
        }),
        deleteStatus: jest.fn(({ serialNum }) => {
            if (serialNum) {
                return true;
            }
            return false;
        })

    }
})

describe('getleadsdetails', () => {
    it('should get all the leads datails', async () => {
        const response = await request(app).post('/leads/getleadsdetails', {});
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response.notFound).toBeFalsy();
        expect(response.text).toBe("[{\"phone\":\"0583286577\",\"supplyAddress\":\"chisda\"},{\"phone\":\"5555555555\",\"supplyAddress\":\"sss\"}]");
    })
    it('should call allLeadsdetails', async () => {
        const { allLeadsDetails } = jest.requireMock('../../modules/leads/leads-options');
        const response = await request(app).post('/leads/getleadsdetails');
        expect(allLeadsDetails).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);

    })
});

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
        const { getPouringTypes } = jest.requireMock('../../modules/leads/pouring-types');
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
        expect(response.text).toBe('{\"tablename\":\"test\"}');
    })
    it('should the function return statusCode 404 if the params is exist', async () => {
        const response = await request(app).get('/leads/getorderers/0504178546');
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(404);
        expect(response.serverError).toBeFalsy();
        expect(response.notFound).toBeTruthy();
    })
    it('the function should call to getOrderers', async () => {
        const { getOrderers } = jest.requireMock('../../modules/leads/orderers')
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
        const { getOrdererByPhone } = jest.requireMock('../../modules/leads/orderers')
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
    })


})

// describe('/newstatus', () => {

//     it('should the function create new status by the obj that recived', async () => {
//         const response = await request(app).post('/leads/newstatus', { "name": "test" })
//         expect(response).toBeTruthy();
//         expect(response.statusCode).toBe(200);
//         expect(response.serverError).toBeFalsy();
//     })

//     it('should call newLeadStatus', async () => {
//         const { newLeadStatus } = jest.requireMock('../../modules/leads/more-tables')
//         const response = await request(app).post('/leads/newstatus', { "name": "test" })
//         expect(newLeadStatus).toHaveBeenCalled()
//         expect(response).toBeDefined()
//         expect(response.text).toBe('insert');
//     })
//     it('should the request good without parmeters sended ', async () => {
//         const response = await request(app).post('/leads/newstatus');
//         expect(response).toBeDefined();
//         expect(response.text).toBe('insert');
//         expect(response.statusCode).toBe(200);
//         expect(response.serverError).toBeFalsy();
//     })

// })

// describe('/updatestatus', () => {

//     it('should the function update the status name by the obj that recived', async () => {
//         const response = await request(app).post('/leads/updatestatus', { "serialNumber": 1, "name": "test" })
//         expect(response).toBeTruthy();
//         expect(response.statusCode).toBe(200);
//         expect(response.serverError).toBeFalsy();
//     })

//     it('should call updateStatus', async () => {
//         const { updateTable } = jest.requireMock('../../modules/leads/more-tables')
//         const response = await request(app).post('/leads/updatestatus', { "serialNumber": 1, "name": "test" })
//         expect(updateTable).toHaveBeenCalled()
//         expect(response).toBeDefined()
//         expect(response.text).toBe('update');
//     })
//     it('should the request good without parmeters sended ', async () => {
//         const response = await request(app).post('/leads/updatestatus');
//         expect(response).toBeDefined();
//         expect(response.text).toBe('update');
//         expect(response.statusCode).toBe(200);
//         expect(response.serverError).toBeFalsy();
//     })

// })
// // deleteorderer
// describe('/deleteorderer', () => {

//     it('should the function update the status ', async () => {
//         const response = await request(app).post('/leads/deleteorderer', 1);
//         expect(response).toBeTruthy();
//         expect(response.statusCode).toBe(200);
//         expect(response.serverError).toBeFalsy();
//     })

//     it('should call deleteFromTable', async () => {
//         const { deleteFromTable } = jest.requireMock('../../modules/leads/more-tables');
//         const response = await request(app).post('/leads/deleteorderer', 1);
//         expect(deleteFromTable).toHaveBeenCalled();
//         expect(response).toBeDefined();
//         expect(response.text).toBe('delete');
//     })
//     it('should the request good without parmeters sended ', async () => {
//         const response = await request(app).post('/leads/deleteorderer');
//         expect(response).toBeDefined();
//         expect(response.text).toBe('delete');
//         expect(response.statusCode).toBe(200);
//         expect(response.serverError).toBeFalsy();
//     })

// })


// describe('/deletepouringtype', () => {

//     it('should the function update the status ', async () => {
//         const response = await request(app).post('/leads/deletepouringtype', 1);
//         expect(response).toBeTruthy();
//         expect(response.statusCode).toBe(200);
//         expect(response.serverError).toBeFalsy();
//     })

//     it('should call deleteFromTable', async () => {
//         const { deleteFromTable } = jest.requireMock('../../modules/leads/more-tables');
//         const response = await request(app).post('/leads/deletepouringtype', 1);
//         expect(deleteFromTable).toHaveBeenCalled();
//         expect(response).toBeDefined();
//         expect(response.text).toBe('delete');
//     })
//     it('should the request good without parmeters sended ', async () => {
//         const response = await request(app).post('/leads/deletepouringtype');
//         expect(response).toBeDefined();
//         expect(response.text).toBe('delete');
//         expect(response.statusCode).toBe(200);
//         expect(response.serverError).toBeFalsy();
//     })

// })

// describe('/deletestatus', () => {

//     it('should the function update the status ', async () => {
//         const response = await request(app).post('/leads/deletestatus', 1)
//         expect(response).toBeTruthy();
//         expect(response.statusCode).toBe(200);
//         expect(response.serverError).toBeFalsy();
//     })

//     it('should call deleteFromTable', async () => {
//         const { deleteFromTable } = jest.requireMock('../../modules/leads/more-tables')
//         const response = await request(app).post('/leads/deletestatus', 1)
//         expect(deleteFromTable).toHaveBeenCalled()
//         expect(response).toBeDefined()
//         expect(response.text).toBe('delete');
//     })
//     it('should the request good without parmeters sended ', async () => {
//         const response = await request(app).post('/leads/deletestatus');
//         expect(response).toBeDefined();
//         expect(response.text).toBe('delete');
//         expect(response.statusCode).toBe(200);
//         expect(response.serverError).toBeFalsy();
//     })

// })

// describe('/deletelead', () => {
//     it('the function will change the lead to disable=true and insert the deletingDate by sending the serialNumber of the lead', async () => {
//         const responseCreate = await request(app).post('/leads/createnewlead', { name: 'aaa', phone: '088776765' })
//         const responseDelete = await request(app).post('/leads/deletelead', { serialNumber: responseCreate.text })
//         expect(responseDelete).toBeDefined();
//         expect(responseDelete.statusCode).toBe(200);
//         expect(responseDelete.text).toBe('updateTheLead');
//     })
//     it('the function should not fail when not recieved the serialNumber of the lead', async () => {
//         const response = await request(app).post('/leads/deletelead');
//         expect(response.headers['content-type']).toBe('text/html; charset=utf-8');
//         expect(response).toBeDefined();
//         expect(response.statusCode).toBe(200);
//         expect(response.serverError).toBeFalsy();
//         expect(response.text).toBe('updateTheLead')
//     })
// })
// describe('/updatepouringtype', () => {

//     it('should the function update the status name by the obj that recived', async () => {
//         const response = await request(app).post('/leads/updatepouringtype', { "serialNumber": 1, "name": "test" })
//         expect(response).toBeTruthy();
//         expect(response.statusCode).toBe(200);
//         expect(response.serverError).toBeFalsy();
//     })


// })


// describe('/updateorderer', () => {

//     it('should the function update the status name by the obj that recived', async () => {
//         const response = await request(app).post('/leads/updateorderer', { "serialNumber": 1, "name": "test" })
//         expect(response).toBeTruthy();
//         expect(response.statusCode).toBe(200);
//         expect(response.serverError).toBeFalsy();
//     })

//     it('should call updateStatus', async () => {
//         const { updateTable } = jest.requireMock('../../modules/leads/more-tables')
//         const response = await request(app).post('/leads/updateorderer', { "serialNumber": 1, "name": "test" })
//         expect(updateTable).toHaveBeenCalled()
//         expect(response).toBeDefined()
//         expect(response.text).toBe('update');
//     })
//     it('should the request good without parmeters sended ', async () => {
//         const response = await request(app).post('/leads/updateorderer');
//         expect(response).toBeDefined();
//         expect(response.text).toBe('update');
//         expect(response.statusCode).toBe(200);
//         expect(response.serverError).toBeFalsy();
//     })

// })









// describe('/createnewlead', () => {

//     it('should create a new lead with the details wich are givven', async () => {
//         const response = await request(app).post('/leads/createnewlead', { "name": "test" })
//         expect(response).toBeTruthy();
//         expect(response.statusCode).toBe(200);
//         expect(response.serverError).toBeFalsy();
//     })

//     it('should call createNewLead', async () => {
//         const { createNewLead } = jest.requireMock('../../modules/leads/leads-options')
//         const response = await request(app).post('/leads/createnewlead', { "name": "test" })
//         expect(createNewLead).toHaveBeenCalled()
//         expect(response).toBeDefined()
//         expect(response.text).toBe('123456');
//     })
//     it('should the request good without parmeters sended ', async () => {
//         const response = await request(app).post('/leads/createnewlead');
//         expect(response).toBeDefined();
//         expect(response.text).toBe('123456');
//         expect(response.statusCode).toBe(200);
//         expect(response.serverError).toBeFalsy();


//     })

// })
// describe('check the function /neworderer', () => {
//     it("should return that the function come to the path", async () => {
//         const response = await request(app).post('/leads/neworderer', { name: "test", phone: "0527645487" });
//         expect(response).toBeDefined();
//         expect(response.statusCode).toBe(200);
//         expect(response.serverError).toBeFalsy();
//         expect(response.text).toBe('insert');

//     })
//     it("should return that the function come to the path even the arguments not recived", async () => {
//         const response = await request(app).post('/leads/neworderer');
//         expect(response).toBeDefined();
//         expect(response.statusCode).toBe(200);
//         expect(response.serverError).toBeFalsy();
//         expect(response.text).toBe('insert');
//     })
//     it("should return that the function come to the path even the arguments not recived", async () => {
//         const response = await request(app).post('/leads/neworderer', { name: "test" });
//         expect(response).toBeDefined();
//         expect(response.statusCode).toBe(200);
//         expect(response.serverError).toBeFalsy();
//         expect(response.text).toBe('insert');
//     })
// })
// describe('check function newpouringtype', () => {
//     it('should return the function insert if the arguments is exist ', async () => {
//         const response = await request(app).post('/leads/newpouringtype', { name: "byton" });
//         expect(response).toBeDefined();
//         expect(response.statusCode).toBe(200)
//         expect(response.serverError).toBeFalsy()
//         expect(response.text).toBe('insertType');

//     })

//     it('should return the function insert if the arguments is not exist ', async () => {
//         const response = await request(app).post('/leads/newpouringtype');
//         expect(response).toBeDefined();
//         expect(response.statusCode).toBe(200)
//         expect(response.serverError).toBeFalsy()
//         expect(response.text).toBe('insertType');

//     })

//     it('should return the function insert if the arguments is not empty ', async () => {
//         const response = await request(app).post('/leads/newpouringtype', {});
//         expect(response).toBeDefined();
//         expect(response.statusCode).toBe(200)
//         expect(response.serverError).toBeFalsy()
//         expect(response.text).toBe('insertType');

//     })
// })

// describe('check function updeatLead', () => {
//     it('should the function updeteOne update if it get arguments', async () => {
//         const response = await request(app).post('/leads/updateleadsdetails', { name: "test", serialNumber: '333' });
//         expect(response).toBeDefined()
//         expect(response.statusCode).toBe(200)
//         expect(response.text).toBe('updateTheLead')

//     })

//     it('should the function dont faill if the arguments is empty', async () => {
//         const response = await request(app).post('/leads/updateleadsdetails', {})
//         expect(response).toBeDefined()
//         expect(response.statusCode).toBe(200)
//         expect(response.text).toBe('updateTheLead')
//         expect(response.serverError).toBeFalsy()

//     })

//     it('should the function dont faill if the arguments isnt exist', async () => {
//         const response = await request(app).post('/leads/updateleadsdetails')
//         expect(response).toBeDefined()
//         expect(response.statusCode).toBe(200)
//         expect(response.text).toBe('updateTheLead')
//         expect(response.serverError).toBeFalsy()

//     })
// })

// describe('/updatestatuslead', () => {
//     it('the function should not fail if the object is empty', async () => {
//         const response = await request(app).post('/leads/updatestatuslead');
//         expect(response.headers['content-type']).toBe('text/html; charset=utf-8');
//         expect(response).toBeDefined();
//         expect(response.statusCode).toBe(200);
//         expect(response.serverError).toBeFalsy();
//         expect(response.text).toBe('updateTheLead')
//     })
//     it('the function should update the status of the lead by sending the serialNumber of the lead and the other status', async () => {
//         const response = await request(app).post('/leads/updatestatuslead', { serialNumber: 111, status: 'ממתין' });
//         expect(response).toBeDefined();
//         expect(response.statusCode).toBe(200);
//         expect(response.text).toBe('updateTheLead');
//     })
// })

