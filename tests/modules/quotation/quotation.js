// // const request = require("sequelize");

// jest.mock('../../../services-qutation/sql/sql-operations', () => {
//     return {
//         selectByConditions: jest.fn((table, conditionsString) => {
            
//             // let ezer=arrOfObjects.map(e => 
//             //     Object.keys(e)[0]
//             // );
//             if (table === 'aaaaa'||table===undefined||conditionsString===undefined) {
//                 throw new Error("the table or conditionsString or both is not define, or not send correct values");
//             }
//             else {
//                 return ([{table:'quotation'}]);
//             }
//         })
//     }
// });

// const { getQuotationByConditions } = require('../../../modules/quotation/read')

// describe('SELECT QUOTATION BY CONDITIONS', () => {
//     it('should call selectByConditions', async () => {
//         const { selectByConditions } = jest.requireMock('../../../services-quotation/sql/sql-operations');
//         const response = await getQuotationByConditions("quotation", [{ priceBeforeDiscount: 100 }, { VATPercent: 17 }]);
//         console.log("responseeeeeeee: ", response);
//         expect(selectByConditions).toHaveBeenCalled();
//         expect(response).toBeDefined();
//     })

//     describe('ERRORS', () => {
//         it('should throw an error without send the values ', async () => {
//             expect.assertions(2)
//             try {
//                  const response = await getQuotationByConditions("quotation")
//             }
//             catch (error) {
//                 console.log("errorrrrrrrrrr",error);
//                 expect(error).toBeDefined();
//                 expect(error).toBeInstanceOf(Error);
//             }
//         })
//     })

// })




