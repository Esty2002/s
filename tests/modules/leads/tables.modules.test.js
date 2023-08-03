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
        }),
        getData: jest.fn((url) => {
            if (url) {
                if (!url.includes('undefined')) {
                    if (url.includes('1=1')) {
                        return { status: 200, data: [{ url }] };
                    }
                    else {
                        return { status: 200, data: [{ url }, { condition: url.slice(url.lastIndexOf('/') + 1, url.length) }] };
                    }
                }
                else {
                    return { status: 500, message: "not exist entityName undefined" };
                }
            }
            else {
                throw new Error("url is not defined");
            }
        })
    }
});

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

const { newRecord, values, getRecord } = require('../../../modules/leads/tables');

describe("Check functions in 'values' object Orderers", () => {
    it('Should function return an object to new Orderer', async () => {
        const spy = jest.spyOn(values.find(({ entityName }) => entityName === 'Orderers'), 'func');
        const result = values.find(({ entityName }) => entityName === 'Orderers').func({ name: "Test", phone: "0504789654" });
        expect(spy).toHaveBeenCalled();
        expect(result.entityName).toBe("Orderers");
        expect(result.values).toBeInstanceOf(Object);
        expect(result.values.OrdererName).toBe("Test");
    });

    it('Should function throw error if its not recived anything', async () => {
        let result;
        const spy = jest.spyOn(values.find(({ entityName }) => entityName === 'Orderers'), 'func');
        try {
            result = values.find(({ entityName }) => entityName === 'Orderers').func();
        }
        catch (error) {
            expect(spy).toHaveBeenCalled();
            expect(error).toBeDefined()
            expect(result).not.toBeDefined();
            expect(error).toBeInstanceOf(Error);

        }
    });

    it('Should function not throw error if its recived an empty object', async () => {
        const spy = jest.spyOn(values.find(({ entityName }) => entityName === 'Orderers'), 'func');
        const result = values.find(({ entityName }) => entityName === 'Orderers').func({});
        expect(spy).toHaveBeenCalled();
        expect(result.entityName).toBe("Orderers");
        expect(result.values).toBeInstanceOf(Object);
        expect(result.values.OrdererName).toBeNull();
        expect(result.values.OrdererPhone).toBeNull();
    });
});

describe('Check function in values object PouringsTypes', () => {
    it('Should return an object to new PouringType', async () => {
        const spy = jest.spyOn(values.find(({ entityName }) => entityName === 'PouringsTypes'), 'func');
        const result = values.find(({ entityName }) => entityName === 'PouringsTypes').func({ name: "Pouring" });
        expect(spy).toHaveBeenCalled();
        expect(result.entityName).toBe("PouringsTypes");
        expect(result.values).toBeInstanceOf(Object);
        expect(result.values.PouringName).toBe("Pouring");
    });
    it('Should function throw error if its not recived anything', async () => {
        let result;
        const spy = jest.spyOn(values.find(({ entityName }) => entityName === 'PouringsTypes'), 'func');
        try {
            result = values.find(({ entityName }) => entityName === 'PouringsTypes').func();
        }
        catch (error) {
            expect(spy).toHaveBeenCalled();
            expect(error).toBeDefined();
            expect(result).not.toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Cannot read properties of undefined (reading 'name')");

        };
    });
    it('Should function not throw error if its recived an empty object', async () => {
        const spy = jest.spyOn(values.find(({ entityName }) => entityName === 'PouringsTypes'), 'func');
        result = values.find(({ entityName }) => entityName === 'PouringsTypes').func({});
        expect(spy).toHaveBeenCalled();
        expect(result.entityName).toBe("PouringsTypes");
        expect(result.values).toBeInstanceOf(Object);
        expect(result.values.PouringName).toBeNull();
    });


});

describe('Check function in values object StatusesLead', () => {
    it('Should function return an object to new PouringType', async () => {
        const spy = jest.spyOn(values.find(({ entityName }) => entityName === 'StatusesLead'), 'func');
        const result = values.find(({ entityName }) => entityName === 'StatusesLead').func({ name: "status" });
        expect(spy).toHaveBeenCalled();
        expect(result.entityName).toBe("StatusesLead");
        expect(result.values).toBeInstanceOf(Object);
        expect(result.values.StatusName).toBe("status");
    });
    it('Should function throw error if its not recived anything', async () => {
        let result;
        const spy = jest.spyOn(values.find(({ entityName }) => entityName === 'StatusesLead'), 'func');
        try {
            result = values.find(({ entityName }) => entityName === 'StatusesLead').func();
        }
        catch (error) {
            expect(spy).toHaveBeenCalled();
            expect(error).toBeDefined();
            expect(result).not.toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Cannot read properties of undefined (reading 'name')");

        };
    });
    it('Should function not throw error if its recived an empty object', async () => {
        const spy = jest.spyOn(values.find(({ entityName }) => entityName === 'StatusesLead'), 'func');
        result = values.find(({ entityName }) => entityName === 'StatusesLead').func({});
        expect(spy).toHaveBeenCalled();
        expect(result.entityName).toBe("StatusesLead");
        expect(result.values).toBeInstanceOf(Object);
        expect(result.values.StatusName).toBeNull();
    });
})

describe('Check function newRecord', () => {
    it('Should the fucntion create new Record if the data is exists', async () => {
        const result = await newRecord(
            {
                entityName: "Orderers",
                values: {
                    name: "Test", phone: "0504178963"
                }
            });
        expect(result).toBeDefined();
        expect(result.status).toBe(201);
        expect(result).toBeInstanceOf(Object);
        expect(result.data).toBeInstanceOf(Array);
        expect(result.data.length).toBe(1);
        expect(result.data[0]).toStrictEqual({ Id: 1 });
        const { postData } = jest.requireMock('../../../services/axios');
        expect(postData).toHaveBeenCalled();

    });

    it('Should the function create new record if the data correct', async () => {
        const result = await newRecord({
            entityName: "StatusesLead",
            values: {
                name: "ממתין"
            }
        });
    })
})
describe('check function updateRecord', () => {
    it('check that the functin return "the object is correct" when the obj is defined', async () => {
        const result = await updateRecord({ entityName: "pouringsTypes", update: { PouringName: "גדר" }, condition: "SerialNumber=1" });
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Object);
        expect(result.status).toBe(201);
        expect(result.data).toBeInstanceOf(Array);
        expect(result.data.length).toBe(1);
        expect(result.data[0].Id).toBe(1);
        const { checkObjectValidations } = jest.requireMock('../../../services/validations/use-validations');
        expect(checkObjectValidations).toHaveBeenCalled();
    });

    it('Should the function return the entity name is not exist if that it', async () => {
        it('check that the function return Error when the obj not correct', async () => {
            let result;
            try {
                result = await newRecord({
                    entityName: "balblabal",
                    values: {
                        name: "balbla"
                    }
                });
            }
            catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(Error);
                expect(result).not.toBeDefined();
                expect(error.message).toBe(`the entity name: balblabal not exist`)
            }


        });

        it('Should the fucnton throw an error if its not recived anything', async () => {
            expect(result).not.toBeDefined();
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("the obj.entityName or obj.values or obj.condition are not correct");
        }
        );

        it('check that the function return the object is null when the obj not defined', async () => {
            let result;
            try {
                result = await newRecord();
            }
            catch (error) {
                expect(result).not.toBeDefined();
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(Error);
                expect(result).not.toBeDefined();
                expect(error.message).toBe("the object is null");
            }

        });

        it('check that the function require the mock postData', async () => {
            const { postData } = jest.requireMock('../../../services/axios');
            const result = await updateRecord({ entityName: "statusesLead", update: { OrdererPhone: "0504175184" }, condition: "OrdererPhone='0504178963'" });

            expect(result).toBeDefined();
            expect(result).toBeTruthy();
            expect(result).not.toBeNull();
            expect(postData).toHaveBeenCalled();
        });

    });

    describe('Check function getRecord', () => {
        it('Should function get the record when the entity name is correct', async () => {
            const result = await getRecord('StatusesLead', "none");
            expect(result).toBeDefined()
        })
        it('Should function throw error if the entity name not correct', async () => {
            let result;
            try {
                result = await getRecord('blablabla', "none");
            }
            catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(Object);
                expect(result).not.toBeDefined();
                expect(error.message.length).toBe(36);
                expect(error.message).toBe("the entity name: blablabla not exist")
            }})
    })
})
describe('check function deleteRecord', () => {
    it('check that the function return "object is not defined" when all obj.set is defined', async () => {
        const result = await deleteRecord({ entityName: "orderers", condition: "OrdererName='מיכל'" });
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Object);
        expect(result.status).toBe(200);
        expect(result.data[0]).toStrictEqual({ url: '/read/readAll/StatusesLead/1=1' });
    });

    it('Should function get the record with conditions', async () => {
        const result = await getRecord('PouringsTypes', "PouringName='יסודות'");
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Object);
        expect(result.status).toBe(200);
        expect(result.data[1]).toStrictEqual({ condition: "PouringName='יסודות'" })
    });


    it('check that the function require the mock getData', async () => {
        const { postData } = jest.requireMock('../../../services/axios');
        const result = await deleteRecord({ entityName: "statusesLead", condition: "StatusName='גדר'" });
        expect(result).toBeDefined();
        expect(result).toBe("the object is correct");
        expect(result.length).toBe(21);
        expect(result).not.toBeNull();
        expect(postData).toHaveBeenCalled();

    })

    it('check that the function return "object is not defined" when the obj.set not defined', async () => {
        let result;
        try {
            result = await deleteRecord("dfjhakdf");
        }
        catch (error) {
            expect(result).not.toBeDefined();
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("the obj.entityName or obj.values or obj.condition are not correct");
        }
    });

    it('check that the function return "object is not defined" when the obj.set not defined', async () => {
        let result;
        try {
            result = await deleteRecord();
        }
        catch (error) {
            expect(result).not.toBeDefined();
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("the object is null");
        }
    });
});

