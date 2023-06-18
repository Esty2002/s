const { sqlServer, postData, getData } = require('../../services/axios');

const values = [
    {
        tableName: "tbl_Orderers",
        values: {
            OrdererName: "",
            OrdererPhone: "",
            AddedDate: new Date().toISOString(),
            Disable:'False',
            DeletingDate: null
        }
    },
    {
        tableName: "tbl_PouringsTypes",
        values: {
            PouringName: "",
            AddedDate: new Date().toISOString(),
            Disable: 'False',
            DeletingDate: null
        }
    },
    {
        tableName: "tbl_StatusesLead",
        values: {
            StatusName: "",
            AddedDate: new Date().toISOString(),
            Disable: 'False',
            DeletingDate: null
        }
    },
    
];


const newRecord = async (obj = null) => {
    let result;
    if (obj) {
        const val = values.find(({ tableName }) => tableName === obj.tableName);
        if (val) {
            let newObj = {
                tableName: val.tableName,
                values: val.values
            };
            for (let key in newObj['values']) {
                newObj.values[key] === "" ? newObj.values[key] = obj.values[key] : newObj.values[key] = newObj.values[key];
            }
            try {
                result = await postData(sqlServer, '/create/create', newObj);
                return result;
            }
            catch (error) {
                throw error;
            }
        }
        else {
            throw new Error("the table name is not exist");
        }
    }
    else {
        throw new Error("the object is null");
    }
};

const getRecord = async (tableName = "", field = "") => {
    const table = values.find((v) => v.tableName === tableName);
    if (table) {
        obj = {
            tableName: tableName,
            condition: field !== 'none' ? field : `Disable=0`
        };
        try {
            const result = await getData(sqlServer, `/read/readAll/${obj.tableName}/${obj.condition}` );
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    else {
        throw new Error("the table name is not exist");
    }
};

const updateRecord = async (obj = null) => {
    if (obj) {
        const table = values.find(({ tableName }) => tableName === obj.tableName);
        if (table) {
            let result;
            const val = obj.tableName;
            const newObj = {
                tableName: val,
                values: obj.update,
                condition: obj.condition
            };
            try {
                result = await postData(sqlServer, '/update/update', newObj);
                return result;
            }
            catch (error) {
                throw error;
            }
        }
        else {
            throw new Error("the table name is not exist");
        }
    }
    else {
        throw new Error("the object is null");
    }
};

const deleteRecord = async (obj) => {
    if (obj) {
        const table = values.find(({ tableName }) => tableName === obj.tableName);
        if (table) {
            let result;
            const val = obj.tableName;
            const newObj = {
                tableName: val,
                values: {
                    Disable: 'True',
                    DeletingDate: new Date().toISOString()
                },
                condition: obj.condition
            };
            try {
                result = await postData(sqlServer, '/update/update', newObj);
                return result;
            }
            catch (error) {
                throw error;
            }
        }
        else {
            throw new Error("the table name is not exist");
        }
    }
    else {
        throw new Error("the object is null");

    }
};



module.exports = { newRecord, updateRecord, getRecord, deleteRecord };