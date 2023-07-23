
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
                throw new Error('no matching unit of measure')
            return { data: [{ "Id": 1 }] }
        }),
        findMeasureName: jest.fn((obj) => {
            if (obj == "error")
                throw new Error('no matching unit of measure')
            return { data: [{ "measure": "mmm" }] }
        }),
    }
});
jest.mock('../../../services/axios', () => {
    return {
        postData: jest.fn((obj, b) => {
            if (b.condition == "Name='error'")
                return { data: [{ Name: "Name", UnitOfMeasure: "error", BookkeepingCode: "BookkeepingCode" }], status: 201 }
            return { data: [{ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }], status: 201 }
        }),
    }
});


const { insertPump, findPump } = require('../../../modules/products/pumps');


describe('function insertPump', () => {
    it('shuols success inserting a pump', async () => {
        const result = await insertPump({ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }, "Pumps");
        expect(result).toStrictEqual({ data: [{ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }], status: 201 })
        expect(result).toBeDefined()
    })
    it('shuols fail inserting a pump', async () => {
        let result = ''
        try {
            result = await insertPump();
        }
        catch (error) {
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(result).toBe('');
        }
    })

    it('shuols check the mock logToFile', async () => {
        _ = await insertPump({ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }, "Pumps");
        const { logToFile } = jest.requireMock('../../../services/logger/logTxt');
        expect(logToFile).toHaveBeenCalled()
        expect(logToFile).toBeDefined()
    })

    it('shuols check the mock checkObjectValidations', async () => {
        _ = await insertPump({ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }, "Pumps");
        const { checkObjectValidations } = jest.requireMock('../../../services/validations/use-validations');
        expect(checkObjectValidations).toHaveBeenCalled()
        expect(checkObjectValidations).toBeDefined()
    })
    it('shuols fail to findMeasureNumber', async () => {
        try {
            const result = await insertPump({ Name: "Name", UnitOfMeasure: "error", BookkeepingCode: "BookkeepingCode" }, "Pumps");
        }
        catch (error) {
            expect(error.message).toBe('no matching unit of measure')
            expect(error).toBeInstanceOf(Error)
            expect(error).toBeDefined()
        }
    })
    it('shuols success to findMeasureNumber', async () => {
        const result = await insertPump({ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }, "Pumps");
        const { findMeasureNumber } = jest.requireMock('../../../modules/products/measure');
        expect(findMeasureNumber).toHaveBeenCalled()
        expect(findMeasureNumber).toBeDefined()
    })
    it('shuols check the mock postData', async () => {
        _ = await insertPump({ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }, "Pumps");
        const { postData } = jest.requireMock('../../../services/axios');
        expect(postData).toHaveBeenCalled()
        expect(postData).toBeDefined()
    })
})
describe('function findAddition', () => {
    it('shuols success finding a pump', async () => {
        const result = await findPump([], { Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }, "Pumps");
        expect(result.data).toStrictEqual([{ BookkeepingCode: "BookkeepingCode", UnitOfMeasure: "mmm", Name: "Name" }])
        expect(result).toBeDefined()
    })
    it('shuols fail finding a pump', async () => {
        let result = ''
        try {
            result = await findPump();
        }
        catch (error) {
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(result).toBe('');
        }
    })

    it('shuols check the mock logToFile', async () => {
        _ = await findPump([], { Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }, "Pumps");
        const { logToFile } = jest.requireMock('../../../services/logger/logTxt');
        expect(logToFile).toHaveBeenCalled()
        expect(logToFile).toBeDefined()
    })

    it('shuols fail to findMeasureName', async () => {
        try {
            const result = await findPump([], { Name: "error", UnitOfMeasure: "error", BookkeepingCode: "error" }, "Pumps");
        }
        catch (error) {
            expect(error.message).toBe('no matching unit of measure')
            expect(error).toBeInstanceOf(Error)
            expect(error).toBeDefined()
        }
    })

    it('shuols success to findMeasureName', async () => {
        const result = await findPump([], { Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }, "Pumps");
        const { findMeasureName } = jest.requireMock('../../../modules/products/measure');
        expect(findMeasureName).toHaveBeenCalled()
        expect(findMeasureName).toBeDefined()
    })

    it('shuols check the mock postData', async () => {
        _ = await findPump([], { Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }, "Pumps");
        const { postData } = jest.requireMock('../../../services/axios');
        expect(postData).toHaveBeenCalled()
        expect(postData).toBeDefined()
    })

})