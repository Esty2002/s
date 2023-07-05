
const { objectsForValidations } = require('./validations-objects')
let i = 0;
const checkObjectValidations = async (body, objName) => {
    try {
        const values = objectsForValidations.find(({ objectName }) => objName === objectName).values;
        for (let v of values) {
            i++
            for (let valid of v.validation) {
                if (body[v.propertyName]) {
                    try {
                        const val = await valid.func(body[v.propertyName], valid.arguments);
                    }
                    catch (error) {
                        throw error;
                    }
                }
            }
            if (v.require && !body[v.propertyName]) {
                throw new Error(`the ${v.propertyName} is required but not exist`);
            }
        }
        return true;
    }
    catch (error) {
        throw error;
    }


};


module.exports = { checkObjectValidations };
