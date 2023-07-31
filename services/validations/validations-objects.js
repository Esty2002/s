const { validation } = require('./validations-functions');

const createUpdateModulesValidations = [
    {
        objectName: "leads",
        values: [
            { propertyName: "SupplyDate", validation: [{ func: validation.dateType, arguments: "date" }, { func: validation.dateInFuture, arguments: null }], require: true },
            { propertyName: "SupplyHour", validation: [{ func: validation.hourType, arguments: null }], require: false },
            { propertyName: "OrdererCode", validation: [{ func: validation.required, arguments: null }, { func: validation.recordExistInTable, arguments: { entityName: "tbl_Orderers", field: "id", exist: true } }], require: true },
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
        objectName: "moreProductsItems",
        values: [
            { propertyName: "LeadNumber", validation: [{ func: validation.recordExistInTable, arguments: { tableName: "tbl_Leads", field: "id", exist: true } }], require: true },
            { propertyName: "Product", validation: [{ func: validation.recordExistInTable, arguments: { tableName: "tbl_Additions", field: "id", exist: true } },], require: false },
            { propertyName: "Amount", validation: [{ func: validation.type, arguments: 'number' }, { func: validation.positiveNumber, arguments: null }], require: false },
            { propertyName: "AddedDate", validation: [{ func: validation.dateType, arguments: null }], require: true }
        ]
    },
    {
        objectName: "Orderers",
        values: [
            { propertyName: "OrdererName", validation: [{ func: validation.onlyLetters, arguments: null }], require: true },
            { propertyName: "OrdererPhone", validation: [{ func: validation.correctPhone, arguments: null },{ func: validation.recordExistInTable, arguments: { tableName: "Orderers", field: "OrdererPhone", exist: false } }], require: true },
            { propertyName: "AddedDate", validation: [{ func: validation.dateType, arguments: "null" }], require: true },
            { propertyName: "Disable", validation: [{ func: validation.bit, arguments: null }], require: true },
            { propertyName: "DeletingDate", validation: [{ func: validation.notCheck, arguments: null }], require: false }
        ],
    },

    {
        objectName: "Suppliers",

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
            { propertyName: "Mail", validation: [{ func: validation.required, arguments: null }, { func: validation.correctEmail, arguments: null }], require: false },
            { propertyName: "Notes", validation: [{ func: validation.required, arguments: null }], require: false },
            { propertyName: "Mobile", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }], require: false },

        ],
    },

    {
        objectName: "Branches",
        values: [
            { propertyName: "BranchName", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] , require:true},
            { propertyName: "City", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] , require:true},
            { propertyName: "Fax", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }] , require:false},
            { propertyName: "HomeNumber", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }] , require:true},
            { propertyName: "Mail", validation: [{ func: validation.required, arguments: null }, { func: validation.concretEmail, arguments: null }] , require:false},
            { propertyName: "Mobile", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }] , require:false},
            { propertyName: "Notes", validation: [{ func: validation.required, arguments: null }], require:false },
            { propertyName: "Phone1", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }] , require:true},
            { propertyName: "Phone2", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }] , require:false},
            { propertyName: "Status", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }], require:false },
            { propertyName: "Street", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }], require:true },
            { propertyName: "SupplierCode", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }], require:true },
            { propertyName: "UserThatInsert", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] , require:false},
            { propertyName: "ZipCode", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyNumbersInString, arguments: null }], require:false },

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
        objectName: "finishProducts",
        values: [
            {
                propertyName: "Name", validation: [
                    { func: validation.type, arguments: "string" },
                    { func: validation.maxLength, arguments: 20 },
                ], require: true
            },
            {
                propertyName: "UnitOfMeasure", validation:
                    [
                        { func: validation.recordExistInTable, arguments: { tableName: "tbl_UnitOfMeasure", field: "measure", exist: true } }

                    ], require: true
            },
            {
                propertyName: "BookkeepingCode", validation: [
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.onlyNumbersInString, arguments: null }]
            },
        ], require: true
    },
    {
        objectName: "additions",
        values: [
            {
                propertyName: "Name", validation: [
                    { func: validation.type, arguments: "string" },
                    { func: validation.maxLength, arguments: 20 },
                ], require: true
            },
            {
                propertyName: "UnitOfMeasure", validation:
                    [

                        { func: validation.recordExistInTable, arguments: { tableName: "tbl_UnitOfMeasure", field: "measure", exist: true } }
                    ], require: true
            },
            {
                propertyName: "BookkeepingCode", validation: [
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.onlyNumbersInString, arguments: null }]
            },
        ], require: true
    },
    {
        objectName: "pumps",
        values: [
            {
                propertyName: "Name", validation: [
                    { func: validation.type, arguments: "string" },
                    { func: validation.maxLength, arguments: 20 },
                ], require: true
            },
            {
                propertyName: "UnitOfMeasure", validation: [
                    { func: validation.recordExistInTable, arguments: { tableName: "unitOfMeasure", field: "Measure", exist: true } }
                ], require: true
            },
            {
                propertyName: "BookkeepingCode", validation: [
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.onlyNumbersInString, arguments: null }
                ], require: true
            },
            {
                propertyName: "Addition", validation: [
                    { func: validation.bit, arguments: null }
                ], require: true
            }
        ]
    },
    {
        objectName: "unitOfMeasure",
        values: [
            {
                propertyName: "Measure", validation: [
                    { func: validation.type, arguments: "string" },
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.recordExistInTable, arguments: { tableName: "tbl_UnitOfMeasure", field: "measure", exist: false } }]
            },
        ], require: true
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
        objectName: "Clients",
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
    {
        objectName: "CitiesAdditions",
        values: [
            { propertyName: "PriceListId", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "ProductId", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "AreaId", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "Price", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "CountPrecent", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "AddedDate", validation: [{ func: validation.required, arguments: null }, { func: validation.dateType, arguments: null }] },
            { propertyName: "UserName", validation: [{ func: validation.required, arguments: null }, { func: validation.EnglishLetters, arguments: null }] },

        ]
    },
    {
        objectName: "TimeAdditions",
        values: [
            { propertyName: "PriceListId", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "ProductId", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "Price", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "CountPrecent", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "DayOfWeek", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "StartDate", validation: [{ func: validation.required, arguments: null }, { func: validation.dateType, arguments: null }] },
            { propertyName: "EndDate", validation: [{ func: validation.required, arguments: null }, { func: validation.dateType, arguments: null }] },
            { propertyName: "AddedDate", validation: [{ func: validation.required, arguments: null }, { func: validation.dateType, arguments: null }] },
            { propertyName: "UserName", validation: [{ func: validation.required, arguments: null }, { func: validation.EnglishLetters, arguments: null }] },

        ]
    },
    {
        objectName: "AdditionsForDistance",
        values: [
            { propertyName: "PriceListId", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "ProductId", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "Distance", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "Price", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "CountPrecent", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "AddedDate", validation: [{ func: validation.required, arguments: null }, { func: validation.dateType, arguments: null }] },
            { propertyName: "UserName", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
        ]
    },

    {
        objectName: "TruckFill",
        values: [
            { propertyName: "PriceListId", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "ProductId", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "AmountTransportDiff", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "MaxTransportDiff", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "Price", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "Disabled", validation: [{ func: validation.required, arguments: null }, { func: validation.bit, arguments: null }] }
        ]
    },
    {
        objectName: "PricesListBySupplierOrClient",
        values: [
            { propertyName: "PriceListId", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "SupplierOrClient", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "Debit", validation: [{ func: validation.required, arguments: null }, { func: validation.bit, arguments: null }] },
            { propertyName: "Credit", validation: [{ func: validation.required, arguments: null }, { func: validation.bit, arguments: null }] },
            { propertyName: "AreaId", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "StartDate", validation: [{ func: validation.required, arguments: null }, { func: validation.dateType, arguments: null }] },
            { propertyName: "EndDate", validation: [{ func: validation.required, arguments: null }, { func: validation.dateType, arguments: null }] },
            { propertyName: "AddedDate", validation: [{ func: validation.required, arguments: null }, { func: validation.dateType, arguments: null }] },
            { propertyName: "UserName", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
        ]
    },
    {
        objectName: "PricelistForProducts",
        values: [
            { propertyName: "PriceListId", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "ProductId", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "TableName", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "Price", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "Discount", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "AddedDate", validation: [{ func: validation.required, arguments: null }, { func: validation.dateType, arguments: null }] },
            { propertyName: "UserName", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "Disabled", validation: [{ func: validation.required, arguments: null }, { func: validation.bit, arguments: null }] }
        ]
    },
    {
        objectName: "finishProducts",
        values: [
            { propertyName: "Name", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "UnitOfMeasure", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "BookkeepingCode", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "AddedDate", validation: [{ func: validation.required, arguments: null }, { func: validation.dateType, arguments: null }] },
            { propertyName: "Enabled", validation: [{ func: validation.required, arguments: null }, { func: validation.bit, arguments: null }] },
            { propertyName: "DeleteDate", validation: [{ func: validation.dateType, arguments: null }] },
        ]
    }
]
const findModulesValidations = [
    {
        objectName: "finishProducts",
        values: [
            {
                propertyName: "Name",
                validation: [
                    { func: validation.type, arguments: "string" },
                    { func: validation.maxLength, arguments: 20 },
                ],
                require: false
            },
            {
                propertyName: "UnitOfMeasure", validation:
                    [
                        { func: validation.recordExistInTable, arguments: { tableName: "tbl_UnitOfMeasure", field: "Measure", exist: true } }
                    ], require: false
            },
            {
                propertyName: "BookkeepingCode", validation: [
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.onlyNumbersInString, arguments: null }
                ], require: false
            },
            {
                propertyName: "AddedDate", validation: [
                    { func: validation.dateType, arguments: null },
                    { func: validation.theDateBeforToday, arguments: null },
                ], require: false
            },
            {
                propertyName: "Enabled", validation: [
                    { func: validation.bit, arguments: null },
                ], require: false
            },

            {
                propertyName: "DeleteDate", validation: [
                    { func: validation.dateType, arguments: null },
                    { func: validation.theDateBeforToday, arguments: null },
                    
                ], require: false
            },
        ]
    },
    {
        objectName: "additions",
        values: [
            {
                propertyName: "Name", validation: [
                    { func: validation.type, arguments: "string" },
                    { func: validation.maxLength, arguments: 20 },
                ], require: false
            },
            {
                propertyName: "UnitOfMeasure", validation:
                    [
                        { func: validation.recordExistInTable, arguments: { tableName: "tbl_UnitOfMeasure", field: "measure", exist: true } }
                    ], require: false
            },
            {
                propertyName: "BookkeepingCode", validation: [
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.onlyNumbersInString, arguments: null }
                ], require: false
            },
            {
                propertyName: "AddedDate", validation: [
                    { func: validation.dateType, arguments: null },
                    { func: validation.theDateBeforToday, arguments: null },
                ], require: false
            },
            {
                propertyName: "Enabled", validation: [
                    { func: validation.bit, arguments: null },
                ], require: false
            },

            {
                propertyName: "DeleteDate", validation: [
                    { func: validation.dateType, arguments: null },
                    { func: validation.theDateBeforToday, arguments: null },
                    
                ], require: false
            },
        ]
    },
    {
        objectName: "pumps",
        values: [
            {
                propertyName: "Name", validation: [
                    { func: validation.type, arguments: "string" },
                    { func: validation.maxLength, arguments: 20 },
                ], require: false
            },
            {
                propertyName: "UnitOfMeasure", validation: [
                    { func: validation.recordExistInTable, arguments: { tableName: "tbl_UnitOfMeasure", field: "measure", exist: true } }
                ], require: false
            },
            {
                propertyName: "BookkeepingCode", validation: [
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.onlyNumbersInString, arguments: null }
                ], require: false
            },
            {
                propertyName: "Addition", validation: [
                    { func: validation.bit, arguments: null }
                ], require: false
            },
            {
                propertyName: "AddedDate", validation: [
                    { func: validation.dateType, arguments: null },
                    { func: validation.theDateBeforToday, arguments: null },
                ], require: false
            },
            {
                propertyName: "Enabled", validation: [
                    { func: validation.bit, arguments: null },
                ], require: false
            },

            {
                propertyName: "DeleteDate", validation: [
                    { func: validation.dateType, arguments: null },
                    { func: validation.theDateBeforToday, arguments: null },
                    
                ], require: false
            },
        ]
    },
    {
        objectName: "unitOfMeasure",
        values: [
            {
                propertyName: "Measure", validation: [
                    { func: validation.type, arguments: "string" },
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.recordExistInTable, arguments: { tableName: "tbl_UnitOfMeasure", field: "measure", exist: false } }
                ], require: false
            },
            {
                propertyName: "Disable", validation: [
                    { func: validation.bit, arguments: null },
                ], require: false
            },
        ]
    },
]

function getValidationsModule(find) {
    return find ? findModulesValidations : createUpdateModulesValidations
}


module.exports = { getValidationsModule };
// module.exports = { objectsForValidations };
