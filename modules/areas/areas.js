require('dotenv').config()
const { getData, postData } = require('../../services/axios')



async function findAll() {
    const found = await postData('/read/find', {
        collection: "areas"
    })
    return found
}

async function findAllCities() {
    console.log('findall cities');
    const found = await postData('/read/find', {
        collection: "Areas", filter: { city: true }
    })
    console.log(found.data);
    return found.data
}

async function insertArea(obj = {}) {
    console.log({ obj })
    const result = await postData('/create/insertone',
        {
            collection: "Areas",
            data: obj
        })
    if (result.data) {
        const resultToSql = await postData('/create/create',
            {
                tableName: "tbl_Areas",
                values: { AreaIdFromMongo: result.data, areaName: obj.name }
            })
console.log({resultToSql})
        if (resultToSql.status===201)
            return resultToSql.data

    }
    else
        throw new Error("Can't insert area")
}

async function updateArea(obj = {}) {
    const result = await postData('/mongo/updateone',
        {
            collection: "Areas",
            filter: { supplierOrClientCode: obj.supplierOrClientCode },
            set: { $set: { 'areasList.$[u]': obj.area } },
            arrayFilters: { arrayFilters: [{ 'u.areaName': obj.area.areaName }] }
        })
    if (result)
        return result
    else
        throw new Error('Not Found area to update')

}

//giti...
async function updateLocation(obj) {
    console.log("updateLocation->", obj.code, obj.areaName, obj.coordination);
    const result = await postData('/mongo/updateone',
        {
            collection: "Areas",
            filter: { supplierOrClientCode: obj.code },
            set: { $set: { 'areas.$[u].location.coordinates': obj.coordination } },
            arrayFilters: { arrayFilters: [{ 'u.areaName': obj.areaName }] }
        })
    if (result)
        return result
    else
        throw new Error('Not Found area to update')
};

// giti
async function updatePointAndRadius(code, areaName, coordination, radius = 0) {
    const result = await postData('/mongo/updateone',
        {
            collection: "Areas",
            filter: { supplierOrClientCode: code },
            set: {
                $set: {
                    'areas.$[u].location.coordinates': coordination,
                    'areas.$[u].radius': radius
                }
            },
            arrayFilters: { arrayFilters: [{ 'u.areaName': areaName }] }
        })
    if (result)
        return result
    else
        throw new Error('Not Found area to update')
};

async function deleteSupplierOrClient(phone) {
    const result = await postData('/mongo/updateone',
        {
            collection: "Areas",
            filter: { SupplierOrClientCode: phone },
            set: { $set: { disable: false } }
        })
    if (result)
        return result
    else
        throw new Error('Not Found supplier or client code to delete his areas')
}

async function deleteArea(phone, area) {
    const result = await postData('/update/updateone',
        {
            collection: "Areas",
            filter: { supplierOrClientCode: phone },
            set: { $set: { 'areas.$[u].delete': true } },
            arrayFilters: { arrayFilters: [{ 'u.areaName': area }] }
        })
    if (result)
        return result
    else
        throw new Error('Not Found area to delete')

}

async function findArea(areaName) {
    const result = await postData('/read/find', {
        collection: "areas",
        filter: { name: areaName }
    })
    // return result
    // }


    // async function findAreaByCode(code) {
    //         let filter = {};
    //         const result = await postData(server, '/read/find',
    //             {
    //                 collection: "Areas",
    //                 filter: { supplierOrClientCode: code },
    //                 project: {}
    // })
    if (result)
        return result
    else
        throw new Error("not found area")
}


async function findSupplierOrClient(code) {
    console.log(" in isExist module");
    const result = await postData('/read/find',
        {
            dbName: "Buyton",
            collection: "Areas",
            filter: { supplierOrClientCode: code },
            project: {}
        })
    console.log("result ", result);
    if (result)
        return result

    else
        throw new Error("not found supplier or client code")
}

async function getTheDataOfTheArea(code, areaName) {
    console.log("getTheDataOfTheArea", code, areaName);
    const result = await postData('/mongo/find',
        {
            collection: "Areas",
            filter: { supplierOrClientCode: code },
            project: { areas: { $elemMatch: { "areaName": areaName } } }

        })
    console.log({ result });
    if (result)
        return result

    else
        throw new Error("not found supplier or client code")
}

module.exports = {
    // findAreaByCode,
    insertArea,
    findSupplierOrClient,
    deleteSupplierOrClient,
    deleteArea,
    updateArea, updateLocation,
    updatePointAndRadius,
    findArea,
    getTheDataOfTheArea,
    findAll,
    findAllCities
}
