
const { objectsForValidations } = require('./validations-objects')
let i = 0;
const checkObjectValidations = async (body, objName) => {
    try {
        const values = objectsForValidations.find(({ objectName }) => objName === objectName).values;
        for (let v of values) {
            i++
            for (let valid of v.validation) {
                if (body[v.propertyName]) {

                    const val=await valid.func(body[v.propertyName], valid.arguments);


                }

            }
        }
        return true;
    }
    catch (error) {
        throw error;
    }


};


module.exports = { checkObjectValidations };
