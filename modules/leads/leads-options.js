require('dotenv').config()
const { sqlServer, postData, getData } = require('../../services/axios');

const createNewLead = async (obj = null) => {
    let result;
    if (obj && obj.supplyDate) {
        obj.serialNumber = await getData(sqlServer, '/mongo/countdocuments/leads')
        obj.serialNumber += 1;
        obj.disable = false;
        obj.leadStatus = "חדש"
        const newObj = {
            collection: "leads",
            data: obj
        }

        result = await postData(sqlServer, '/mongo/insertone', newObj)
    }
    else {
        throw new Error("the obj not received")
    }
    return result;
}

const updateLead = async (filter = null, obj = null) => {
    let result;
    if (filter && obj) {
        const newObj = {
            collection: 'leads',
            filter,
            set: { $set: obj }

        }
        result = await postData(sqlServer, '/mongo/updateone', newObj)

    }
    else {
        throw new Error("the obj or filter are not defined");
    }

    return result;
}



const allLeadsDetails = async ({ filter = {}, sort = {}, skip = 0, limit = 20, project = {} }) => {
    try {
        const aggregate = [{ $match: filter }, { $sort: sort }, { $skip: skip }, { $limit: limit }, { $project: project }]

        const result = await postData(sqlServer, '/mongo/aggregate', {
            collection: 'leads',
            aggregate
        });
        return result;
    }
    catch (error) {
        throw error;
    }
}

module.exports = { createNewLead, allLeadsDetails, updateLead }
