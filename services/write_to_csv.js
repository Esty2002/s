
const fs = require('fs')


// פונקציה שמקבלת אוביקט ומציגה אותו בטבלת אקסל
//  csv הפונקציה מקבלת 2 ארגומנטים: האוביקט ושם שכך יקראו לדף 
// config או דרך ה csv_files יש לדאוג לפתוח תיקיית
function writeToCSV(data, name) {

    fs.writeFileSync(`csv_files/${name}.csv`, Object.keys(data[0]).join(','))
    let arr = []
    data.forEach(d => {
        fs.appendFileSync(`csv_files/${name}.csv`, '\n')
        let values = Object.values(d)
        values.forEach(value => {
            if (typeof (value) == 'object') {
                if (value.length == undefined)
                    arr.push('object')
                else
                    arr.push(`array(${value.length})`)
            }
            else {
                arr.push(value)
            }
        })
        fs.appendFileSync(`csv_files/${name}.csv`, arr.join(','))
        arr = []
    })
}

module.exports = { writeToCSV }