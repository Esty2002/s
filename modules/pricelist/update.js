const { sqlServer, postData, getData } = require('../../services/axios')
const { PRICELIST, ADDITIONSFORDISTANCE, CITIESADDITIONS, TIMEADDITIONS, TRUCKFILL, PRICELISTBYSUPPLIERORCLIENT, PRICElISTFORPRODUCTS } = process.env

async function deletePriceList({ id }) {
    const obj = {}
    obj['tableName'] = PRICELIST
    obj['condition'] = `Id=${id}`
    obj['values'] = { 'Disabled': true }
    const result = await postData('/update/update', obj)
    console.log('finish1')
    if (result.data.rowsAffected[0] > 0) {
        let table = [ADDITIONSFORDISTANCE, CITIESADDITIONS, TRUCKFILL, PRICELISTBYSUPPLIERORCLIENT, TIMEADDITIONS, PRICElISTFORPRODUCTS]
        let res
        const answer = await Promise.all(table.map(async (t) => {
            // console.log({ obj })
            obj['tableName'] = t
            obj['condition'] = `PriceListId=${id}`
            obj['values'] = { 'Disabled': true }
            // console.log({ obj })
            // console.log(obj.tableName)
            res = await postData('/update/update', obj)
            return res
        }
        ))
        return true
    }
    else
        return false

}

async function updateOne({ id, update }) {
    // let newUpdate =[]
    let newUpdate = {}
    // console.log({ update })
    newUpdate[update.columns] = update.values
    // _ = update.forEach(o => (newUpdate[o.columns] = o.values))   לכמה דברים לעדכון
    // console.log({ newUpdate });
    let obj = {}
    obj['tableName'] = PRICELIST
    obj['condition'] = `Id= ${id}`
    obj['values'] = newUpdate
    console.log({ obj });
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
            console.log({ newdata });
            console.log({ newname });
        }
        else {
            const answer = await getData(`/read/readAll/${PRICELIST}/Id=${id}`)
            if (answer.data.length === 1) {
                newdata = answer.data[0];
                newdata = [newdata].map(({ Id, ...rest }) => rest);
                newdata.forEach(item => item.Name = newname)
            }
        }
        // newname=checkName(newname)
        let obj = {};
        obj['tableName'] = PRICELIST;
        obj['columns'] = '*';
        obj['values'] = newdata;
        console.log({ dddddddddddddddd: newdata });
        console.log({ obj }, "obbbbbbj");
        //  checkName(newname)
        // if (checkName(newname)) {

        // }
        const result = await postData('/create/create', obj)
        // console.log("before if");
        // console.log(Object.keys(result))
        // let { data } = result
        console.log({ result: result });
        if (result.status === 201) {
            // console.log(Object.keys(result))
            // console.log("in if !!!!!!!!!!");
            // console.log({res:result.data},'99999999999999999999999999');
            // if (result.data.length > 0) {
            //     const ans = await getData(`/read/readAll/${PRICELIST}/Name='${newname}'`)
            //     let pricelistId = ans.data[0].Id;
            // console.log({ data })
            let pricelistId = result.data[0].Id;
            console.log({ pricelistId });
            let newData = []
            newData = answer.data.filter(an => deleteIdentity.includes(an.Id))
            newData.forEach(item => item.PriceListId = pricelistId)
            newData = newData.map(({ Id, ...rest }) => rest)
            let obj = {}
            console.log({ newData });
            obj['tableName'] = `${tbName}`
            obj['columns'] = '*'
            obj['values'] = newData;
            // console.log({ obj });
            const resultMany = await postData('/create/createManySql', obj)
            console.log({ resultMany: resultMany.data });
            const dataMany = await getData(`/read/readAll/${tbName}/PriceListId=${pricelistId}`)
            console.log({ dataMany });
            return dataMany.data
        }
        else {
            console.log("למה????????????????????????????????????????????");
        }

    }
    catch (error) {
        console.log({ error: error.message })
        throw error
    }
}

async function updateItems({ tbName, priceListId, id, update, newname }) {
    console.log({ update });
    const answer = await getData(`/read/readAll/${tbName}/PriceListId=${priceListId}`)
    let data = answer.data

    let objUpdate = data.filter(d => d.Id == id)
    console.log({ objUpdate }); 
    objUpdate=objUpdate[0]
    let newUpdate = {}
    _ = update.forEach(o => (newUpdate[o.columns] = o.values))
    objUpdate.Price = newUpdate.Price
    objUpdate.Discount = newUpdate.Discount
    console.log({ objUpdate });

    let dataUpdate=data.filter(d => d.Id != id)
    dataUpdate.push(objUpdate)
    console.log({dataUpdate});

    if (!newname) {
        newdata = await changeName(priceListId)
        newname = newdata.Name
    }

    else {
        const answer = await getData(`/read/readAll/${PRICELIST}/Id=${id}`)
        if (answer.data.length === 1) {
            newdata = answer.data[0];
            newdata = [newdata].map(({ Id, ...rest }) => rest);
            checkName(newname)
            newdata.forEach(item => item.Name = newname)
        }
    }
    let obj = {}
    obj['tableName'] = PRICELIST;
    obj['columns'] = '*';
    obj['values'] = newdata;
    console.log({ dddddddddddddddd: newdata });
    console.log({ obj }, "obbbbbbj");
    // checkName(newname)
    const resultCreate = await postData('/create/create', obj)
    // console.log("before if");
    // console.log(Object.keys(result))
    // let { data } = result
    if (resultCreate.status === 201) {
        let newPricelistId = resultCreate.data[0].Id
        data.forEach(item => item.PriceListId = newPricelistId)
        data = data.map(({ Id, ...rest }) => rest)
        console.log({ data });

        // newData = newData.map(({ Id, ...rest }) => rest)
        // console.log(newData, " nnnnnnDDDDDD");
        // let obj = {}
        obj['tableName'] = `${tbName}`
        obj['columns'] = '*'
        obj['values'] = data;
        console.log({ obj });
        const result = await postData('/create/createManySql', obj,)
        return result.data
    }
    else {

    }
}

async function changeName(id) {
    const answer = await getData(`/read/readAll/${PRICELIST}/Id=${id}`)
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
        // let tt = await checkName(record[0].Name)
        // console.log({ tt });
        return record[0]
    }
}

async function checkName(name) {
    console.log("hello !!!");
    const answer = await getData(`/read/readAll/${PRICELIST}/Name='${name}'`)
    if (!(answer.data))
        return false
    else {
        console.log("i good mornning ! ! !");
        let newName = await lastName(name)
        console.log({ newName });
        return newName;
    }
}

async function lastName(name) {
   
    console.log("helo");
    let version = name.substring(name.length - 1);
    name = name.substring(0, name.length - 1)
    console.log(!(version >= 0 && version <= 9))

    if (!(version >= 0 && version <= 9)) {
        console.log(name, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        const answer = await postData(`/read/readAll/${PRICELIST}/{Name LIKE '%${name}%'}`)
        console.log(answer.data, "qqqqqqqqqqqqqq");
        return "abcd"
    }
    else {
        // console.log({name,version});
        // i++;
        // version = name.substring(name.length - i);
        // name = name.substring(0,name.length - i)
        // console.log(name);
        await lastName(name)
    }
}

async function read(name) {
    console.log(name.name);
    const answer = await getData(`/read/readAll/${PRICELIST}/Name LIKE '%${name.name}%'`)
    console.log(answer);
}

module.exports = { deletePriceList, updateOne, reedToUpdate, deleteItems, updateItems, read }
