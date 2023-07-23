const { postData, getData } = require('../../services/axios');
const { checkObjectValidations } = require('../../services/validations/use-validations');

const values = [
    {
        entityName: "orderers",
        values: {
            OrdererName: "",
            OrdererPhone: "",
            AddedDate: new Date(),
            Disable: 0,
            DeletingDate: null
        }

    },
    {
        entityName: "pouringsTypes",
        values: {
            PouringName: "",
            AddedDate: new Date(),
            Disable: 0,
            DeletingDate: null
        }
    }
    , {
        entityName: "statusesLead",
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
            entityName: tableName,
            columns: columns,
            condition: field !== 'none' ? field : `Disable=0`
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
                entityName: val,
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