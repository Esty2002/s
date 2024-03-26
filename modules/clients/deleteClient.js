const { getData, deleteData } = require('../../services/axios');
const { modelNames } = require('../utils/schemas');
const { SQL_CLIENTS_TABLE } = process.env


async function deletedClientByCode(clientCode, userName) {
    try {
        const exist = await getData(`/read/readMany/${SQL_CLIENTS_TABLE}`, { clientCode })
        if (exist.status == 200) {
            let result;

            let obj = {
                
                data: { disabled: true, disabledDate: new Date(), disableUser: userName },
                condition: { clientCode }
            }

            result = await deleteData(`/delete/deleteone/${modelNames.CLIENTS}`, obj)
            return result.data;
        }

        return false
    }
    catch(error){
        throw error;
    }
}

module.exports = { deletedClientByCode }   