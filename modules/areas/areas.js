require('dotenv').config()
const { getData, postData, deleteData, putData } = require('../../services/axios');
const { logToFile } = require('../../services/loggerPnini');
const { models } = require('../utils/schemas');

// mongoשל ה id את ה sqlואין לs mongo נכנס לפני sql-מסודר לפי הטרנזקציה החדשה אך הטרנזקציה לא טובה סופית כיון ש
async function insertArea(obj = {}) {
    try {
        const find = await findAreas({ areaName: obj.name })
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

        obj.areaName = obj.name
        const result = await postData('/create/createone',
            {
                entityName: 'areas',

                values: { ...obj, addedDate: new Date(), username: 'develop', disabled: false }
            });
        return result
    }
    catch (error) {
        console.log(error.message)

        throw { status: 500, message: error.message }
    }

}

async function findDistinctAreaTypes(obj) {
    let object = {
        name: "findDistinctAreaTypes",
        description: 'findDistinctAreaTypes in module',
        dataThatRecived: obj
    };
    const found = await postData('/read/readMany/areas', { fields: [models.AREAS.fields.TYPE.name] })
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
    const response = await postData('/read/readMany/areas',
        {
            condition:{...filter}
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
    const found = await postData('/read/readMany/areas',
        { condition: { ...filter, disabled: false } }
    );

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
    const found = await postData('/read/readMany/areas', {
        condition: { type: 'polygon', ...point, disabled:false },
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
            entityName: "areas",
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
// אמור להיות בטרנזקציה שרותי רז באמצע לעשות!!!!!!!!!!!!!!!!!!!!
async function deleteArea(obj) {
    console.log({ objjjjjj: obj });
    let object = {
        name: "deleteArea",
        description: 'deleteArea in module',
        dataThatRecived: obj
    };
    const result = await putData('/update/updateone',
        {
            entityName: "areas",
            condition: { AND: [obj.filter, { OR: [{ disabled: null }, { disabled: false }] }] },
            values: obj.set
        })
    if (result.data) {
        const resultDB = await putData('/update/updateone',
            {
                entityName: 'areas',
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


module.exports = {
    insertArea,
    updateArea,
    findDistinctAreaTypes,
    findAreas,
    findInPolygon,
    deleteArea,
    findInRadius,
    startt
}
