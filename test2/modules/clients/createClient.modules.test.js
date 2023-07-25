jest.mock('../../../services/axios', () => {
    return {
        postData: jest.fn((url, obj) => {
            if (url.includes('create')) {
                if (obj.values['Name'] != 'error') {
                    let data = {
                        rowsAffected: ['true from create']
                    }
                    return { data };
                }
                if (obj.values['Name'] == 'error') {
                    let data = { undefined }
                    return { data };
                }
            }
            throw new Error('there is no mathcing object')
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

const { data } = require('browserslist');
const { addOneClient } = require('../../../modules/clients/createClient');
describe('add one client to dbServer', () => {
    it('should return a good answer for good request', async () => {
        const response = await addOneClient({ name: "moshe" }, "Clients")
        expect(response).toBeDefined()
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    })

    it('should return an error-message if entity name not  found', async () => {
        let response
        try {
            response = await addOneClient({ Name: 'error' }, "Clients")
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('there is no mathcing object')
            expect(response).not.toBeDefined();
            expect(error).toBeDefined();
        }
    })
    it('should return an error-message if entity name not  found', async () => {
        let response
        try {
            response = await addOneClient({ Name: 'moshe' })
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(response).not.toBeDefined();
            expect(error).toBeDefined();
        }
    })
    it('should execute logToFile,checkObjectValidations,postData once', async () => {
        const { logToFile } = jest.requireMock('../../../services/logger/logTxt');
        const { checkObjectValidations } = jest.requireMock('../../../services/validations/use-validations');
        const { postData } = jest.requireMock('../../../services/axios');
        expect(logToFile).toHaveBeenCalled();
        expect(checkObjectValidations).toHaveBeenCalled();
        expect(postData).toHaveBeenCalled();
    })
})

