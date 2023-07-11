require('dotenv').config()
const { getData, postData } = require('../../services/axios')

async function findAll(filter = undefined) {
    const found = await postData('/read/find', {
        collection: "areas",
        filter: { type: filter }
    })
    return found;
}

async function findByDistinct(collection, filter = undefined) {
    console.log({ collection });
    console.log({ filter });

    const found = await getData(`/read/distinct/${collection}/${filter}`)
    console.log({ found });
    return found;
}

async function findAreas(filter) {
    console.log('findall cities', filter);
    const found = await postData('/read/find', {
        collection: "areas",
        filter: filter
    })
    console.log({ found })
    return found.data
}

async function findArea(body) {
    // let query = {}
    // query[name] = value   
    const result = await postData('/read/find', {
        collection: "areas",
        filter: body
    })
    return result
}

async function serachByAreas(obj) {
    let areas = [];
    const citys = await findAreas({ basicName: obj.city });
    const points = await findAreas({ point: obj.point, type: 'point' });
    const radius = await findAreas({ type: 'radius' });
    const polygon = await findInPolygon({ point: obj.point });
    areas = [...areas, ...citys, ...points, ...radius, ...polygon];
    // console.log('areas-----------', areas);
    return areas;
}

async function findInPolygon(point) {
    console.log({ point });
    const found = await postData('/read/findpolygon', {
        collection: "areas",
        filter: { type: 'polygon' },
        // $and: [{ type: 'polygon' }, { $or: [{ disabled: { $exists: false } }, { disabled: false }] }]
        point
    });
    return found.data;
}

async function findAreaWithRadius(point) {
    let areasWithRadius = []
    const radius = await findAreas({ type: 'radius' })
    console.log('in radiussssssssssss', radius);
    if (radius.length > 0) {
        console.log('popopopopopopopopopopopopo');
        radius.forEach((par) => {
            if (par.point) {
                console.log('ttytytytytyttytytytytytyt');
                const distance = window.google.maps.geometry.spherical.computeDistanceBetween(point, par.point);
                console.log({ distance });
                console.log('dissssss');
                if (par.radius - distance * 1000 >= 0) {
                    areasWithRadius = [...areasWithRadius, per]
                }
            }
        })
    }

    return areasWithRadius
}

async function insertArea(obj = {}) {
    console.log({ obj });
    const result = await postData('/create/insertone',
        {
            collection: "areas",
            data: obj
        });
    console.log('mongo----', result.data, 'name', obj.name);
    if (result.data) {
        const resultToSql = await postData('/create/create',
            {
                tableName: "tbl_Areas",
                values: { AreaIdFromMongo: result.data, AreaName: obj.name, Disabled: obj.disabled }
            })
        console.log("*-*-*-*-*-*-*-", resultToSql);

        //-------------------------------------- לשאול את המורה איזו שאלה הכי נחוצה
        if (resultToSql) {
            return resultToSql.data;
        }
        else {
            const dropResult = await postData('/update/dropDocumentById',
                {
                    collection: "areas",
                    data: { _id: result.data }
                })
            console.log("result.data***", result.data);
            console.log("dropMongoResult--", dropResult);
            console.log("dropMongoResult.data--", dropResult.data);
            throw new Error("Can't insert area to mongo and sql DB");
        }
    }
    else {
        throw new Error("Can't insert area");
    }

}

async function updateArea(obj = {}) {
    const result = await postData('/mongo/updateone',
        {
            collection: "areas",
            filter: { supplierOrClientCode: obj.supplierOrClientCode },
            set: { $set: { 'areasList.$[u]': obj.area } },
            arrayFilters: { arrayFilters: [{ 'u.areaName': obj.area.areaName }] }
        })
    if (result)
        return result
    else
        throw new Error('Not Found area to update')

}

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
async function deleteSupplierOrClient(phone) {
    const result = await postData('/mongo/updateone',
        {
            collection: "areas",
            filter: { SupplierOrClientCode: phone },
            set: { $set: { disable: false } }
        })
    if (result)
        return result
    else
        throw new Error('Not Found supplier or client code to delete his areas')
}

async function deleteArea(areaName) {
    const result = await postData('/update/updateone',
        {
            collection: "areas",
            filter: { name: areaName },
            set: { $set: { disabled: false } }

        })
    if (result.data) {
        console.log('AREANAME----', areaName);
        const resultSql = await postData('/update/update',
            {
                tableName: 'tbl_Areas',
                values: { Disabled: false },
                condition: { AreaName: areaName }
            })
        console.log('delete from SQL----------------', resultSql.data.rowsAffected);
    }
    // return result
    else {
        throw new Error('cannot delete area')
    }

}


async function findAreaByCode(code) {
    let filter = {};
    const result = await postData('/read/find',
        {
            collection: "Areas",
            filter: { supplierOrClientCode: code },
            project: {}
        })
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
    // deleteSupplierOrClient,
    deleteArea,
    updateArea,
    updateLocation,
    updatePointAndRadius,
    findArea,
    serachByAreas,
    getTheDataOfTheArea,
    findAll,
    findByDistinct,
    findAreas,
    findAreaWithRadius,
    findInPolygon
}
