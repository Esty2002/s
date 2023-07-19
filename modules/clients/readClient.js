const { postData, getData } = require('../../services/axios')

async function getAllClient() {
    try {
        let query = { disabled: 0 }
        const result = await getData('/read/readMany/Clients', query);
        return result
    }
    catch (error) {
        throw error
    }
}

async function getAllDeletedClient() {
    try {
        let query = { disabled: 1 };
        const result = await getData('/read/readMany/Clients', query);
        return result;
    }
    catch (error) {
        throw error
    }
}

async function getClientsById(id) {
    try {
        let query = { id: id }
        const result = await getData('/read/readMany/Clients', query);
        return result
    }
    catch (error) {
        throw error
    }
}

async function getClientsByField(field, value) {
    try {
        let query = {}
        query[field] = value
        const result = await postData('/read/readMany/Clients', query);
        return result
    }
    catch (error) {
        throw error
    }
}


module.exports = { getAllClient, getClientsByField, getClientsById, getAllDeletedClient }
