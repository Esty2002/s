
const { objectsForValidations } = require('./validations-objects')
let i = 0;
const checkObjectValidations = async (body, objName) => {
    try {
        let errors = []
        const values = objectsForValidations.find(({ objectName }) => objName === objectName).values;
        for (let v of values) {
            i++
            for (let valid of v.validation) {

                if (body[v.propertyName]) {
                    try {
                        _ = await valid.func(body[v.propertyName], valid.arguments);
                    }
                    catch (error) {
                        errors = [...errors, { propertyName: v.propertyName, error: error.message }];
                    }
                }
            }
            if (v.require && !body[v.propertyName]) {
                errors = [...errors, { propertyName: v.propertyName, error: `the ${v.propertyName} is required but not exist` }];
            }
        }
        if (errors.length > 0) {
            console.log(errors,' errors');
            throw errors
        }
        return true;
    }
    catch (error) {
        throw error;
    }
};


module.exports = { checkObjectValidations };
