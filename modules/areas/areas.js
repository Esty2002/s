require('dotenv').config()
const { ObjectId } = require('mongodb');
const { getData, postData } = require('../../services/axios')

async function findAll(filter = undefined) {
    console.log('im hhhhhhhhhhh');

    console.log({ filter })
    const found = await postData('/read/find', {
        collection: "areas",
        filter: { $and: [{ type: filter }, { $or: [{ disabled: { $exists: false } }, { disabled: false }] }] }
    }
    )
    return found;
}

async function findInPolygon(point) {
    console.log({ point })
    const found = await postData('/read/findpolygon', {
        collection: "areas",
        filter: { $and: [{ type: 'polygon' }, { $or: [{ disabled: { $exists: false } }, { disabled: false }] }] },
        point
    }
    )
    console.log({ found: found.data })
    return found;
}
async function findByDistinct(collection, filter = undefined) {
    console.log({ collection });
    console.log({ filter });

    const found = await getData(`/read/distinct/${collection}/${filter}`)
    return found;
}

async function findAllCities() {
    console.log('findall cities');
    const found = await postData('/read/find', {
        collection: "areas",
        filter: { $and: [{ type: 'city' }, { $or: [{ disabled: { $exist: false } }, { disabled: false }] }] }
    }
    )
    return found
}

async function insertArea(obj = {}) {
    try {
        const find = await findArea({ name: obj.name })
        if (find.data?.length > 0) {
            return { status: 409, data: 'duplicated values' }
        }
        if (obj.type === 'polygon') {
            console.log({ obj })
            let points = obj.points
            let arraymap = [];
            for (let i = 0; i < points.length; i++) {
                let find = arraymap.find(p => p.point.lat === points[i].lat && p.point.lng === points[i].lng)
                if (!find) {
                    arraymap.push({ point: points[i], index: i })
                }
                else {
                    if (i != points.length - 1) {
                        points.splice(i, 1)
                        console.log(points.length)
                        i--
                    }
                }
            }

            console.log({ points })
        }
        const result = await postData('/create/insertone',
            {
                collection: "areas",
                data: obj
            });
        if (result.data) {
            const resultToSql = await postData('/create/create',
                {
                    tableName: "tbl_Areas",
                    values: { AreaIdFromMongo: result.data, AreaName: obj.name, Disabled: 'false' }
                })
            if (resultToSql && resultToSql.status !== 201) {
                const dropResult = await postData('/update/dropDocumentById',
                    {
                        collection: "areas",
                        data: { _id: result.data }
                    })
                return dropResult;
            }
            if (resultToSql.status === 201) {
                return resultToSql
            }
            else
                throw new Error("Can't insert area to mongo and sql DB");

        }
        else {

            throw new Error("Can't insert area");
        }
    }
    catch (error) {
        console.log(error.message)
        throw error
    }
}

async function updateArea(obj = {}) {
    console.log('update module before dbbbbbbbbbbbb');
    let originalId = obj._id;
    delete obj._id;
    const result = await postData('/update/mongo/',
        {
            collection: "areas",
            filter: { _id: originalId },
            set: { $set: obj }
        })
    if (result.status == 200) {
        console.log('monogo ooooookkkkkkkk', result);
        const resSql = await postData('/update/update',
            {
                tableName: "tbl_Areas",
                values: { AreaName: obj.name },
                condition: { AreaIdFromMongo: originalId }
            })
        if (resSql) {
            console.log('sql oooooookkkkkkkkkkk', resSql);
            return resSql
        }
        else
            return result

    }
    else
        throw new Error('Not Found area to update')
}

async function deleteArea(areaName) {
    try {
        const result = await postData('/update/mongo',
            {
                collection: "areas",
                filter: { name: areaName },
                set: { $set: { disabled: true } }

            })
        if (result.data) {
            const resultSql = await postData('/update/update',
                {
                    tableName: 'tbl_Areas',
                    values: { Disabled: 'true' },
                    condition: { AreaName: areaName }
                })
            return resultSql
        }
        // return result
        else {
            throw new Error('cannot delete area')
        }
    }
    catch (error) {
        throw error
    }

}

// async function updateArea(obj = {}) {
//     const result = await postData('/mongo/updateone',
//         {
//             collection: "areas",
//             filter: { supplierOrClientCode: obj.supplierOrClientCode },
//             set: { $set: { 'areasList.$[u]': obj.area } },
//             arrayFilters: { arrayFilters: [{ 'u.areaName': obj.area.areaName }] }
//         })
//     if (result)
//         return result
//     else
//         throw new Error('Not Found area to update')

// }

async function updateLocation(obj) {
    console.log("updateLocation->", obj.code, obj.areaName, obj.coordination);
    const result = await postData('/mongo/updateone',
        {
            collection: "areas",
            filter: { supplierOrClientCode: obj.code },
            set: { $set: { 'areas.$[u].location.coordinates': obj.coordination } },
            arrayFilters: { arrayFilters: [{ 'u.areaName': obj.areaName }] }
        })
    if (result)
        return result
    else
        throw new Error('Not Found area to update')
};

async function updatePointAndRadius(code, areaName, coordination, radius = 0) {
    const result = await postData('/mongo/updateone',
        {
            collection: "areas",
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

// async function deleteSupplierOrClient(phone) {
//     const result = await postData('/mongo/updateone',
//         {
//             collection: "Areas",
//             filter: { SupplierOrClientCode: phone },
//             set: { $set: { disable: false } }
//         })
//     if (result)
//         return result
//     else
//         throw new Error('Not Found supplier or client code to delete his areas')
// }



async function findArea(filter = {}) {
    // let query = {}
    // query[name] = value   
    const result = await postData('/read/find', {
        collection: "areas",
        filter
    })

    return result
}


// async function findAreame(filter = {}) {
//     // let query = {}
//     // query[name] = value   
//     const result = await postData('/read/findme', {
//         collection: "areas",
//         filter
//     })

//     return result
// }


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
    // deleteSupplierOrClient,
    deleteArea,
    updateArea,
    updateLocation,
    updatePointAndRadius,
    findArea,
    getTheDataOfTheArea,
    findAll,
    findByDistinct,
    findAllCities,
    findInPolygon
}
