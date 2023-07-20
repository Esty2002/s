jest.mock('../../../services/axios', () => {
    return {
        postData: jest.fn((url, obj) => {
            if (url.includes('create') || url.includes('update')) {
                if (obj.values['Name'] != 'error') {
                    let data = {
                        rowsAffected: ['true from create']
                    }
                    return { data };
                }
            }
            if (url.includes('read') && (obj.columns && obj.tableName)) {
                return { data: 'true from read' }
            }
            throw new Error('there is no mathcing object')
        }),
        getData: jest.fn((obj) => {
            if (obj.name != 'error') {
                let data =[true]
                return { data }
            }

            throw new Error('there is no table name')

        })
    }
})

jest.mock('../../../services/logger/logTxt', () => {
    return {
        logToFile: jest.fn((obj) => {
            if (obj.name && obj.description) {
                return true
            }
            throw new Error('you didnt send all the must fields')
        })
    }
})

jest.mock('../../../services/validations/use-validations', () => {
    return {
        checkObjectValidations: jest.fn((values, entity) => {
            if (values && entity)
                return true
            throw new Error('you didnt send all the must fields')
        })
    }
})

const { insert, getProducts, updateField, getId, getIdForBuytonDescribe,getNumber } = require('../../../modules/pricelist/insertPricelist');
describe('insert an object to the db', () => {
    it('should return a good answer for good request', async () => {
        const response = await insert({ name: "pricelist1", price: 8999 }, "PriceList")
        expect(response).toBeDefined()
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    })

    it('should return an error-message if entity name not  found', async () => {
        let response
        try {
            response = await insert({ Name: 'error' }, 'PriceList')
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('there is no mathcing object')
            expect(response).not.toBeDefined();
            expect(error).toBeDefined();
        }
    })

    it('should execute logToFile,checkObjectValidations,postData once', async () => {
        const { logToFile } = jest.requireMock('../../../services/logger/logTxt')
        const { checkObjectValidations } = jest.requireMock('../../../services/validations/use-validations')
        const { postData } = jest.requireMock('../../../services/axios')
        const response = await insert({ name: "pricelist1", price: 8999 }, 'PriceList')
        expect(response).toBeDefined()
        expect(logToFile).toHaveBeenCalled()
        expect(checkObjectValidations).toHaveBeenCalled()
        expect(postData).toHaveBeenCalled()
    })
})

describe('get details of table name', () => {
    it('should return details for the sended table name', async () => {
        const response = await getProducts("PriceList");
        expect(response).toBeDefined();
        expect(response.data).toBe('true from read');
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    })

    it('should execute logToFile,checkObjectValidations,postData once', async () => {
        const { logToFile } = jest.requireMock('../../../services/logger/logTxt');
        const { checkObjectValidations } = jest.requireMock('../../../services/validations/use-validations');
        const { postData } = jest.requireMock('../../../services/axios');
        const response = await getProducts("PriceList");
        expect(response).toBeDefined();
        expect(response.data).toBe('true from read');
        expect(logToFile).toHaveBeenCalled();
        expect(checkObjectValidations).toHaveBeenCalled();
        expect(postData).toHaveBeenCalled();
    })

    it('should return error if you didnt send an entity name', async () => {
        let response;
        try {
            response = await getProducts();
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('there is no mathcing object')
            expect(response).not.toBeDefined();
            expect(error).toBeDefined();
        }
    })
})

describe('should update field in the db', () => {
    it('should return a good answer for good request ', async () => {
        const response = await updateField(563, "PriceList", { name: "pl3", price: 70000 });
        expect(response).toBeDefined();
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    })

    it('should execute logToFile,checkObjectValidations,postData once', async () => {
        const { logToFile } = jest.requireMock('../../../services/logger/logTxt');
        const { checkObjectValidations } = jest.requireMock('../../../services/validations/use-validations');
        const { postData } = jest.requireMock('../../../services/axios');
        const response = await getProducts("PriceList");
        expect(response).toBeDefined();
        expect(response.data).toBe('true from read');
        expect(logToFile).toHaveBeenCalled();
        expect(checkObjectValidations).toHaveBeenCalled();
        expect(postData).toHaveBeenCalled();
    })

    it('should return error for non good request', async () => {
        let response;
        try {
            response = await updateField(563, 'PriceList', { name: 'error' })
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('there is no mathcing object');
            expect(response).not.toBeDefined();
            expect(error).toBeDefined();
        }
    })
})

describe('should return an id for price list name', () => {
    it('should return a good answer for good request ', async () => {
        const response = await getId("pl1", 'PriceList')
        expect(response).toBeDefined();
        expect(response.data[0]).toBe(true);
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    })

    it('should execute logToFile,checkObjectValidations,postData once', async () => {
        const { logToFile } = jest.requireMock('../../../services/logger/logTxt');
        const { checkObjectValidations } = jest.requireMock('../../../services/validations/use-validations');
        const { postData } = jest.requireMock('../../../services/axios');
        const response = await getId("pl1", 'PriceList')
        expect(response).toBeDefined();
        expect(response.data[0]).toBe(true);
        expect(logToFile).toHaveBeenCalled();
        expect(checkObjectValidations).toHaveBeenCalled();
        expect(postData).toHaveBeenCalled();
    })

    it('should return error if you didnt send an entity name', async () => {
        let response;
        const { postData } = jest.requireMock('../../../services/axios');
        try {
            response = await getId({name:'error'})
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(response).not.toBeDefined();
            expect(postData).toHaveBeenCalled();
            expect(error).toBeDefined();
        }
    })
})

describe('should return id for Buyton describe', () => {
    it('should return a good answer for good request ', async () => {
        const response = await getIdForBuytonDescribe("פוליה", 'BuytonGrain');
        expect(response).toBeDefined();
        expect(response.data[0]).toBe(true);
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    })

    it('should execute logToFile,checkObjectValidations,postData once', async () => {
        const { logToFile } = jest.requireMock('../../../services/logger/logTxt');
        const { checkObjectValidations } = jest.requireMock('../../../services/validations/use-validations');
        const { postData } = jest.requireMock('../../../services/axios');
        const response = await getIdForBuytonDescribe("פוליה", 'BuytonGrain');
        expect(response).toBeDefined();
        expect(response.data[0]).toBe(true);
        expect(logToFile).toHaveBeenCalled();
        expect(checkObjectValidations).toHaveBeenCalled();
        expect(postData).toHaveBeenCalled();
    })

    it('should return error if you didnt send an entity name', async () => {
        let response;
        const { postData } = jest.requireMock('../../../services/axios');
        try {
            response = await getIdForBuytonDescribe({ name: 'error' });
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(response).not.toBeDefined();
            expect(postData).toHaveBeenCalled();
            expect(error).toBeDefined();
        }
    })
})


describe('should return id for Buyton describe', () => {
    it('should return a good answer for good request ', async () => {
        const response = await getNumber({data:[{GrainCode:'54df',GrainDescribe:'פוליה',GrainNumber:2}]},'BuytonGrain');
        expect(response).toBeDefined();
        expect(response).toBe("2");
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    })

    it('should return error if you didnt send an entity name', async () => {
        let response;
        const { postData } = jest.requireMock('../../../services/axios');
        try {
            response = await getNumber({ name: 'error' });
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(response).not.toBeDefined();
            expect(postData).toHaveBeenCalled();
            expect(error).toBeDefined();
        }
    })
})