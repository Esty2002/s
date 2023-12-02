const { postData, getData } = require('../../services/axios')
const { modelNames } = require('../../services/schemas')

async function addOneClient(entity) {
    entity.addedDate = new Date()
    entity.disabled = false
    const values = { ...entity }
    delete values.id
    let unique = await getData(`/read/readMany/${modelNames.CLIENTS}`, { clientCode: entity.clientCode })

    if (unique.data.length === 0) {
        const result = await postData('/create/createone', { entityName: modelNames.CLIENTS, values: values })
        return result;
    }
    else {
        return false
    }
}

module.exports = { addOneClient }