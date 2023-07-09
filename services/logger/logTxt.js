const fs = require('fs')
const path = require('path')
let url = ''
function newLine(url) {
    fs.appendFileSync(url, '\n')
}
function parseObjectToText(object) {
    let txtObj = '\n';
    for (let key in object) {
        txtObj += `${key}: ${object[key]}, \n`
    }
    txtObj += `${'\n'}`
    return txtObj;
}
let lastName = 'read'
function logToFile(object) {
    let text = ''
    for (let i in object) {
        if (typeof (object[i]) != 'string' && typeof (object[i]) != 'boolean' && typeof (object[i]) != 'number') {
            object[i] = parseObjectToText(object[i])
        }
        text = `last time login in the action '${object.name}' : ${new Date().toDateString()} - ${new Date().toLocaleTimeString()}  
        ${'\n'}description: ${object.description}
        ${'\n'}${i}: ${object[i]}`

    }
    if (!fs.existsSync(path.join(__dirname, 'loggerTxt'))) {
        fs.mkdirSync(path.join(__dirname, 'loggerTxt'))
        url = 'services/logger/loggerTxt/loggerTxt.txt'
        fs.writeFileSync(url, '')
    }
    url = 'services/logger/loggerTxt/loggerTxt.txt'


    if (lastName != object.name) {
        lastName = object.name;
        fs.appendFileSync(url, 'next function:')
        newLine(url)
    }
    fs.appendFileSync(url, text)
    newLine(url)
    fs.appendFileSync(url, '----------------------------------')
    newLine(url)

}
module.exports = { logToFile }