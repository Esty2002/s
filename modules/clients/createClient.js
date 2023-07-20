const { postData, getData } = require('../../services/axios')
const { SQL_CLIENTS_TABLE } = process.env

async function addOneClient(obj) {

    const values = { ...obj }
    delete values.Id

    let unique = await getData(`/read/readMany/${SQL_CLIENTS_TABLE}`, { ClientCode: obj.ClientCode })

    if (unique.data.length === 0) {
        const result = await postData('/create/creatone', { entityName: SQL_CLIENTS_TABLE, values: values })
        return result;
    }
    else {
        return false
    }
}

module.exports = { addOneClient }