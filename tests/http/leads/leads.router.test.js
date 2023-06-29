const request = require('supertest');
const { app } = require('../../../app');
jest.mock('../../../modules/leads/leads-options', () => {
    return {
        createNewLead: jest.fn((obj) => {
            if (obj.name && obj.phone)
                return true;
            else {
                throw new Error("the lead details are not correct");
            }
        }),
        updateLead: jest.fn((filter, obj) => {
            if (filter && obj)
                return 'update the lead';
            else
                throw new Error("the filter or obj are not defined")
        }),
        allLeadsDetails: jest.fn(({ filter, project }) => {
            if (filter && project)
                return "success!!";
            else {
                throw new Error("the body is not defined")

            }
        })

    }

})

jest.mock('../../../modules/leads/tables', () => {
    return {
        newRecord: jest.fn(({ tableName, values }) => {
            if (tableName ==='orderers'||tableName==='pouringsTypes'||tableName==='statusesLead' && typeof values ==='object') {
                return 'insert'
            }
            else {
                throw new Error("one or more arguments not correct");
            }
        }),
        getRecord: jest.fn((table, columns, condition) => {
            if (table ==='orderers'||table==='pouringsTypes'||table==='statusesLead' && columns && condition)
                return { tablename: "test" };
            else
                throw new Error("the params not correct")
        }),
       
        updateRecord: jest.fn(({ tableName,update, condition }) => {
            if (tableName ==='orderers'||tableName==='pouringsTypes'||tableName==='statusesLead' && typeof update==='object'&&typeof condition==='string') {
                return true;
            }
            else {
                throw new Error('one argument or more not correct');
            }
        }),
        deleteRecord: jest.fn(({ tableName, condition }) => {
            if (tableName ==='orderers'||tableName==='pouringsTypes'||tableName==='statusesLead'&&typeof condition==='string') {
                return "delete";
            }
            else {
                throw new Error("the serialNumber is not defined");
            }
        })
    }
})

describe('check request /createnewlead', () => {

    it('should create a new lead with the details wich are givven', async () => {
        const response = await request(app).post('/leads/createnewlead').send({ name: "ruty", phone: "0533130015" });
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })

    it('should call createNewLead', async () => {
        const { createNewLead } = jest.requireMock('../../../modules/leads/leads-options')
        const response = await request(app).post('/leads/createnewlead').send({ name: "test", phone: "050505050" });
        expect(createNewLead).toHaveBeenCalled()
        expect(response).toBeDefined()
        expect(response).toBeTruthy();
    })
    it('should the request good without parmeters sended ', async () => {
        const response = await request(app).post('/leads/createnewlead');
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.serverError).toBeFalsy();


    })
});

describe('check request /getleadsdetails', () => {
    it('should get all the leads datails', async () => {
        const response = await request(app).post('/leads/getleadsdetails').send({ filter: "test", project: "test" });

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response.notFound).toBeFalsy();
        expect(response.text).toBe("success!!");
    })
    it('should call allLeadsdetails', async () => {
        const { allLeadsDetails } = jest.requireMock('../../../modules/leads/leads-options');
        const response = await request(app).post('/leads/getleadsdetails').send({ filter: "test", project: "dfhjdf" });
        expect(allLeadsDetails).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);

    })
    it('should the function return statusCode 404 and error if the body is null ', async () => {
        const response = await request(app).post('/leads/getleadsdetails');
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response).toBeDefined();

    })
    it('should the function return statusCode 404 and error if the body is null ', async () => {
        const response = await request(app).post('/leads/getleadsdetails').send({ filter: "test" });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response).toBeDefined();

    })
});

describe('check request /updeatleadsdetails', () => {
    it('should the function updeteOne update if it get arguments', async () => {
        const response = await request(app).post('/leads/updateleadsdetails').send({ filter: 5, obj: "hello" });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('update the lead');

    });

    it('should the function dont faill if the arguments is empty', async () => {
        const response = await request(app).post('/leads/updateleadsdetails');
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.serverError).toBeFalsy();

    });

    it('should call updateLead', async () => {
        const { updateLead } = jest.requireMock('../../../modules/leads/leads-options');
        const response = await request(app).post('/leads/updateleadsdetails').send({ filter: 5, obj: "dfdf" });
        expect(updateLead).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response.text).toBe('update the lead');
    });

    it('should the function dont faill if the arguments is empty', async () => {
        const response = await request(app).post('/leads/updateleadsdetails').send("fjhsjf");
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.serverError).toBeFalsy();

    });

});

describe('check request /updatestatuslead', () => {
    it('the function should not fail if the object is empty', async () => {
        const response = await request(app).post('/leads/updatestatuslead');
        expect(response.headers['content-type']).toBe("application/json; charset=utf-8");
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.serverError).toBeFalsy();
        expect(response.notFound).toBeTruthy();

    });

    it('the function should update the status of the lead by sending the serialNumber of the lead and the other status', async () => {
        const response = await request(app).post('/leads/updatestatuslead').send({ filter: 111, obj: 'ממתין' });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('update the lead');

    });

    it('should call updateLead', async () => {
        const { updateLead } = jest.requireMock('../../../modules/leads/leads-options')
        const response = await request(app).post('/leads/updatestatuslead').send({ filter: 5, obj: "stam" });
        expect(updateLead).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response.text).toBe('update the lead');

    });

    it('should call updateLead', async () => {
        const { updateLead } = jest.requireMock('../../../modules/leads/leads-options')
        const response = await request(app).post('/leads/updatestatuslead').send({ filter: 5 });
        expect(updateLead).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.serverError).toBeFalsy();

    });
});

describe('check request /deletelead', () => {
    it('the function will change the lead to disable=true and insert the deletingDate by sending the serialNumber of the lead', async () => {
        const response = await request(app).post('/leads/deletelead').send({ filter: 1, obj: { deleting: true } })
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('update the lead');
    });

    it('the function should not fail when not recieved the serialNumber of the lead', async () => {
        const response = await request(app).post('/leads/deletelead');
        expect(response.headers['content-type']).toBe("application/json; charset=utf-8");
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.serverError).toBeFalsy();
    });

    it('should call updateLead', async () => {
        const { updateLead } = jest.requireMock('../../../modules/leads/leads-options')
        const response = await request(app).post('/leads/deletelead').send({ obj: 5 })
        expect(updateLead).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
    });

});

describe('check request /getrecord/:table/:columns/:field', () => {

    it('should the reques return correct answar if the parameters are correct', async () => {
        const response = await request(app).get('/leads/getrecord/orderers/OrdererName/none');
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response.notFound).toBeFalsy();
    });

    it('should call getOrderer', async () => {
        const { getRecord } = jest.requireMock('../../../modules/leads/tables');
        const response = await request(app).get("/leads/getrecord/statusesLead/StatusName/SerialNumber='some'");
        expect(getRecord).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response.text).toBe("{\"tablename\":\"test\"}");
    });

    it('should the request return status 404 without parmeters sended ', async () => {
        const response = await request(app).post('/leads/getrecord/sfj/sdfhj/dfkh');
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.serverError).toBeFalsy();
        expect(response.notFound).toBeTruthy();
    });

});

describe('check request /insertrecord', () => {
    it("should return a correct answer if the body is build correct", async () => {
        const response = await request(app).post('/leads/insertrecord').send({ tableName: "orderers", values:{"name":"test"} });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response.text).toBe('insert');
    });

    it("should return that the function come to the path even the arguments not recived", async () => {
        const response = await request(app).post('/leads/insertrecord');
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.serverError).toBeFalsy();
    });

    it('should call newRecord and if the arguments not correct the response status is 404', async () => {
        const { newRecord } = jest.requireMock('../../../modules/leads/tables');
        const response = await request(app).post('/leads/neworderer').send({ name: "someone", phone: 1 })
        expect(newRecord).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
    });

});

describe('check request /updaterecord', () => {

    it('should the request return 200 status if the arguments are correct', async () => {
        const response = await request(app).post('/leads/updaterecord').send({ tableName:"orderers",update:{t:"t"},condition:"dfj"});
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response.notFound).toBeFalsy();
    });

    it('should call updateStatus', async () => {
        const { updateRecord } = jest.requireMock('../../../modules/leads/tables');
        const response = await request(app).post('/leads/updaterecord').send({ tableName:"statusesLeads",update:{t:"t"},condition:"dfj"});
        expect(updateRecord).toHaveBeenCalled();
        expect(response).toBeDefined();
    });

    it('should the request return status 404 without parmeters sended ', async () => {
        const response = await request(app).post('/leads/updatrecord');
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.serverError).toBeFalsy();
        expect(response.notFound).toBeTruthy();

    });

    it('should the request return status 404 without corect parmeters sended ', async () => {
        const response = await request(app).post('/leads/updatrecord').send({ tableName:"statusesLeads",update:{t:"t"},condition:{}});
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.serverError).toBeFalsy();
        expect(response.notFound).toBeTruthy();

    });

});

describe('check request /deleterecord', () => {

    it('should the function update the status ', async () => {
        const response = await request(app).post('/leads/deleterecord').send({tableName:"pouringsTypes",condition:"dkfjdsf"});
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    });

    it('should call deleteOrderer', async () => {
        const { deleteRecord } = jest.requireMock('../../../modules/leads/tables');
        const response = await request(app).post('/leads/deleterecord').send({tableName:"statusesLead",condition:"dkfjdsf"});
        expect(deleteRecord).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response.text).toBe('delete');
    });

    it('should the request return Error  without parmeters sended ', async () => {
        const response = await request(app).post('/leads/deleteorderer');
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.serverError).toBeFalsy();
    });

    it('should the request return Error without correct parmeters sended ', async () => {
        const response = await request(app).post('/leads/deleterecord').send({tableName:"statusesLead",condition:{date:new Date()}});
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.serverError).toBeFalsy();
    });

});

















