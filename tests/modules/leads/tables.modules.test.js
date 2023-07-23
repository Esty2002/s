jest.mock('../../../services/axios', () => {
    return {
        postData: jest.fn((_, url, obj) => {
            switch (url) {
                case '/sql/create':
                    if (obj.tableName && obj.values) {
                        return "success";
                    }
                    else {
                        throw new Error("the object lead is not correct");
                    }
                case '/sql/update':
                    if (obj.tableName && typeof obj.values == 'object' && typeof obj.condition == 'string') {
                        return "the object is correct";
                    }
                    else {
                        throw new Error("the obj.tableName or obj.values or obj.condition are not correct");
                    }
                case '/sql/readTop20':

                    if (obj.tableName && obj.columns && obj.condition) {
                        return true;
                    }
                    else {
                        throw new Error("the table or columns or condition are not correct");
                    }
                default:
                    throw new Error('the url not correct');
            }
        })
    }
})

const { newRecord, updateRecord, getRecord, deleteRecord } = require('../../../modules/leads/tables');

describe('check function newRecord', () => {
    it('check that the function return "your object success" if the obj is defined', async () => {
        const result = await newRecord({ tableName: "orderers", values: { OrdererName: "test", OrdererPhone: "000" } });
        expect(result).toBeDefined();
        expect(result).toBe("success");
        expect(result.length).toBe(7);
    });

    it('check that the function return "your object not success" if the tablename is not "orderers"', async () => {

        const result = await newRecord({ tableName: "pouringsTypes", values: { PouringName: "dkjf" } });
        expect(result).toBeDefined();
        expect(result).toBe("success");
        expect(result.length).toBe(7);
    });

    it('check that the function return "your object not success" if the values is null', async () => {
        let result;
        try {
            result = await newOrderer({ tableName: "test" });
        }
        catch (error) {
            expect(result).not.toBeDefined();
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('check that the function return Error if the obj is null', async () => {
        let result;
        try {
            result = await newOrderer();
        }
        catch (error) {
            expect(result).not.toBeDefined();
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
        }
    });
});

describe('check function getRecord', () => {

    it('check that the correct with arguments', async () => {
        const result = await getRecord("statusesLead", "StatusName", "none");
        expect(result).toBeDefined();
        expect(result).toBeTruthy();
        expect(result).not.toBeNull();
    });

    it('check that the function not success if the data not correct', async () => {
        let result;
        try {
            result = await getRecord("shdfjk");
        }
        catch (error) {
            expect(result).not.toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("the table or columns or condition are not correct");
        }
    });

    it('check that the function not success if the data not received', async () => {
        let result;
        try {
            result = await getRecord();
        }
        catch (error) {
            expect(result).not.toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("the table or columns or condition are not correct");
        }
    });

    it('check that the function postData required in this function', async () => {
        const { postData } = jest.requireMock('../../../services/axios');
        const result = await getRecord("orderers", "OrdererName", "none");
        expect(result).toBeDefined();
        expect(result).toBeTruthy();
        expect(result).not.toBeNull();
        expect(postData).toHaveBeenCalled();
    });

});

describe('check function updateRecord', () => {
    it('check that the functin return "the object is correct" when the obj is defined', async () => {
        const result = await updateRecord({ tableName: "pouringsTypes", update: { PouringName: "גדר" }, condition: "SerialNumber=1" });
        expect(result).toBeDefined();
        expect(result).toBe("the object is correct");
        expect(result.length).toBe(21);
    });

    it('check that the function return Error when the obj not correct', async () => {
        let result;
        try {
            result = await updateRecord({ serialNumber: 1 });
        }
        catch (error) {
            expect(result).not.toBeDefined();
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("the obj.tableName or obj.values or obj.condition are not correct");
        }
    });

    it('check that the function return the object is null when the obj not defined', async () => {
        let result;
        try {
            result = await updateRecord();
        }
        catch (error) {
            expect(result).not.toBeDefined();
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("the object is null");
        }
    });

    it('check that the function require the mock postData', async () => {
        const { postData } = jest.requireMock('../../../services/axios');
        const result = await updateRecord({ tableName: "statusesLead", update: { OrdererPhone: "0504175184" }, condition: "OrdererPhone='0504178963'" });

        expect(result).toBeDefined();
        expect(result).toBeTruthy();
        expect(result).not.toBeNull();
        expect(postData).toHaveBeenCalled();
    });

});

describe('check function deleteRecord', () => {
    it('check that the function return "object is not defined" when all obj.set is defined', async () => {
        const result = await deleteRecord({ tableName: "orderers", condition: "OrdererName='מיכל'" });
        expect(result).toBeDefined();
        expect(result).toBe("the object is correct");
        expect(result.length).toBe(21);
        expect(result).not.toBeNull();
    });

    it('check that the function require the mock getData', async () => {
        const { postData } = jest.requireMock('../../../services/axios');
        const result = await deleteRecord({ tableName: "statusesLead", condition: "StatusName='גדר'" });
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
            expect(error.message).toBe("the obj.tableName or obj.values or obj.condition are not correct");
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

})




