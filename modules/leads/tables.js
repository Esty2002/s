const {  postData } = require('../../services/axios');

const values = [
    {
        tableName: "orderers",
        values: {
            OrdererName: "",
            OrdererPhone: "",
            AddedDate: new Date(),
            Disable: 0,
            DeletingDate: null
        }
    },
    {
        tableName: "pouringsTypes",
        values: {
            PouringName: "",
            AddedDate: new Date(),
            Disable: 0,
            DeletingDate: null
        }
    }
    , {
        tableName: "statusesLead",
        values: {
            StatusName: "",
            AddedDate: new Date(),
            Disable: 0,
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
                typeof newObj.values[key] === 'string' ? newObj.values[key] = obj.values[key] : newObj.values[key] = newObj.values[key];
            }

            try {
                console.log(newObj,"newObj");
                result = await postData( '/create/create', newObj);
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

const getRecord = async (tableName = "", columns = "", field = "") => {
    const table = values.find((v) => v.tableName === tableName);
    if (table) {
        obj = {
            tableName: tableName,
            columns: columns,
            condition: field !== 'none' ? field : `Disable=0`
        };
        try {
            const result = await postData('/sql/readTop20', obj);
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
                result = await postData( '/sql/update', newObj);
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
                    disable: 1,
                    deletingDate:new Date()
                },
                condition: obj.condition
            };
            try {
                result = await postData( '/sql/update', newObj);
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