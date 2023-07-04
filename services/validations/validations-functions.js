const { getData, sqlServer } = require("../axios");

const required = (value = null) => {
    if (value) {
        return true;
    }
    return false;
};

const dateType = (date) => {
    let date1 = new Date(date);
    if (date1 == 'Invalid Date')
        return false;
    throw new Error(`the date ${date} not valid`);

};
const hourType = (data) => {
    if (data.length === 5 && data.indexOf(":") == 2 && (((data.slice(0, 1) == 0) && (/^0\d{8,9}$/.test(data.slice(1, 1))) ||
        parseInt(data.slice(0, 2)) <= 23)) && ((parseInt(data.slice(3, data.length)) >= 10 && parseInt(data.slice(3, data.length)) <= 59) ||
            ((data.slice(3, 1) == 0) && (/^0\d{8,9}$/.test(data.slice(3, 1)))))) {
        return true;
    }
    throw new Error("the hour not correct")


}
const correctPhone = (number) => {
    console.log('concret phone');
    if (/^0\d{8,9}$/.test(number) && number.length <= 10)
        return true
    throw new Error(`the number  not correct`)
}

const positiveNumber = (number) => {
    if (typeof number == 'number' && number > 0)
        return true;
    throw new Error("the number not positive")
}

// const EnglishLetters = (word) => {
//     return /^\w[a-z,A-Z]*$/.test(word)
// }

const onlyNumbersInString = (numbersString) => {
    return /^\d*$/.test(numbersString)
}

const notCheck = () => {
    return true;
}

const type = (value, arg) => {
    if (typeof value == arg)
        return true
    throw new Error('not typeof value')
}

const maxLength = (value, max) => {
    if (value.length < max)
        return true;
    else
        throw new Error("the length of the string is too long");
}

const bit = (value) => {
    if (value == 0 || value == 1 || value == 'True' || value == 'False')
        return true;
    throw new Error(`the  ${value} it's not bit`);
}

const minLength = (value, min) => {
    if (value.length > min)
        return true;
    throw new Error("the length of the string is too short");
}

const betweenLength = (value, arg) => {
    if (value.length > arg.min && value.length < arg.max)
        return true;
    throw new Error(`the length of the ${value} is too short or too long`);
}

const specificLength = (value, len) => {
    if (value.length == len) {
        return true;
    }
    throw new Error(`the length of the ${value} not correct`);
}

const clientCodeIsExistInSQL = async (field, arg) => {
    let tableName1 = arg.tableName
    let val = arg.field
    let ans = await getData(`/read/readAll/${tableName1}/${val}=${field}`)
    if (ans.data.length == 0) {
        return true

    }
    else {
        throw new Error('the client is exist');
    }


}
const RecordExistInTable = async (value, arg) => {

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
            RecordNotExistInTable(value, { tableName: "tbl_FinishProducts", field: "id" });
        }
        else {
            console.log({ value });
            RecordNotExistInTable(`${value}`, { tableName: "tbl_BuytonItems", field: "itemcode" });
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
const validation = {
    required: required,
    dateType: dateType,
    correctPhone: correctPhone,
    type: type,
    positiveNumber: positiveNumber,
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
    RecordExistInTable: RecordExistInTable,
    correctTable:correctTable
}

module.exports = { validation }