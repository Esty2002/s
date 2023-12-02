const { getData, deleteData } = require('../../services/axios')
const { SQL_CLIENTS_TABLE } = process.env


async function deletedClientByCode(clientCode, userName) {
    try {
        const exist = await getData(`/read/readMany/${SQL_CLIENTS_TABLE}`, { clientCode })
        if (exist.status == 200) {
            let result;

            let obj = {
                entityName: SQL_CLIENTS_TABLE,
                values: { disabled: true, deletionDate: new Date(), userThatDelete: userName },
                condition: { clientCode }
            }

            result = await deleteData('/delete/deleteone', obj)
            return result.data;
        }

        return false
    }
    catch(error){
        throw error;
    }
}

module.exports = { deletedClientByCode }   