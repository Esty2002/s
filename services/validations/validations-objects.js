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
        objectName: "moreProductsItems",
        values: [
            { propertyName: "LeadNumber", validation: [{ func: validation.recordExistInTable, arguments: { tableName: "tbl_Leads", field: "id" } }], require: true },
            { propertyName: "Product", validation: [{ func: validation.recordExistInTable, arguments: { tableName: "tbl_Additions", field: "id" } },], require: false },
            { propertyName: "Amount", validation: [{ func: validation.type, arguments: 'number' }, { func: validation.positiveNumber, arguments: null }], require: false },
            { propertyName: "AddedDate", validation: [{ func: validation.dateType, arguments: null }], require: true }
        ]
    },
    {
        objectName: "Orderers",
        values: [
            { propertyName: "OrdererName", validation: [{ func: validation.onlyLetters, arguments: null }], require: true },
            { propertyName: "OrdererPhone", validation: [{ func: validation.clientCodeIsExistInSQL, arguments: { tableName: "Orderers", field: "OrdererPhone" } }, { func: validation.correctPhone, arguments: null }], require: true },
            { propertyName: "AddedDate", validation: [{ func: validation.dateType, arguments: "null" }], require: true },
            { propertyName: "Disable", validation: [{ func: validation.bit, arguments: null }], require: true },
            { propertyName: "DeletingDate", validation: [{ func: validation.notCheck, arguments: null }], require: false }
        ],
    },
    {
        objectName: "PouringsTypes",
        values: [
            { propertyName: "PouringName", validation: [{ func: validation.onlyLetters, arguments: null }], require: true },
            { propertyName: "AddedDate", validation: [{ func: validation.dateType, arguments: null }], require: true },
            { propertyName: "Disable", validation: [{ func: validation.bit, arguments: null }], require: true },
            { propertyName: "DeletingDate", validation: [{ func: validation.type, arguments: "date" }], require: false }
        ]
    },
    {
        objectName: "StatusesLead",
        values: [
            { propertyName: "StatusName", validation: [{ func: validation.onlyLetters, arguments: null }], require: true },
            { propertyName: "AddedDate", validation: [{ func: validation.dateType, arguments: null }], require: true },
            { propertyName: "Disable", validation: [{ func: validation.bit, arguments: null }], require: true },
            { propertyName: "DeletingDate", validation: [{ func: validation.type, arguments: "date" }], require: false }
        ]
    },


    {
        objectName: "tbl_FinishProducts",
        values: [

            { propertyName: "Name", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "UnitOfMeasure", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "BookkeepingNumber", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }] },

        ]



    },

    {
        objectName: "tbl_PricelistForProducts",
        values: [

            { propertyName: "PriceListId", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }] },
            { propertyName: "ProductId", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }] },
            { propertyName: "TableName", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "Price", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "Discount", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },

        ]
    },

    {
        objectName: "tbl_Pumps",
        values: [

            { propertyName: "Name", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "UnitOfMeasure", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "Addition", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "BookkeepingCode", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }] },
            { propertyName: "Discount", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },

        ]
    },
    {
        objectName: "tbl_Clients",
        values: [
            {
                propertyName: "ClientCode", validation: [
                    { func: validation.required, arguments: null },
                    { func: validation.onlyNumbersInString, arguments: null },
                    { func: validation.clientCodeIsExistInSQL, arguments: { tableName: "tbl_Clients", field: "ClientCode" } }
                ]
            },
            { propertyName: "ClientName", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "PrivaetCompanyNumber", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }] },
            { propertyName: "BookkeepingNumber", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }] },
            { propertyName: "DestinationBank", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }] },
            { propertyName: "PaymentTermsFluent", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }] },
            { propertyName: "PreferredPaymentDate", validation: [{ func: validation.dateType, arguments: null }, { func: validation.theDateAfterToday, arguments: null }] },
            { propertyName: "Ovligo", validation: [{ func: validation.type, arguments: "number" },] },
            { propertyName: "ReceiptIssueTerm", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }] },
            { propertyName: "ReceiptCentralism", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }] },
            { propertyName: "AccountantClassifiedCode", validation: [{ func: validation.type, arguments: "number" },] },
            { propertyName: "Status", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "Description", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "Street", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "House", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "City", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "ZipCode", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }] },
            { propertyName: "Telephone1", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }] },
            { propertyName: "Telephone2", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }] },
            { propertyName: "MobilePhone", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }] },
            { propertyName: "Fax", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }] },
            { propertyName: "Email", validation: [{ func: validation.required, arguments: null }, { func: validation.concretEmail, arguments: null }] },
            { propertyName: "Comments", validation: [{ func: validation.notCheck, arguments: null }, { func: validation.type, arguments: "string" }] },
            // { propertyName: "CreationDate", validation: [{ func: validation.required, arguments: null}, ] },
            // { propertyName: "UserThatAdd", validation: [{ func: validation.required, arguments: null}, ] },

        ]



    }

]





module.exports = { objectsForValidations };