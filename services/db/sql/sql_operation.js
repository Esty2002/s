const { getConnection, sconnect, disconnect } = require("./sql_connection");



class sqlOperations {

    constructor(table){
        this.table = table
    }

    async createDBPumps() {
        await sconnect()
        const result = await getConnection().request().query(
            "CREATE TABLE PUMPS(id[int] identity(1000,1) NOT NULL,ordinalNumber [int] NULL,measure [nvarchar](20) NOT NULL,unitOfMeasure [nvarchar](20) NULL,pump [nvarchar](20) NULL,bookkeepingCode[nvarchar](20) NULL,addedDate[nvarchar](20) NULL,enabled[nvarchar](20) NULL,deletedDate[nvarchar](20) NULL) "
        )
        disconnect()
    }
    async createDBMeasure() {
        await sconnect()
        const result = await getConnection().request().query(
            "CREATE TABLE unitOfMeasure(id[int] identity(1,1) NOT NULL,measure [nvarchar](20) NOT  NULL) ")
        disconnect()
    }
    async insert(obj) {
        await sconnect()
        const result = await getConnection().request().query(`INSERT INTO ${this.table} values (${(Object.values(obj))})`)
        disconnect()
    }
    async find(col = '*', where = "") {
        await sconnect()
        const result = await getConnection().request().query(`SELECT ${col} FROM ${this.table} WHERE ${where}`)
        disconnect()
        return result.recordset
    }
    async update(string, where) {
        await sconnect() 
        const result = await getConnection().request().query(`UPDATE ${this.table} SET ${string} WHERE ${where}`)
        disconnect()
        return result
    }
}
module.exports = { sqlOperations }


//comment

