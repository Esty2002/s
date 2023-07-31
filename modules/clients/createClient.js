const { postData, getData } = require('../../services/axios')
const { SQL_CLIENTS_TABLE } = process.env

async function addOneClient(obj) {

    const values = { ...obj }
    delete values.Id
    console.log(SQL_CLIENTS_TABLE,'idddddddddddddddd');
    let unique = await  (`/read/readMany/${SQL_CLIENTS_TABLE}`, { ClientCode: obj.ClientCode })

    if (unique.data.length === 0) {
        const result = await postData('/create/createone', { entityName: SQL_CLIENTS_TABLE, values: values })
        return result;
    }
    else {
        return false
    }
}

module.exports = { addOneClient }