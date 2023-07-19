
const { sqlServer, postData, getData } = require('../../services/axios');
const { checkObjectValidations } = require('../../services/validations/use-validations');
// const values = [
//     {
//         tableName: "leads",
//         values: {
//             supplyDate: null,
//             supplyHour: null,
//             ordererCode: null,
//             supplyAddress: "",
//             mapReferenceLongitude: null,
//             mapReferenceLatitude: null,
//             clientCode: null,
//             baseConcretProduct: null,
//             concretAmount: 0,
//             pump: null,
//             pumpPipeLength: null,
//             pouringType: null,
//             pouringTypeComments: "",
//             comments: "",
//             statusLead: null,
//             orderNumber: null,
//             addedDate: new Date(),
//             disable: false,
//             deletingDate: null,

//         }
//     },
// ]
const createNewLead = async (obj = null) => {
    const validation = checkObjectValidations(obj, 'leads');
    if (validation) {
        const { moreConcretItems } = obj;
        if (moreConcretItems)
            delete obj.moreConcretItems;
        obj.addedDate = new Date();
        obj.disable = false;
        obj.deletingDate = null;
        let valuesToSend = []
        obj.baseConcretProduct.forEach(bcp => {
            valuesToSend = [...valuesToSend, obj]
            valuesToSend[valuesToSend.length - 1].baseConcretProduct = bcp;
        });
        try {
            const result = await postData(sqlServer, '', obj);
            return result;
        }
        catch (error) {
            throw error
        }
    }
    else {
        throw new Error("one or more of the arguments are not valid");
    }

};

const readLead = async(filter)=>{
    

}

const updateLead = async (obj = null) => {
    if (obj) {
        const newObj = {
            entityName: 'leads',
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
            entityName: 'leads',
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




module.exports = { createNewLead, updateLead, deleteLead,readLead }
