const { postData, getData } = require('../../services/axios')
const { SQL_CLIENTS_TABLE } = process.env

async function addOneClient(entity) {
    entity.CreationDate = new Date()
    entity.Disabled = false
    const values = { ...entity }
    delete values.Id
    let unique = await getData(`/read/readMany/${SQL_CLIENTS_TABLE}`, { ClientCode: entity.ClientCode })

    if (unique.data.length === 0) {
        const result = await postData('/create/createone', { entityName: SQL_CLIENTS_TABLE, values: values })
        return result;
    }
    else {
        return false
    }
}

module.exports = { addOneClient }