require('dotenv').config()
const { getData } = require('../../services/axios')
const { SQL_PRODUCTS_TABLE } = process.env

async function getTraits(filter = {}) {
    try {
        let condition;
        Object.keys(filter).length > 0 ? condition[Object.keys(filter)[0]] = Object.values(filter)[0] : null
        const response = await getData(`/read/readMany/${SQL_PRODUCTS_TABLE}`, condition)
        return response
    }
    catch (error) {
        throw error;
    }
}

module.exports = { getTraits }
