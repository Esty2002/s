const fs = require('fs')
const path = require('path')
function newLine(url) {
    fs.appendFileSync(url, '\n')
}

function parseObjectToText(object) {

    // console.log(object, 'llll');
    let txtObj = '\n';
    for (let key in object) {
        txtObj += `${key}: ${object[key]}, \n`
        // console.log(txtObj, ' txtObj');

    }
    txtObj+=`${'\n'}`
    return txtObj;
}

function logToFile(object) {
    let txt = ''
    let text = ''
    // console.log(object, ' object in start');
    for (let i in object) {
        // console.log(object[i], ' object[i]');
        if (typeof (object[i]) != 'string' && typeof (object[i]) != 'boolean' && typeof (object[i]) != 'number') {
            txt+= parseObjectToText(object[i])
        }
        else {
            txt = object[i]
        }

        text = `last time login in the function ${object.name} : ${new Date().toDateString()} - ${new Date().toLocaleTimeString()}  ${'\n'}description: ${object.description}
        ${'\n'}${i}: {${txt}}`
    }

    // console.log(text, ' text');

    if (!fs.existsSync(path.join(__dirname, '../services/logger'))) {
        fs.mkdirSync(path.join(__dirname, '../services/logger'))
        fs.writeFileSync('services/logger/logger.txt', '')
    }

    fs.appendFileSync('services/logger/logger.txt', text)
    newLine('services/logger/logger.txt')
    fs.appendFileSync('services/logger/logger.txt', '----------------------------------')
    newLine('services/logger/logger.txt')

}
module.exports = { logToFile }