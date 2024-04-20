
const { removeKeysFromObject } = require('../../modules/utils/object-code');
const { types } = require('../../modules/utils/schemas');
const { ErrorTypes, ValueTypes, ModelStatusTypes } = require('../../utils/types');
const { getValidationsModule, conditionOperators } = require('./validations-objects')

//FIXME:error build when condition is array
const buildArgumentCondition = (argument, entity) => {
    let { condition, ...rest } = argument
    console.log({ condition });
    if (condition instanceof Array) {
        condition = condition.reduce((obj, { key, value }) => {
            obj[key] = value
            return obj;
        }, {})
    }
    else if (condition.key) {
        const { key } = condition
        condition = removeKeysFromObject(condition, ['key'])
        condition[key] = entity[key]
    }
    console.log({ condition });
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
    console.log(validation.arguments);
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

const validateEntity = async ({ entity, validationModule }) => {
    let errors = []
    // const entityKeys = validationModule.map(({ propertyName }) => propertyName)
    // const removeKeys = Object.keys(entity).filter((key) => entityKeys.includes(key) === false)
    // entity = removeKeysFromObject(entity, removeKeys)
    for (let val of validationModule) {
        if (!val.require && !entity[val.propertyName]) {
            continue
        }
        if (val.initValue) {
            entity[val.propertyName] = val.initValue(entity)
        }
        if (val.require) {
            const { type } = val
            if (val.require.require) {
                const isEmpty = checkEmptyValue({ type: type.name, value: entity[val.propertyName] })
                if (isEmpty) {
                    if (val.require.default) {
                        entity[val.propertyName] = val.require.default.initValue(entity)
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
                                const mappedArguments = valid.arguments.map((arg, index) => ({ index, arg }))
                                const complexIndexes = mappedArguments.filter(({ arg }) => arg.operator).reduce((list, { index }) => [...list, index], [])
                                if (complexIndexes.length > 0) {
                                    for (let i = 0; i < complexIndexes.length; i++) {
                                        const { operator } = valid.arguments[complexIndexes[i]]
                                        const noConditionArguments = valid.arguments[complexIndexes[i]].arguments.filter(({ condition }) => condition === undefined)
                                        const conditionArguments = valid.arguments[complexIndexes[i]].arguments.filter(({ condition }) => condition).map((arg) => buildArgumentCondition(arg, entity))
                                        const complexValidation = { ...valid, arguments: [...noConditionArguments, ...conditionArguments] }
                                        try {
                                            const response = await getValidationAnswer({ value: entity[val.propertyName], operator, validation: complexValidation })
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
                                if (valid.arguments.length > 0) {
                                    const validationResponse = await valid.func(entity[val.propertyName], valid.arguments);
                                }
                            }
                            else {
                                if (valid.arguments.condition) {
                                    valid.arguments = buildArgumentCondition(valid.arguments, entity)
                                }
                                const validationResponse = await valid.func(entity[val.propertyName], valid.arguments);
                            }
                        }
                        else {
                            const validationResponse = await valid.func(entity[val.propertyName], valid.arguments);
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
    return entity
}

const checkObjectValidations = async (entity, objName, modelStatus = ModelStatusTypes.CREATE) => {
    try {
        const validationModule = getValidationsModule({ object: objName, modelstatus: modelStatus })
        const referenceProperties = validationModule.filter(({ type }) => type.referenceType)
        const regularProperties = validationModule.filter(({ type }) => !type.referenceType)
        for (let prop of referenceProperties) {
            if (prop.type.name === types.ARRAY.name) {
                if (entity[prop.propertyName] && entity[prop.propertyName].length > 0) {
                    entity[prop.propertyName] = await Promise.all(entity[prop.propertyName].map(async (item) => await checkObjectValidations(item, prop.entityName, modelStatus)))
                }
            }
            else {
                entity[prop.propertyName] = await checkObjectValidations(entity[prop.propertyName], prop.entityName, modelStatus)
            }
        }
        if (regularProperties.length > 0) {
            entity = await validateEntity({ entity, validationModule })
        }
        console.log({ entity });
        return entity
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
            return value.toString().trim().length === 0 ? EmptyErrors.NO_VALUE : false
        case ValueTypes.NUMBER:
            return value == 0 ? EmptyErrors.NO_VALUE : false
        default:
            break;
    }
    return false

}


module.exports = { checkObjectValidations };
