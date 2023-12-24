
const removeKeysFromObject = (origin, keys) => {
    // console.log({origin, keys})
    const newObject = Object.keys(origin).filter(k => keys.includes(k) === false)
        .reduce((obj, key) => {
            obj[key] = origin[key]
            return obj
        }, {})
    return newObject
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


module.exports = { removeKeysFromObject, clone, cloneObject }