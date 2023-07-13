// let {postData}= require('../../../services/axios')
jest.mock('../../../services/logger/logTxt', () => {
    return {
        logToFile: jest.fn((obj) => {
            let a = obj
        }),
    }
});

jest.mock('../../../services/validations/use-validations', () => {
    return {
        checkObjectValidations: jest.fn((obj) => {
            return true
        }),
    }
});

jest.mock('../../../services/axios', () => {
    return {
        postData: jest.fn((obj, b) => {
            if (b.values.Measure == 'error')
                throw new Error ('oooh')
            return { data: [{ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }] }
        }),
    }
});


const { insertMeasure } = require('../../../modules/products/measure');

describe('function insertMeasure', () => {
    it('shuols success inserting a measure', async () => {
        const result = await insertMeasure("Name", "UnitOfMeasure");
        expect(result).toBe(true)
        expect(result).toBeDefined()
    })
    it('shuols fail inserting a measure', async () => {
        let result = ''
        try {
            result = await insertMeasure();
        }
        catch (error) {
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(result).toBe('');
        }
    })
    it('shuols check the mock logToFile', async () => {
        _ = await insertMeasure("Name", "UnitOfMeasure");
        const { logToFile } = jest.requireMock('../../../services/logger/logTxt');
        expect(logToFile).toHaveBeenCalled()
        expect(logToFile).toBeDefined()
    })
    
    it('shuols check the mock checkObjectValidations', async () => {
        _ = await insertMeasure("Name", "UnitOfMeasure");
        const { checkObjectValidations } = jest.requireMock('../../../services/validations/use-validations');
        expect(checkObjectValidations).toHaveBeenCalled()
        expect(checkObjectValidations).toBeDefined()
    })

    it('shuols check the mock postData', async () => {
        _ = await insertMeasure("Name", "UnitOfMeasure");
        const { postData } = jest.requireMock('../../../services/axios');
        expect(postData).toHaveBeenCalled()
        expect(postData).toBeDefined()
    })
    
    it('shuols fail to post data', async () => {
        let result = ''
        try {
            result = await insertMeasure("error", "UnitOfMeasure");
        }
        catch (error) {
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('oooh');
            expect(result).toBe('');
        }
    })
})
