require('dotenv').config()
const { getData, postData } = require('../../services/axios');
const { logToFile } = require('../../services/loggerPnini');


async function findByDistinct(obj) {
    let object = {
        name: "findByDistinct",
        description: 'findByDistinct in module',
        dataThatRecived: obj
    };
    const found = await postData('/read/distinct', obj)
    if (found.data) {
        logToFile(object)
        return found;
    }
    else {
        object.error = "can't distinct data"
        logToFile(object)
        throw new Error("can't distinct data")
    }
};

async function findInRadius(filter) {
    const response = await postData('/read/aggregate',
        {
            collection: 'areas',
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
                    $match: { $expr: { $gte: ['$radius', '$calculatedDist'], type: filter.type } }
                }
            ]
        }


    )
    
    if (response.data) {
        console.log("~~~~~~~~~~~~~~~~",response.data);
        return response.data
    }
    else {
        throw new Error(".......")
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
    const found = await postData('/read/find', {
        collection: "areas",
        filter: { $and: [filter, { $or: [{ disabled: { $exists: false } }, { disabled: false }] }] }
    });
    console.log("found.data", found.data);
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
    const found = await postData('/read/findpolygon', {
        collection: "areas",
        filter: { $and: [{ type: 'polygon' }, { $or: [{ disabled: { $exists: false } }, { disabled: false }] }] },
        point
    });
    if (found.data) {
        logToFile(object)
        return found.data;
    }
    else {
        object.error = "can't find point in polygon"
        throw new Error("can't find point in polygon")
    }
};
async function startt() {
    const t = await postData('/update/createIndex', { collection: 'areas' })
    return t
}
async function insertArea(obj = {}) {
    const t = await postData('/update/createIndex', { collection: "areas" })
    console.log('tttttttttttttttttttt',t);
    

    let object = {
        name: "insertArea",
        description: 'insertArea in module',
        dataThatRecived: obj
    };
    const result = await postData('/create/insertone',
        {
            collection: "areas",
            data: obj
        });
    if (result.data) {
        const resultToSql = await postData('/create/create',
            {
                tableName: 'tbl_Areas',
                values: { AreaIdFromMongo: result.data, AreaName: obj.name, Disabled: obj.disabled }
            })
        if (resultToSql) {
            logToFile(object)
            
            return resultToSql.data;
        }
        else {
            const dropResult = await postData('/update/dropDocumentById',
                {
                    collection: "areas",
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



async function updateArea(obj) {
    let object = {
        name: "updateArea",
        description: 'updateArea in module',
        dataThatRecived: obj
    };
    const result = await postData('/update/mongo',
        {
            collection: "areas",
            filter: { $and: [obj.filter, { $or: [{ disabled: { $exists: false } }, { disabled: false }] }] },
            set: { $set: obj.set }
        })
    console.log('result.data-----', result.data);
    if (result.data) {
        const resultSql = await postData('/update/update',
            {
                tableName: 'tbl_Areas',
                values: { Disabled: true },
                condition: { Disabled: false, AreaName: obj.filter.name }
            })
        if (resultSql) {
            console.log("############################");
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
    console.log(';;;;;;;;;;;;;;;', obj);
    let object = {
        name: "deleteArea",
        description: 'deleteArea in module',
        dataThatRecived: obj
    };
    console.log("____________________", obj.set);
    const result = await postData('/update/mongo',
        {
            collection: "areas",
            filter: { $and: [obj.filter, { $or: [{ disabled: { $exists: false } }, { disabled: false }] }] },
            set: { $set: obj.set }
        })
    console.log('result.data-----', result.data);
    if (result.data) {
        const resultSql = await postData('/update/update',
            {
                tableName: 'tbl_Areas',
                values: { Disabled: true },
                condition: { Disabled: false, AreaName: obj.filter.name }
            })
        if (resultSql) {
            console.log("############################");
            logToFile(object)
            return resultSql.data
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
    const response = await postData('/read/readTopN', { tableName: 'tbl_Areas', columns: '*' })
    console.log('response-------------', response.data);
    return response.data;
}

async function getFromMongo() {
    // .............mongo פונקציה זו שייכת לרי"ף - אין שם 
    const response = await postData('/read/find', { collection: 'areas' })
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
