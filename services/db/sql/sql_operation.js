require('dotenv').config()
const sql = require('mssql')
const { sconnect, disconnect, getConnection } = require('./sql_connection')



class SQLoperations {


    async insertOne(obj) {
        const result = await getConnection().request().query(`insert into pumps values(${Object.values(obj)})`)
        console.log("insert pumpssssssssssssss");
        return result;
    }

    async findItem(obj) {
        const result = await getConnection().request().query(obj)
        return result
    }

    async update(attribute, value, obj) {
        const result = await getConnection().request().query(`set ${attribute} =${value} from pumps where ${obj}`)
        return result
    }
}
module.exports = { SQLoperations }






