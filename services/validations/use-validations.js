
const { ErrorTypes, ValueTypes } = require('../../utils/types');
const { getValidationsModule } = require('./validations-objects')



const checkObjectValidations = async (entity, objName, create = false) => {
    let errors = []
    console.log({objName})
    try {
        const module = getValidationsModule(objName, create)
        // const values = module.values;
        for (let val of module) {
            if (!val.require && !entity[val.propertyName]) {
                continue
            }
            console.log(val.require)
            if (val.require) {
                const { type } = val
                const isEmpty = checkEmptyValue({ type, value: entity[val.propertyName] })
                if (isEmpty) {
                    errors = [...errors, { propertyName: val.propertyName, error: `the ${val.propertyName} is required but ${isEmpty}` }];
                    continue
                }
            }
            for (let valid of val.validation) {
                if (entity[val.propertyName] || entity[val.propertyName] === null) {
                    try {
                        _ = await valid.func(entity[val.propertyName], valid.arguments);
                    }
                    catch (error) {
                        errors = [...errors, { propertyName: val.propertyName, error: error.message }];
                    }
                   
                }
            }


        }
        if (errors.length > 0) {
            const error = { type: ErrorTypes.VALIDATION }
            error.data = errors
            throw error
        }
        return true
    }
    catch (error) {
        console.log({error})
        throw error
    }
};

const EmptyErrors = {
    NO_VALUE: 'has no value', NOT_EXIST: 'does not exist'
}
const checkEmptyValue = ({ type, value }) => {
    console.log({ type, value })
    if (value===undefined)
        return EmptyErrors.NOT_EXIST
    switch (type) {
        case ValueTypes.STRING:
            return value.trim().length === 0 ? EmptyErrors.NO_VALUE : false
        case ValueTypes.NUMBER:
            return value == 0 ? EmptyErrors.NO_VALUE : false
        default:
            break;
    }
    return false

}

module.exports = { checkObjectValidations };
