
const { sqlServer, postData, getData } = require('../../services/axios');
const { objectsForValidations } = require('../../services/validations/validations-objects');
const { checkObjectValidations, checkObjectForUpdate } = require('../../services/validations/use-validations');

const createNewLead = async (obj = null) => {

    if (obj && obj.supplyDate) {
        obj.serialNumber = (await getData(sqlServer, '/mongo/countdocuments/leads')).response;
        obj.serialNumber += 1;
        obj.disable = false;
        obj.leadStatus = "חדש";
        const newObj = {
            collection: "leads",
            data: obj
        };
        const validation = checkObjectValidations(obj, objectsForValidations.leads);
        if (validation) {
            const result = await postData(sqlServer, '/mongo/insertone', newObj);
            return result;
        }
        else {
            throw new Error("one or more of the arguments are not valid");
        }
    }
    else {
        throw new Error("the obj not received");
    }
};

const updateLead = async (filter = null, obj = null) => {

    if (filter && obj) {
        const newObj = {
            collection: 'leads',
            filter,
            set: { $set: obj }
        };
        const validation = checkObjectForUpdate(obj, objectsForValidations.leads);
        if (validation) {
            const result = await postData(sqlServer, '/mongo/updateone', newObj);
            return result;
        }
        else {
            throw new Error("one or more of the arguments are not valid");
        }

    }
    else {
        throw new Error("the obj or filter are not defined");
    }
};


const allLeadsDetails = async ({ filter = {}, sort = {}, skip = 0, limit = 20, project = {} }) => {
    try {
        const aggregate = [{ $match: filter }, { $sort: sort }, { $skip: skip }, { $limit: limit }, { $project: project }];
        console.log(aggregate);
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
