
const { removeKeysFromObject } = require('../../modules/utils/code');
const { ErrorTypes, ValueTypes, ModelStatusTypes } = require('../../utils/types');
const { getValidationsModule, conditionOperators } = require('./validations-objects')

const buildArgumentCondition = (argument, entity) => {
    let { condition, ...rest } = argument
    const { key } = condition
    condition = removeKeysFromObject(condition, ['key'])
    condition[key] = entity[key]
    return { ...rest, condition }
}

const getArgumentTypeForValidationFunction = (name, argument) => {
    console.log({ name, argument })
    if (name === 'recordExistInMultipleDB') {
        if (Array.isArray(argument) === false) {
            return [argument]
        }
        return argument
    }
    if (name === 'recordExistInDB') {
        if (Array.isArray(argument)) {
            return argument[0]
        }
        return argument
    }
}

const getValidationAnswer = async ({ value, operator, validation }) => {
    let response = false
    console.log({ value, operator })
    switch (operator) {
        case conditionOperators.OR: {
            for (let argument of validation.arguments) {
                argument = getArgumentTypeForValidationFunction(validation.func.name, argument)
                try {
                    response = await validation.func(value, argument);
                    console.log({ response })
                    if (response === true)
                        return true
                }
                catch (error) {
                    console.log({ error })
                }
            }
            break;
        }
        case conditionOperators.AND: {
            for (let argument of validation.arguments) {
                argument = getArgumentTypeForValidationFunction(validation.func.name, argument)
                console.log(argument)
                try {

                    response = await validation.func(value, argument);
                    console.log({ response })
                }
                catch (error) {
                    console.log({ error })
                    throw error
                }
            }
        }

    }
    throw new Error('help!!!')
}

const checkObjectValidations = async (entity, objName, modelStatus = ModelStatusTypes.CREATE) => {
    let errors = []
    try {
        const module = getValidationsModule(objName, modelStatus)
        console.log({ entity })
        for (let val of module) {
            if (!val.require && !entity[val.propertyName]) {
                continue
            }
            if (val.require) {
                const { type } = val
                if (val.require.require) {
                    const isEmpty = checkEmptyValue({ type, value: entity[val.propertyName] })
                    if (isEmpty) {
                        console.log({ propertyName: val.propertyName, default: val.require.default })
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
                            if (valid.arguments) {
                                if (Array.isArray(valid.arguments)) {
                                    console.log(valid.arguments)
                                    const mappedArguments = valid.arguments.map((arg, index) => ({ index, arg }))
                                    const complexIndexes = mappedArguments.filter(({ arg }) => arg.operator).reduce((list, { index }) => [...list, index], [])
                                    console.log({ complexIndexes })

                                    if (complexIndexes.length > 0) {
                                        for (let i = 0; i < complexIndexes.length; i++) {
                                            const { operator } = valid.arguments[complexIndexes[i]]
                                            const noConditionArguments = valid.arguments[complexIndexes[i]].arguments.filter(({ condition }) => condition === undefined)

                                            const conditionArguments = valid.arguments[complexIndexes[i]].arguments.filter(({ condition }) => condition).map((arg) => buildArgumentCondition(arg, entity))
                                            const complexValidation = { ...valid, arguments: [...noConditionArguments, ...conditionArguments] }
                                            console.log(complexValidation)
                                            try {
                                                const response = await getValidationAnswer({ value: entity[val.propertyName], operator, validation: complexValidation })
                                                console.log({ response })
                                            }
                                            catch (error) {
                                                console.log({ error })
                                                errors = [...errors, { propertyName: val.propertyName, error: error.message }];
                                            }
                                        }
                                    }
                                    const noConditionArguments = mappedArguments.filter(({ index }) => complexIndexes.includes(index) === false).filter(({ condition }) => condition === undefined).map(({ arg }) => arg)

                                    const conditionArguments = mappedArguments.filter(({ index }) => complexIndexes.includes(index) === false).filter(({ condition }) => condition).map((arg) => buildArgumentCondition(arg, entity)).map(({ arg }) => arg)
                                    valid.arguments = [...noConditionArguments, ...conditionArguments]
                                    console.log(valid.arguments)
                                    if (valid.arguments.length > 0) {
                                        const validationResponse = await valid.func(entity[val.propertyName], valid.arguments);
                                    }
                                }
                                else {
                                    if (valid.arguments.condition) {
                                        valid.arguments = buildArgumentCondition(valid.arguments, entity)
                                    }
                                    const validationResponse = await valid.func(entity[val.propertyName], valid.arguments);
                                    console.log(validationResponse)
                                }
                            }
                            else {
                                const validationResponse = await valid.func(entity[val.propertyName], valid.arguments);
                                console.log({ validationResponse })
                            }
                        }
                        catch (error) {
                            console.log({ error })
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
        console.log(error)
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
