const { sqlServer, postData } = require('../../services/axios')

const values = {
    orderers: "tbl_Orderers",
    tbl_Orderers: {
        OrdererName: "",
        OrdererPhone: "",
        AddedDate: new Date(),
        Disable: 0,
        DeletingDate: null
    },

    pouringsTypes: "tbl_PouringsTypes",
    tbl_PouringsTypes: {
        PouringName: "",
        AddedDate: new Date(),
        Disable: 0,
        DeletingDate: null
    },
    statusesLead: "tbl_StatusesLead",
    tbl_StatusesLead: {
        StatusName: "",
        AddedDate: new Date(),
        Disable: 0,
        DeletingDate: null
    }

};

const newRecord = async (obj = null) => {
    let result;
    if (obj) {
        const val=values[obj.tableName];
        let newObj = {
            tableName: val,
            values: values[val]
        }
        for (let key in newObj['values']) {
            typeof newObj.values[key] === 'string' ? newObj.values[key] = obj.values[key] : newObj.values[key] = newObj.values[key];
        }
        result = await postData(sqlServer, '/create/create', newObj);
        return result;
    }
    else {
        throw new Error("the object is null");
    }
};

const getRecord = async (tableName, columns, field) => {
    let result;
    try {
        const val=values[tableName];

        obj = {
            tableName:val,
            columns: columns,
            condition: field !== 'none' ? field : `Disable=0`
        };
        result = await postData(sqlServer, '/read/readTop20', obj)
        return result;
    }
    catch {
        throw new Error("the object is null");
    }
}

const updateRecord = async (obj = null) => {
    let result;
    if (obj) {
        const val=values[obj.tableName];

        const newObj = {
            tableName:val,
            values: obj.update,
            condition: obj.condition
        }

        result = await postData(sqlServer, '/update/update', newObj);

        return result;
    }
    else {
        throw new Error("the object is null");
    }
}
const deleteRecord = async (obj) => {
    let result;
    if (obj) {
        try {
            const val=values[obj.tableName];
            const newObj = {
                tableName:val,
                values: {
                    Disable: 1
                },
                condition: obj.condition
            }
            result = await postData(sqlServer, '/update/update', newObj)
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    else {
        throw new Error("the object is null");

    }
}
module.exports = { newRecord, updateRecord, getRecord, deleteRecord };