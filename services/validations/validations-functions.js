const required = (value = null) => {
    if (value) {
        return true
    }
    return false;
}
const correctEmail = () => {
    return true

}
const dateType = (date) => {
    let date1 = new Date(date)
    console.log({ date1 });
    if (date1 == 'Invalid Date')
        return false
    return true

}


const correctDate = (date) => {
    return true;
    // האם אפשר לבדוק שהשנה הוא עד שנה מעכשיו בצורה קצרה יותר מגולדי בצד לקוח
    // return date > new Date() && date < new Date()+1

}
const correctHour = (hour) => {

    return true
    //contatins ':' and two number before the ':' and two number after the ':'","the number must be between 00:00 to 24:59
}

const containsOnlyLetters = () => {
    return true;
}
const correctPhone = (number) => {
    return /^0\d{8,9}$/.test(number)
}

const googlemaps = () => {
    return true
}

const dataExistsInTable = (value, arguments) => {
    return true
    //for example : "check in the clients table if this phone is exist"
}
// const dataNotExistsInTable = (value, arguments) => {

// }
// const unique = (value, where) => {

// }
const correctConcretAtributes = () => {
    return true
    //check in the concretType table if all the 4 concret attribute is exist and the values of them is correct
}

const positiveNumber = (number) => {
    return number > 0
}

const HebrewLetters = () => {
    return true;
}
const EnglishLetters = (word) => {
    return /^\w[a-z,A-Z]*$/.test(word)
}
const onlyNumbersInString = (numbersString) => {
    return /^\d*$/.test(numbersString)
}
const notCheck = () => {
    return true;
}
const type = (value, type) => {
    return typeof value == type
}
const maxLength = (value, ...max) => {
    return value < max
}
const bit = (value) => {
    return value == 0 || value == 1 || value == 'True' || value == 'False'
}
const dataNotExistsInTable = (value) => {
    return true;
}
const minLength = (value, min) => {
    return value.length > min
}
const betweenLength = (value, min, max) => {
    return value.length > min && value.length < max
}
const specificLength = (value, len) => {
    return value.length == len
}
const unique = (value, table) => {
    return true;
    // check that the value unique in the table//
}
const validation = {
    containsOnlyLetters: containsOnlyLetters,
    required: required,
    dateType: dateType,
    correctDate: correctDate,
    correctHour: correctHour,
    correctPhone: correctPhone,
    googlemaps: googlemaps,
    dataExistsInTable: dataExistsInTable,
    correctConcretAtributes: correctConcretAtributes,
    type: type,
    positiveNumber: positiveNumber,
    HebrewLetters: HebrewLetters,
    EnglishLetters: EnglishLetters,
    onlyNumbersInString: onlyNumbersInString,
    correctEmail: correctEmail,
    notCheck: notCheck,
    dataNotExistsInTable: dataNotExistsInTable,
    maxLength: maxLength,
    minLength: minLength,
    betweenLength: betweenLength,
    specificLength: specificLength,
    unique: unique,
    bit: bit,

}

module.exports = { validation }