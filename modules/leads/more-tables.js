require('dotenv').config();

const { connect, disconnect, getConnection } = require('../../services/sql/sql-connection');
//take the Alltable according to TableName
async function selectAllTable(tableName) {
    let result;
    try {
        await connect();
        result = await getConnection().request().query(`SELECT * FROM  ${tableName}`);
        await disconnect();
        result=result.recordset;
    }
    catch {
        result = "the table name is not defiend";
    }
    return result;
}

// take the row according to poneNumber and TableName
async function selectRecordByPhoneNumber(phoneNumber, tableName) {

    let result
    try {
        await connect();
        result = await getConnection().request().query(`select * from ${tableName} where phone='${phoneNumber}'`);
        await disconnect();
        result=result.recordset;

    }
    catch {
        result = "the tableName or phoneNumber not defined";
    }

    return result;
}

async function nameAndphone() {
    let result;
    try {
        await connect();
        result = await getConnection().request().query(`select name,phone from orderers`);
        await disconnect();
        result=result.recordset;
    }
    catch {
        result = "the name or phone are not defined";
    }
    return result;
}

// פונקציה שמכניסה מזמין חדש לטבלת מזמינים
async function newOrderer(obj = null) {
    //send to sql insted of mongodb
    let result
    if (obj) {
        await connect();
        result = await getConnection().request().query(`INSERT INTO orderers VALUES('${obj.name}','${obj.phone}',GETDATE(),0,NULL)`);
        await disconnect();
        result=result.rowsAffected;
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
        result=result.rowsAffected;
    }
    else {
        result = false;
    }

    return result;
}


module.exports = {selectAllTable, selectRecordByPhoneNumber, newOrderer, newPouringType, nameAndphone};                    
