
const { postData, getData, putData } = require('../../services/axios');
const { checkObjectValidations } = require('../../services/validations/use-validations');
const { getRecord } = require('./tables');

const { SQL_LEADS_TABLE, SQL_MOREPRODUCTSITEM_TABLE } = process.env

const createNewLead = async (obj = null) => {
    let vals = [];
    let status;
    try {
        status = await getRecord('StatusesLead', "StatusName='חדש'");
        if (status.status === 200) {
            status = status.data[0].Id;
        }
        else {
            throw new Error("not exist this status of leads");
        }
        if (obj.baseConcretProduct && obj.baseConcretProduct.length > 0) {
            obj.baseConcretProduct.forEach(bcp => {
                vals = [...vals, {
                    SupplyDate: new Date(obj.supplyDate).toISOString(), SupplyHour: obj.supplyHour, OrdererCode: obj.ordererCode,
                    Address: obj.address, MapReferenceLongitude: obj.mapReferenceLongitude, MapReferenceLatitude: obj.mapReferenceLatitude,
                    ClientCode: obj.clientCode, BaseConcretProduct: bcp.id, Tablename: bcp.tableReference, ConcretAmount: bcp.concretAmount, Pump: bcp.pump, PumpPipeLength: bcp.pumpPipeLength,
                    PouringType: bcp.pouringType, PouringTypesComments: bcp.pouringTypesComments, Comments: obj.comments, StatusLead: status,
                    OrderNumber: null, AddedDate: new Date().toISOString(), Disable: 'False', DeletingDate: null
                }];
            });
        }
        else {
            vals = [{
                SupplyDate: new Date(obj.supplyDate).toISOString(), SupplyHour: obj.supplyHour, OrdererCode: obj.ordererCode,
                Address: obj.address, MapReferenceLongitude: obj.mapReferenceLongitude, MapReferenceLatitude: obj.mapReferenceLatitude,
                ClientCode: obj.clientCode, BaseConcretProduct: null, Tablename: null, ConcretAmount: null, Pump: null, PumpPipeLength: null,
                PouringType: null, PouringTypesComments: null, Comments: obj.comments, StatusLead: status,
                OrderNumber: null, AddedDate: new Date().toISOString(), Disable: 'False', DeletingDate: null
            }]
        }
        for (let item of vals) {
            _ = await checkObjectValidations(item, SQL_LEADS_TABLE);
        };

        let newObj = {
            entityName: SQL_LEADS_TABLE,
            values: vals
        };

        const result = await postData('create/createmany', newObj);
        if (result.status === 201 && obj.morePorductsItems.length > 0) {
            const result1 = await insertMoreProductsItems(obj.morePorductsItems, result.data[0].Id);
            return result1;
        }
        else {
            return result;
        }
    }
    catch (error) {
        throw error;
    }

};

const insertMoreProductsItems = async (items = [], LeadNumber = null) => {
    try {
        let morePorductsItems = [];
        items.forEach(mpi => {
            morePorductsItems = [...morePorductsItems, {
                Product: mpi.productCode,
                Amount: mpi.amount,
                LeadNumber,
                AddedDate: new Date().toISOString()
            }]
        });
        for (let item of morePorductsItems) {
            _ = await checkObjectValidations(item, SQL_MOREPRODUCTSITEM_TABLE);
        };
        objMpi = {
            entityName: SQL_MOREPRODUCTSITEM_TABLE,
            values: morePorductsItems
        };
        const res = await postData('create/createmany', objMpi);
        return res;


    }
    catch (error) {
        throw error;
    }


};

const readLead = async (filter) => {
    try {
        let condition;
        filter ? condition = filter : null

        const res = await getData(`read/readMany/${SQL_LEADS_TABLE}`, condition);
        if (res.status == 200) {
            if (res.data.length > 0) {
                const values = res.data;
                let result = [];
                for (let i = 0; i < values.length; i++) {
                    const sameRecord = values.filter(v => v.SupplyDate.toString() === values[i].SupplyDate.toString() && v.SupplyHour.toString() === values[i].SupplyHour.toString() &&
                        v.Address === values[i].Address && v.OrdererCode === values[i].OrdererCode);

                    const keys = Object.keys(sameRecord[0]);
                    const temp = {}
                    for (let key of keys) {
                        if (key !== "Disable")
                            temp[key] = (sameRecord.map(sr => { return sr[key] })).reduce((state, next) => state.includes(next) ? [...state] : [...state, next], []);
                        else {
                            temp[key] = (sameRecord.map(sr => { return sr[key] }));
                        }
                    }
                    result = result.filter(r => r.SupplyDate[0].toString() === temp.SupplyDate[0].toString() && r.SupplyHour[0].toString() === temp.SupplyHour[0].toString() &&
                        r.Address[0] === temp.Address[0] && r.OrdererCode[0] === temp.OrdererCode[0]).length == 0 ? [...result, temp] : [...result];
                }
                return { data: result, status: 200, message: "success" };
            }
            else {
                return false;
            }
        }
    }

    catch (error) {
        throw error;
    }

};

const readMoreProductsItems = async (filter) => {

    try {
        let condition;
        filter ? condition = filter : null

        const result = await postData(`read/readMany/${SQL_MOREPRODUCTSITEM_TABLE}`, condition);

        if (result) {
            return result;
        }
        else {
            throw new Error("one or more of the arguments are not valid");
        }
    }
    catch (error) {
        throw error
    }



};

const updateLead = async (obj = null) => {
    try {
        if (obj.condition) {
            const baseLead = await getData(`read/readMany/${SQL_LEADS_TABLE}`, obj.condition);
            if (baseLead.data.length > 0) {
                const newObj = {
                    entityName: SQL_LEADS_TABLE,
                    values: obj.values,
                    condition: { AND: [{ Address: baseLead.data[0].Address }, { OrdererCode: baseLead.data[0].OrdererCode }, { SupplyDate: baseLead.data[0].SupplyDate }, { SupplyHour: baseLead.data[0].SupplyHour }] }
                };
                const result = await putData('update/updatemany', newObj);
                if (result.status == 204) {
                    return result.data;
                }
                else {
                    return false;
                }
            }
            else {
                throw new Error("this id is not exist");
            }
        }
        else {
            throw new Error('the condition not exist');
        }
    }
    catch (error) {
        throw error;
    }

};

const updateOneLead = async (obj = null) => {
    try {
        if (obj.condition) {
            const result = await putData('update/updateone', obj);
            if (result.status == 204) {
                return result.data;
            }
            else {
                return false;
            }
        }
        else {
            throw new Error('the condition not exist');
        }
    }
    catch (error) {
        throw error;
    }

};

const deleteLead = async (id) => {
    if (id) {
        const obj = {
            values: {
                Disable: 1,
                DeletingDate: new Date().toISOString()
            },
            condition: { Id: id }
        }
        try {
            const result = await updateLead(obj);
            if (result) {
                return result;
            }
            else {
                return false;
            }
        }
        catch (error) {
            throw error;
        }
    }
    else {
        throw new Error('the serialNumber is not defined');
    }
};

const deleteOneLead = async (id) => {
    if (id) {
        const obj = {
            entityName: SQL_LEADS_TABLE,
            values: {
                Disable: 1,
                DeletingDate: new Date().toISOString()
            },
            condition: { Id: id }
        }
        try {
            const result = await updateOneLead(obj);
            if (result) {
                return result;
            }
            else {
                return false;
            }
        }
        catch (error) {
            throw error;
        }
    }
    else {
        throw new Error('the serialNumber is not defined');
    }
};

module.exports = { createNewLead, updateLead, updateOneLead, deleteOneLead, deleteLead, readLead, readMoreProductsItems, insertMoreProductsItems }
