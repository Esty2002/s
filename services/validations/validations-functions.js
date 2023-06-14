const required = (value = null) => {
    if (value) {
        return true
    }
    return false;
};

const dateType = (date) => {
    let date1 = new Date(date)
    if (date1 == 'Invalid Date')
        return false
    return true

};

const correctPhone = (number) => {
    return /^0\d{8,9}$/.test(number)
}

const positiveNumber = (number) => {
    return number > 0
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
const type = (value, type) => {
    return typeof value == type
}
const maxLength = (value,max) => {
    return value.length < max
}
const bit = (value) => {
    return value == 0 || value == 1 || value == 'True' || value == 'False'
}

const minLength = (value, min) => {
    return value.length > min
}
const betweenLength = (value, min, max) => {
    return value.length > min && value.length < max
}
const specificLength = (value, len) => {
    if( value.length == len){
        return true;
    }
    throw new Error(`the length of the ${value} not correct`);
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

}

module.exports = { validation }