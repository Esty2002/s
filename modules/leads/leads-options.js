const { postData, getData } = require('../../services/axios');
const { checkObjectValidations } = require('../../services/validations/use-validations');
const { getRecord } = require('./tables');
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
    }
    catch (error) {
        throw error;
    }
    if (obj.baseConcretProduct.length > 0) {
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
        }];
    }
    try {
        for (let item of vals) {
            try {
                _ = await checkObjectValidations(item, 'leads');
            }
            catch (error) {
                throw error;
            }
        };
    }
    catch (error) {
        throw error;
    }
    let newObj = {
        tableName: 'Leads',
        values: vals
    };

    try {
        const result = await postData('create/createManySql', newObj);
        if (result.status === 201 && obj.morePorductsItems) {
            const result1 = await insertMoreProductsItems(obj, result.data);
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

const insertMoreProductsItems = async (obj, result) => {
    let morePorductsItems = [];

    obj.morePorductsItems.forEach(mpi => {
        morePorductsItems = [...morePorductsItems, {
            Product: mpi.productCode,
            Amount: mpi.amount,
            LeadNumber: result[0].Id,
            AddedDate: new Date().toISOString()
        }];
    });
    try {
        for (let item of morePorductsItems) {
            _ = checkObjectValidations(item, 'moreProductsItems');
        };
    }
    catch (error) {
        throw error;
    }
    objMpi = {
        tableName: 'moreProductsItems',
        values: morePorductsItems
    };

    const res = await postData('create/createManySql', objMpi);
    return res;
};

const readLead = async (filter, disable) => {
    const obj = {
        tableName: "tbl_Leads",
        columns: '*',
        condition: filter ? `${filter} AND Disable='${disable}'` : `Disable='${disable}'`
    };

    try {
        const res = await postData('read/readTopN', obj);
        if (res.data) {
            const values = res.data;
            let result = [];
            for (let i = 0; i < values.length; i++) {
                const sameRecord = values.filter(v => v.SupplyDate.toString() === values[i].SupplyDate.toString() && v.SupplyHour.toString() === values[i].SupplyHour.toString() &&
                    v.Address === values[i].Address && v.OrdererCode === values[i].OrdererCode);

                const keys = Object.keys(sameRecord[0]);
                const temp = {}
                for (let key of keys) {
                    temp[key] = (sameRecord.map(sr => { return sr[key] })).reduce((state, next) => state.includes(next) ? [...state] : [...state, next], []);
                }
                result = result.filter(r => r.SupplyDate[0].toString() === temp.SupplyDate[0].toString() && r.SupplyHour[0].toString() === temp.SupplyHour[0].toString() &&
                    r.Address[0] === temp.Address[0] && r.OrdererCode[0] === temp.OrdererCode[0]).length == 0 ? [...result, temp] : [...result];
            }
            return { data: result, status: 200, message: "success" };
        }
        else {
            throw new Error("one or more of the arguments are not valid");
        }
    }
    catch (error) {
        throw error;
    }
};

const readforeignkeyvalue = async (filter) => {
    // const obj = {
    //     tableName: "tbl_Leads",
    //     columns: '*',
    //     condition: filter ? `${filter} AND Disable='False'` : "Disable='False'"
    // }
    console.log("filter", filter);
    try {
        const values = await getData(sqlServer, `read/foreignkeyvalue/${filter.tablename}/${filter.field}/${filter.id}`);
        if (values) {
            // let result = [];
            // values.forEach(val => {
            //     const sameRecord = values.filter(v => v.SupplyDate.toString() === val.SupplyDate.toString() && v.SupplyHour.toString() === val.SupplyHour.toString() &&
            //         v.Address === val.Address && v.OrdererCode === val.OrdererCode);

            //     const keys = Object.keys(sameRecord[0]);
            //     const temp = {}
            //     for (let key of keys) {
            //         temp[key] = (sameRecord.map(sr => { return sr[key] })).reduce((state, next) => state.includes(next) ? [...state] : [...state, next], []);
            //     }
            //     result = result.filter(r => r.SupplyDate[0].toString() === temp.SupplyDate[0].toString() && r.SupplyHour[0].toString() === temp.SupplyHour[0].toString() &&
            //         r.Address[0] === temp.Address[0] && r.OrdererCode[0] === temp.OrdererCode[0]).length == 0 ? [...result, temp] : [...result];
            // });
            // return result;
            return values;

        }
        else {
            return false;
        }
    }
    catch (error) {
        throw error;
    }
};


const updateLead = async (obj = null) => {
    try {
        if (obj.condition) {
            const baseLead = await getData(`read/readAll/tbl_Leads/${obj.condition}`);
            if (baseLead.length > 0) {
                const newObj = {
                    tableName: 'tbl_Leads',
                    values: obj.values,
                    condition: `Address='${baseLead[0].Address}' AND OrdererCode=${baseLead[0].OrdererCode} AND SupplyDate='${baseLead[0].SupplyDate}' AND SupplyHour='${baseLead[0].SupplyHour}'`
                };
                const result = await postData('update/update', newObj);
                if (result) {
                    return result;
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
    // const obj = {
    //     values: {
    //         Disable: 1,
    //         DeletingDate: new Date().toISOString()
    //     },
    //     condition: `Id=${id}`
    // }
    try {
        if (obj.condition) {
            // const baseLead = await getData(sqlServer, `read/readAll/tbl_Leads/${obj.condition}`);
            // console.log(baseLead, "baseLead");
            // if (baseLead.length > 0) {
            // const newObj = {
            //     tableName: 'tbl_Leads',
            //     values: obj.values,
            //     condition: `Address='${baseLead[0].Address}' AND OrdererCode=${baseLead[0].OrdererCode} AND SupplyDate='${baseLead[0].SupplyDate}' AND SupplyHour='${baseLead[0].SupplyHour}'`
            // };
            const result = await postData('update/updateOne', obj);
            if (result) {
                return result;
            }
            else {
                return false;
            }
            // }
            // else {
            //     throw new Error("this id is not exist");
            // }
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
            condition: `Id=${id}`
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
            values: {
                Disable: 1,
                DeletingDate: new Date().toISOString()
            },
            condition: `Id=${id}`
        };
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



module.exports = { createNewLead, updateLead, updateOneLead, deleteOneLead, deleteLead, readLead, readforeignkeyvalue };
