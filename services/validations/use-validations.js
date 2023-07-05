
const { objectsForValidations } = require('./validations-objects')
let i = 0;
const checkObjectValidations = async (body, objName) => {
    try {
        console.log(body, objName, 'bodyAndObjectname');
        const values = objectsForValidations.find(({ objectName }) => objName === objectName).values;
        for (let v of values) {
            i++
            for (let valid of v.validation) {
                if (body[v.propertyName]) {
                    if (!(await valid.func(body[v.propertyName], valid.arguments))) {
                        return false;

                    }
                }

            }
        }
        return true;
    }
    catch (error) {
        throw error
    }


};


module.exports = { checkObjectValidations };
