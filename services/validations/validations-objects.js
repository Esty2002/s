const { validation } = require('./validations-functions');

const objectsForValidations = [
    {
        objectName: "leads",
        values: [
            { propertyName: "supplyDate", validation: [{ func: validation.required, arguments: null }, { func: validation.dateType, arguments: "date" }] },
            { propertyName: "supplyHour", validation: [{ func: validation.notCheck, arguments: null }] },
            { propertyName: "ordererCode", validation: [{ func: validation.required, arguments: null }] },
            { propertyName: "supplyAddress", validation: { func: validation.notCheck, arguments: null } },
            { propertyName: "mapReferenceLongitude", validation: [{ func: validation.notCheck, arguments: null }] },
            { propertyName: "mapReferenceLatitude", validation: [{ func: validation.notCheck, arguments: null }] },
            { propertyName: "clientCode", validation: [{ func: validation.notCheck, arguments: null }] },
            { propertyName: "baseConcretProduct", validation: [{ func: validation.type, arguments: "object" }] },
            { propertyName: "concretAmount", validation: [{ func: validation.type, arguments: "number" }, { func: validation.positiveNumber, arguments: null }] },
            { propertyName: "pump", validation: [{ func: validation.notCheck, arguments: null }] },
            { propertyName: "pumpPipeLength", validation: [{ func: validation.type, arguments: "number" }] },
            { propertyName: "pouringType", validation: [{ func: validation.notCheck, arguments: null }] },
            { propertyName: "pouringTypeComments", validation: [{ func: validation.type, arguments: "string" }, { func: validation.maxLength, arguments: 8000 }] },
            { propertyName: "comments", validation: [{ func: validation.type, arguments: "string" }, { func: validation.maxLength, arguments: 10000 }] },
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
        objectName: "sttausLead",
        values: [
            { propertyName: "statusName", validation: [{ func: validation.required, arguments: null }, { func: validation.containsOnlyLetters, arguments: null }] },
            { propertyName: "addedDate", validation: [{ func: validation.notCheck, arguments: null }] },
            { propertyName: "disable", validation: [{ func: validation.notCheck, arguments: null }] },
            { propertyName: "deletingDate", validation: [{ func: validation.type, arguments: "date" }] }
        ]
    },
    {
        objectName: "tbl_Clients",
        values: [
            {
                propertyName: "ClientCode", validation: [
                    { func: validation.required, arguments: null },
                    { func: validation.type, arguments: "string" },
                    { func: validation.clientCodeIsExistInSQL, arguments: { tableName: "tbl_Clients", field: "ClientCode" } }
                ]
            },
            { propertyName: "ClientName", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "PrivaetCompanyNumber", validation: [{ func: validation.notCheck, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }] },
            { propertyName: "BookkeepingNumber", validation: [{ func: validation.notCheck, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }] },
            { propertyName: "DestinationBank", validation: [{ func: validation.notCheck, arguments: null },] },
            { propertyName: "PaymentTermsFluent", validation: [{ func: validation.notCheck, arguments: null },] },
            { propertyName: "PreferredPaymentDate", validation: [{ func: validation.type, arguments: "number" },] },
            { propertyName: "Ovligo", validation: [{ func: validation.type, arguments: "number" },] },
            { propertyName: "ReceiptIssueTerm", validation: [{ func: validation.required, arguments: null },] },
            { propertyName: "ReceiptCentralism", validation: [{ func: validation.required, arguments: null },] },
            { propertyName: "AccountantClassifiedCode", validation: [{ func: validation.type, arguments: "number" },] },
            { propertyName: "Status", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "Description", validation: [{ func: validation.notCheck, arguments: null },] },
            { propertyName: "Street", validation: [{ func: validation.required, arguments: null },] },
            { propertyName: "House", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "City", validation: [{ func: validation.required, arguments: null },] },
            { propertyName: "ZipCode", validation: [{ func: validation.required, arguments: null },] },
            { propertyName: "Telephone1", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }] },
            { propertyName: "Telephone2", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }] },
            { propertyName: "MobilePhone", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }] },
            { propertyName: "Fax", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }] },
            { propertyName: "Email", validation: [{ func: validation.required, arguments: null }, { func: validation.concretEmail, arguments: null }] },
            { propertyName: "Comments", validation: [{ func: validation.notCheck, arguments: null },] },
            // { propertyName: "CreationDate", validation: [{ func: validation.required, arguments: null}, ] },
            // { propertyName: "UserThatAdd", validation: [{ func: validation.required, arguments: null}, ] },

        ]

        // serialNumber
        // clientCode
        // clientName
        // privaetCompanyNumber
        // bookkeepingNumber
        // destinationBank
        // paymentTermsFluent
        // preferredPaymentDate
        // ovligo
        // receiptIssueTerm
        // receiptCentralism
        // accountantClassifiedCode
        // status
        // description
        // street
        // house
        // city
        // zipCode
        // telephone1
        // telephone2
        // mobilePhone
        // fax
        // email
        // comments
        // creationDate
        // userThatAdd
        // disabled
        // deletionDate
        // userThatDelete

    },
    {
        objectName: "tbl_Areas",
        values: [
            { propertyName: "AreaIdFromMongo", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }], require: true },
            { propertyName: "AreaName", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }, { func: validation.notOnlyNumbersInString, arguments: null }], require: true },
            //because disabled is false, if require:true then the function bit does not activated
            { propertyName: "Disabled", validation: [{ func: validation.required, arguments: null }, { func: validation.bit, arguments: null }] }
        ]
    },
    {
        objectName: "areas",
        values: [
            { propertyName: "addedDate", validation: [{ func: validation.required, arguments: null }, { func: validation.dateType, arguments: "date" }], require: true },

            //because disabled is false, if require:true then the function bit does not activated
            { propertyName: "disabled", validation: [{ func: validation.required, arguments: null }, { func: validation.bit, arguments: null }] },

            { propertyName: "name", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }, { func: validation.notOnlyNumbersInString, arguments: null }], require: true },
            { propertyName: "basicName", validation: [{ func: validation.required, arguments: null }], require: true },
            { propertyName: "type", validation: [{ func: validation.required, arguments: null }], require: true },
        ]
    },
    {
        objectName: "areas_point",
        values: [
            { propertyName: "point", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "double" }], require: true }
        ]
    },
    {
        objectName: "areas_radius",
        values: [
            { propertyName: "radius", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }], require: true }
        ]
    },
    {
        objectName: "areas_placeId",
        values: [
            { propertyName: "placeId", validation: [{ func: validation.required, arguments: null }], require: true },
        ]
    }

]





module.exports = { objectsForValidations };