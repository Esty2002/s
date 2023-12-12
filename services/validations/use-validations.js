
const { ErrorTypes, ValueTypes, ModelStatusTypes } = require('../../utils/types');
const { getValidationsModule } = require('./validations-objects')



const checkObjectValidations = async (entity, objName, modelStatus = ModelStatusTypes.CREATE) => {
    let errors = []
    console.log({ objName })
    try {
        const module = getValidationsModule(objName, modelStatus)
        // const values = module.values;
        for (let val of module) {
            if (!val.require && !entity[val.propertyName]) {
                continue
            }
            console.log(val.require)
            if (val.require) {
                const { type } = val
                if (val.require.require) {
                    const isEmpty = checkEmptyValue({ type, value: entity[val.propertyName] })
                    if (isEmpty) {
                        console.log({propertyName:val.propertyName,require: val.require.default})
                        if (val.require.default) {
                            entity[val.propertyName] = val.require.default.initValue()
                        }
                        else {
                            errors = [...errors, { propertyName: val.propertyName, error: `the ${val.propertyName} is required but ${isEmpty}` }];
                            continue
                        }
                    }
                }
            }
            if (val.validation) {
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

        }
        if (errors.length > 0) {
            const error = { type: ErrorTypes.VALIDATION }
            error.data = errors
            throw error
        }
        return true
    }
    catch (error) {
        console.log({ error })
        throw error
    }
};

const EmptyErrors = {
    NO_VALUE: 'has no value', NOT_EXIST: 'does not exist'
}
const checkEmptyValue = ({ type, value }) => {
    console.log({ type, value })
    if (value === undefined)
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
