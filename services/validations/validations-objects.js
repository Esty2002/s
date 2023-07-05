const { validation } = require('./validations-functions');

const objectsForValidations = [
    {
        objectName: "leads",
        values: [
            { propertyName: "SupplyDate", validation: [{ func: validation.dateType, arguments: "date" }, { func: validation.dateInFuture, arguments: null }], require: true },
            { propertyName: "SupplyHour", validation: [{ func: validation.hourType, arguments: null }], require: false },
            { propertyName: "OrdererCode", validation: [{ func: validation.required, arguments: null }, { func: validation.recordExistInTable, arguments: { tableName: "tbl_Orderers", field: "id" } }], require: true },
            { propertyName: "SupplyAddress", validation: [{ func: validation.type, arguments: 'string' }], require: false },
            { propertyName: "MapReferenceLongitude", validation: [{ func: validation.positiveNumber, arguments: null }], require: false },
            { propertyName: "MapReferenceLatitude", validation: [{ func: validation.positiveNumber, arguments: null }], require: false },
            { propertyName: "ClientCode", validation: [{ func: validation.recordExistInTable, arguments: { tableName: "tbl_Clients", field: "id" } }], require: false },
            { propertyName: "BaseConcretProduct", validation: [{ func: validation.checkConcretItem, arguments: null }], require: false },
            { propertyName: "Tablename", validation: [{ func: validation.correctTable, arguments: null }], require: false },
            { propertyName: "ConcretAmount", validation: [{ func: validation.type, arguments: "number" }, { func: validation.positiveNumber, arguments: null }], require: false },
            { propertyName: "Pump", validation: [{ func: validation.recordExistInTable, arguments: { tableName: "tbl_Pumps", field: "id" } }], require: false },
            { propertyName: "PumpPipeLength", validation: [{ func: validation.type, arguments: "number" }, { func: validation.positiveNumber, arguments: null }], require: false },
            { propertyName: "PouringType", validation: [{ func: validation.recordExistInTable, arguments: { tableName: "tbl_PouringsTypes", field: "id" } }], require: false },
            { propertyName: "PouringTypeComments", validation: [{ func: validation.type, arguments: "string" }, { func: validation.maxLength, arguments: 8000 }, { func: validation.onlyLetters, arguments: null }], require: false },
            { propertyName: "Comments", validation: [{ func: validation.type, arguments: "string" }, { func: validation.maxLength, arguments: 8000 }, { func: validation.onlyLetters, arguments: null }], require: false },
            { propertyName: "StatusLead", validation: [{ func: validation.recordExistInTable, arguments: { tableName: "tbl_StatusesLead", field: "id" } }], require: true },
            { propertyName: "OrderNumber", validation: [{ func: validation.notCheck, arguments: null }], require: false },
            { propertyName: "AddedDate", validation: [{ func: validation.dateType, arguments: null }], require: true },
            { propertyName: "Disable", validation: [{ func: validation.bit, arguments: null }], require: true },
            { propertyName: "DeletingDate", validation: [{ func: validation.notCheck, arguments: null }], require: false },

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
    },
    {
        objectName: "moreProductsItems",
        values: [
            { propertyName: "LeadNumber", validation: [{ func: validation.recordExistInTable, arguments: { tableName: "tbl_Leads", field: "id" } }],require:true },
            { propertyName: "Product", validation: [{ func: validation.recordExistInTable, arguments: { tableName: "tbl_Additions", field: "id" } },], require: false },
            { propertyName: "Amount", validation: [{ func: validation.type, arguments: 'number' }, { func: validation.positiveNumber, arguments: null }],require:false },
            { propertyName: "AddedDate", validation: [{ func: validation.dateType, arguments: null }], require: true }
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
            { propertyName: "Email", validation: [{ func: validation.required, arguments: null }, { func: validation.corectEmail, arguments: null }] },
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

    }

]





module.exports = { objectsForValidations };