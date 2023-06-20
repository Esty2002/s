
const { sqlServer, postData, getData } = require('../../services/axios');
const createNewLead = async (obj = null) => {
    let values = [];
    obj.baseConcretProduct.forEach(bcp => {
        values = [...values, {
            SupplyDate: new Date(obj.supplyDate).toISOString(), SupplyHour: obj.supplyHour ? new Date(obj.supplyHour).toISOString() : null, OrdererCode: obj.ordererCode,
            Address: obj.address, MapReferenceLongitude: obj.mapReferenceLongitude, MapReferenceLatitude: obj.mapReferenceLatitude,
            ClientCode: obj.clientCode, BaseConcretProduct: bcp, ConcretAmount: obj.concretAmount, Pump: obj.pump, PumpPipeLength: obj.pumpPipeLength,
            PouringType: obj.pouringType, PouringTypesComments: obj.pouringTypesComments, Comments: obj.comments, StatusLead: 1,
            OrderNumber: null, AddedDate: new Date().toISOString(), Disable: 'False', DeletingDate: null
        }];
    });

    let newObj = {
        tableName: 'tbl_Leads',
        values
    };

    try {
        const result = await postData(sqlServer, 'create/createManySql', newObj);
        if (result) {
            let morePorductsItems = [];
            if (obj.morePorductsItems) {
                obj.morePorductsItems.forEach(mpi => {
                    morePorductsItems = [...morePorductsItems, {
                        Product: mpi.productCode,
                        Amount: mpi.amount,
                        LeadNumber: result[0].Id,
                        AddedDate: new Date().toISOString()
                    }]
                })
                objMpi = {
                    tableName: 'tbl_MoreProductsItems',
                    values: morePorductsItems
                }

                const res = await postData(sqlServer, 'create/createManySql', objMpi);
                if (res) {
                    return res;
                }
                else {
                    return false;
                }
            };
        }
        else {
            return false;
        }
    }
    catch (error) {
        throw error;
    }

};

const readLead = async (filter) => {
    const obj = {
        tableName: "tbl_Leads",
        columns: '*',
        condition: filter ? filter : "1=1"
    }

    try {
        const values = await postData(sqlServer, 'read/readTopN', obj);
        if (values) {
            let result = [];
            values.forEach(val => {
                const sameRecord = values.filter(v => v.SupplyDate.toString() === val.SupplyDate.toString() && v.SupplyHour.toString() === val.SupplyHour.toString() &&
                    v.Address === val.Address && v.OrdererCode === val.OrdererCode);

                const keys = Object.keys(sameRecord[0]);
                const temp = {}
                for (let key of keys) {
                    temp[key] = (sameRecord.map(sr => { return sr[key] })).reduce((state, next) => state.includes(next) ? [...state] : [...state, next], []);
                }
                result = result.filter(r => r.SupplyDate[0].toString() === temp.SupplyDate[0].toString() && r.SupplyHour[0].toString() === temp.SupplyHour[0].toString() &&
                    r.Address[0] === temp.Address[0] && r.OrdererCode[0] === temp.OrdererCode[0]).length == 0 ? [...result, temp] : [...result];
            });
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

const updateLead = async (obj = null) => {
    if (obj) {
        const newObj = {
            tableName: 'leads',
            values: obj.values,
            condition: obj.condition
        };
        if (newObj) {
            try {
                const result = await postData(sqlServer, '', newObj);
                return result;
            }
            catch (error) {
                throw error;
            }
        }
        else {
            throw new Error("one or more of the arguments are not valid");
        }

    }
    else {
        throw new Error("the obj or filter are not defined");
    }
};

const deleteLead = async (serialNumber) => {
    if (serialNumber) {
        const obj = {
            tableName: 'leads',
            values: {
                disable: 1,
                deletingDate: new Date()
            },
            condition: `SerialNumber=${serialNumber}`
        }
        try {
            const result = await postData(sqlServer, '', obj);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    else {
        throw new Error('the serialNumber is not defined');
    }
}




module.exports = { createNewLead, updateLead, deleteLead, readLead }
