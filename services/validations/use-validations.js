
const { ErrorTypes } = require('../../utils/types');
const { getValidationsModule } = require('./validations-objects')
let i = 0;
const checkObjectValidations = async (body, objName, find = false) => {
    let errors = []
    try {
        const values = getValidationsModule(find).find(({ objectName }) => objName === objectName).values;
        for (let v of values) {
            if (!v.require && !body[v.propertyName]) {
                continue
            }
            i++
            for (let valid of v.validation) {
                if (body[v.propertyName] || body[v.propertyName] === null) {
                    try {
                        _ = await valid.func(body[v.propertyName], valid.arguments);
                    }
                    catch (error) {
                        errors = [...errors, { propertyName: v.propertyName, error: error.message }];
                    }
                }
            }
            if (v.require && !body[v.propertyName])
                errors = [...errors, { propertyName: v.propertyName, error: `the ${v.propertyName} is required but does not exist` }];

        }
        if (errors.length > 0) {
            const error = { type: ErrorTypes.VALIDATION }
            error.data=errors
            throw error
        }
        console.log("return true - validations");
        return true
    }
    catch (error) {

        console.log({ error });
        throw error
    }
};



// יש לברר אם ניתן להשתמש בפונקצי הבאה

// const checkValidationsUpdate = async (body, entityName) => {
//     let errors = []
//     try {
//         const values = objectsForValidations.find(({ objectName }) => objectName === entityName).values;
//         for (let item in body) {
//             const validations = values.find(({ propertyName }) => propertyName === item);
//             if (validations) {
//                 try {
//                     for (let valid of validations.validation) {
//                         _ = await valid.func(body[item], valid.arguments);
//                     }
//                 }
//                 catch (error) {
//                     errors = [...errors, error.message];
//                 }
//             }
//         }
//         if (errors.length > 0) {
//             throw errors;
//         }
//         else {
//             return true;
//         }
//     }
//     catch (error) {
//         throw error;
//     }
// }

module.exports = { checkObjectValidations };
