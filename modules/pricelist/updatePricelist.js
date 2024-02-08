const { sqlServer, postData, getData } = require('../../services/axios')
const { PRICELIST, ADDITIONSFORDISTANCE, CITIESADDITIONS, TIMEADDITIONS, TRUCKFILL, PRICELISTBYSUPPLIERORCLIENT, PRICElISTFORPRODUCTS } = process.env




async function deletePriceList({ id }) {
    const obj = {}
    obj['entityName'] = PRICELIST
    obj['condition'] = `id=${id}`
    obj['data'] = { 'disabled': true }
    const result = await postData('/update/update', obj)
    if (result.data.rowsAffected[0] > 0) {
        let table = [ADDITIONSFORDISTANCE, CITIESADDITIONS, TRUCKFILL, PRICELISTBYSUPPLIERORCLIENT, TIMEADDITIONS, PRICElISTFORPRODUCTS]
        let res
        const answer = await Promise.all(table.map(async (t) => {
            obj['tableName'] = t
            obj['condition'] = `priceListId=${id}`
            obj['data'] = { 'disabled': true }
            res = await postData('/update/update', obj)
            return res
        }))
        return true
    }
    else
        return false
}

async function updateOne({ id, update }) {
    // let newUpdate =[]
    let newUpdate = {}
    newUpdate[update.columns] = update.values
    let obj = {}
    obj['entityName'] = PRICELIST
    obj['condition'] = `Id= ${id}`
    obj['data'] = newUpdate
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
        obj['entityName'] = `${tbName}`
        obj['columns'] = '*'
        obj['data'] = record[0];
        const result = await postData('/create/createone', obj)
        return result
    }
    else
        return false
}

async function deleteItems({ tbName, id, del, newname }) {
    try {
        let newdata
        const answer = await getData(`/read/readAll/${tbName}/PriceListId=${id}`)
        // let PriceListId=answer.data.PriceListId
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
        obj['entityName'] = PRICELIST;
        obj['columns'] = '*';
        obj['data'] = newdata;
        const result = await postData('/create/createone', obj)
        if (result.status === 201) {
            let pricelistId = result.data[0].Id;
            let newDataa = []
            newDataa = answer.data.filter(an => deleteIdentity.includes(an.Id))
            newDataa.forEach(item => item.PriceListId = pricelistId)
            newDataa = newDataa.map(({ Id, ...rest }) => rest)
            let obj = {}
            obj['entityName'] = `${tbName}`
            obj['columns'] = '*'
            obj['data'] = newDataa;
            const resultMany = await postData('/create/createmany', obj)
            const dataMany = await getData(`/read/readAll/${tbName}/PriceListId=${pricelistId}`)
            return dataMany.data
        }

    }
    catch (error) {
        console.log(error.message)
        throw error
    }
}

async function updateItems({ tbName, id, update, newname }) {
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
    // obj['entityName'] = PRICELIST;
    // obj['columns'] = '*';
    // obj['values'] = newdata;   
    // const result = await postData('/create/create', obj)
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
    let obj = {}

    obj['entityName'] = `${tbName}`
    obj['columns'] = '*'
    obj['data'] = newData;
    const result = await postData('/create/createmany', obj)
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
