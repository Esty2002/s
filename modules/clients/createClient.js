const { postData, getData } = require('../../services/axios')
const { modelNames } = require('../utils/schemas')

async function addOneClient(entity) {
    entity.addedDate = new Date()
    entity.disabled = false
    const data= { ...entity }
    delete data.id
    let unique = await getData(`/read/readMany/${modelNames.CLIENTS}`, { clientCode: entity.clientCode })
    if (unique.data.length === 0) {
        const result = await postData(`/create/createone/${modelNames.CLIENTS}`, {  data })
        return result;
    }
    else {
        return false
    }
}

module.exports = { addOneClient }