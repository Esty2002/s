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
        objectName: "tbl_Suppliers",
        values: [
            { propertyName: "BookkeepingNumber", validation: [{ func: validation.onlyNumbersInString, arguments: null }], require: false },
            { propertyName: "City", validation: [{ func: validation.type, arguments: "string" }], require: true },
            { propertyName: "ConditionGushyPayment", validation: [{ func: validation.type, arguments: "string" },], require: false },
            { propertyName: "HomeNumber", validation: [{ func: validation.type, arguments: "number" }], require: true },
            { propertyName: "InsertUser", validation: [{ func: validation.type, arguments: "string" }], require: false },
            { propertyName: "LicensedDealerNumber", validation: [{ func: validation.onlyNumbersInString, arguments: null }], require: true },
            { propertyName: "ObjectiveBank", validation: [{ func: validation.notCheck, arguments: null }], require: false },
            { propertyName: "Ovligo", validation: [{ func: validation.type, arguments: "number" }], require: false },
            { propertyName: "Phone1", validation: [{ func: validation.correctPhone, arguments: null }], require: true },
            { propertyName: "Phone2", validation: [{ func: validation.correctPhone, arguments: null }], require: false },
            {
                propertyName: "PreferredPaymentDate", validation: [{ func: validation.onlyNumbersInString, arguments: null },
                { func: validation.betweenNumbers, arguments: { "min": 1, "max": 30 } }], require: false
            },
            { propertyName: "Status", validation: [{ func: validation.type, arguments: "number" }], require: true },
            { propertyName: "Street", validation: [{ func: validation.type, arguments: "string" }], require: true },
            { propertyName: "SupplierCode", validation: [{ func: validation.onlyNumbersInString, arguments: null }], require: true },
            { propertyName: "SupplierName", validation: [{ func: validation.type, arguments: "string" }], require: true },
            { propertyName: "ZipCode", validation: [{ func: validation.onlyNumbersInString, arguments: null }], require: false },
            { propertyName: "Fax", validation: [{ func: validation.onlyNumbersInString, arguments: null }], require: false },
            { propertyName: "Mail", validation: [{ func: validation.concretEmail, arguments: null }], require: false },
            { propertyName: "Notes", validation: [{ func: validation.notCheck, arguments: null }], require: false },
            { propertyName: "Mobile", validation: [{ func: validation.correctPhone, arguments: null }], require: false },

        ],
    },

    {
        objectName: "tbl_Branches",
        values: [
            { propertyName: "BranchName", validation: [{ func: validation.type, arguments: "string" }], require: true },
            { propertyName: "City", validation: [{ func: validation.type, arguments: "string" }], require: true },
            { propertyName: "Fax", validation: [{ func: validation.onlyNumbersInString, arguments: null }], require: false },
            { propertyName: "HomeNumber", validation: [{ func: validation.onlyNumbersInString, arguments: null }], require: true },
            { propertyName: "Mail", validation: [{ func: validation.concretEmail, arguments: null }], require: false },
            { propertyName: "Mobile", validation: [{ func: validation.correctPhone, arguments: null }], require: false },
            { propertyName: "Notes", validation: [{ func: validation.required, arguments: null }], require: false },
            { propertyName: "Phone1", validation: [{ func: validation.correctPhone, arguments: null }], require: true },
            { propertyName: "Phone2", validation: [{ func: validation.correctPhone, arguments: null }], require: false },
            { propertyName: "Status", validation: [{ func: validation.type, arguments: "number" }], require: true },
            { propertyName: "Street", validation: [{ func: validation.type, arguments: "string" }], require: true },
            { propertyName: "SupplierCode", validation: [{ func: validation.onlyNumbersInString, arguments: null }], require: true },
            { propertyName: "UserThatInsert", validation: [{ func: validation.type, arguments: "string" }], require: true },
            { propertyName: "ZipCode", validation: [{ func: validation.onlyNumbersInString, arguments: null }], require: false },

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
            { propertyName: "ClientName", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }, { func: validation.EnglishLettersOrHebrewLetters, arguments: null }] },
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
module.exports = { objectsForValidations };