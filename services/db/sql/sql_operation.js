const { getConnection, sconnect, disconnect } = require("./sql_connection");
// const { sconnect } = require("./sql_connection");

class sqlDBOperations {
    constructor(table) {
        this.table = table
    }
    async createDBPumps() {
        await sconnect()
        const result = await getConnection().request().query(
            "CREATE TABLE PUMPS(id[int] identity(1000,1) NOT NULL,ordinalNumber [int] NULL,measure [nvarchar](20) NOT NULL,unitOfMeasure [nvarchar](20) NULL,pump [nvarchar](20) NULL,bookkeepingCode[nvarchar](20) NULL,addedDate[nvarchar](20) NULL,enabled[nvarchar](20) NULL,deletedDate[nvarchar](20) NULL) "
        )
        console.log(result, "pumps");
        disconnect()
    }

    async createDBMeasure() {
        await sconnect()
        const result = await getConnection().request().query(
            "CREATE TABLE unitOfMeasure(id[int] identity(1,1) NOT NULL,measure [nvarchar](20) NOT  NULL) "
        )
        console.log(result, "measure");
        disconnect()
    }

    async insert(obj) {
        await sconnect()
        const result = await getConnection().request().query(`INSERT INTO ${this.table} values (${(Object.values(obj))})`)
        console.log(result, "insert");
        disconnect()
    }

    async find(col = '*', where = "") {
        await sconnect()
        const result = await getConnection().request().query(`SELECT ${{ ...col }} FROM ${this.table} ${where}`)
        disconnect()
        return result.recordset
    }

    async update(obj, where) {
        await sconnect()
        let string = ""
        for (let k in obj) {
            string += `${k}=${obj[k]},`
        }
        string = string.slice(0, -1)
        console.log(`UPDATE ${this.table} SET ${string} ${where}`);
        const result = await getConnection().request().query(`UPDATE ${this.table} SET ${string} ${where}`)
        disconnect()
        return result
    }
}
module.exports = { sqlDBOperations }

