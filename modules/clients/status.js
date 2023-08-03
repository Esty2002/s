const {  getData } = require('../../services/axios')
const { SQL_STATUS_TABLE } = process.env

async function getStatusNumber() {
    try {
        const result = await getData(`/read/readMany/${SQL_STATUS_TABLE}`);
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
        const result = await getData(`/read/readMany/${SQL_STATUS_TABLE}`, { Id: id });
        if (result.status == 200)
            return result
        else return false
    }
    catch (error) {
        throw error
    }
};

module.exports = { getStatusNumber, getStatusNameById }
