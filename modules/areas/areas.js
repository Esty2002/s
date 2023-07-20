require('dotenv').config()
const { getData, postData } = require('../../services/axios');
const { logToFile } = require('../../services/loggerPnini');
const { checkObjectValidations } = require('../../services/validations/use-validations')

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
        console.log("~~~~~~~~~~~~~~~~", response.data);
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

async function checkPolygon(obj) {
    let latPointObj
    let lngPointObj
    let pointValidation
    let place
    let placeValidation

    for (let point of obj.points) {
        latPointObj = { point: point.lat }
        pointValidation = await checkObjectValidations(latPointObj, "areas_point")
        if (pointValidation) {
            console.log('lat', latPointObj);
            lngPointObj = { point: point.lng }
            pointValidation = await checkObjectValidations(lngPointObj, "areas_point")
            if (pointValidation) {
                console.log('lng', lngPointObj);
            }
            else {
                throw new Error("One of the points is uncorrect");
            }
        }
        else {
            throw new Error("One of the points is uncorrect");
        }
    }
    obj.placesId.forEach(element => {
        place = { placeId: element }
        placeValidation = checkObjectValidations(place, "areas_placeId")
        if (placeValidation) {
            console.log(placeValidation, 'I will continue');
        }
        else {
            throw new Error("One of the places_id is uncorrect");
        }
    });
}

async function checkRadius(obj) {
    const radiusObj = { radius: obj.radius / 1000 }
    const checkValidationRadius = await checkObjectValidations(radiusObj, "areas_radius")
    if (checkValidationRadius) {
        console.log('Im correct lets continue');
    }
    else {
        throw new Error("radius is uncorrect");
    }
}

async function checkPointAndPlaceId(obj) {
    let pointValidation
    const latPoint = { point: obj.point.lat }
    pointValidation = await checkObjectValidations(latPoint, "areas_point")
    if (pointValidation) {
        const lngPoint = { point: obj.point.lng }
        pointValidation = await checkObjectValidations(lngPoint, "areas_point")
        if (pointValidation) {
            console.log('Im correct lets continue');
        }
        else {
            throw new Error("lng is uncorrect");
        }
    }
    else {
        throw new Error("lat is uncorrect");
    }
    const place = { placeId: obj.placeId }
    const placeValidation = checkObjectValidations(place, "areas_placeId")
    if (placeValidation) {
        console.log(placeValidation, 'I will continue');
    }
    else {
        throw new Error("the place_id is uncorrect");
    }
}

async function insertArea(obj = {}) {
    console.log(obj);
    if (obj.type == 'polygon') {
        await checkPolygon(obj)
    }
    else {
        await checkPointAndPlaceId(obj)
    }
    if (obj.type == 'radius') {
        await checkRadius(obj)
    }

    const mongoObj = { addedDate: obj.addedDate, disabled: obj.disabled, basicName: obj.basicName, name: obj.name, type: obj.type }

    const checkValidationMongo = await checkObjectValidations(mongoObj, "areas")

    if (checkValidationMongo) {
        console.log('mongo vali fine', checkValidationMongo);
        const result = await postData('/create/insertone',
            {
                collection: "areas",
                data: obj
            });
        if (result.data) {
            console.log('inserted to mongo');
            const sqlObj = { AreaIdFromMongo: result.data, AreaName: obj.name, Disabled: obj.disabled }

            const checkValidationSql = await checkObjectValidations(sqlObj, "tbl_Areas")

            if (checkValidationSql) {
                console.log('sql vali fine', checkValidationSql);
                const resultToSql = await postData('/create/create',
                    {
                        tableName: 'tbl_Areas',
                        values: { AreaIdFromMongo: result.data, AreaName: obj.name, Disabled: obj.disabled }
                    })
                if (resultToSql) {
                    console.log('inserted to sql');
                    return resultToSql.data;
                }
                else {
                    const dropResult = await postData('/update/dropDocumentById',
                        {
                            collection: "areas",
                            data: { _id: result.data }
                        })
                    throw new Error("Can't insert area to mongo and sql DB");

                }
            }
            else {
                console.log('sql object not valid');
                const dropResult2 = await postData('/update/dropDocumentById',
                    {
                        collection: "areas",
                        data: { _id: result.data }
                    })
                throw new Error("Can't insert area to mongo and sql DB");
            }
        }
        else {
            throw new Error("Can't insert area");
        }
    }
    else {
        console.log('mongo object not valid');
    }
};


async function updateArea(obj = {}) {
    let originalId = obj._id;
    delete obj._id;

    if (obj.type == 'polygon') {
        await checkPolygon(obj)
    }
    else {
        await checkPointAndPlaceId(obj)
    }
    if (obj.type == 'radius') {
        await checkRadius(obj)
    }

    const mongoObj = { addedDate: obj.addedDate, disabled: obj.disabled, basicName: obj.basicName, name: obj.name, type: obj.type }

    const checkValidationMongo = await checkObjectValidations(mongoObj, "areas")
    if (checkValidationMongo) {
        console.log('mongo vali fine', checkValidationMongo);
        const result = await postData('/update/mongo/',
            {
                collection: "areas",
                filter: { _id: originalId },
                set: { $set: obj }
            })
        if (result.data) {
            console.log('monogo ooooookkkkkkkk', result);

            const sqlObj = { AreaIdFromMongo: result.data, AreaName: obj.name, Disabled: obj.disabled }
            const checkValidationSql = await checkObjectValidations(
                sqlObj, "tbl_Areas")

            if (checkValidationSql) {
                console.log('sql vali fine', checkValidationSql);

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
                else {
                    const dropResult = await postData('/update/dropDocumentById',
                        {
                            collection: "areas",
                            data: { _id: result.data }
                        })
                    throw new Error("Can't insert area to mongo and sql DB");
                }
            }
            else {
                console.log('sql object not valid');
                const dropResult2 = await postData('/update/dropDocumentById',
                    {
                        collection: "areas",
                        data: { _id: result.data }
                    })
                throw new Error("Can't insert area to mongo and sql DB");
            }
        }
        else
            throw new Error('Not Found area to update')
    }
    else {
        console.log('mongo object not valid');
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
    findInRadius,
    startt
}
