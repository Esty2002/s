const { postData, getData } = require('../../services/axios');
const { checkObjectValidations } = require('../../services/validations/use-validations');

const values = [
    {
        entityName: "Orderers",
        func: ({ ordererName = null, ordererPhone = null }) => {
            return {
                tableName: "Orderers",
                values: {
                    OrdererName: ordererName,
                    OrdererPhone: ordererPhone,
                    AddedDate: new Date().toISOString(),
                    Disable: 'False',
                    DeletingDate: null
                }
            };

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
            };
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
            };
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
                _ = await checkObjectValidations(newObj.values, entity.entityName);
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
            entityName: entity.entityName,
            condition: prop !== 'none' ? prop : `1=1`
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
        const entity = values.find(({ entityName }) => entityName === obj.entityName);
        if (entity) {
            let result;
            const newObj = {
                tableName: obj.entityName,
                values: obj.update,
                condition: obj.condition
            };
            try {
                result = await postData('/update/update', newObj);
                return result;
            }
            catch (error) {
                throw error;
            }
        }
        else {
            throw new Error(`the entity name ${obj.entityName} is not exist`);
        }
    }
    else {
        throw new Error("the object is null");
    }
};

const deleteRecord = async (obj) => {
    if (obj) {
        const table = values.find(({ entityName }) => entityName === obj.entity);
        if (table) {
            let result;
            const newObj = {
                tableName: table.entityName,
                values: {
                    disable: 1,
                    deletingDate:new Date()
                },
                condition: obj.condition
            };
            try {
                result = await postData('/update/update', newObj);
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