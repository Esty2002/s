
const { objectsForValidations } = require('./validations-objects')

const checkObjectValidations = (body, objName) => {
    const values = objectsForValidations.find(({ objectName }) => objName === objectName).values;
   
    values.forEach(v => {
        v.validations.forEach(valid => {
            if (!valid.func(body[v.propertyName]))
                return false;
        });
    });
    return true;

};


module.exports = { checkObjectValidations };
