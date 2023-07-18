const { validation } = require('./validations-functions');

const createUpdateModulesValidations = [
    {
        objectName: "leads",
        values: [
            { propertyName: "SupplyDate", validation: [{ func: validation.dateType, arguments: "date" }, { func: validation.dateInFuture, arguments: null }], require: true },
            { propertyName: "SupplyHour", validation: [{ func: validation.hourType, arguments: null }], require: false },
            { propertyName: "OrdererCode", validation: [{ func: validation.required, arguments: null }, { func: validation.recordExistInTable, arguments: { tableName: "tbl_Orderers", field: "id", exist: true } }], require: true },
            { propertyName: "SupplyAddress", validation: [{ func: validation.type, arguments: 'string' }], require: false },
            { propertyName: "MapReferenceLongitude", validation: [{ func: validation.positiveNumber, arguments: null }], require: false },
            { propertyName: "MapReferenceLatitude", validation: [{ func: validation.positiveNumber, arguments: null }], require: false },
            { propertyName: "ClientCode", validation: [{ func: validation.recordExistInTable, arguments: { tableName: "tbl_Clients", field: "id", exist: true } }], require: false },
            { propertyName: "BaseConcretProduct", validation: [{ func: validation.checkConcretItem, arguments: null }], require: false },
            { propertyName: "Tablename", validation: [{ func: validation.correctTable, arguments: null }], require: false },
            { propertyName: "ConcretAmount", validation: [{ func: validation.type, arguments: "number" }, { func: validation.positiveNumber, arguments: null }], require: false },
            { propertyName: "Pump", validation: [{ func: validation.recordExistInTable, arguments: { tableName: "tbl_Pumps", field: "id", exist: true } }], require: false },
            { propertyName: "PumpPipeLength", validation: [{ func: validation.type, arguments: "number" }, { func: validation.positiveNumber, arguments: null }], require: false },
            { propertyName: "PouringType", validation: [{ func: validation.recordExistInTable, arguments: { tableName: "tbl_PouringsTypes", field: "id", exist: true } }], require: false },
            { propertyName: "PouringTypeComments", validation: [{ func: validation.type, arguments: "string" }, { func: validation.maxLength, arguments: 8000 }, { func: validation.onlyLetters, arguments: null }], require: false },
            { propertyName: "Comments", validation: [{ func: validation.type, arguments: "string" }, { func: validation.maxLength, arguments: 8000 }, { func: validation.onlyLetters, arguments: null }], require: false },
            { propertyName: "StatusLead", validation: [{ func: validation.recordExistInTable, arguments: { tableName: "tbl_StatusesLead", field: "id", exist: true } }], require: true },
            { propertyName: "OrderNumber", validation: [{ func: validation.notCheck, arguments: null }], require: false },
            { propertyName: "AddedDate", validation: [{ func: validation.dateType, arguments: null }], require: true },
            { propertyName: "Disable", validation: [{ func: validation.bit, arguments: null }], require: true },
            { propertyName: "DeletingDate", validation: [{ func: validation.notCheck, arguments: null }], require: false },

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
        objectName: "tbl_Suppliers",

        values: [
            { propertyName: "BookkeepingNumber", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }], require: false },
            { propertyName: "City", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }], require: true },
            { propertyName: "ConditionGushyPayment", validation: [{ func: validation.required, arguments: null },], require: false },
            { propertyName: "HomeNumber", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }], require: true },
            { propertyName: "InsertUser", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }], require: false },
            { propertyName: "LicensedDealerNumber", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }], require: true },
            { propertyName: "ObjectiveBank", validation: [{ func: validation.required, arguments: null }], require: false },
            { propertyName: "Ovligo", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }], require: false },
            { propertyName: "Phone1", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }], require: true },
            { propertyName: "Phone2", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }], require: false },
            { propertyName: "PreferredPaymentDate", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }], require: false },
            // , { func: validation.betweenNumbers, arguments: { "min": 1, "max": 30 } }
            { propertyName: "Status", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }], require: true },
            { propertyName: "Street", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }], require: true },
            { propertyName: "SupplierCode", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }], require: true },
            { propertyName: "SupplierName", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }], require: true },
            { propertyName: "ZipCode", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }], require: false },
            { propertyName: "Fax", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }], require: false },
            { propertyName: "Mail", validation: [{ func: validation.required, arguments: null }, { func: validation.concretEmail, arguments: null }], require: false },
            { propertyName: "Notes", validation: [{ func: validation.required, arguments: null }], require: false },
            { propertyName: "Mobile", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }], require: false },

        ],
    },

    {
        objectName: "tbl_Branches",
        values: [
            { propertyName: "BranchName", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "City", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "Fax", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }] },
            { propertyName: "HomeNumber", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }] },
            { propertyName: "Mail", validation: [{ func: validation.required, arguments: null }, { func: validation.concretEmail, arguments: null }] },
            { propertyName: "Mobile", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }] },
            { propertyName: "Notes", validation: [{ func: validation.required, arguments: null }] },
            { propertyName: "Phone1", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }] },
            { propertyName: "Phone2", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }] },
            { propertyName: "Status", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "Street", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "SupplierCode", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }] },
            { propertyName: "UserThatInsert", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "ZipCode", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }] },

        ],
    },

    {
        objectName: "PouringType",
        values: [
            { propertyName: "PouringName", validation: [{ func: validation.required, arguments: null }, { func: validation.containsOnlyLetters, arguments: null }] },
            { propertyName: "AddedDate", validation: [{ func: validation.notCheck, arguments: null }] },
            { propertyName: "Disable", validation: [{ func: validation.bit, arguments: null }] },
            { propertyName: "DeletingDate", validation: [{ func: validation.type, arguments: "date" }] }
        ]
    },
    {
        objectName: "StatusesLeads",
        values: [
            { propertyName: "StatusName", validation: [{ func: validation.required, arguments: null }, { func: validation.containsOnlyLetters, arguments: null }] },
            { propertyName: "AddedDate", validation: [{ func: validation.notCheck, arguments: null }] },
            { propertyName: "Disable", validation: [{ func: validation.notCheck, arguments: null }] },
            { propertyName: "DeletingDate", validation: [{ func: validation.type, arguments: "date" }] }
        ]
    },
    {
        objectName: "FinishProducts",
        values: [
            {
                propertyName: "Name", validation: [
                    { func: validation.required, arguments: null },
                    { func: validation.type, arguments: "string" },
                    { func: validation.maxLength, arguments: 20 },
                ]
            },
            {
                propertyName: "UnitOfMeasure", validation:
                    [
                        { func: validation.required, arguments: null },
                        { func: validation.recordExistInTable, arguments: { tableName: "tbl_UnitOfMeasure", field: "measure", exist: true } }

                    ]
            },
            {
                propertyName: "BookkeepingCode", validation: [
                    { func: validation.required, arguments: null },
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.onlyNumbersInString, arguments: null }]
            },
        ]
    },
    {
        objectName: "Additions",
        values: [
            {
                propertyName: "Name", validation: [
                    { func: validation.required, arguments: null },
                    { func: validation.type, arguments: "string" },
                    { func: validation.maxLength, arguments: 20 },
                ]
            },
            {
                propertyName: "UnitOfMeasure", validation:
                    [
                        { func: validation.required, arguments: null },
                        { func: validation.recordExistInTable, arguments: { tableName: "tbl_UnitOfMeasure", field: "measure", exist: true } }
                    ]
            },
            {
                propertyName: "BookkeepingCode", validation: [
                    { func: validation.required, arguments: null },
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.onlyNumbersInString, arguments: null }]
            },
        ]
    },
    {
        objectName: "Pumps",
        values: [
            {
                propertyName: "Name", validation: [
                    { func: validation.required, arguments: null },
                    { func: validation.type, arguments: "string" },
                    { func: validation.maxLength, arguments: 20 },
                ]
            },
            {
                propertyName: "UnitOfMeasure", validation: [
                    { func: validation.required, arguments: null },
                    { func: validation.recordExistInTable, arguments: { tableName: "tbl_UnitOfMeasure", field: "measure", exist: true } }
                ]
            },
            {
                propertyName: "BookkeepingCode", validation: [
                    { func: validation.required, arguments: null },
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.onlyNumbersInString, arguments: null }]
            },
            { propertyName: "Addition", validation: [{ func: validation.required, arguments: null }, { func: validation.bit, arguments: null }] }
        ]
    },
    {
        objectName: "UnitOfMeasure",
        values: [
            {
                propertyName: "Measure", validation: [
                    { func: validation.required, arguments: null },
                    { func: validation.type, arguments: "string" },
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.recordExistInTable, arguments: { tableName: "tbl_UnitOfMeasure", field: "measure", exist: false } }]
            },
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
    // {
    //     objectName: "tbl_Pumps",
    //     values: [

    //         { propertyName: "Name", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
    //         { propertyName: "UnitOfMeasure", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
    //         { propertyName: "Addition", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
    //         { propertyName: "BookkeepingCode", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }] },
    //         { propertyName: "Discount", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },

    //     ]
    // },
    {
        objectName: "moreProductsItems",
        values: [
            { propertyName: "LeadNumber", validation: [{ func: validation.recordExistInTable, arguments: { tableName: "tbl_Leads", field: "id", exist: true } }], require: true },
            { propertyName: "Product", validation: [{ func: validation.recordExistInTable, arguments: { tableName: "tbl_Additions", field: "id", exist: true } },], require: false },
            { propertyName: "Amount", validation: [{ func: validation.type, arguments: 'number' }, { func: validation.positiveNumber, arguments: null }], require: false },
            { propertyName: "AddedDate", validation: [{ func: validation.dateType, arguments: null }], require: true }
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


    },
    {
        objectName: "PriceList",
        values: [
            { propertyName: "Name", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "Pumps", validation: [{ func: validation.required, arguments: null }, { func: validation.bit, arguments: null }] },
            { propertyName: "Beton", validation: [{ func: validation.required, arguments: null }, { func: validation.bit, arguments: null }] },
            { propertyName: "AddedDate", validation: [{ func: validation.required, arguments: null }, { func: validation.dateType, arguments: null }] },
            { propertyName: "UserName", validation: [{ func: validation.required, arguments: null }, { func: validation.EnglishLetters, arguments: null }] },
            { propertyName: "Finish", validation: [{ func: validation.required, arguments: null }, { func: validation.bit, arguments: null }] },
            { propertyName: "Disabled", validation: [{ func: validation.required, arguments: null }, { func: validation.bit, arguments: null }] }
        ]
    },

]
const findModulesValidations = [
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
        objectName: "tbl_Suppliers",

        values: [
            { propertyName: "BookkeepingNumber", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }], require: false },
            { propertyName: "City", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }], require: true },
            { propertyName: "ConditionGushyPayment", validation: [{ func: validation.required, arguments: null },], require: false },
            { propertyName: "HomeNumber", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }], require: true },
            { propertyName: "InsertUser", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }], require: false },
            { propertyName: "LicensedDealerNumber", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }], require: true },
            { propertyName: "ObjectiveBank", validation: [{ func: validation.required, arguments: null }], require: false },
            { propertyName: "Ovligo", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }], require: false },
            { propertyName: "Phone1", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }], require: true },
            { propertyName: "Phone2", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }], require: false },
            { propertyName: "PreferredPaymentDate", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }], require: false },
            // , { func: validation.betweenNumbers, arguments: { "min": 1, "max": 30 } }
            { propertyName: "Status", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }], require: true },
            { propertyName: "Street", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }], require: true },
            { propertyName: "SupplierCode", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }], require: true },
            { propertyName: "SupplierName", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }], require: true },
            { propertyName: "ZipCode", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }], require: false },
            { propertyName: "Fax", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }], require: false },
            { propertyName: "Mail", validation: [{ func: validation.required, arguments: null }, { func: validation.concretEmail, arguments: null }], require: false },
            { propertyName: "Notes", validation: [{ func: validation.required, arguments: null }], require: false },
            { propertyName: "Mobile", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }], require: false },

        ],
    },

    {
        objectName: "tbl_Branches",
        values: [
            { propertyName: "BranchName", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "City", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "Fax", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }] },
            { propertyName: "HomeNumber", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }] },
            { propertyName: "Mail", validation: [{ func: validation.required, arguments: null }, { func: validation.concretEmail, arguments: null }] },
            { propertyName: "Mobile", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }] },
            { propertyName: "Notes", validation: [{ func: validation.required, arguments: null }] },
            { propertyName: "Phone1", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }] },
            { propertyName: "Phone2", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }] },
            { propertyName: "Status", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "Street", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "SupplierCode", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }] },
            { propertyName: "UserThatInsert", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "ZipCode", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }] },

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
            { propertyName: "CreationDate", validation: [{ func: validation.required, arguments: null },] },
            { propertyName: "UserThatAdd", validation: [{ func: validation.required, arguments: null },] },

        ]



    }

]

function getValidationsModule(find){
    return find?findModulesValidations:createUpdateModulesValidations
}


module.exports = { getValidationsModule };