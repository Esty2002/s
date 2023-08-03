
const { ErrorTypes, ValueTypes } = require('../../utils/types');
const { getValidationsModule } = require('./validations-objects')



const checkObjectValidations = async (entity, objName, find = false) => {
    let errors = []
    try {
        const values = getValidationsModule(find).find(({ objectName }) => objName === objectName).values;
        console.log({ values })
        for (let v of values) {
            if (!v.require && !entity[v.propertyName]) {
                continue
            }
            if (v.require) {
                console.log(v.propertyName)
                const { type } = v
                const isEmpty = checkEmptyValue({ type, value: entity[v.propertyName] })
                if (isEmpty) {
                    errors = [...errors, { propertyName: v.propertyName, error: `the ${v.propertyName} is required but ${isEmpty}` }];
                    continue
                }
            }
            for (let valid of v.validation) {
                if (entity[v.propertyName] || entity[v.propertyName] === null) {
                    try {
                        _ = await valid.func(entity[v.propertyName], valid.arguments);
                    }
                    catch (error) {
                        errors = [...errors, { propertyName: v.propertyName, error: error.message }];
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
