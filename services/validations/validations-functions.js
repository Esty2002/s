const { getData, sqlServer, postData } = require("../axios");

const required = (value = null) => {
    if (value) {
        return true
    }
    return false;
};

const dateType = (date) => {
    let date1 = new Date(date)
    console.log(date1,'ddddaaattee');
    if (date1 == 'Invalid Date')
        return false
    throw new Error(`the date ${date} not valid`)

};

const correctPhone = (number) => {
    console.log('concret phone');
    if (/^0\d{8,9}$/.test(number))
        return true
    throw new Error(`the number  not correctttt`)
    // console.log('tttttttttttt');
}

const positiveNumber = (number) => {
    return number > 0
}
const EnglishLetters = (word) => {
    return /^\w[a-z,A-Z]*$/.test(word)
}

const onlyNumbersInString = (numbersString) => {

    if( /^\d*$/.test(numbersString)){
        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
        return true
    }
        
    throw new Error(`the value ${numbersString} not only string`)
}
const notCheck = () => {
    return true;
}
const type = (value, arg) => {
    console.log(typeof value, arg, "llllllllllllllllllllllllllllllllllllllllllllllllll");
     
    if( isNaN(value)){
        if(arg=="string"){
            console.log('string@@@@');
            return true
        }
        throw new Error(`the value ${value} not typeof value`)

    }
    if(arg=="number"){
        console.log('num@@@');
        return true

    }
    throw new Error(`the value ${value} not typeof value`)

        
        
      
     
     
    // if (typeof value === arg)
    //     return true
    // throw new Error('not typeof value')
    // console.log(`not typeof ${value}`);
}
const maxLength = (value, max) => {
    if( value.length < max)
        return true
    throw new Error(`the value ${value} too long `)
    
}
const bit = (value) => {
    if (value == 0 || value == 1 || value == 'True' || value == 'False')
        return true
    throw new Error(`the  ${value} it's not bit`)
}

const minLength = (value, min) => {
    if( value.length > min)
        return true
    throw new Error(`the value ${value} too short`)
}
const betweenLength = (value, arg) => {
    if( value.length > arg.min && value.length < arg.max)
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
    console.log(" in clientCodeIsExistInSQL ");
    let tableName1 = arg.tableName
    const val = arg.field
    console.log(field, tableName1,arg, 'tableName1');
    let obj={}
    obj.condition={[val]:field}
    let ans = await postData(`read/readMany/${tableName1}`,obj)
    console.log(ans.data, 'aaannnsss');
    if (ans.data.length == 0) {
        return true

    }
    else {
        console.log('before error')
        throw new Error('the client is exists')
    }


}

const concretEmail = (value) => {
    console.log('qqqqqqqqq');
    if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value))
        return true
    // console.log('vvvvvfffffffffff');
    throw new Error('the email not concret')
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
    concretEmail: concretEmail
}

module.exports = { validation }