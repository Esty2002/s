const request = require('supertest');
const { app } = require('../../../app')

jest.mock('../../modules/quotation/read', () => {
    return {
        getQuotationByConditions: jest.fn((arr) => {
            console.log("arr:  yyyyyyyyyyyyyyyyyyyyytttttttttt ",arr);
            if ( arr === undefined) {
                console.log("errrrror!!");
                throw new Error('the array is not define, or sent uncorrect values');
            }
            if(arr.length==0){
                console.log();
                return "empty arr";
            }
            else {
                return ("excellent");
            }
        }),
        getQuotationItemsByQuotationCode: jest.fn((arr) => {
            
        })
    }
})

describe('GET QUOTATION BY CONDITIONS', () => {
    it('post /getQuotationsByConditions is found', async () => {
        const response = await request(app).post('/quoatation/getQuotationsByConditions').send([{ "priceBeforeDiscount": 100 }]);
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response.text).toBe("excellent"); 
        expect(response.notFound).toBeFalsy();
    })

    it('should call function getQuotationByConditions in module', async () => {
        const methods=jest.requireMock('../../modules/quotation/read');
        const response = await request(app).post('/quoatation/getQuotationsByConditions').send([{ "priceBeforeDiscount": 100 }]);
        expect(methods.getQuotationByConditions).toHaveBeenCalled();
        expect(response).toBeDefined();
        expect(response.error).toBe(false);
        expect(response.notFound).toBeFalsy();
    })

    it('shuold return the status 500 without send the values', async () => {
        const response = await request(app).post('/quoatation/getQuotationsByConditions').send();
        console.log("response lllllllllllll: ",response);
        expect(response.statusCode).toBe(500);
        expect(response.serverError).toBeTruthy();
        expect(response.notFound).toBe(false);
    })

    it('should the request successful without sends the deteils', async () => {
        const response = await request(app).post('/quoatation/getQuotationsByConditions').send([]);
        console.log("response in tests:  ",response);
        expect(response).toBeDefined();
        expect(response.text).toBe("empty arr");
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })
    
})
