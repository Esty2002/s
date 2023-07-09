require('dotenv').config()
const { getData, postData } = require('../../services/axios')

// async function findAll(obj) {
//     console.log('------------------------', obj.type, obj.disabled, obj.name);
//     const found = await postData('/read/find', {
//         collection: "areas",
//         filter: obj
//     })
//     return found;
// }

async function findByDistinct(obj) {
    const found = await postData('/read/distinct',obj)
    return found;
};

async function findAreas(filter) {
    const found = await postData('/read/find', {
        collection: "areas",
        filter: filter
    });
    return found.data;
};

async function serachByAreas(obj) {
    let areas = [];
    const citys = await findAreas({ basicName: obj.city });
    const points = await findAreas({ point: obj.point, type: 'point' });
    const radius = await findAreas({ type: 'radius' });
    const polygon = await findInPolygon({ point: obj.point });
    areas = [...areas, ...citys, ...points, ...radius, ...polygon.data];
    return areas;
};

async function findInPolygon(point) {
    const found = await postData('/read/findpolygon', {
        collection: "areas",
        filter: { $and: [{ type: 'polygon' }, { $or: [{ disabled: { $exists: false } }, { disabled: false }] }] },
        point
    });
    return found;
};

async function insertArea(obj = {}) {
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
        throw new Error("Can't insert area");
    }
};



async function updateArea(obj) {
    const result = await postData('/update/mongo',
        {
            collection: "areas",
            filter: { $and: [obj.filter, { $or: [{ disabled: { $exists: false } }, { disabled: false }] }] },
            set: { $set: obj.set }
        })
    if (result.data) {
        const resultSql = await postData('/update/update',
            {
                tableName: 'tbl_Areas',
                values: { Disabled: true },
                condition: { Disabled: false, AreaName: areaName }
            })
    }
    // return result
    else {
        throw new Error('cannot delete area')
    }

}

async function getFromSql() {
    // .............sql פונקציה זו שייכת לרי"ף - אין שם 
    const response = await postData('/read/readTopN', { tableName: 'tbl_Areas', columns: '*' })
    console.log('response-------------', response.data);
    return response.data;
}

module.exports = {
    insertArea,
    updateArea,
    serachByAreas,
    findByDistinct,
    findAreas,
    findInPolygon,
    getFromSql
}
