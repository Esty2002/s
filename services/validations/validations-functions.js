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
        throw new Error(`the date ${date} not valid`);
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
    throw new Error(`the number ${number}  not correct`)
}

const positiveNumber = (number) => {
    if (typeof number == 'number' && number > 0)
        return true;
    throw new Error("the number not positive")
}

const onlyLetters = (word) => {
    return true;
}
const EnglishLetters = (word) => {
    return /^\w[a-z,A-Z]*$/.test(word)
}

const onlyNumbersInString = (numbersString) => {

    if (/^\d*$/.test(numbersString))
        return true
    throw new Error(`the value ${numbersString} not only string`)
}

const notCheck = () => {
    return true;
}
const type = (value, arg) => {
    if (isNaN(value)) {
        if (arg == "string") {
            console.log('string@@@@');
            return true
        }
        throw new Error(`the value ${value} not typeof value`)

    }
    if (arg == "number") {
        console.log('num@@@');
        return true

    }
    throw new Error(`the value ${value} not typeof value`)

}

const maxLength = (value, max) => {
    if (value.length < max)
        return true
    throw new Error(`the value ${value} too long `)

}

const bit = (value) => {
    if (value == 0 || value == 1 || value == 'True' || value == 'False')
        return true;
    throw new Error(`the  ${value} it's not bit`);
}

const minLength = (value, min) => {
    if (value.length > min)
        return true
    throw new Error(`the value ${value} too short`)
}

const betweenLength = (value, arg) => {
    if (value.length > arg.min && value.length < arg.max)
        return true
    throw new Error(`the value ${value} not betweenLength`)
}

const specificLength = (value, len) => {
    if (value.length == len) {
        return true;
    }
    throw new Error(`the length of the ${value} not correct`);
}

const clientCodeIsExistInSQL = async (field, arg) => {
    let tableName1 = arg.tableName;
    let val = arg.field;
    let ans = await getData(`/read/readAll/${tableName1}/${val}=${field}`)
    if (ans.data.length == 0) {
        return true;
    }
    else {
        throw new Error(`the ${val}: ${field} is not unique`);
    }
}
const recordExistInTable = async (value, arg) => {

    const { tableName, field } = arg;
    let ans = await getData(`read/exist/${tableName}/${field}/${value}`)
    if (ans.data) {
        return true
    }
    else {
        throw new Error('the Record is not exist');
    }
};

const corectEmail = (value) => {
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
            throw new Error("the date not correct")
        }
        else {
            if (today.getMonth() < date.getMonth())
                return true;
            throw new Error("the date not correct");
        }
    }
    else {
        if (today.getFullYear() < date.getFullYear()) {
            return true;
        }
        throw new Error("the date not correct")
    }
};

const checkConcretItem = async (value) => {
    try {
        if (parseInt(value).toString() != 'NaN') {
            recordExistInTable(value, { tableName: "tbl_FinishProducts", field: "id" });
        }
        else {
            console.log({ value });
            recordExistInTable(`${value}`, { tableName: "tbl_BuytonItems", field: "itemcode" });
        }
    }
    catch (error) {
        throw error;
    }
};

const correctTable = async (value) => {
    if (value === "tbl_FinishProducts" || value === "tbl_BuytonItems") {
        return true;
    }
    throw new Error(`you cant connect to ${value} table`)
}
const theDateBeforToday = (value) => {
    console.log('dateeeeeee');
    let date2 = new Date(value)
    console.log(date2, new Date(), 'new date');

    if (date2 - new Date > 0) {
        throw new Error('the date after today ')
    }

    console.log('yes date');
    return true
}
const theDateAfterToday = (value) => {
    console.log('dateeeeeee');
    let date3 = new Date(value)
    if ((date3 - new Date()) > 0) {
        console.log('yyyuu date');
        return true
    }

    throw new Error('the date befor today ')

}
const validation = {
    required: required,
    dateType: dateType,
    correctPhone: correctPhone,
    type: type,
    positiveNumber: positiveNumber,
    EnglishLetters:EnglishLetters,
    onlyNumbersInString: onlyNumbersInString,
    notCheck: notCheck,
    maxLength: maxLength,
    minLength: minLength,
    betweenLength: betweenLength,
    specificLength: specificLength,
    bit: bit,
    clientCodeIsExistInSQL: clientCodeIsExistInSQL,
    corectEmail: corectEmail,
    dateInFuture: dateInFuture,
    hourType: hourType,
    checkConcretItem: checkConcretItem,
    recordExistInTable: recordExistInTable,
    correctTable: correctTable,
    onlyLetters: onlyLetters,
    theDateAfterToday: theDateAfterToday
}

module.exports = { validation }