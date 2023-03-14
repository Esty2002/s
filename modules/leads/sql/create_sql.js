require('dotenv').config()

const { connect, disconnect, getConnection } = require('../../../services/sql/sql-connection')
//take the Alltable according to TableName
async function selectAllTable(tableName) {
    let result
    try {
        await connect()
        result = await getConnection().request().query(`SELECT * FROM  ${tableName}`)
        await disconnect()
    }
    catch {
        result = "the table name is not defiend"
    }
    return result;
}

// take the row according to poneNumber and TableName
async function selectRecordByPhoneNumber(phoneNumber, tableName) {
    let result
    try {
        await connect();
        result = await getConnection().request().query(`select * from ${tableName} where phone= '${phoneNumber}'`);
        await disconnect();
    }
    catch {
        result = "the tableName or phoneNumber dont defined"
    }
    console.log(result);
    if (result.recordset.length > 0)
        result = true;
    else {
        result = false;
    }
    return result;
}


// פונקציה שמכניסה מזמין חדש לטבלת מזמינים
async function newOrderer(obj = null) {
    //send to sql insted of mongodb
    let result
    if (obj) {
        console.log("before problem");

        console.log("after problem");
        await connect();
        result = await getConnection().request().query(`INSERT INTO orderers VALUES('${obj.name}','${obj.phone}',GETDATE(),0,NULL)`);
        await disconnect();
    }
    else {
        result = false;
    }
    return result;


}


// פונקציה שמכניסה סוג יציקת בטון לטבלת יציקות
async function newPouringType(obj = null) {
    //send to sql insted of mongodb
    let result;
    if (obj) {
        await connect();
        result = await getConnection().request().query(`INSERT INTO puringsTypes VALUES('${obj.name}')`);
        await disconnect();
    }
    else {
        result = false;
    }

    return result;
}


module.exports = {
    selectAllTable, selectRecordByPhoneNumber, newOrderer, newPouringType
}                      
