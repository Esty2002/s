const { insertItem, del,  update, getCode, postComment, updateQuotation } = require('../../services-quotation/sql/sql-operations')

async function commentAccordingCode(val) {
    const result = await getCode(val);
    return result
}

async function updateAccordingCode(val) {
    const result = await postComment(val);
    return result
}

async function addItem(obj) {
    const result = await insertItem(obj);
    updatebig(obj.quotationCode)
    return result
}

async function Delete(obj) {
    obj.according = 'serialNumber'
    if (obj.lead) {
        const result = await del(obj);   
        deleteBig(obj,result,del)        
        return result
    }
    else {
        obj.all = 'disabled=1'
        const result = await update(obj);
        deleteBig(obj,result,update)        
        return result
    }
}

async function updatebig(val) {
    const result = await updateQuotation(val);
    return result
}

async function Update(obj) {
    obj.according = 'serialNumber'
    let allupdate = ''
    for (let item of obj.arr) {
        allupdate += `${item.field}=${item.value},`
    }
    allupdate = allupdate.substring(0, allupdate.length - 1)
    obj.all = allupdate

    const result = await update(obj);

    updatebig(result[0][0].qCode)
    return result
}



async function deleteBig(obj,result,val2) {
    let qCode = result[0][0].qCode
    let count = result[1][0].count
    if (count == 0) {
        obj.table = 'quotation'
        obj.code = qCode
        const result = await val2(obj);
        return result
    }
    else
        updatebig(qCode)
}

module.exports = { addItem, Delete, Update, commentAccordingCode, updateAccordingCode }
