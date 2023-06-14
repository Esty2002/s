const { validation } = require('./validations-functions');

const objectsForValidations = [
    {
        objectName: "leads",
        values: [
            { propertyName: "supplyDate", validation: [{ func: validation.required, arguments: null }, { func: validation.dateType, arguments: "date" }] },
            { propertyName: "supplyHour", validation: [{ func: validation.notCheck, arguments: null }] },
            { propertyName: "ordererCode", validation: [{ func: validation.required, arguments: null }] },
            { propertyName: "supplyAddress", validation: { func: validation.notCheck,arguments:null } },
            { propertyName: "mapReferenceLongitude", validation: [{ func: validation.notCheck, arguments: null }] },
            { propertyName: "mapReferenceLatitude", validation: [{ func: validation.notCheck, arguments: null }] },
            { propertyName: "clientCode", validation: [{ func: validation.notCheck, arguments: null }] },
            { propertyName: "baseConcretProduct", validation: [{ func: validation.type, arguments: "object" }] },
            { propertyName: "concretAmount", validation: [{ func: validation.type, arguments: "number" }, { func: validation.positiveNumber, arguments: null }] },
            { propertyName: "pump", validation: [{ func: validation.notCheck, arguments: null}] },
            { propertyName: "pumpPipeLength", validation: [{ func: validation.type, arguments: "number" }] },
            { propertyName: "pouringType", validation: [{ func: validation.notCheck, arguments: null }] },
            { propertyName: "pouringTypeComments", validation: [{ func: validation.type, arguments: "string" },{func:validation.maxLength,arguments:8000}] },
            { propertyName: "comments", validation: [{ func: validation.type, arguments: "string" },{ func: validation.maxLength, arguments: 10000 }] },
            { propertyName: "statusLead", validation: [{ func: validation.notCheck, arguments: null }] },
            { propertyName: "orderNumber", validation: [{ func: validation.notCheck, arguments: null }] },
            { propertyName: "addedDate", validation: [{ func: validation.type, arguments: "date" }] },
            { propertyName: "disable", validation: [{ func: validation.bit, arguments: null }] },
            { propertyName: "deletingDate", validation: [{ func: validation.notCheck, arguments: null }] },
            { propertyName: "moreConcretItems", validation: [{ func: validation.notCheck, arguments: null }] }
        ]
    },
    {
        objectName: "orderers",
        values: [
            { propertyName: "ordererName", validation: [{ func: validation.required, arguments: null }, { func: validation.containsOnlyLetters, arguments: null }] },
            { propertyName: "ordererPhone", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }] },
            { propertyName: "addedDate", validation: [{ func: validation.notCheck, arguments: null }] },
            { propertyName: "disable", validation: [{ func: validation.bit, arguments: null }] },
            { propertyName: "deletingDate", validation: [{ func: validation.type, arguments: "date" }] }
        ],
    },
    {
        objectName: "pouringType",
        values: [
            { propertyName: "pouringName", validation: [{ func: validation.required, arguments: null }, { func: validation.containsOnlyLetters, arguments: null }] },
            { propertyName: "addedDate", validation: [{ func: validation.notCheck, arguments: null }] },
            { propertyName: "disable", validation: [{ func: validation.bit, arguments: null }] },
            { propertyName: "DeletingDate", validation: [{ func: validation.type, arguments: "date" }] }
        ]
    },
    {
        objectName: "statusLead",
        values: [
            { propertyName: "statusName", validation: [{ func: validation.required, arguments: null }, { func: validation.containsOnlyLetters, arguments: null }] },
            { propertyName: "addedDate", validation: [{ func: validation.notCheck, arguments: null }] },
            { propertyName: "disable", validation: [{ func: validation.notCheck, arguments: null }] },
            { propertyName: "deletingDate", validation: [{ func: validation.type, arguments: "date" }] }
        ]
    }

]      
        
        
    


module.exports = { objectsForValidations };