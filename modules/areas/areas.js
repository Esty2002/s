require('dotenv').config()
const { getData, postData, deleteData, putData } = require('../../services/axios');
const { logToFile } = require('../../services/loggerPnini');

// mongoשל ה id את ה sqlואין לs mongo נכנס לפני sql-מסודר לפי הטרנזקציה החדשה אך הטרנזקציה לא טובה סופית כיון ש
async function insertArea(obj = {}) {
    console.log({ objjjjjjjjjj: obj });
    try {
        const find = await findAreas({ name: obj.name })
        console.log({ finddd: find });
        if (find?.length > 0) {
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
        // const result = await postData('/create/createManyEntities',
        //     [
        //         {
        //             entityName: "areas_object",
        //             values: obj
        //         },
        //         {
        //             entityName: "Areas",
        //             values: { AreaName: obj.name, Disabled: 'false' }
        //         }
        //     ])
        // if (result.status === 201)
        //     return result;
        // else
        //     throw new Error("Can't insert area to mongo and/or sql DB");
        const result = await postData('/create/createone',
            {
                entityName: 'areas_object',
                values: obj
            });

        if (result.data) {
            const result2 = await postData('/create/createone',
                {
                    entityName: "Areas",
                    values: { AreaIdFromMongo: result.data, AreaName: obj.name, Disabled: 'false' }
                })
            console.log('result2', result2.status);
            if (result2 && result2.status !== 201) {
                const dropResult = await deleteData('/delete/deleteone',
                    {
                        entityName: "areas_object",
                        data: { _id: result.data }
                    })
                return dropResult;
            }
            if (result2.status === 201)
                return result2
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
// עובד!!!!!!!!!
async function findByDistinct(obj) {
    let object = {
        name: "findByDistinct",
        description: 'findByDistinct in module',
        dataThatRecived: obj
    };
    const found = await postData('/read/readMany/areas_object', obj)
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
//craeatIndex וכן יש בעיה עם ה aggregate עדיין לא מסודר לפי המבנה של DBSERVER לא עובד כיון ש 
async function findInRadius(filter) {
    const response = await postData('/read/readMany/areas_object',
        {
            // condition: [
            //     {
            //         GEO_NEAR:
            //             [{
            //                 near:
            //                 {
            //                     type: "Point",
            //                     coordinates: filter.point
            //                 },
            //                 distanceField: "calculatedDist",
            //                 maxDistance: 4500,
            //                 spherical: true
            //             }]
            //     },
            //     {
            //         MATCH: [{ EXPR: [{ GTE: ['$radius', '$calculatedDist'] }], type: filter.type }]
            //     }
            // ]
            //----------------שבדוקר mongo זה מה שהיה קודם- זוהי פונקציה שעבדה מצוין ב 
            aggregate: [{
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: filter.point
                    },
                    distanceField: "calculatedDist",
                    maxDistance: 4500,
                    spherical: true
                }
            },
            {
                $match: { $expr: { $gte: ['$radius', '$calculatedDist'] }, type: filter.type }
            }]
        }
    )
    if (response.data) {
        return response.data
    }
    else {
        throw new Error("can't find point in polygon")
    }
};

async function findAreas(filter) {
    let object = {
        name: "findAreas",
        description: 'findAreas in module',
        dataThatRecived: filter
    };
    const found = await postData('/read/readMany/areas_object', {
        condition: { AND: [filter, { OR: [{ disabled: undefined }, { disabled: true }] }] }
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

async function findInPolygon(point) {
    let object = {
        name: "findInPolygon",
        description: 'findInPolygon in module',
        dataThatRecived: point
    };
    const found = await postData('/read/readMany/areas_object', {
        filter: { AND: [{ type: 'polygon' }, { OR: [{ disabled: undefined }, { disabled: false }] }] },
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
}

async function startt() {
    const t = await postData('/update/createIndex', { collection: 'areas' })
    return t
}

// אמור להיות בטרנזקציה שרותי רז באמצע לעשות!!!!!!!!!!!!!!!!!!!!
async function updateArea(obj) {
    let object = {
        name: "updateArea",
        description: 'updateArea in module',
        dataThatRecived: obj
    };
    const result = await putData('/update/updateone',
        {
            entityName: "areas_object",
            condition: [{ AND: [obj.condition, { OR: [{ disabled: undefined }, { disabled: false }] }] }],
            values: obj.set
        })
    if (result.data) {
        const result2 = await putData('/update/updateone',
            {
                entityName: 'Areas',
                condition: { Disabled: false, AreaName: obj.filter.name },
                values: { Disabled: true }
            })
        if (result2) {
            logToFile(object)
            return result2.data
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
<<<<<<< HEAD

async function findArea(filter = {}) {
    // let query = {}
    // query[name] = value   
    const result = await postData('/read/find', {
        collection: "areas",
        filter
    })

    return result
}

async function findSupplierOrClient(code) {
    const result = await postData(server, '/read/find',
=======
// אמור להיות בטרנזקציה שרותי רז באמצע לעשות!!!!!!!!!!!!!!!!!!!!
async function deleteArea(obj) {
    console.log({ objjjjjj: obj });
    let object = {
        name: "deleteArea",
        description: 'deleteArea in module',
        dataThatRecived: obj
    };
    const result = await putData('/update/updateone',
>>>>>>> 459b67c540bda832f5ef043854683ed06b858677
        {
            entityName: "areas_object",
            condition: { AND: [obj.filter, { OR: [{ disabled: null }, { disabled: false }] }] },
            values: obj.set
        })
<<<<<<< HEAD
    if (result)
        return result

    else
        throw new Error("not found supplier or client code")
=======
    if (result.data) {
        const resultDB = await putData('/update/updateone',
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
>>>>>>> 459b67c540bda832f5ef043854683ed06b858677
}

async function getFromSql() {
    // .............sql פונקציה זו שייכת לרי"ף - אין שם 
    const response = await getData('/read/readMany/Areas')
    console.log('response-------------', response.data);
    return response.data;
}

<<<<<<< HEAD
        })
    if (result)
        return result

    else
        throw new Error("not found supplier or client code")
=======
async function getFromMongo() {
    // .............mongo פונקציה זו שייכת לרי"ף - אין שם 
    const response = await getData('/read/readMany/areas_object')
    console.log('response-------------', response.data);
    return response.data;
>>>>>>> 459b67c540bda832f5ef043854683ed06b858677
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
