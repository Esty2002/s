const { readAll } = require("../../../dbserver/services/sql/sql-operations");
const { getData,   } = require("../axios");

const required = (value = null) => {
    console.log('required');
    if (value) {
        return true
    }
    return false;
};

const dateType = (date) => {
    let date1 = new Date(date)
    console.log(date1,'ddddaaattee');
    if (date1 == 'Invalid Date')
         throw new Error(`the date ${date} not valid`)

    return true

};

const correctPhone = (number) => {
    console.log('concret phone');
    if (/^0\d{8,9}$/.test(number))
        return true
    else{
        console.log('tttttttttttt');

        throw new Error(`the number  not correctttt`)


    }
}

const positiveNumber = (number) => {
    return number > 0
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
const type = (value, arg) => {
    console.log(typeof value, arg, "llllllllllllllllllllllllllllllllllllllllllllllllll");
     
    if( isNaN(value)){
        if(arg=="string"){
            console.log('string@@@@');
            return true
        }
        throw new Error('not typeof value')

    }
    if(arg=="number"){
        console.log('num@@@');
        return true

    }
    throw new Error('not typeof value')

        
        
      
     
     
    // if (typeof value === arg)
    //     return true
    // throw new Error('not typeof value')
    // console.log(`not typeof ${value}`);
}
const maxLength = (value, max) => {
    return value.length < max
}
const bit = (value) => {
    if (value == 0 || value == 1 || value == 'True' || value == 'False')
        return true
    throw new Error(`the  ${value} it's not bit`)
}

const minLength = (value, min) => {
    return value.length > min
}
const betweenLength = (value, arg) => {
    return value.length > arg.min && value.length < arg.max
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
    let val = arg.field
    console.log(field, tableName1, 'tableName1');
    let ans = await getData(  `read/readAll/${tableName1}/${val}=${field}`)
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
const theDateBeforToday=(value)=>{
    console.log('dateeeeeee');
    let date2 = new Date(value)
        console.log(date2,new Date(),'new date');

    if(date2- new Date>0){
        throw new Error('the date after today ')
    }

    console.log('yes date');
    return true
}
const theDateAfterToday=(value)=>{
    console.log('dateeeeeee');
    let date3 = new Date(value)
    if((date3-new Date())>0){
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
    onlyNumbersInString: onlyNumbersInString,
    notCheck: notCheck,
    maxLength: maxLength,
    minLength: minLength,
    betweenLength: betweenLength,
    specificLength: specificLength,
    bit: bit,
    clientCodeIsExistInSQL: clientCodeIsExistInSQL,
    concretEmail: concretEmail,
    // theDateBeforToday:theDateBeforToday,
    theDateAfterToday:theDateAfterToday
}

module.exports = { validation }