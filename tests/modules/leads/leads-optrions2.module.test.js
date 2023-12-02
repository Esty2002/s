jest.mock('../../../services/axios', () => {
    return {
        postData: jest.fn((url, body) => {
            if (url.includes("/") && typeof body === "object") {
                if (url.includes('create')) {
                    let data = []
                    if (body.values instanceof Array) {
                        body.values.forEach((_, Id) => {
                            data = [...data, { Id }]
                        });
                    }
                    else {
                        data = [{ Id: 1 }]
                    }
                    return { status: 201, data };
                }
                if (url.includes('read')) {
                    return { status: 200, data: [{ Id: 15 }, { Id: 16 }] };
                }
            }
            else {
                throw new Error(`The url ${url} or body ${body} not correct`);
            }
        })
    }
});

jest.mock('../../../services/validations/use-validations', () => {
    return {
        checkObjectValidations: jest.fn((obj, entity) => {

            if (typeof obj === 'object' && typeof entity === 'string') {
                return true;
            }
            else {
                throw new Error(`The entity ${entity} does not exist`);
            }
        })
    }
});

const { insertMoreProductsItems } = require('../../../modules/leads/leads-options');

describe("Check function insertMoreProductItems", () => {
    it('Should function create moreProductItems if it gets array and id', async () => {
        const result = await insertMoreProductsItems([{ productCode: 5, amount: 12 }, { productCode: 40, amount: 82 }, { productCode: 9, amount: 20 }, { productCode: 9, amount: 82 }, { productCode: 9, amount: 65 }], 'entity');
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Object);
        expect(result.data).toBeInstanceOf(Array);
        expect(result.status).toBe(201);
        expect(result.data.length).toBe(5);
        const { postData } = jest.requireMock('../../../services/axios');
        expect(postData).toHaveBeenCalled();
    });

    it('Should function not create anything if its get and empty array', async () => {
        const result = await insertMoreProductsItems([], 2);
        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(Object);
        expect(result.data).toBeInstanceOf(Array);
        expect(result.status).toBe(201);
        expect(result.data.length).toBe(0);
        const { postData } = jest.requireMock('../../../services/axios');
        expect(postData).toHaveBeenCalled();
    });
    it('Should function throw an error if its hasnt leadNumber', async () => {
        let result;
        try {
            result = await insertMoreProductsItems(null);
        }
        catch(error){
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
            expect(result).not.toBeDefined();
            expect(error.message).toBe("Cannot read properties of null (reading 'forEach')")
        }
    })
})