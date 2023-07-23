jest.mock('../../../services/axios', () => {
    return {
        getData: jest.fn((url, query) => {
            if (url) {
                if (typeof query == "object") {
                    switch (url) {
                        case '/read/readAll/tbl_Branches':
                            return { data: [] }
                        case '/read/readAll/tbl_Suppliers':
                            return { data: [{ supplierCode: 2222, SupplierName: 'aaaa' }] }
                        default:
                            break;
                    }
                }
                else
                    throw new Error('query is not valid')
            }
            throw new Error('url not found')

        }),
        postData: jest.fn((url, body) => {
            console.log("url-----", url);
            console.log("body----", body);
            if (body) {
                switch (url) {
                    case '/create/create':
                        if (typeof body.values == 'object' && Object.keys(body.values).length > 0)
                            return true;
                        else
                            return false
                    case '/update/update':
                        if (body.condition.Id != undefined) {
                            if (body.condition.Id === 1111) {
                                return { status: 200, text: true };
                            }
                            else {
                                return { status: 500, text: false }
                            }
                        }
                        else {
                            console.log("insert yo eeeeeeeeelse");
                            throw new Error('object not found')

                        }
                    default:
                        break;

                }
                if (url) {
                    return true;

                }
                else {
                    console.log("in else -url");
                    throw new Error('url not found')

                }

            }
            else {
                console.log("object not found");
                throw new Error('object not found')
            }
        })
    }
})
jest.mock('../../../services/logger/logTxt', () => {
    return {
        logToFile: jest.fn((obj) => {
            console.log("in mock- log to file---------------------")
            if (obj)
                return true
        })
    }
})
jest.mock('../../../services/validations/use-validations', () => {
    return {
        checkObjectValidations: jest.fn((obj) => {
            if (obj)
                return true;
            throw new Error('validations is not good')
        })
    }
})

const { insertOneBranch, getBranchesByCondition, deleteBranches, checkValid } = require('../../../modules/suppliers/branches')

describe('INSERTONEBRANCHES', () => {
    it('should be defined to correct properties', async () => {
        const response = await insertOneBranch({
            SupplierCode: 1111, BranchName: 'Goldy',
            Street: "hyasmin", HomeNumber: 5, City: "asdod", Phone1: "088987654", UserThatInsert: "develop"
        })
        const { checkObjectValidations } = jest.requireMock('../../../services/validations/use-validations');
        expect(checkObjectValidations).toHaveBeenCalled();
        const { postData } = jest.requireMock('../../../services/axios');
        expect(postData).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
    });
    it('should throw erroe to invalid query - with empty query', async () => {
        let response;
        try {
            response = await insertOneBranch({})
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toBe('url not found');
            expect(error).toBeInstanceOf(Error);
            expect(response).toBe(undefined);
        }
    });
    it('should throw erroe to invalid query - with out query', async () => {
        let response;
        try {
            response = await insertOneBranch()
        } catch (error) {
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(response).toBe(undefined);
        }
    });
    it('should throw error to invalid query - send a half object', async () => {
        let response;
        try {
            response = await insertOneBranch({
                SupplierCode: 1111, BranchName: 'Goldy',
            })
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toBe('url not found');
            expect(error).toBeInstanceOf(Error);
            expect(response).toBe(undefined);
        }


    });
    it('should execute getData 4 times', async () => {
        let response
        const { getData } = jest.requireMock('../../../services/axios');
        response = await insertOneBranch({
            SupplierCode: 1111, BranchName: 'Goldy',
            Street: "hyasmin", HomeNumber: 5, City: "asdod",
            Phone1: "088987654", UserThatInsert: "develop"

        })
        expect(getData).toHaveBeenCalled();
        expect(getData).toHaveBeenCalledTimes(4);

    })

})

describe('DELETEBRANCHES', () => {
    it('should be defined to correct properties', async () => {
        const response = await deleteBranches({ Id: 1111 })
        const { postData } = jest.requireMock('../../../services/axios');
        expect(postData).toHaveBeenCalled();
        expect(response).toBeDefined()
        expect(response).toBeTruthy()
    });
    it('should throw error to invalid query - with empty query', async () => {
        let response;
        try {
            response = await deleteBranches({})
            const { postData } = jest.requireMock('../../../services/axios');
            expect(postData).toHaveBeenCalled();
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toBe('object not found');
            expect(error).toBeInstanceOf(Error);
            expect(response).toBe(undefined);
        }

    });
    it('should throw error to invalid query - with out send query', async () => {
        let response;
        try {
            response = await deleteBranches()
            const { postData } = jest.requireMock('../../../services/axios');
            expect(postData).toHaveBeenCalled();
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toBe('object not found');
            expect(error).toBeInstanceOf(Error);
            expect(response).toBe(undefined);
        }

    });
    it('should execute postData 4 times', async () => {
        let response
        const { getData } = jest.requireMock('../../../services/axios');
        response = await deleteBranches({
            Id:1111
        })
        expect(getData).toHaveBeenCalled();
        expect(getData).toHaveBeenCalledTimes(4);

    })
})

describe('GET SPESIFIC BRANCH',()=>{
    it('should be defined to be 1 to correct properties',async()=>{
        let response;
        response = await getBranchesByCondition({"SupplierCode" : "1005"})
        // const { getData } = jest.requireMock('../../../services/axios');
        // expect(getData).toHaveBeenCalled();
    })
})



