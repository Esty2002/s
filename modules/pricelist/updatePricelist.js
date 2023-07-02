const { sqlServer, postData, getData } = require('../../services/axios')
const { PRICELIST } = process.env
async function deletePriceList({ tbName, id }) {
    let obj = {}
    obj['tableName'] = tbName
    obj['condition'] = `Id=${id}`
    obj['values'] = { 'Disabled': true }
    const result = await postData('/update/update', obj)
    if (result.data.rowsAffected[0] > 0) {
        return true
    }
    else
        return false

}

async function updateOne({ tbName, id, update = {} }) {
    let obj = {}
    obj['tableName'] = tbName
    obj['condition'] = `Id= ${id}`
    let o = {}
    update[update.columns] = update.values
    obj['values'] = o
    const result = await postData('/update/update', obj)
    if (result.data.rowsAffected[0] > 0) {
        return true
    }
    else
        return false
}

async function reedToUpdate({ tbName, id, update }) {
    const answer = await getData(`/read/readAll/${tbName}/Id=${id}`)
    if (answer.data.length === 1) {
        let record = answer.data[0]
        record = [record].map(({ Id, ...rest }) => rest)
        const obj = {};
        _ = update.forEach(o => (record[0][o.columns] = o.values))
        obj['tableName'] = `${tbName}`
        obj['columns'] = '*'
        obj['values'] = record[0];
        console.log({ obj });
        const result = await postData('/create/create', obj)
        return result
    }
    else
        return false
}

async function deleteItems({ tbName, id, del, newname }) {
    let newdata
    const answer = await getData(`/read/readAll/${tbName}/PriceListId=${id}`)
    let answerIdentity = answer.data.map(d => d.Id)
    let deleteIdentity = []
    deleteIdentity = answerIdentity.filter(i => !del.includes(i))
    if (!newname) {
        // newname = await changeName(id)
        newdata = await changeName(id)
        newname = newdata.Name
    }
    else {
        const answer = await getData(`/read/readAll/${PRICELIST}/Id=${id}`)
        if (answer.data.length === 1) {
            newdata = answer.data[0];
            newdata = [newdata].map(({ Id, ...rest }) => rest);
            newdata.forEach(item => item.Name = newname)
        }
    }
    const obj = {};
    obj['tableName'] = PRICELIST;
    obj['columns'] = '*';
    obj['values'] = newdata;   
     console.log(obj.values,"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
    const result = await postData('/create/create', obj)
    console.log(result,"reeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    if (result.data.length > 0) {
        const ans = await getData(`/read/readAll/${PRICELIST}/Name='${newname}'`)
        let pricelistId = ans.data[0].Id;
        let newData = []
        newData = answer.data.filter(an => deleteIdentity.includes(an.Id))
        newData.forEach(item => item.PriceListId = pricelistId)
        newData = newData.map(({ Id, ...rest }) => rest)
        let obj = {}
        obj['tableName'] = `${tbName}`
        obj['columns'] = '*'
        obj['values'] = newData;
        console.log({ obj });
        const result = await postData('/create/createManySql', obj)
        console.log({ result });
        return true
    }
}

async function updateItems({ tbName, id, update ,newname}) {
    const answer = await getData(`/read/readAll/${tbName}/PriceListId=${id}`)
    let answerIdentity = answer.data.map(d => d.Id)
    let deleteIdentity = []
    deleteIdentity = answerIdentity.filter(i => !del.includes(i))
    // if (!newname) {
    //     // newname = await changeName(id)
    //     newdata = await changeName(id)
    //     newname = newdata.Name
    // }
    // else {
    //     const answer = await getData(`/read/readAll/${PRICELIST}/Id=${id}`)
    //     if (answer.data.length === 1) {
    //         newdata = answer.data[0];
    //         newdata = [newdata].map(({ Id, ...rest }) => rest);
    //         newdata.forEach(item => item.Name = newname)
    //     }
    // }
    // const obj = {};
    // obj['tableName'] = PRICELIST;
    // obj['columns'] = '*';
    // obj['values'] = newdata;   
    //  console.log(obj.values,"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
    // const result = await postData('/create/create', obj)
    // console.log(result,"reeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    // if (result.data.length > 0) {
    //     const ans = await getData(`/read/readAll/${PRICELIST}/Name='${newname}'`)
    //     let pricelistId = ans.data[0].Id;
    //     let newData = []
    //     newData = answer.data.filter(an => deleteIdentity.includes(an.Id))
    //     newData.forEach(item => item.PriceListId = pricelistId)
    let newPricelistId = await changeName(id)
    let newData = []
    _ = update.forEach(o => (newData[o.columns] = o.values))

    newData = answer.data.filter(an => deleteIdentity.includes(an.Id))
    newData.forEach(item => item.PriceListId = newPricelistId)
    newData = newData.map(({ Id, ...rest }) => rest)
    console.log(newData, " nnnnnnDDDDDD");
    let obj = {}

    obj['tableName'] = `${tbName}`
    obj['columns'] = '*'
    obj['values'] = newData;
    console.log({ obj });
    const result = await postData('/create/createManySql', obj)
    return result
}

async function changeName(id) {
    let newName
    const answer = await getData(`/read/readAll/${PRICELIST}/Id=${id}`)
    if (answer.data.length === 1) {
        let record = answer.data[0];
        record = [record].map(({ Id, ...rest }) => rest);
        let version = record[0].Name.substring(record[0].Name.length - 1);
        if (version > 0 && version < 9) {
            let name = record[0].Name.substring(0, record[0].Name.length - 1);
            version++;
            newName = record[0].Name = name + version;
        }
        else {
            version = 1;
            newName = record[0].Name += version;
        }
        return record[0]
    }
}

module.exports = { deletePriceList, updateOne, reedToUpdate, deleteItems, updateItems }
