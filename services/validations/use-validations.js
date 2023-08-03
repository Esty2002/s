<<<<<<< HEAD

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
=======
const { objectsForValidations } = require('./validations-objects')
let i = 0;
const checkObjectValidations = async (body, objName) => {
    try {
        const values = objectsForValidations.find(({ objectName }) => objName === objectName).values
        for (let v of values) {
            i++
            for (let valid of v.validation) {
                if (body[v.propertyName]) {
                    if (!(await valid.func(body[v.propertyName], valid.arguments))) {
                        return false;
                    }

                    // console.log(body[v.propertyName], 'yyyeeesss');
                    // if (!(await valid.func(body[v.propertyName], valid.arguments))) {
                    //     console.log('@@@@@@@@@@@@  nnnnnnnnnnno');
                    // return false;
                    // }
                }
            }

            if (v.require && !body[v.propertyName]) {
                console.log("hello checkObjectValidations for");
                throw new Error(`the ${v.propertyName} is required but not exist`);
>>>>>>> yutisTest
            }


        }
<<<<<<< HEAD
        if (errors.length > 0) {
            const error = { type: ErrorTypes.VALIDATION }
            error.data = errors
            throw error
        }
        return true
    }
    catch (error) {
=======

        return true;
    }
    catch (error) {
        console.log(error.message," error");
>>>>>>> yutisTest
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
