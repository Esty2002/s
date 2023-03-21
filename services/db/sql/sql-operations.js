const { getConnection, connect, disconnect } = require("./sql-connection");

async function getCode(code) {
    await connect()
    const result = await getConnection().request().query(`select price from quotationItems where serialNumber=${code} `)
    console.log(result)
    disconnect()
    return result.recordsets[0][0]
}

async function del(obj = null) {
    await connect()
    const result = await getConnection().request().query(`
    declare @cou int    
    set @cou=(select quotationCode from quotationItems where serialNumber=${obj.code})   
    select @cou as qCode
    DELETE FROM ${obj.table} WHERE ${obj.according}=${obj.code}
    select count(*) as count from quotationItems where quotationCode=@cou     
    `)
    console.log(result)
    disconnect()
    return result.recordsets
}

async function update(obj = null) {
    await connect()
    const result = await getConnection().request().query(`
    declare @cou int 
    set @cou=(select quotationCode from quotationItems where serialNumber=${obj.code})
    select @cou as qCode
     UPDATE ${obj.table} SET ${obj.all} WHERE ${obj.according}=${obj.code}  
     select count(*) as count from quotationItems where quotationCode=@cou AND disabled=0 
     `)
    console.log(result)
    disconnect()
    // return result.recordsets[0][0]
    return result.recordsets

}

async function updateQuotation(val) {
    console.log(val);
    await connect()
    const result = await getConnection().request().input('qc', val).execute('updateQuotation')
    console.log(result)
    disconnect()
    return result
}

async function postComment(obj = null) {
    await connect()
    const result = await getConnection().request().query(`UPDATE quotationItems SET price=${obj.price} WHERE serialNumber=${obj.code} AND disabled=0`)
    console.log(result)
    disconnect()
    return result
}

async function insert(obj = null) {
    await connect()
    const result = await getConnection().request().query(`INSERT INTO ${obj.table} VALUES (${obj.quotationCode},${obj.rowNumber},${obj.itemCode},${obj.priceList},${obj.amount},${obj.price},${obj.discount},${obj.priceAfterDiscount},${obj.priceChange},${obj.total},'${obj.addedDate}',${obj.disabled},'${obj.disabledDate}')`)
    console.log(result)
    disconnect()
    // return result
}


module.exports = { insert, del, update, getCode, postComment, updateQuotation }
