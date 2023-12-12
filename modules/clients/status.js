const {  getData } = require('../../services/axios');
const { modelNames } = require('../utils/schemas');

async function getStatusNumber() {
    try {
        const result = await getData(`/read/readMany/${modelNames.STATUS}`);
        if (result.status == 200)
            return result
        else return false
    }
    catch (error) {
        throw error
    }

};

async function getStatusNameById(id) {
    try {
        const result = await getData(`/read/readMany/${modelNames.STATUS}`, {  id });
        if (result.status == 200)
            return result
        else return false
    }
    catch (error) {
        throw error
    }
};

module.exports = { getStatusNumber, getStatusNameById }
