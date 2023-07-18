const { Logger } = require('mongodb');
const request = require('supertest');
const { app } = require('../../../app')

jest.mock('../../../services/validations/use-validations', () => {
    return {
        checkObjectValidations: jest.fn((obj) => {
            if (obj)
                return true
            else {
                throw new Error("your validations isnt good")
            }
        })
    }
})
jest.mock('../../../modules/suppliers/branches', () => {
    return {
        insertOneBranch: jest.fn((obj) => {
            console.log("ooooooooops----", { obj })
            if (obj.isValid)
                return { status: 201, data: "insert" }
            console.log({ valid: obj.isValid });
            return { status: 500, message: "validation or status from dbserver" }

        }),
        updateDetail: jest.fn((supplierCode, obj) => {
           
                    console.log("updateobject", { supplierCode, obj });
                    if (obj.isValid)
                        return { status: 204 }
                    console.log({ valid: obj.isValid });
                    return { status: 500, message: "validation or status from dbserver - not update" }
            
        }),
        getallbranches: jest.fn((obj) => {
            if (obj.Disables == 1 || obj.Disabled == 0)
                return { status: 200, data: true }
            throw new Error('can not getBranches')
        }),
        deleteBranches: jest.fn((obj) => {
            if (obj.data == 'aaa') {
                if (obj.isValid)
                    return { status: 204 };
                else
                    return { status: 500, data: "validation or status from dbserver - not delete" };
            }
            else {
                throw new Error('the branch is not delete')
            }

        }),
        getBranchesByCondition: jest.fn((obj) => {
            // try {
            //     if (obj.SupplierName == 'Racel') {
                    if (obj.SupplierCode == 1000)
                        return { status: 200, data: { SupplierCode: 1000, SupplierName: "Racel" } };
                    else
                        return { status: 500, data: "there is not such branches for this supplier" }
                // }

            // } catch (error) {
            //     throw new Error('the branch isnt with agood condition')
            // }


        }),
        checkUnique: jest.fn((obj) => {
            try {
                if( obj.BranchName == 'Racel'){
                    if (obj.SupplierCode && obj.BranchName)
                        if (obj.SupplierCode == 1000 )
                            return { status: 200, data: true };
                        else {
                            return { status: 500, data: "not uniqe" };
                    }
                }
            } catch (error) {
                console.log("i am in uniqe");
                throw new Error('not recived suppliercode')
            }
           
        })

    }
})

describe(('INSERT BRANCH'), () => {
    it('should return status 201 and be defind to valid object', async () => {
        const response = await request(app).post('/branches/insertbranch').send({ isValid: true })
        const { insertOneBranch } = jest.requireMock('../../../modules/suppliers/branches');
        expect(insertOneBranch).toHaveBeenCalled();
        const { checkObjectValidations } = jest.requireMock('../../../services/validations/use-validations');
        expect(checkObjectValidations).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(201);
        expect(response.text).toBe('insert')
    })
        ,
        it('should return status 500 to invalid object', async () => {
            const response = await request(app).post('/branches/insertbranch').send({ isValid: false })
            const { insertOneBranch } = jest.requireMock('../../../modules/suppliers/branches');
            expect(insertOneBranch).toHaveBeenCalled();
            expect(response).toBeDefined();
            expect(response.statusCode).toBe(500);
            expect(response.text).toBe("validation or status from dbserver")
        }),
        it('should return status 500 and response.text:validation to send a empty object', async () => {
            const response = await request(app).post('/branches/insertbranch').send({})
            const { insertOneBranch } = jest.requireMock('../../../modules/suppliers/branches');
            expect(insertOneBranch).toHaveBeenCalled();
            expect(response).toBeDefined();
            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('validation or status from dbserver')
        }),
        it('should return status 500 to send nothing', async () => {
            const response = await request(app).post('/branches/insertbranch')
            const { insertOneBranch } = jest.requireMock('../../../modules/suppliers/branches');
            expect(insertOneBranch).toHaveBeenCalled();
            expect(response).toBeDefined();
            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('validation or status from dbserver')
        }),
        it('should return status 404 to wrong url : /branches/insert', async () => {
            const response = await request(app).post('/branches/insert').send({ isValid: true })
            expect(response).toBeDefined();
            expect(response.statusCode).toBe(404);

        }),
        it('should execute insertOneSupplier 5 times', async () => {
            const { insertOneBranch } = jest.requireMock('../../../modules/suppliers/branches');
            _ = await request(app).post('/branches/insertbranch', { isValid: true })
            expect(insertOneBranch).toHaveBeenCalled();
            expect(insertOneBranch).toHaveBeenCalledTimes(5);

        })

})

describe(('UPDATE BRANCH'), () => {
    it('should return 204 and be defind to valid object', async () => {
        const response = await request(app).post('/branches/updatebranch').send({ isValid: true })
        const { updateDetail } = jest.requireMock('../../../modules/suppliers/branches');
        expect(updateDetail).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(204);
    }),
        it('should return status 500 to invalid object', async () => {
            const response = await request(app).post('/branches/updatebranch').send({ isValid: false })
            const { updateDetail } = jest.requireMock('../../../modules/suppliers/branches');
            expect(updateDetail).toHaveBeenCalled();
            expect(response).toBeDefined();
            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('validation or status from dbserver - not update')
        }),
        it('should return status 500 response.text:validation to sending an empty object', async () => {
            const response = await request(app).post('/branches/updatebranch', {})
            expect(response).toBeDefined();
            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('validation or status from dbserver - not update')
        }),
        it('should return status 500 to no send nothing', async () => {
            const response = await request(app).post('/branches/updatebranch')
            expect(response).toBeDefined();
            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('validation or status from dbserver - not update')
        }),
        it('should return status 404 to wrong url : /branches/update', async () => {
            const response = await request(app).post('/branches/update').send({ isValid: true })
            expect(response).toBeDefined();
            expect(response.statusCode).toBe(404);
        }),
        it('should execute updateDetail 5 times ', async () => {
            const { updateDetail } = jest.requireMock('../../../modules/suppliers/branches')
            _ = await request(app).post('/branches/updatebranch', { isValid: true })
            expect(updateDetail).toHaveBeenCalled();
            expect(updateDetail).toHaveBeenCalledTimes(5);
        })
})

describe(('DELETE BRANCH'), () => {
    it('should return 204 and be defind to valid object', async () => {
        const response = await request(app).post('/branches/deletebranches').send({ isValid: true, data: "aaa" })
        const { deleteBranches } = jest.requireMock('../../../modules/suppliers/branches');
        expect(deleteBranches).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(204);
    });
    it('should return status 500 to invalid object', async () => {
        const response = await request(app).post('/branches/deletebranches').send({ isValid: false, data: "aaa" })
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('validation or status from dbserver - not delete')
    });
    it('should return status 500 response.text:validation to sending an empty object', async () => {
        const response = await request(app).post('/branches/deletebranches', {})
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('the branch is not delete')
    });

    it('should return status 500 to no send nothing', async () => {
        const response = await request(app).post('/branches/deletebranches').send({ data: 'aaa' })
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('validation or status from dbserver - not delete')
    });
    it('should return status 404 to wrong url : /branches/delete', async () => {
        const response = await request(app).post('/branches/delete').send({ isValid: true, data: "aaa" })
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
    });

    it('should return status 500 to save a worng object', async () => {
        const response = await request(app).post('/branches/deletebranches').send({ isValid: true, data: "bbb" })
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
    });
    it('should execute deleteSupplier 5 times ', async () => {
        const { deleteBranches } = jest.requireMock('../../../modules/suppliers/branches')
        _ = await request(app).post('/branches/deletebranches', { isValid: true })
        expect(deleteBranches).toHaveBeenCalled();
        expect(deleteBranches).toHaveBeenCalledTimes(6);
    });
})

describe(('GET SPECIFIC BRANCH'), () => {
    it('should return status 200 and be defind to valid object', async () => {
        const response = await request(app).get('/branches/getBranchesWithCondition/SupplierCode/1000/0')
        const { getBranchesByCondition } = jest.requireMock('../../../modules/suppliers/branches');
        expect(getBranchesByCondition).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response.serverError).toBeFalsy();
        expect(response.notFound).toBeFalsy();
        expect(response.statusCode).toBe(200);
    });
    it('should return status 500 to invalid object', async () => {
        const response = await request(app).get('/branches/getBranchesWithCondition/SupplierCode/1001/0')
        const { getBranchesByCondition } = jest.requireMock('../../../modules/suppliers/branches');
        expect(getBranchesByCondition).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response.serverError).toBeTruthy();
        expect(response.statusCode).toBe(500);
    });
    it('should return status 500 response.text:validation to sending an empty query', async () => {
        const response = await request(app).get('/branches/getBranchesWithCondition/aaaa/aaaa/0')
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('{\"status\":500,\"data\":\"there is not such branches for this supplier\"}')
    });
    it('should execute getSupplier 4 times ', async () => {
        const { getBranchesByCondition } = jest.requireMock('../../../modules/suppliers/branches')
        _ = await request(app).get('/branches/getBranchesWithCondition/SupplierCode/1000/0')
        expect(getBranchesByCondition).toHaveBeenCalled();
        expect(getBranchesByCondition).toHaveBeenCalledTimes(4);
    })
})

describe(('CHECK UNIQUE BRANCH'), () => {
    it('should return status 200 and be defind to valid object', async () => {
        const response = await request(app).get('/branches/checkUnique/1000/Racel')
        const { checkUnique } = jest.requireMock('../../../modules/suppliers/branches');
        expect(checkUnique).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response.serverError).toBeFalsy();
        expect(response.notFound).toBeFalsy();
        expect(response.statusCode).toBe(200);
    });
    it('should return status 500 to invalid params', async () => {
        const response = await request(app).get('/branches/checkUnique/1001/Racel')
        expect(response).toBeDefined();
        expect(response.serverError).toBeTruthy();
        expect(response.notFound).toBeFalsy();
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('{\"status\":500,\"data\":\"not uniqe\"}')

    });
    
    it('should return status 500 to empty params', async () => {
        const response = await request(app).get('/branches/checkUnique/1000/ester')
        expect(response).toBeDefined();
        expect(response.serverError).toBeTruthy();
        expect(response.notFound).toBeFalsy();
        expect(response.statusCode).toBe(500);

    });

    it('should return response.text:not uniqe to invalid params', async () => {
        const response = await request(app).get('/branches/checkUnique/1111/Racel')
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('{\"status\":500,\"data\":\"not uniqe\"}')

    });
    it('should execute getSupplier 4 times ', async () => {
        const { checkUnique } = jest.requireMock('../../../modules/suppliers/branches')
        _ = await request(app).get('/branches/checkUnique/SupplierCode/1000/Racel')
        expect(checkUnique).toHaveBeenCalled();
        expect(checkUnique).toHaveBeenCalledTimes(4);
    })
})