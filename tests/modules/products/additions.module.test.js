
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
            console.log({ obj });
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
            console.log(obj,b,'in axios   vfg');
            if (b.condition=="Name='error'")
                return { data: [{ Name: "Name", UnitOfMeasure: "error", BookkeepingCode: "BookkeepingCode" }] }
            return { data: [{ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }] }
        }),
    }
});


const { insertAddition, findAddition } = require('../../../modules/products/additions');
describe('function findAddition', () => {
    it('shuols success finding an addition', async () => {
        const result = await findAddition([],{ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" });
        expect(result).toStrictEqual([{BookkeepingCode: "BookkeepingCode", UnitOfMeasure: "mmm" ,Name: "Name"}] )
        expect(result).toBeDefined()
    })
    it('shuols fail finding an addition', async () => {
        let result =''
        try {
            result = await findAddition();
        }
        catch (error) {
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(result).toBe('');
        }
    })

    it('shuols check the mock logToFile', async () => {
        _ = await findAddition([],{ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" });
        const { logToFile } = jest.requireMock('../../../services/logger/logTxt');
        expect(logToFile).toHaveBeenCalled()
        expect(logToFile).toBeDefined()
    })

    it('shuols fail to findMeasureName', async () => {
        const result = await findAddition([],{ Name: "error", UnitOfMeasure: "error", BookkeepingCode: "error" });
        const { findMeasureName } = jest.requireMock('../../../modules/products/measure');
        expect(findMeasureName).toHaveBeenCalled()
        expect(findMeasureName).toBeDefined()
        expect(result).toBe('no matching unit of measure')
    })
    
    it('shuols success to findMeasureName', async () => {
        const result = await findAddition([],{ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" });
        const { findMeasureName } = jest.requireMock('../../../modules/products/measure');
        expect(findMeasureName).toHaveBeenCalled()
        expect(findMeasureName).toBeDefined()
    })

    it('shuols check the mock postData', async () => {
        _ = await findAddition([],{ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" });
        const { postData } = jest.requireMock('../../../services/axios');
        expect(postData).toHaveBeenCalled()
        expect(postData).toBeDefined()
    })

})

describe('function insertAddition', () => {
    it('shuols success inserting an addition', async () => {
        const result = await insertAddition({ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }, "Additions");
        expect(result).toBe(true)
        expect(result).toBeDefined()
    })
    it('shuols fail inserting an addition', async () => {
        let result =''
        try {
            result = await insertAddition();
        }
        catch (error) {
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(result).toBe('');
        }
    })

    it('shuols check the mock logToFile', async () => {
        _ = await insertAddition({ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }, "Additions");
        const { logToFile } = jest.requireMock('../../../services/logger/logTxt');
        expect(logToFile).toHaveBeenCalled()
        expect(logToFile).toBeDefined()
    })

    it('shuols check the mock checkObjectValidations', async () => {
        _ = await insertAddition({ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }, "Additions");
        const { checkObjectValidations } = jest.requireMock('../../../services/validations/use-validations');
        expect(checkObjectValidations).toHaveBeenCalled()
        expect(checkObjectValidations).toBeDefined()
    })
    it('shuols fail to findMeasureNumber', async () => {
        const result = await insertAddition({ Name: "Name", UnitOfMeasure: "error", BookkeepingCode: "BookkeepingCode" }, "Additions");
        const { findMeasureNumber } = jest.requireMock('../../../modules/products/measure');
        expect(findMeasureNumber).toHaveBeenCalled()
        expect(findMeasureNumber).toBeDefined()
        expect(result).toBe('no matching unit of measure')
    })
    it('shuols success to findMeasureNumber', async () => {
        const result = await insertAddition({ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }, "Additions");
        const { findMeasureNumber } = jest.requireMock('../../../modules/products/measure');
        expect(findMeasureNumber).toHaveBeenCalled()
        expect(findMeasureNumber).toBeDefined()
    })
    it('shuols check the mock postData', async () => {
        _ = await insertAddition({ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }, "Additions");
        const { postData } = jest.requireMock('../../../services/axios');
        expect(postData).toHaveBeenCalled()
        expect(postData).toBeDefined()
    })
})
