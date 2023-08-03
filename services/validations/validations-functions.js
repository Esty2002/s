<<<<<<< HEAD
const { getData } = require("../axios");
=======
const { getData, sqlServer, postData } = require("../axios");
>>>>>>> yutisTest

const required = (value = null) => {
    if (value) {
        return true;
    }
    throw new Error(`the value ${value} is required`);
};

const dateType = (date) => {
<<<<<<< HEAD
    let date1 = new Date(date);
=======
    let date1 = new Date(date)
>>>>>>> yutisTest
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
<<<<<<< HEAD
    if (/^0\d{8,9}$/.test(number) && number.length <= 10)
        return true
    throw new Error(`the phonenumber ${number} is not in correct format`)
=======
    if (/^0\d{8,9}$/.test(number))
        return true
    throw new Error(`the number  not correctttt`)
>>>>>>> yutisTest
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
<<<<<<< HEAD
    if (/^\w[a-z,A-Z]*$/.test(word))
        return true
    throw new Error(`the value ${word} not `)
=======
    return /^\w[a-z,A-Z]*$/.test(word)
}

const onlyNumbersInString = (numbersString) => {

    if( /^\d*$/.test(numbersString)){
        return true
    }
        
    throw new Error(`the value ${numbersString} not only string`)
>>>>>>> yutisTest
}

const onlyDigitsInString = (numbersString) => {
    if (/^\d*$/.test(numbersString))
        return true
    throw new Error(`the value ${numbersString} is required to be only digits`)
}

const notCheck = () => {
    return true;
}
<<<<<<< HEAD
const type = (value, arg) => {

    if (isNaN(value)) {
        if (arg == "number") {
            throw new Error(`the value ${value} is not typeof number`)

=======
const type = (value, arg) => {     
    if( isNaN(value)){
        if(arg=="string"){
            return true
>>>>>>> yutisTest
        }
    }
<<<<<<< HEAD
    return true;
=======
    if(arg=="number"){
        return true
>>>>>>> yutisTest

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
<<<<<<< HEAD
    throw new Error(`the length of the ${value} is not correct`);
}

// const clientCodeIsExistInDB = async (field, arg) => {
//     let entityName1 = arg.entityName;
//     let condition = {}
//     condition[arg.field] = field;
//     let ans = await getData(`/read/readOne/${entityName1}`, condition)
//     if (ans.data.length == 0) {
//         return true;
//     }
//     else {
//         throw new Error(`the ${val}: ${field} is not unique`);
//     }
// }

const recordExistInDB = async (value, arg) => {
    const { entityName, field, exist } = arg;
    try {
        console.log(entityName, field, exist, 'entityName, field, exist');
        const condition = {}
        condition[arg.field] = value;
        let ans = await getData(`/read/readOne/${entityName}`, condition)
        if (exist) {
            if (ans.data.length > 0) {
                return true
            }
            else {
                throw new Error('The record does not exist');
            }
        }
        else {
            if (ans.data.length == 0) {
                return true
            }
            else {
                throw new Error('The record already exists');
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
            console.log({ value });
            recordExistInTable(`${value}`, { entityName: "BuytonItems", field: "itemcode" });
        }
    }
    catch (error) {
        throw error;
    }
};

const correctTable = async (value) => {
    if (value === "FinishProducts" || value === "BuytonItems") {
        return true;
    }
    throw new Error(`you cant connect to ${value} table`)
}
const theDateBeforToday = (value) => {
    let date2 = new Date(value)

    if (date2 - new Date > 0) {
        throw new Error('the date is in the future while it has to be in the past')
    }

    console.log('yes date');
    return true
}
const theDateAfterToday = (value) => {
    let date3 = new Date(value)
    if ((date3 - new Date()) > 0) {
        return true
    }

    throw new Error('the date is before today ')

=======
    throw new Error(`the length of the ${value} not correct`);
}
const clientCodeIsExistInSQL = async (field, arg) => {
    let tableName1 = arg.tableName
    const val = arg.field
    let obj={}
    obj.condition={[val]:field}
    let ans = await postData(`read/readMany/${tableName1}`,obj)
    if (ans.data.length == 0) {
        return true

    }
    else {
        throw new Error('the client is exists')
    }


}

const concretEmail = (value) => {
    if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value))
        return true
    throw new Error('the email not concret')
>>>>>>> yutisTest
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
    correctTable,
    onlyLetters,
    theDateAfterToday,
    theDateBeforToday,
    betweenNumbers
}

module.exports = { validation }