jest.mock('../../../modules/leads/leads-options', () => {
    return {
        getData: jest.fn((sql,url) => {
            if(sql){
                if(url==='/read/countdocuments/leads')
                    return true;
                else
                    throw new Error("the url not correct")
            }
            else{
                throw new Error("the server not correct");
            }
        }),
        postData: jest.fn((sql, url, obj) => {
            if (sql) {
                switch (url) {
                    case '/create/insertone':
                        if (obj.data && typeof obj.data.supplyDate == 'object' && typeof obj.data.SupplyAddress == 'object') {
                            return true;
                        }
                        else {
                            throw new Error("the object lead is not correct")
                        }
                    case '/update/updateone':
                        if (obj.set && obj.filter && obj.collection === 'leads') {
                            return true;
                        }
                        else {
                            throw new Error("the obj.set or obj.filter or obj.collection are not correct")
                        }
                    case '/read/aggregate':
                        if (obj.collection === "leads" && obj.aggregate.length ==5) {
                            return true;
                        }
                        else{
                            throw new Error("the collection or aggregation are not correct")
                        }
                    default:
                        throw new Error('the url not correct')
                }

            }
            else{
                throw new Error("the server is not defined")
            }
        })

    }
})

const { createNewLead, updateLead, allLeadsDetails } = require('../../../modules/leads/leads-options');
describe('CHECK FUNCTION AllLeadsDetails', () => {
    it('should return inserted id when succeded', async () => {
        // const { postData,getData } = jest.requireMock('../../../services/axios');

        let result = await allLeadsDetails({ filetr: { name: "test" }, sort: { name: 1 }, skip: 0, limit: 0, project: { _id: 0, name: 1 } });
        expect(result).toBeDefined();
        expect(result).toBeTruthy();


    })
    // it('should return inserted id when succeded', async () => {
    //     let result = await allLeadsDetails({ filetr: {}, sort: { name: 1 }, skip: 0, limit: 0, project: { _id: 0, name: 1 } });
    //     expect(result).toBeDefined();
    //     expect(result).toBeInstanceOf(Array);
    //     expect(result.length).toBeGreaterThanOrEqual(1);



    // })

})






// describe('CHECK FUNCTION CREATENEWLEAD', () => {
//     it('should return inserted id when succeded', async () => {
//         let result = await createNewLead({ phone: "088659365", supplyDate: new Date() });
//         expect(result).toBeDefined();
//         expect(result).toBe("123456");
//     })
//     it('should return false the object is empty', async () => {
//         let result;
//         try {
//             result = await createNewLead();

//         }
//         catch (error) {
//             expect(error).toBeDefined();
//             expect(error.message).toBe('the obj not received');
//             expect(error).toBeInstanceOf(Error);
//             expect(result).toBe(undefined);
//         }

//     })

// })
// describe('check function getTheMastConcretItem', () => {
//     ///לא צריך
//     it('should the function return the correct data', async () => {
//         const result = await getTheMustConcretItem();
//         expect(result).toBeDefined();
//         expect(result).toBeInstanceOf(Array);
//         expect(result[0]).toBeInstanceOf(Object);
//         expect(result[0].test).toBe("success");
//     })
//     it('should the function return success if it has arguments', async () => {
//         const result = await getTheMustConcretItem("hello to the function");
//         expect(result).toBeDefined();
//         expect(result).toBeInstanceOf(Array);
//         expect(result[0]).toBeInstanceOf(Object);
//         expect(result[0].test).toBe("success");
//     })
// })

// describe('check the function updateLead', () => {
//     it('should return when the function succsed', async () => {
//         const result = await updateLead({ name: "testes", serialNumber: "123" }, {});
//         expect(result).toBeDefined();
//         expect(result).toBe("successUpdatelead");
//         expect(result).toBeTruthy()

//     })

//     it('should return when the function succsed with many elements', async () => {
//         const result = await updateLead({ name: "testes", serialNumber: "123" }, { name: "test2", serialNumber: "333" });
//         expect(result).toBeDefined();
//         expect(result).toBe("successUpdatelead");
//         expect(result).toBeTruthy()

//     })



//     it('should return when the function dont get arguments', async () => {
//         let result;
//         try {
//             result = await updateLead();

//         }
//         catch (error) {
//             expect(error).toBeInstanceOf(Error);
//             expect(error.message).toBe("the obj or filter are not defined");

//             expect(error).not.toBeNull();
//         }


//     })

//     it('should return when the function get empty object', async () => {
//         let result;
//         try {
//             result = await await updateLead({});

//         }
//         catch (error) {
//             expect(error).toBeInstanceOf(Error);
//             expect(error.message).toBe("the obj or filter are not defined");
//             expect(result).not.toBeDefined()
//             expect(error).not.toBeNull();
//         }



//     })

// })

