require('dotenv').config()
const { sqlServer, postData, getData } = require('../../services/axios');
const { objectsForValidations } = require('../../services/validations/validations-objects')
const { checkObjectValidations, checkObjectForUpdate } = require('../../services/validations/use-validations')
const createNewLead = async (obj = null) => {
    let result;
    if (obj && obj.supplyDate) {
        obj.serialNumber = await getData(sqlServer, '/read/countdocuments/leads')
        obj.serialNumber += 1;
        obj.disable = false;
        obj.leadStatus = "חדש"
        const newObj = {
            collection: "leads",
            data: obj
        }

        const validation = checkObjectValidations(obj, objectsForValidations.leads)
        console.log('after validation');
        console.log(validation);
        if (validation) {
            result = await postData(sqlServer, '/create/insertone', newObj)
            return result
        }

        
    }
    else {
        throw new Error("the obj not received")
    }
    return result;
}


const updateLead = async ({ obj = null, filter = null }) => {
    let result;
    if (filter && obj) {
        const newObj = {
            collection: 'leads',
            filter,
            set: { $set: obj }
        }
        const validation = checkObjectForUpdate(obj, objectsForValidations.leads)
        console.log('after validation');
        console.log(validation);
        if (validation) {
            result = await postData(sqlServer, '/update/updateone', newObj)
            return result
        }


    }
    else {
        throw new Error("the obj or filter are not defined");
    }

    return result;
}



const allLeadsDetails = async ({ filter, sort, skip, limit, project }) => {
    try {
        const aggregate = [{ $match: filter }, { $sort: sort }, { $skip: skip }, { $limit: limit }, { $project: project }]
        const result = await postData(sqlServer, '/read/aggregate', {
            collection: 'leads',
            aggregate
        });
        return result;
    }
    catch (error) {
        throw error;
    }
}


const changeLeadToOrder = async (serialNumber) => {
    // const resultUpdate = await mongo_collection_leads.updateOne(serialNumber, { disable: true, leadStatus: "old" });
    // const resultDetails = await mongo_collection_leads.find(serialNumber, {});
    // // כאן צריך להשתמש בפונקציה שמכניסה הזמנה חדשה ולשלוח לה את כל הנתונים שהתקבלו מהמונגו ולקבל את מספר ההזמנה ואחר כך לעדכן במונגו את מספר ההזמנה שיצא
    // return "success";

}








module.exports = { createNewLead, allLeadsDetails, updateLead, changeLeadToOrder }
