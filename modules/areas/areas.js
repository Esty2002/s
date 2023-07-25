require('dotenv').config()
const { getData, postData, deleteData, putData } = require('../../services/axios');
const { logToFile } = require('../../services/loggerPnini');



async function insertArea(obj = {}) {
    // const t = await postData('/update/createIndex', { collection: "areas" })

    let object = {
        name: "insertArea",
        description: 'insertArea in module',
        dataThatRecived: obj
    };
    const result = await postData('/create/createone',
        {
            entityName: "areas_object",
            data: obj
        });
    if (result.data) {
        const resultToSql = await postData('/create/createone',
            {
                entityName: 'Areas',
                values: { AreaIdFromMongo: result.data, AreaName: obj.name, Disabled: obj.disabled }
            })
        if (resultToSql) {
            logToFile(object)

            return resultToSql.data;
        }
        else {
            const dropResult = await deleteData('/delete/deleteone',
                {
                    entityName: 'areas_object',
                    data: { _id: result.data }
                })
            object.error = "Can't insert area to mongo and sql DB"
            logToFile(object)
            throw new Error("Can't insert area to mongo and sql DB");
        }
    }
    else {
        object.error = "Can't insert area"
        logToFile(object)
        throw new Error("Can't insert area");
    }
};

async function findByDistinct(obj) {
    let object = {
        name: "findByDistinct",
        description: 'findByDistinct in module',
        dataThatRecived: obj
    };
    const found = await postData('/read/readone/areas_object', obj)

    if (found.data) {
        const types = [...new Set(found.data.map(a => a.type))]
        logToFile(types)
        return types;
    }
    else {
        object.error = "can't distinct data"
        logToFile(object)
        throw new Error("can't distinct data")
    }
};

async function findInRadius(filter) {
    const response = await postData('/read/readMany/areas_object',
        {
            aggregate: [
                {
                    $geoNear:
                    {
                        near:
                        {
                            type: "Point",
                            coordinates: filter.point
                        },
                        distanceField: "calculatedDist",
                        maxDistance: 4500,
                        spherical: true
                    }
                },
                {
                    $match: { $expr: { $gte: ['$radius', '$calculatedDist'] }, type: 'radius' }
                }
            ]
        }
        // db.geom.find({
        //     polygons: {
        //       $geoIntersects: {
        //         $geometry: {
        //           "type": "Point",
        //           "coordinates": [17.3734, 78.4738]
        //         }
        //       }
        //     }
        //   });
    )

    if (response.data) {
        return response.data
    }
    else {
        throw new Error("can't find point in polygon")
    }

    // db.getCollection('tA').aggregate([
    //     {
    //       $geoNear: {
    //         near: {
    //           type: "Point",
    //           coordinates: [40, 30] // red point geoJson coordinates
    //         },
    //         distanceField: "calculatedDist",
    //         maxDistance: 12000000, // radius limit
    //         key: 'gpsLocation',
    //         spherical: true
    //       }
    //     },
    //     {$match: {$expr: {$gte:['$radius', '$calculatedDist']}}}
    //   ])
};

async function findAreas(filter) {
    let object = {
        name: "findAreas",
        description: 'findAreas in module',
        dataThatRecived: filter
    };
    const found = await postData('/read/readMany/areas_object', {
        condition: { AND: [filter, { OR: [{ disabled: undefined }, { disabled: false }] }] }
    });
    if (found.data) {
        logToFile(object)
        return found.data;
    }
    else {
        object.error = "can't find areas"
        logToFile(object)
        throw new Error("can't find areas")
    }
};

// async function serachByAreas(obj) {
//     let areas = [];
//     const citys = await findAreas({ basicName: obj.city });
//     const points = await findAreas({ point: obj.point, type: 'point' });
//     const radius = await findAreas({ type: 'radius' });
//     const polygon = await findInPolygon({ point: obj.point });
//     areas = [...areas, ...citys, ...points, ...radius, ...polygon];
//     return areas;
// };

async function findInPolygon(point) {
    let object = {
        name: "findInPolygon",
        description: 'findInPolygon in module',
        dataThatRecived: point
    };
    const found = await postData('/read/readMany/areas_object', {
        // filter: { $and: [{ type: 'polygon' }, { $or: [{ disabled: { $exists: false } }, { disabled: false }] }] },
        // point
        loc: {
            $geoIntersects: {
                $geometry: {
                    type: "Point",
                    coordinates: point
                }
            }
        }
    });
    if (found.data) {
        logToFile(object)
        return found.data;
    }
    else {
        object.error = "can't find point in polygon"
        throw new Error("can't find point in polygon")
    }
}

async function insertArea(obj = {}) {
    try {
        const find = await findAreas(obj)
        if (find.data?.length > 0) {
            return { status: 409, data: 'duplicated values' }
        }
        if (obj.type === 'polygon') {
            console.log({ obj })
            let points = obj.points
            let arraymap = []
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
        const result = await postData('/create/createone',
            {
                entityName: "areas_object",
                data: obj
            });
        if (result.data) {
            const resultToSql = await postData('/create/createone',
                {
                    entityName: "Areas",
                    values: { AreaIdFromMongo: result.data, AreaName: obj.name, Disabled: 'false' }
                })
            if (resultToSql && resultToSql.status !== 201) {
                const dropResult = await deleteData('/delete/deleteone',
                    {
                        entityName: "areas_object",
                        data: { _id: result.data }
                    })
                return dropResult;
            }
            if (resultToSql.status === 201)
                return resultToSql
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


async function startt() {
    const t = await postData('/update/createIndex', { collection: 'areas' })
    return t
}

async function updateArea(obj) {
    let object = {
        name: "updateArea",
        description: 'updateArea in module',
        dataThatRecived: obj
    };
    const result = await putData('/update/updateone',
        {
            entityName: "areas_object",
            filter: { $and: [obj.filter, { $or: [{ disabled: { $exists: false } }, { disabled: false }] }] },
            set: { $set: obj.set }
        })
    if (result.data) {
        const resultSql = await putData('/update/updateone',
            {
                tableName: 'Areas',
                values: { Disabled: true },
                condition: { Disabled: false, AreaName: obj.filter.name }
            })
        if (resultSql) {
            logToFile(object)
            return resultSql.data
        }
        else {
            object.error = "Can't update area to mongo and sql DB"
            logToFile(object)
            throw new Error("Can't update area to mongo and sql DB");
        }


    }
    else {
        object.error = "can't update area"
        logToFile(object)
        throw new Error("can't update area")
    }


}

async function deleteArea(obj) {
    let object = {
        name: "deleteArea",
        description: 'deleteArea in module',
        dataThatRecived: obj
    };
    const result = await deleteData('/delete/deleteone',
        {
            entityName: "areas",
            filter: { $and: [obj.filter, { $or: [{ disabled: { $exists: false } }, { disabled: false }] }] },
            set: { $set: obj.set }
        })
    if (result.data) {
        const resultDB = await deleteData('/delete/deleteone',
            {
                entityName: 'Areas',
                values: { Disabled: true },
                condition: { Disabled: false, AreaName: obj.filter.name }
            })
        if (resultDB) {
            logToFile(object)
            return resultDB.data
        }
        else {
            object.error = "Can't delete area from mongo and sql DB"
            logToFile(object)
            throw new Error("Can't delete area from mongo and sql DB");
        }


    }
    else {
        object.error = "can't delete area"
        logToFile(object)
        throw new Error("can't delete area")
    }
}

async function getFromSql() {
    // .............sql פונקציה זו שייכת לרי"ף - אין שם 
    const response = await getData('/read/readMany/Areas')
    console.log('response-------------', response.data);
    return response.data;
}

async function getFromMongo() {
    // .............mongo פונקציה זו שייכת לרי"ף - אין שם 
    const response = await getData('/read/readMany/areas_object')
    console.log('response-------------', response.data);
    return response.data;
}

module.exports = {
    insertArea,
    updateArea,
    findByDistinct,
    findAreas,
    findInPolygon,
    getFromSql,
    getFromMongo,
    deleteArea,
    findInRadius,
    startt
}
