
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
jest.mock('../../../modules/products/measure', () => {
    return {
        findMeasureNumber: jest.fn((obj) => {
            if (obj == "error")
                return { error: 'no matching unit of measure' }
            return 1
        }),
        findMeasureName: jest.fn((obj) => {
            if (obj == "error")
                return { error: 'no matching unit of measure' }
            return "mmm"
        }),
    }
});
jest.mock('../../../services/axios', () => {
    return {
        postData: jest.fn((obj,b) => {
            if (b.condition=="Name='error'")
                return { data: [{ Name: "Name", UnitOfMeasure: "error", BookkeepingCode: "BookkeepingCode" }], status: 201 }
            return { data: [{ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }], status: 201 }
        }),
    }
});


const { insertFinishProduct, findFinishProduct } = require('../../../modules/products/finishProducts');
describe('function findFinishProduct', () => {
    it('shuols success finding a finished product', async () => {
        const result = await findFinishProduct([],{ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" });
        expect(result.data).toStrictEqual([{BookkeepingCode: "BookkeepingCode", UnitOfMeasure: "mmm" ,Name: "Name"}] )
        expect(result).toBeDefined()
    })
    it('shuols fail finding a finished product', async () => {
        let result =''
        try {
            result = await findFinishProduct();
        }
        catch (error) {
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(result).toBe('');
        }
    })

    it('shuols check the mock logToFile', async () => {
        _ = await findFinishProduct([],{ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" });
        const { logToFile } = jest.requireMock('../../../services/logger/logTxt');
        expect(logToFile).toHaveBeenCalled()
        expect(logToFile).toBeDefined()
    })

    it('shuols fail to findMeasureName', async () => {
        try {
            const result = await findFinishProduct([],{ Name: "error", UnitOfMeasure: "error", BookkeepingCode: "error" });
        }
        catch (error) {
            expect(error.message).toBe('no matching unit of measure')
            expect(error).toBeInstanceOf(Error)
            expect(error).toBeDefined()
        }
    })
    
    it('shuols success to findMeasureName', async () => {
        const result = await findFinishProduct([],{ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" });
        const { findMeasureName } = jest.requireMock('../../../modules/products/measure');
        expect(findMeasureName).toHaveBeenCalled()
        expect(findMeasureName).toBeDefined()
    })

    it('shuols check the mock postData', async () => {
        _ = await findFinishProduct([],{ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" });
        const { postData } = jest.requireMock('../../../services/axios');
        expect(postData).toHaveBeenCalled()
        expect(postData).toBeDefined()
    })

})

describe('function insertFinishProduct', () => {
    it('shuols success inserting a finished product', async () => {
        const result = await insertFinishProduct({ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }, "FinishProducts");
        expect(result).toStrictEqual({ data: [{ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }] , status: 201})
        expect(result).toBeDefined()
    })
    it('shuols fail inserting a finished product', async () => {
        let result =''
        try {
            result = await insertFinishProduct();
        }
        catch (error) {
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(result).toBe('');
        }
    })

    it('shuols check the mock logToFile', async () => {
        _ = await insertFinishProduct({ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }, "FinishProducts");
        const { logToFile } = jest.requireMock('../../../services/logger/logTxt');
        expect(logToFile).toHaveBeenCalled()
        expect(logToFile).toBeDefined()
    })

    it('shuols check the mock checkObjectValidations', async () => {
        _ = await insertFinishProduct({ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }, "FinishProducts");
        const { checkObjectValidations } = jest.requireMock('../../../services/validations/use-validations');
        expect(checkObjectValidations).toHaveBeenCalled()
        expect(checkObjectValidations).toBeDefined()
    })
    it('shuols fail to findMeasureNumber', async () => {
        try {
            const result = await insertFinishProduct({ Name: "Name", UnitOfMeasure: "error", BookkeepingCode: "BookkeepingCode" }, "FinishProducts");
        }
        catch (error) {
            expect(error.message).toBe('no matching unit of measure')
            expect(error).toBeInstanceOf(Error)
            expect(error).toBeDefined()
        }
    })
    it('shuols success to insertFinishProduct', async () => {
        const result = await insertFinishProduct({ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }, "FinishProducts");
        const { findMeasureNumber } = jest.requireMock('../../../modules/products/measure');
        expect(findMeasureNumber).toHaveBeenCalled()
        expect(findMeasureNumber).toBeDefined()
    })
    it('shuols check the mock postData', async () => {
        _ = await insertFinishProduct({ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }, "FinishProducts");
        const { postData } = jest.requireMock('../../../services/axios');
        expect(postData).toHaveBeenCalled()
        expect(postData).toBeDefined()
    })
})
