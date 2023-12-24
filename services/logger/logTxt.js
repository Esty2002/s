const fs = require('fs')
const path = require('path')
let url = ''
function newLine(url) {
    fs.appendFileSync(url, '\n')
}

let lastName = 'read'
function logToFile(object) {
    let text = ''
    let body = '';
    let { name, description, ...rest } = object
    for (let key in rest) {
        if (typeof (object[key]) != 'string' && typeof (object[key]) != 'boolean' && typeof (object[key]) != 'number')
            body += `${key} :${JSON.stringify(object[key])} \n`
        else
            body += `${key} :${object[key]} `
    }
    text = `last time login in the action '${name}' : ${new Date().toISOString()}  
        ${'\n'}description: ${description}
        ${'\n'}data: {${body}}`
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