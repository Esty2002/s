const { connect, disconnect, getConnection } = require('../../services/sql/sql-connection');

const select=async({columns,tableName,where})=> {
    let result;
    try {
        await connect();
        result = await getConnection().request().query(`SELECT ${columns} FROM  ${tableName} WHERE ${where}`);
        await disconnect();
        result=result.recordset;
    }
    catch {
        result = "crash";
    }
    return result;
}
const insert=async(obj = null) =>{
    let result;
    try {
        await connect();
        result = await getConnection().request().query(`INSERT INTO ${obj.tableName} VALUES(${obj.values})`);
        await disconnect();
        result=result.rowsAffected;
    }
    catch {
        result = "crash";
    }
    return result;


}
const update=async({tableName={},set={},where={}})=> {
    let result
    try {
        console.log(tableName,set,where);
        await connect();
        result = await getConnection().request().query(`UPDATE ${tableName} SET ${set} WHERE ${where}`);
        await disconnect();
        result = result.rowsAffected
    }
    catch {
        result = "crash"
    }
    return result;
}

module.exports={select,insert,update}
