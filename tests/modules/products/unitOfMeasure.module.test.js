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
                throw new Error('oooh')
            return { data: [{ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }], status: 201 }
        }),
        getData: jest.fn((obj, b) => {
            console.log(obj, 'gffffff');
            let arr = obj.split('/')
            console.log(arr[arr.length - 1], 'aaaaarrrrr');
            if (arr[arr.length - 1] == 'Id=-1' || arr[arr.length-1]=="Measure='error'")
                return { data: [] }
            return { data: [{ Id: 1, Measure: "mmm", Disable: true }, { Id: 2, Measure: "aaa", Disable: false }], status: 200 }
        }),
    }
});


const { insertMeasure, getAll, findMeasureName ,findMeasureNumber} = require('../../../modules/products/measure');

describe('function insertMeasure', () => {
    it('shuols success inserting a measure', async () => {
        const result = await insertMeasure("Name", "UnitOfMeasure");
        expect(result).toStrictEqual({ data: [{ Name: "Name", UnitOfMeasure: "UnitOfMeasure", BookkeepingCode: "BookkeepingCode" }], status: 201 })
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

describe('function getAll', () => {
    it('shuols success finding all unit of measures', async () => {
        const result = await getAll();
        expect(result.data).toStrictEqual([{ Id: 1, Measure: "mmm", Disable: true }, { Id: 2, Measure: "aaa", Disable: false }])
        expect(result).toBeDefined()
    })

    // it('shuols fail finding all unit of measures', async () => {
    //     let result =''
    //     try {
    //         result = await getAll();
    //     }
    //     catch (error) {
    //         expect(error).toBeDefined();
    //         expect(error).toBeInstanceOf(Error);
    //         expect(result).toBe('');
    //     }
    // })

    it('shuols check the mock logToFile', async () => {
        _ = await getAll();
        const { logToFile } = jest.requireMock('../../../services/logger/logTxt');
        expect(logToFile).toHaveBeenCalled()
        expect(logToFile).toBeDefined()
    })

    it('shuols check the mock getData', async () => {
        _ = await getAll();
        const { getData } = jest.requireMock('../../../services/axios');
        expect(getData).toHaveBeenCalled()
        expect(getData).toBeDefined()
    })

})

describe('function findMeasureName', () => {
    it('shuols success finding measures name', async () => {
        const result = await findMeasureName(1);
        expect(result.data).toStrictEqual([{ Id: 1, Measure: "mmm", Disable: true }, { Id: 2, Measure: "aaa", Disable: false }])
        expect(result.data[0]).toBeDefined()
    })

    it('shuols fail finding measures name', async () => {
        let result = ''
        try {
            result = await findMeasureName(-1);
        }
        catch (error) {

            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('no matching unit of measure');
            expect(result).toBe('');
        }
    })
    it('shuols fail finding measures name', async () => {
        let result = ''
        try {
            result = await findMeasureName('validation error');
        }
        catch (error) {

            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('The id of the unit of measure is reuired with type int');
            expect(result).toBe('');
        }
    })

    it('shuols check the mock logToFile', async () => {
        _ = await findMeasureName(1);
        const { logToFile } = jest.requireMock('../../../services/logger/logTxt');
        expect(logToFile).toHaveBeenCalled()
        expect(logToFile).toBeDefined()
    })

    it('shuols check the mock getData', async () => {
        _ = await findMeasureName(1);
        const { getData } = jest.requireMock('../../../services/axios');
        expect(getData).toHaveBeenCalled()
        expect(getData).toBeDefined()
    })
})

describe('function findMeasureNumber', () => {
    it('shuols success finding measures number', async () => {
        const result = await findMeasureNumber("mmm");
        expect(result.data).toStrictEqual([{ Id: 1, Measure: "mmm", Disable: true }, { Id: 2, Measure: "aaa", Disable: false }])
        expect(result.data[0]).toBeDefined()
    })

    it('shuols fail finding measures number', async () => {
        let result = ''
        try {
            result = await findMeasureNumber("error");
        }
        catch (error) {
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('no matching unit of measure');
            expect(result).toBe('');
        }
    })
    it('shuols fail finding measures number', async () => {
        let result = ''
        try {
            result = await findMeasureNumber();
        }
        catch (error) {

            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('The name of the unit of measure is reuired');
            expect(result).toBe('');
        }
    })

    it('shuols check the mock logToFile', async () => {
        _ = await findMeasureNumber("mmm");
        const { logToFile } = jest.requireMock('../../../services/logger/logTxt');
        expect(logToFile).toHaveBeenCalled()
        expect(logToFile).toBeDefined()
    })

    it('shuols check the mock getData', async () => {
        _ = await findMeasureNumber("mmm");
        const { getData } = jest.requireMock('../../../services/axios');
        expect(getData).toHaveBeenCalled()
        expect(getData).toBeDefined()
    })
})