const { ValueTypes } = require('../../utils/types');
const { validation } = require('./validations-functions');

const createUpdateModulesValidations = [
    {
        objectName: "Leads",
        values: [
            { propertyName: "SupplyDate", validation: [{ func: validation.dateType, arguments: "date" }, { func: validation.dateInFuture, arguments: null }], require: true },
            { propertyName: "SupplyHour", validation: [{ func: validation.hourType, arguments: null }], require: false },
            { propertyName: "OrdererCode", validation: [{ func: validation.required, arguments: null }, { func: validation.recordExistInDB, arguments: { entityName: "Orderers", field: "id", exist: true } }], require: true },
            { propertyName: "SupplyAddress", validation: [{ func: validation.type, arguments: 'string' }], require: false },
            { propertyName: "MapReferenceLongitude", validation: [{ func: validation.positiveNumber, arguments: null }], require: false },
            { propertyName: "MapReferenceLatitude", validation: [{ func: validation.positiveNumber, arguments: null }], require: false },
            { propertyName: "ClientCode", validation: [{ func: validation.recordExistInDB, arguments: { entityName: "Clients", field: "id", exist: true } }], require: false },
            { propertyName: "BaseConcretProduct", validation: [{ func: validation.checkConcretItem, arguments: null }], require: false },
            { propertyName: "Tablename", validation: [{ func: validation.correctTable, arguments: null }], require: false },
            { propertyName: "ConcretAmount", validation: [{ func: validation.type, arguments: "number" }, { func: validation.positiveNumber, arguments: null }], require: false },
            { propertyName: "Pump", validation: [{ func: validation.recordExistInDB, arguments: { entityName: "Pumps", field: "id", exist: true } }], require: false },
            { propertyName: "PumpPipeLength", validation: [{ func: validation.type, arguments: "number" }, { func: validation.positiveNumber, arguments: null }], require: false },
            { propertyName: "PouringType", validation: [{ func: validation.recordExistInDB, arguments: { entityName: "PouringsTypes", field: "id", exist: true } }], require: false },
            { propertyName: "PouringTypeComments", validation: [{ func: validation.type, arguments: "string" }, { func: validation.maxLength, arguments: 8000 }, { func: validation.onlyLetters, arguments: null }], require: false },
            { propertyName: "Comments", validation: [{ func: validation.type, arguments: "string" }, { func: validation.maxLength, arguments: 8000 }, { func: validation.onlyLetters, arguments: null }], require: false },
            { propertyName: "StatusLead", validation: [{ func: validation.recordExistInDB, arguments: { entityName: "StatusesLead", field: "id", exist: true } }], require: true },
            { propertyName: "OrderNumber", validation: [{ func: validation.notCheck, arguments: null }], require: false },
            { propertyName: "AddedDate", validation: [{ func: validation.dateType, arguments: null }], require: true },
            { propertyName: "Disable", validation: [{ func: validation.bit, arguments: null }], require: true },
            { propertyName: "DeletingDate", validation: [{ func: validation.notCheck, arguments: null }], require: false },

        ]
    },
    {
        objectName: "MoreProductsItems",
        values: [
            { propertyName: "LeadNumber", validation: [{ func: validation.recordExistInDB, arguments: { entityName: "Leads", field: "Id", exist: true } }], require: true },
            { propertyName: "Product", validation: [{ func: validation.recordExistInDB, arguments: { entityName: "Additions", field: "Id", exist: true } },], require: false },
            { propertyName: "Amount", validation: [{ func: validation.type, arguments: 'number' }, { func: validation.positiveNumber, arguments: null }], require: false },
            { propertyName: "AddedDate", validation: [{ func: validation.dateType, arguments: null }], require: true }
        ]
    },
    {
        objectName: "Orderers",
        values: [
            { propertyName: "OrdererName", validation: [{ func: validation.onlyLetters, arguments: null }], require: true },
            { propertyName: "OrdererPhone", validation: [{ func: validation.correctPhone, arguments: null }, { func: validation.recordExistInDB, arguments: { entityName: "Orderers", field: "OrdererPhone", exist: false } }], require: true },
            { propertyName: "AddedDate", validation: [{ func: validation.dateType, arguments: "null" }], require: true },
            { propertyName: "Disable", validation: [{ func: validation.bit, arguments: null }], require: true },
            { propertyName: "DeletingDate", validation: [{ func: validation.notCheck, arguments: null }], require: false }
        ],
    },
    {
        objectName: "Suppliers",
        values: [
            { propertyName: "BookkeepingNumber", validation: [{ func: validation.onlyDigitsInString, arguments: null }], require: false , type:ValueTypes.STRING},
            { propertyName: "City", validation: [{ func: validation.type, arguments: "string" }], require: true , type:ValueTypes.STRING},
            { propertyName: "ConditionGushyPayment", validation: [{ func: validation.type, arguments: "string" },], require: false,type: ValueTypes.STRING },
            { propertyName: "HomeNumber", validation: [{ func: validation.type, arguments: "number" }], require: true, type: ValueTypes.NUMBER  },
            { propertyName: "InsertUser", validation: [{ func: validation.type, arguments: "string" }], require: false , type: ValueTypes.STRING },
            { propertyName: "LicensedDealerNumber", validation: [{ func: validation.onlyDigitsInString, arguments: null }], require: true , type: ValueTypes.STRING },
            { propertyName: "ObjectiveBank", validation: [{ func: validation.notCheck, arguments: null }], require: false, type: ValueTypes.STRING  },
            { propertyName: "Ovligo", validation: [{ func: validation.type, arguments: "number" }], require: false },
            { propertyName: "Phone1", validation: [{ func: validation.correctPhone, arguments: null }], require: true, type: ValueTypes.STRING  },
            { propertyName: "Phone2", validation: [{ func: validation.correctPhone, arguments: null }], require: false },
            {
                propertyName: "PreferredPaymentDate", validation: [{ func: validation.onlyDigitsInString, arguments: null },
                { func: validation.betweenNumbers, arguments: { "min": 1, "max": 30 } }], require: false
            },
            { propertyName: "Status", validation: [{ func: validation.type, arguments: "number" }], require: true , type: ValueTypes.NUMBER },
            { propertyName: "Street", validation: [{ func: validation.type, arguments: "string" }], require: true, type: ValueTypes.STRING  },
            { propertyName: "SupplierCode", validation: [{ func: validation.onlyDigitsInString, arguments: null }], require: true , type: ValueTypes.STRING },
            { propertyName: "SupplierName", validation: [{ func: validation.type, arguments: "string" }], require: true, type: ValueTypes.STRING  },
            { propertyName: "ZipCode", validation: [{ func: validation.onlyDigitsInString, arguments: null }], require: false },
            { propertyName: "Fax", validation: [{ func: validation.onlyDigitsInString, arguments: null }], require: false },
            { propertyName: "Mail", validation: [{ func: validation.correctEmail, arguments: null }], require: false },
            { propertyName: "Notes", validation: [{ func: validation.notCheck, arguments: null }], require: false },
            { propertyName: "Mobile", validation: [{ func: validation.correctPhone, arguments: null }], require: false },

        ],
    },

    {
        objectName: "Branches",
        values: [
            { propertyName: "BranchName", validation: [{ func: validation.type, arguments: "string" }], require: true, type: ValueTypes.STRING  },
            { propertyName: "City", validation: [{ func: validation.type, arguments: "string" }], require: true , type: ValueTypes.STRING },
            { propertyName: "Fax", validation: [{ func: validation.onlyDigitsInString, arguments: null }], require: false },
            { propertyName: "HomeNumber", validation: [{ func: validation.onlyDigitsInString, arguments: null }], require: true , type: ValueTypes.STRING },
            { propertyName: "Mail", validation: [{ func: validation.concretEmail, arguments: null }], require: false },
            { propertyName: "Mobile", validation: [{ func: validation.correctPhone, arguments: null }], require: false },
            { propertyName: "Notes", validation: [{ func: validation.required, arguments: null }], require: false },
            { propertyName: "Phone1", validation: [{ func: validation.correctPhone, arguments: null }], require: true , type: ValueTypes.STRING },
            { propertyName: "Phone2", validation: [{ func: validation.correctPhone, arguments: null }], require: false },
            { propertyName: "Status", validation: [{ func: validation.type, arguments: "number" }], require: true, type: ValueTypes.NUMBER },
            { propertyName: "Street", validation: [{ func: validation.type, arguments: "string" }], require: true , type: ValueTypes.STRING },
            { propertyName: "SupplierCode", validation: [{ func: validation.onlyDigitsInString, arguments: null }], require: true , type: ValueTypes.STRING },
            { propertyName: "UserThatInsert", validation: [{ func: validation.type, arguments: "string" }], require: true, type: ValueTypes.STRING  },
            { propertyName: "ZipCode", validation: [{ func: validation.onlyDigitsInString, arguments: null }], require: false },

        ],
    },

    {
        objectName: "PouringsTypes",
        values: [
            { propertyName: "PouringName", validation: [{ func: validation.onlyLetters, arguments: null }], require: true, type: ValueTypes.STRING  },
            { propertyName: "AddedDate", validation: [{ func: validation.dateType, arguments: null }], require: true , type: ValueTypes.DATE },
            { propertyName: "Disable", validation: [{ func: validation.bit, arguments: null }], require: true , type: ValueTypes.BIT },
            { propertyName: "DeletingDate", validation: [{ func: validation.type, arguments: "date" }], require: false }
        ]
    },
    {
        objectName: "StatusesLead",
        values: [
            { propertyName: "StatusName", validation: [{ func: validation.onlyLetters, arguments: null }], require: true , type: ValueTypes.STRING },
            { propertyName: "AddedDate", validation: [{ func: validation.dateType, arguments: null }], require: true, type: ValueTypes.DATE  },
            { propertyName: "Disable", validation: [{ func: validation.bit, arguments: null }], require: true , type:ValueTypes.BIT},
            { propertyName: "DeletingDate", validation: [{ func: validation.type, arguments: "date" }], require: false , type:ValueTypes.DATE}
        ]
    },
    {
        objectName: "FinishProducts",
        values: [
            {
                propertyName: "Name", validation: [
                    { func: validation.type, arguments: "string" },
                    { func: validation.maxLength, arguments: 20 },
                ], require: true,tye: ValueTypes.STRING
            },
            {
                propertyName: "UnitOfMeasure", validation:
                    [
                        { func: validation.recordExistInDB, arguments: { entityName: "UnitOfMeasure", field: "Id", exist: true } }

                    ], require: true
            },
            {
                propertyName: "BookkeepingCode", validation: [
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.onlyDigitsInString, arguments: null }]
            },
        ], require: true
    },
    {
        objectName: "Additions",
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

                        { func: validation.recordExistInDB, arguments: { entityName: "UnitOfMeasure", field: "Id", exist: true } }
                    ], require: true
            },
            {
                propertyName: "BookkeepingCode", validation: [
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.onlyDigitsInString, arguments: null }], require: true
            },
        ]
    },
    {
        objectName: "Pumps",
        values: [
            {
                propertyName: "Name", validation: [
                    { func: validation.type, arguments: "string" },
                    { func: validation.maxLength, arguments: 20 },
                ], require: true
            },
            {
                propertyName: "UnitOfMeasure", validation: [
                    { func: validation.recordExistInDB, arguments: { entityName: "UnitOfMeasure", field: "Id", exist: true } }
                ], require: true
            },
            {
                propertyName: "BookkeepingCode", validation: [
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.onlyDigitsInString, arguments: null }
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
        objectName: "UnitOfMeasure",
        values: [
            {
                propertyName: "Measure", validation: [
                    { func: validation.type, arguments: "string" },
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.recordExistInDB, arguments: { entityName: "UnitOfMeasure", field: "measure", exist: false } }]
            },
        ], require: true
    },
    {
        objectName: "PricelistForProducts",
        values: [

            { propertyName: "PriceListId", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyDigitsInString, arguments: null }] },
            { propertyName: "ProductId", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyDigitsInString, arguments: null }] },
            { propertyName: "TableName", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "Price", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "Discount", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
        ]
    },
    // {
    //     objectName: "Pumps",
    //     values: [

    //         { propertyName: "Name", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
    //         { propertyName: "UnitOfMeasure", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
    //         { propertyName: "Addition", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
    //         { propertyName: "BookkeepingCode", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyDigitsInString, arguments: null }] },
    //         { propertyName: "Discount", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },

    //     ]
    // },
    {
        objectName: "moreProductsItems",
        values: [
            { propertyName: "LeadNumber", validation: [{ func: validation.recordExistInDB, arguments: { entityName: "Leads", field: "id", exist: true } }], require: true },
            { propertyName: "Product", validation: [{ func: validation.recordExistInDB, arguments: { entityName: "Additions", field: "id", exist: true } },], require: false },
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
                    { func: validation.onlyDigitsInString, arguments: null },
                    { func: validation.recordExistInDB, arguments: { entityName: "Clients", field: "ClientCode", exist: false }}], require: true, type:ValueTypes.STRING 
                
            },
            { propertyName: "ClientName", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }], require: true, type:ValueTypes.STRING },
            { propertyName: "PrivateCompanyNumber", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyDigitsInString, arguments: null }], require: true , type:ValueTypes.STRING},
            { propertyName: "BookkeepingNumber", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyDigitsInString, arguments: null }], require: false , type:ValueTypes.STRING},
            { propertyName: "DestinationBank", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyDigitsInString, arguments: null }], require: false , type:ValueTypes.STRING},
            { propertyName: "PaymentTermsFluent", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyDigitsInString, arguments: null }], require: false },
            // { propertyName: "PreferredPaymentDate", validation: [{ func: validation.dateType, arguments: null }, { func: validation.theDateAfterToday, arguments: null }] },
            { propertyName: "Ovligo", validation: [{ func: validation.type, arguments: "number" }], require: false },
            { propertyName: "ReceiptIssueTerm", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyDigitsInString, arguments: null }], require:false },
            { propertyName: "ReceiptCentralism", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyDigitsInString, arguments: null }], require:false },
            { propertyName: "AccountantClassifiedCode", validation: [{ func: validation.type, arguments: "number" }], require:false },
            { propertyName: "Status", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] , require:true, type:ValueTypes.NUMBER},
            { propertyName: "Description", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }], require:false },
            { propertyName: "Street", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }], require:true , type:ValueTypes.STRING},
            { propertyName: "House", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }], require:true , type:ValueTypes.STRING},
            { propertyName: "City", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }], require:true, type:ValueTypes.STRING },
            { propertyName: "ZipCode", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyDigitsInString, arguments: null }], require:false },
            { propertyName: "Telephone1", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }], require:true , type:ValueTypes.STRING},
            { propertyName: "Telephone2", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }], require:false },
            { propertyName: "MobilePhone", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }] , require:false},
            { propertyName: "Fax", validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }] , require:false},
            { propertyName: "Email", validation: [{ func: validation.required, arguments: null }, { func: validation.correctEmail, arguments: null }] , require:false},
            { propertyName: "Comments", validation: [{ func: validation.notCheck, arguments: null }, { func: validation.type, arguments: "string" }] , require:false},
        ]
    },
    {
        objectName: "PriceList",
        values: [
            { propertyName: "Name", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] , require:true, tye:ValueTypes.STRING},
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
        objectName: "FinishProducts",
        values: [
            { propertyName: "Name", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "UnitOfMeasure", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "BookkeepingCode", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "AddedDate", validation: [{ func: validation.required, arguments: null }, { func: validation.dateType, arguments: null }] },
            { propertyName: "Disabled", validation: [{ func: validation.required, arguments: null }, { func: validation.bit, arguments: null }] },
            { propertyName: "DisabledDate", validation: [{ func: validation.dateType, arguments: null }] },
        ]
    }
]

const findModulesValidations = [
    {
        objectName: "FinishProducts",
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
                        { func: validation.recordExistInDB, arguments: { entityName: "UnitOfMeasure", field: "measure", exist: true } }
                    ], require: false
            },
            {
                propertyName: "BookkeepingCode", validation: [
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.onlyDigitsInString, arguments: null }
                ], require: false
            },
            {
                propertyName: "AddedDate", validation: [
                    { func: validation.dateType, arguments: null },
                    { func: validation.theDateBeforToday, arguments: null },
                ], require: false
            },
            {
                propertyName: "Disabled", validation: [
                    { func: validation.bit, arguments: null },
                ], require: false
            },

            {
                propertyName: "DeisabledDate", validation: [
                    { func: validation.dateType, arguments: null },
                    { func: validation.theDateBeforToday, arguments: null },

                ], require: false
            },
        ]
    },
    {
        objectName: "Additions",
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
                        { func: validation.recordExistInDB, arguments: { entityName: "UnitOfMeasure", field: "measure", exist: true } }
                    ], require: false
            },
            {
                propertyName: "BookkeepingCode", validation: [
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.onlyDigitsInString, arguments: null }
                ], require: false
            },
            {
                propertyName: "AddedDate", validation: [
                    { func: validation.dateType, arguments: null },
                    { func: validation.theDateBeforToday, arguments: null },
                ], require: false
            },
            {
                propertyName: "Disabled", validation: [
                    { func: validation.bit, arguments: null },
                ], require: false
            },

            {
                propertyName: "DisabledDate", validation: [
                    { func: validation.dateType, arguments: null },
                    { func: validation.theDateBeforToday, arguments: null },

                ], require: false
            },
        ]
    },
    {
        objectName: "Pumps",
        values: [
            {
                propertyName: "Name", validation: [
                    { func: validation.type, arguments: "string" },
                    { func: validation.maxLength, arguments: 20 },
                ], require: false
            },
            {
                propertyName: "UnitOfMeasure", validation: [
                    { func: validation.recordExistInDB, arguments: { entityName: "UnitOfMeasure", field: "measure", exist: true } }
                ], require: false
            },
            {
                propertyName: "BookkeepingCode", validation: [
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.onlyDigitsInString, arguments: null }
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
                propertyName: "Disabled", validation: [
                    { func: validation.bit, arguments: null },
                ], require: false
            },

            {
                propertyName: "DisabledDate", validation: [
                    { func: validation.dateType, arguments: null },
                    { func: validation.theDateBeforToday, arguments: null },

                ], require: false
            },
        ]
    },
    {
        objectName: "UnitOfMeasure",
        values: [
            {
                propertyName: "Measure", validation: [
                    { func: validation.type, arguments: "string" },
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.recordExistInDB, arguments: { entityName: "UnitOfMeasure", field: "measure", exist: false } }
                ], require: true
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
