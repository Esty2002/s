const { putData } = require('../../services/axios')
const { modelNames } = require('../utils/schemas')
const { SQL_CLIENTS_TABLE } = process.env


async function updateClient(obj) {
    try {
        let clone = { ...obj }
        delete clone.Id

        let object = {
            entityName: modelNames.CLIENTS,
            data: clone,
            condition: { Id: obj.Id }
        }
        const response = await putData('/update/updateone', object)
        return response
    }
    catch (error) {
        throw error;
    }
}
module.exports = { updateClient } 
