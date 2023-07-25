const { sqlServer, postData, getData, putData } = require('../../services/axios')
const { PRICELIST, ADDITIONSFORDISTANCE, CITIESADDITIONS, TIMEADDITIONS, TRUCKFILL, PRICELISTBYSUPPLIERORCLIENT, PRICElISTFORPRODUCTS } = process.env

async function deletePriceList({ id }) {
    try {
        const obj = {}
        obj.entityName = PRICELIST
        obj.condition = { Id: id }
        obj.values = { 'Disabled': true }
        console.log({ obj });
        const result = await putData('/update/updateone', obj)
        if (result.status == 204) {
            let table = [ADDITIONSFORDISTANCE, CITIESADDITIONS, TRUCKFILL, PRICELISTBYSUPPLIERORCLIENT, TIMEADDITIONS, PRICElISTFORPRODUCTS]
            let res
            const answer = await Promise.all(table.map(async (t) => {
                obj.entityName = t
                obj.condition = { PriceListId: id }
                obj.values = { 'Disabled': true }
                res = await putData('/update/updateone', obj)
                return res
            }
            ))
            return true
        }
        else
            return false
    }
    catch (error) {
        console.log({ error });
        throw error
    }
}

async function updateOne({ id, update }) {
    try {
        let newUpdate = {}
        newUpdate[update.columns] = update.values
        let obj = {}
        obj.entityName = PRICELIST
        obj.condition = { Id: id }
        obj.values = newUpdate
        console.log({ obj });
        const result = await putData('/update/updateone', obj)
        if (result.status == 204) {
            return true
        }
        else
            return false
    }
    catch (error) {
        console.log({ error });
        throw error
    }
}

// async function reedToUpdate({ tbName, id, update }) {
//     const answer = await getData(`/read/readAll/${tbName}/Id=${id}`)
//     if (answer.data.length === 1) {
//         let record = answer.data[0]
//         record = [record].map(({ Id, ...rest }) => rest)
//         const obj = {};
//         _ = update.forEach(o => (record[0][o.columns] = o.values))
//         obj['tableName'] = `${tbName}`
//         obj['columns'] = '*'
//         obj['values'] = record[0];
//         console.log({ obj });
//         const result = await postData('/create/create', obj)
//         return result
//     }
//     else
//         return false
// }

async function deleteItems({ entityName, id, del, newname }) {
    try {
        let newdata
        let query = { PriceListId: id }
        const answer = await getData(`/read/readMany/${entityName}`, query)
        console.log({ answer: answer.data });
        let answerIdentity = answer.data.map(d => d.Id)
        let deleteIdentity = []
        deleteIdentity = answerIdentity.filter(i => !del.includes(i))
        if (!newname) {
            newdata = await changeName(id)
            newname = newdata.Name
        }
        else {
            query = { Id: id }
            const answer = await getData(`/read/readMany/${PRICELIST}`, query)
            if (answer.data.length === 1) {
                newdata = answer.data[0];
                newdata = [newdata].map(({ Id, ...rest }) => rest);
                newdata.forEach(item => item.Name = newname)
            }
        }
        let obj = {};
        obj.entityName = PRICELIST;
        obj.values = newdata;
        const result = await postData('/create/createone', obj)
        if (result.status === 201) {
            let pricelistId = result.data[0].Id;
            let newData = []
            newData = answer.data.filter(an => deleteIdentity.includes(an.Id))
            newData.forEach(item => item.PriceListId = pricelistId)
            newData = newData.map(({ Id, ...rest }) => rest)
            let obj = {}
            obj.entityName = `${entityName}`
            obj.values = newData;
            const resultMany = await postData('/create/createmany', obj)
            return resultMany.data
        }
    }
    catch (error) {
        throw error
    }
}

async function updateItems({ entityName, priceListId, id, update, newname }) {
    let query = { PriceListId: priceListId }
    const answer = await getData(`/read/readAll/${entityName}`, query)
    let data = answer.data
    let objUpdate = data.filter(d => d.Id == id)
    objUpdate = objUpdate[0]
    let newUpdate = {}
    update.forEach(o => (newUpdate[o.columns] = o.values))
    objUpdate.Price = newUpdate.Price
    objUpdate.Discount = newUpdate.Discount
    let dataUpdate = data.filter(d => d.Id != id)
    dataUpdate.push(objUpdate)
    if (!newname) {
        newdata = await changeName(priceListId)
        newname = newdata.Name
    }

    else {
        query={Id:id}
        const answer = await getData(`/read/readAll/${PRICELIST}`,query)
        if (answer.data.length === 1) {
            newdata = answer.data[0];
            newdata = [newdata].map(({ Id, ...rest }) => rest);
            checkName(newname)
            newdata.forEach(item => item.Name = newname)
        }
    }
    let obj = {}
    obj.entityName = PRICELIST;
    obj.values = newdata;
    const resultCreate = await postData('/create/createone', obj)
    if (resultCreate.status === 201) {
        let newPricelistId = resultCreate.data[0].Id
        data.forEach(item => item.PriceListId = newPricelistId)
        data = data.map(({ Id, ...rest }) => rest)
        obj.entityName = `${entityName}`
        obj.values = data;
        const result = await postData('/create/createmany', obj,)
        return result.data
    }
}

async function changeName(id) {
    let query = { Id: id }
    const answer = await getData(`/read/readMany/${PRICELIST}`, query)
    if (answer.data.length === 1) {
        let record = answer.data[0];
        record = [record].map(({ Id, ...rest }) => rest);
        let version = record[0].Name.substring(record[0].Name.length - 1);
        if (version >= 0 && version <= 9) {
            let name = record[0].Name.substring(0, record[0].Name.length - 1);
            version++;
            record[0].Name = name + version;
        }
        else {
            version = 1;
            record[0].Name += version;
        }
        console.log(record[0]);
        let tt = await checkName(record[0].Name)
        console.log({ tt });
        return record[0]
    }
}

async function checkName(name) {
    console.log("hello !!!");
    let query = { Name: name }
    const answer = await getData(`/read/readMany/${PRICELIST}`, query)
    if (!(answer.data))
        return false
    else {
        const newName = await lastName(name)
        console.log({ newName });
        return newName;
    }
}

async function lastName(name) {
    console.log("helo");
    let version = name.substring(name.length - 1);
    name = name.substring(0, name.length - 1)
    if (!(version >= 0 && version <= 9)) {
        let query = { condition: { "STARTWITH": [{ "Name": name }] } }
        const answer = await postData(`/read/readMany/${PRICELIST}`, query)
        console.log(answer.data, "qqqqqqqqqqqqqq");
        if (answer.data.length > 0) {
            let length = answer.data.length
            name = name + length
            console.log({ name });
            return name
        }
    }
    else {
        await lastName(name)
    }
}

module.exports = { deletePriceList, updateOne, deleteItems, updateItems }
