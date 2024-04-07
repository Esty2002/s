
const removeKeysFromObject = (origin, keys) => {
    // console.log({origin, keys})
    const newObject = Object.keys(origin).filter(k => keys.includes(k) === false)
        .reduce((obj, key) => {
            obj[key] = origin[key]
            return obj
        }, {})
    return newObject
}

const isEmptyObject = (object) => {
    if (object === undefined || object === null) {
        return true;
    }
    if (object instanceof Object) {
        return Object.keys(object).length === 0;
    }
    throw new Error('object must be an object or undefined or null')
}


function cloneArray(array) {
    let arr = [...array]
    return arr.map(item => clone(item))
}

function cloneObject(object) {
    if (object instanceof Date) {
        return new Date(object)
    }
    if (object instanceof Number || typeof object === 'number') {
        return object
    }
    if (object instanceof String || typeof object === 'string') {
        return object
    }


    if (object instanceof Function) {
        return new Function('return ' + object.toString())()
    }
    if (object instanceof Boolean || typeof object === 'boolean') {
        return object
    }
    if (object instanceof Object) {
        let ob = {}
        for (let key in object) {
            ob[key] = clone(object[key])
        }
        return ob;
    }

}



function clone(item) {
    if (Array.isArray(item)) {
        item = cloneArray(item)
    }
    else {
        item = cloneObject(item)
    }
    return item
}


function compareExactArrayValues(arr1, arr2) {
    const condition1 = arr1.every(val => arr2.includes(val))
    const condition2 = arr2.every(val => arr1.includes(val))
    return condition1 && condition2
}



module.exports = { isEmptyObject, removeKeysFromObject, clone, cloneObject, compareExactArrayValues }