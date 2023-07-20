const { postData, getData } = require('../../services/axios');
const { checkObjectValidations } = require('../../services/validations/use-validations');

const values = [
    {
<<<<<<< HEAD
        entityName: "orderers",
        values: {
            OrdererName: "",
            OrdererPhone: "",
            AddedDate: new Date(),
            Disable: 0,
            DeletingDate: null
=======
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
            }

>>>>>>> products2
        }

    },
    {
<<<<<<< HEAD
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
=======
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
>>>>>>> products2
        }

    },
];



const newRecord = async (obj = null) => {
    let result;
    if (obj) {
<<<<<<< HEAD
        const val = values.find(({ tableName }) => tableName === obj.tableName);
        if (val) {
            let newObj = {
                entityName: val.tableName,
                values: val.values
            };
            for (let key in newObj['values']) {
                typeof newObj.values[key] === 'string' ? newObj.values[key] = obj.values[key] : newObj.values[key] = newObj.values[key];
            }

            try {
                console.log(newObj,"newObj");
                result = await postData(sqlServer, '/create/createone', newObj);
=======
        const entity = values.find(({ entityName }) => entityName === obj.entityName);
        if (entity) {
            const newObj = entity.func(obj.values);

            try {
                _ = await checkObjectValidations(newObj.values, entity.entityName);
                result = await postData('/create/create', newObj);
>>>>>>> products2
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
<<<<<<< HEAD
            entityName: tableName,
            columns: columns,
            condition: field !== 'none' ? field : `Disable=0`
=======
            entityName: entity.entityName,
            condition: prop !== 'none' ? prop : `1=1`
>>>>>>> products2
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
<<<<<<< HEAD
                entityName: val,
=======
                tableName: obj.entityName,
>>>>>>> products2
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
<<<<<<< HEAD
                entityName: val,
=======
                tableName: table.entityName,
>>>>>>> products2
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