const {  postData ,getData} = require('../../services/axios');

const values = [
    {
        entityName: "Orderers",
        func: ({ ordererName=null, ordererPhone=null }) => {
            return {
                tableName: "Orderers",
                values: {
                    OrdererName: ordererName,
                    OrdererPhone: ordererPhone,
                    AddedDate: new Date().toISOString(),
                    Disable: 'False',
                    DeletingDate: null
                }
            }

        }

    },
    {
        entityName: "PouringsTypes",
        func: ({ pouringName }) => {
            return {
                tableName: "PouringsTypes",
                values: {
                    PouringName: pouringName,
                    AddedDate: new Date().toISOString(),
                    Disable: 'False',
                    DeletingDate: null
                }
            }
        }

    },
    {

        entityName: "StatusesLead",
        func: ({ statusName }) => {
            return {
                tableName: "StatusesLead",
                values: {
                    StatusName: statusName,
                    AddedDate: new Date().toISOString(),
                    Disable: 'False',
                    DeletingDate: null
                }
            }
        }

    },
];



const newRecord = async (obj = null) => {
    let result;
    if (obj) {
        const entity = values.find(({ entityName }) => entityName === obj.entityName);
        if (entity) {
            const newObj = entity.func(obj.values);
            try {
                result = await postData('/create/create', newObj);
                return result;
            }
            catch (error) {
                throw error;
            }
        }
        else {
            throw new Error("the entity name not exist");
        }

    }
    else {
        throw new Error("the object is null");
    }
};

const getRecord = async (entityName = "", prop = "") => {
    const entity = values.find((v) => v.entityName === entityName);
    if (entity) {
        obj = {
            entityName:entity.entityName,
            condition: prop !== 'none' ? prop : `Disable=0`
        };
        try {

            const result = await getData(`/read/readAll/${obj.entityName}/${obj.condition}`);
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
                    Disable: 'True',
                    DeletingDate: new Date().toISOString()
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