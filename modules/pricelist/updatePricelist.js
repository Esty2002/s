const { sqlServer, postData, getData } = require('../../services/axios')

async function deletePriceList({ tbName, id }) {
    let obj = {}
    obj['tableName'] = tbName
    obj['condition'] = `Id=${id}`
    obj['values'] = { 'Disabled': true }
    const result = await postData(sqlServer, '/update/update', obj)
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
    const result = await postData(sqlServer, '/update/update', obj)
    if (result.data.rowsAffected[0] > 0) {
        return true
    }
    else
        return false
}

async function reedToUpdate({ tbName, id, update }) {
    const answer = await getData(sqlServer, `/read/readAll/${tbName}/Id=${id}`)
    if (answer.data.length === 1) {
        let record = answer.data[0]
        record = [record].map(({ Id, ...rest }) => rest)
        const obj = {};
        _ = update.forEach(o => (record[0][o.columns] = o.values))
        obj['tableName'] = `${tbName}`
        obj['columns'] = '*'
        obj['values'] = record[0];
        console.log({ obj });
        const result = await postData(sqlServer, '/create/create', obj)
        return result
    }
    else
        return false

}

async function deleteItems({ tbName, id, del }) {
    const answer = await getData(sqlServer, `/read/readAll/${tbName}/PriceListId=${id}`)
    let answerIdentity = answer.data.map(d => d.Id)
    let deleteIdentity = []
    deleteIdentity = answerIdentity.filter(i => !del.includes(i))
    let newPricelistId = await changeName(id)
    let newData = []
    newData = answer.data.filter(an => deleteIdentity.includes(an.Id))
    newData.forEach(item => item.PriceListId = newPricelistId)
    newData = newData.map(({ Id, ...rest }) => rest)
    let obj = {}
    obj['tableName'] = `${tbName}`
    obj['columns'] = '*'
    obj['values'] = newData;
    const result = await postData(sqlServer, '/create/createManySql', obj)
    return result
}

async function updateItems({ tbName, id, update }) {
    const answer = await getData(sqlServer, `/read/readAll/${tbName}/PriceListId=${id}`)
    let answerIdentity = answer.data.map(d => d.Id)
    let deleteIdentity = []
    deleteIdentity = answerIdentity.filter(i => !del.includes(i))
    let newPricelistId = await changeName(id)
    let newData = []

    // newData = answer.data.filter(an => deleteIdentity.includes(an.Id)).forEach(item => item.PriceListId = newPricelistId)
    newData = answer.data.filter(an => deleteIdentity.includes(an.Id))
    newData.forEach(item => item.PriceListId = newPricelistId)

    console.log({ newData });
    newData = newData.map(({ Id, ...rest }) => rest)

    console.log(newData, " nnnnnnDDDDDD");
    let obj = {}

    obj['tableName'] = `${tbName}`
    obj['columns'] = '*'
    obj['values'] = newData;
    console.log({ obj });
    const result = await postData(sqlServer, '/create/createManySql', obj)
    return result
}

async function changeName(id) {
    let newName
    const answer = await getData(sqlServer, `/read/readAll/${'tbl_PriceList2'}/Id=${id}`)
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
        const obj = {};
        obj['tableName'] = 'tbl_PriceList2';
        obj['columns'] = '*';
        obj['values'] = record[0];
        const result = await postData(sqlServer, '/create/create', obj)
        if (result.data.rowsAffected[0] > 0) {
            const ans = await getData(sqlServer, `/read/readAll/${'tbl_PriceList2'}/Name='${newName}'`)
            console.log(ans.data[0].Id);
            return ans.data[0].Id;
        }
        else
            return false;
    }
    else
        return false;

}

module.exports = { deletePriceList, updateOne, reedToUpdate, deleteItems,updateItems }


