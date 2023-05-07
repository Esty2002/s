
const { objectsForValidations } = require('./validations-objects')

const checkObjectValidations = (body, obj) => {

    let keysObj = Object.keys(obj)
    let keysBody = Object.keys(body)

    keysObj = keysObj.sort()
    keysBody = keysBody.sort()
    let flag = true
    for (let i = 0; i < keysObj.length; i++) {
        if (keysObj[i] == keysBody[i]) {
            let arrKeys = obj[keysObj[i]]

            if (arrKeys[0] == undefined) {
                checkObjectValidations(body[keysObj[i]], arrKeys)
            }
            else {
                for (let j = 0; j < arrKeys.length; j++) {
                    if (!arrKeys[j].func(body[keysObj[i]], arrKeys[j].arguments)) {
                        flag = false
                        break;
                    }

                }
            }
        }
        else {
            flag = false;
            break;
        }
    }

    
    return flag;

}

const checkObjectForUpdate = (obj, body) => {
    let flag = true
    for (let i in obj) {
        for (let j in body) {
            if (j == i) {
                let arr = body[j]
                if (arr[0] == undefined) {
                    checkObjectForUpdate(obj[j], arr)
                }
                else {
                    for (let k = 0; k < arr.length; k++) {
                        if (!arr[k].func(obj[j], arr[k].arguments)) {
                            flag = false
                            break;
                        }

                    }
                }

            }
        }
    }
    return flag

}

module.exports = { checkObjectValidations, checkObjectForUpdate }
