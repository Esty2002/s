const { postData, getData } = require('../../services/axios')
const { SQL_CLIENTS_TABLE } = process.env

async function addOneClient(obj) {

    const values = { ...obj }
    delete values.Id

    let unique = await getData(`/read/readMany/${SQL_CLIENTS_TABLE}`, { ClientCode: obj.ClientCode })

    if (unique.data.length === 0) {
<<<<<<< HEAD
        const result = await postData('/create/createone', { entityName: SQL_CLIENTS_TABLE, values: values })
=======
        const result = await postData('/create/createone',newObj)
>>>>>>> f5291c0209296599f25d5a979c5fd995441c5200
        return result;
    }
    else {
        return false
    }
}

module.exports = { addOneClient }