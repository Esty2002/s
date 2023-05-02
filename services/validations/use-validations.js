
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
            if (!arrKeys[0]&&!arrKeys[0].func) {
                checkObjectValidations(body[keysObj[i]],arrKeys)
            }
            else {
                for (let j = 0; j < arrKeys.length; j++) {
                    if (!arrKeys[j].func(body[keysObj[i]],arrKeys[j].arguments)) {
                        flag = false
                        break;
                    }
                }
            }
        }
        else{
            flag=false;
            break;
        }

    }

    return flag;

}
module.exports = { checkObjectValidations }
