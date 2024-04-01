const { getData } = require("../axios");

const required = (value = null) => {
    if (value) {
        return true;
    }
    throw new Error(`the value ${value} is required`);
};

const dateType = (date) => {
    let date1 = new Date(date);
    if (date1 == 'Invalid Date')
        throw new Error(`the date ${date} is not valid`);
    return true
};
const hourType = (data) => {
    if (data.length === 5 && data.indexOf(":") == 2 && (((data.slice(0, 1) === '0') && (/\d$/.test(data.slice(1, 2))) ||
        parseInt(data.slice(0, 2)) <= 23)) && ((data.slice(3, 4) == 0) && (/\d$/.test(data.slice(3, 4)))) ||
        ((parseInt(data.slice(3, data.length)) >= 10 && parseInt(data.slice(3, data.length)) <= 59)
        )) {
        return true;
    }
    throw new Error("the hour not correct")
}
const correctPhone = (number) => {
    if (/^0\d{8,9}$/.test(number) && number.length <= 10)
        return true
    throw new Error(`the phonenumber ${number} is not in correct format`)
}

const positiveNumber = (number) => {
    if (typeof number == 'number' && number > 0)
        return true;
    throw new Error(`the number:${number} is not positive`)
}

const onlyLetters = (word) => {
    return true;
}
const EnglishLetters = (word) => {
    if (/^\w[a-z,A-Z]*$/.test(word))
        return true
    throw new Error(`the value ${word} not `)
}

const onlyDigitsInString = (numbersString, arg) => {
    if (typeof numbersString === 'object') {
        let obj = numbersString[arg]
        return onlyDigitsInString(obj)
    }
    if (/^\d*$/.test(numbersString))
        return true
    throw new Error(`the value ${numbersString} is required to be only digits`)
}

const notCheck = () => {
    return true;
}
const type = (value, arg) => {
    if (typeof value === 'object') {
        if (arg.field) {
            const checkType = arg.type
            let obj = value[arg.field]
            return type(obj, checkType)
        }
    }
    if (isNaN(value)) {
        if (arg == "number") {
            throw new Error(`the value ${value} is not typeof number`)

        }
    }
    return true;

}

const maxLength = (value, max) => {
    if (value.length < max)
        return true
    throw new Error(`the value ${value} is too long`)

}

const bit = (value) => {
    if (value == 0 || value == 1 || value == 'True' || value == 'False')
        return true;
    throw new Error(`the ${value} is not bit`);
}

const minLength = (value, min) => {
    if (value.length > min)
        return true
    throw new Error(`the value ${value} is too short`)
}

const betweenLength = (value, arg) => {
    if (value.length > arg.min && value.length < arg.max)
        return true
    throw new Error(`the value ${value} is not betweenLength`)
}
const betweenNumbers = (value, arg) => {
    if (value > arg.min && value < arg.max)
        return true
    throw new Error(`the value ${value} not betweenNumbers `)

}
const specificLength = (value, len) => {
    if (value.length == len) {
        return true;
    }
    throw new Error(`the length of the ${value} is not correct`);
}

const recordExistInDB = async (value, arg) => {
    const { entityName, field, exist } = arg;
    console.log(arg);
    let { condition } = arg
    console.log(condition);
    try {
        if (condition === undefined) {
            condition = {}
        }

        condition[field] = value;
        if (typeof (value) === 'object') {
            if (value[field]) {
                condition[field] = value[field]
            }
        }
        let ans = await getData(`/read/exists/${entityName}`, condition)

        if (ans === exist) {
            return true
        }
        else {
            if (exist)
                throw new Error(`The record ${value} does not exist  in ${entityName}`);
            else {
                throw new Error(`The record ${value} exists in ${entityName}`);
            }
        }
    }
    catch (error) {

        throw error
    }
};
const recordExistInMultipleDB = async (value, arg) => {
    let { field, entityName, exist } = arg
    try {
        let condition = {}
        condition[field] = value;
        if (typeof (value) === 'object') {
            if (value[field]) {
                condition[field] = value[field]
            }
        }
        let response = await getData(`/read/uniqueInDB/${entityName}`, condition)
        const { data } = response;
        const dataItem = data.find(item => Object.keys(item)[0] === field)
        if (exist) {
            if (dataItem[field].length > 0)
                return true
            else
                throw new Error(`the record ${condition[field]} does not exist in db`)
        }
        else {
            if (dataItem[field].length === 0)
                return true;
            else {
                throw new Error(`the record ${condition[field]} exists in db`)
            }
        }
    }
    catch (error) {

        throw error
    }
};



const correctEmail = (value) => {
    if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value))
        return true
    throw new Error('the email not concret');
}
const dateInFuture = (value) => {
    const today = new Date(new Date().toISOString());
    const date = new Date(value);
    if (today.getFullYear() === date.getFullYear()) {
        if (today.getMonth() === date.getMonth()) {
            if (today.getDate() < date.getDate()) {
                return true;
            }
            throw new Error("the date is not correct")
        }
        else {
            if (today.getMonth() < date.getMonth())
                return true;
            throw new Error("the date is not correct");
        }
    }
    else {
        if (today.getFullYear() < date.getFullYear()) {
            return true;
        }
        throw new Error("the date is not correct")
    }
};

const checkConcretItem = async (value) => {
    try {
        if (parseInt(value).toString() != 'NaN') {
            recordExistInTable(value, { entityName: "FinishProducts", field: "id" });
        }
        else {
            recordExistInTable(`${value}`, { entityName: "BuytonItems", field: "itemcode" });
        }
    }
    catch (error) {
        throw error;
    }
};

const correctTable = async (value) => {
    if (value === "finishProducts" || value === "buytonItems") {
        return true;
    }
    throw new Error(`you cant connect to ${value} table`)
}
const theDateBeforeToday = (value) => {
    let date2 = new Date(value)

    if (date2 - new Date() > 0) {
        throw new Error('the date is in the future while it has to be in the past')
    }
    return true
}
const theDateAfterToday = (value) => {
    let date3 = new Date(value)
    if ((date3 - new Date()) > 0) {
        return true
    }

    throw new Error('the date is before today ')

}



const validation = {
    required,
    dateType,
    correctPhone,
    type,
    positiveNumber,
    EnglishLetters,
    onlyDigitsInString,
    notCheck,
    maxLength,
    minLength,
    betweenLength,
    specificLength,
    bit,
    correctEmail,
    dateInFuture,
    hourType,
    checkConcretItem,
    recordExistInDB,
    recordExistInMultipleDB,
    correctTable,
    onlyLetters,
    theDateAfterToday,
    theDateBeforeToday,
    betweenNumbers
}

const getFunctionArguments = (name) => {
    const keys = Object.keys(validation)
}

module.exports = { validation, getFunctionArguments }