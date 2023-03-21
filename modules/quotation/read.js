
const { selectByConditions, getAllTheContacts } = require('../../services/sql/sql-operations');

//selectByConditions פונקציה הבונה מחרוזת מהמערך שהתקבל ושולחת את מחרוזת זו לפונקציה 
async function getQuotationByConditions(arrOfObjects) {
    let conditionsString = '';
    try {
        // לולאה העוברת על מערך האובייקטים
        for (let obj of arrOfObjects) {
            let keyObject = Object.keys(obj)[0];
            let valueObject = Object.values(obj)[0];
            switch (keyObject) {
                case 'payoffDate':
                case 'date':
                    let dateString = `(${keyObject} BETWEEN '${valueObject['from']}' AND '${valueObject['to']}') AND `;
                    conditionsString += `${dateString}`;
                    break;
                case 'discountPercent':
                case 'total':

                    if (valueObject['input2'] == null) {
                        conditionsString += `${keyObject}${valueObject['type']}${valueObject['input1']} AND `;
                    }
                    else {
                        conditionsString += `(${keyObject} BETWEEN ${valueObject['input1']} AND ${valueObject['input2']}) AND `;
                    }
                    break;
                default:
                    conditionsString += `${keyObject}=${valueObject} AND `;
                    break;
            }
        }
        conditionsString += `disabled=0`;
        const result = await selectByConditions('quotation', conditionsString);
        return result.recordset;
    }
    catch (error) {
        throw new Error('the array is not define, or sent uncorrect values');
    }
}
//selectByConditions פונקציה הבונה מחרוזת מהערך שהתקבל ושולחת את מחרוזת זו לפונקציה 
async function getQuotationItemsByQuotationCode(quotationCode) {
    try {
        let conditionsString = `quotationCode=${quotationCode} AND disabled=0`;
        const result = await selectByConditions('quotationItems', conditionsString);
        return result.recordset;
    }
    catch (error) {
        throw error;
    }
}

async function allContactDataList() {
    try {
        const ans = await getAllTheContacts()
        return ans.recordset.map(e => Object.values(e)[0])
    } 
    catch (error) {
        return error;
    }

}

module.exports = {
    getQuotationByConditions,
    getQuotationItemsByQuotationCode,
    allContactDataList
};







