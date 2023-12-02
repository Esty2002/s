const { ValueTypes } = require('../../utils/types');
const { validation } = require('./validations-functions');
const { models, modelNames } = require('../schemas')

const moduleValidations = [
    {
        objectName: models.ADDITIONS.entity,
        values: [
            {
                propertyName: models.ADDITIONS.fields.NAME.name,
                validation: [
                    { func: validation.type, arguments: models.ADDITIONS.fields.NAME.type, create: true, update: true },
                    { func: validation.maxLength, arguments: 20, create: true, update: true },
                ], require: { create: true, update: false }
            },
            {
                propertyName: models.ADDITIONS.fields.UNITOFMEASURE.name,
                validation: [
                    { func: validation.recordExistInDB, arguments: { entityName: modelNames.MEASURES, field: models.MEASURES.fields.ID.name, exist: true }, create: true, update: true }
                ], require: { create: true, update: false }
            },
            {
                propertyName: models.ADDITIONS.fields.BOOKKEEPING_CODE.name,
                validation: [
                    { func: validation.maxLength, arguments: 20, create: true, update: true },
                    { func: validation.onlyDigitsInString, arguments: null, create: true, update: true }],
                require: { create: true, update: false }
            },
            {
                propertyName: models.ADDITIONS.fields.ADDED_DATE.name,
                validation: [
                    { func: validation.dateType, arguments: null },
                    { func: validation.theDateBeforeToday, arguments: null }],
                require: { create: true, update: false }
            }
        ]
    },
    {
        objectName: models.BRANCHES.entity,
        values: [
            {
                propertyName: models.BRANCHES.fields.BRANCH_NAME.name,
                validation: [{ func: validation.type, arguments: "string" }],
                require: { create: true, update: false },
                type: ValueTypes.STRING
            },
            {
                propertyName: models.BRANCHES.fields.CITY.name,
                validation: [{ func: validation.type, arguments: "string" }], require: { create: true, update: false }, type: ValueTypes.STRING
            },
            {
                propertyName: models.BRANCHES.fields.FAX.name,
                validation: [{ func: validation.onlyDigitsInString, arguments: null }], require: { create: false, update: false }
            },
            {
                propertyName: models.BRANCHES.fields.HOME_NUMBER.name,
                validation: [{ func: validation.onlyDigitsInString, arguments: null }],
                require: { create: true, update: false }, type: ValueTypes.STRING
            },
            {
                propertyName: models.BRANCHES.fields.MAIL.name, validation: [{ func: validation.concretEmail, arguments: null }],
                require: { create: false, update: false }
            },
            {
                propertyName: models.BRANCHES.fields.MOBILE.name,
                validation: [{ func: validation.correctPhone, arguments: null }], require: { create: false, update: false }
            },
            {
                propertyName: models.BRANCHES.fields.NOTES.name,
                validation: [{ func: validation.required, arguments: null }], require: { create: false, update: false }
            },
            { propertyName: models.BRANCHES.fields.PHONE1.name, validation: [{ func: validation.correctPhone, arguments: null }], require: { create: false, update: false }, type: ValueTypes.STRING },
            { propertyName: models.BRANCHES.fields.PHONE2.name, validation: [{ func: validation.correctPhone, arguments: null }], require: { create: false, update: false } },
            { propertyName: models.BRANCHES.fields.STATUS.name, validation: [{ func: validation.type, arguments: "number" }], require: { create: true, update: false }, type: ValueTypes.NUMBER },
            { propertyName: models.BRANCHES.fields.STREET.name, validation: [{ func: validation.type, arguments: "string" }], require: { create: true, update: false }, type: ValueTypes.STRING },
            { propertyName: models.BRANCHES.fields.SUPPLIER_CODE.name, validation: [{ func: validation.onlyDigitsInString, arguments: null }], require: { create: true, update: false }, type: ValueTypes.STRING },
            { propertyName: models.BRANCHES.fields.USERNAME.name, validation: [{ func: validation.type, arguments: "string" }], require: { create: true, update: false }, type: ValueTypes.STRING },
            { propertyName: models.BRANCHES.fields.ZIPCODE.name, validation: [{ func: validation.onlyDigitsInString, arguments: null }], require: { create: false, update: false } },

        ],
    },
    {
        objectName: "leads",
        values: [
            { propertyName: "supplyDate", validation: [{ func: validation.dateType, arguments: "date" }, { func: validation.dateInFuture, arguments: null }], require: true },
            { propertyName: "supplyHour", validation: [{ func: validation.hourType, arguments: null }], require: false },
            { propertyName: "ordererCode", validation: [{ func: validation.required, arguments: null }, { func: validation.recordExistInDB, arguments: { entityName: "Orderers", field: "id", exist: true } }], require: true },
            { propertyName: "supplyAddress", validation: [{ func: validation.type, arguments: 'string' }], require: false },
            { propertyName: "mapReferenceLongitude", validation: [{ func: validation.positiveNumber, arguments: null }], require: false },
            { propertyName: "mapReferenceLatitude", validation: [{ func: validation.positiveNumber, arguments: null }], require: false },
            { propertyName: "clientCode", validation: [{ func: validation.recordExistInDB, arguments: { entityName: "Clients", field: "id", exist: true } }], require: false },
            { propertyName: "baseConcretProduct", validation: [{ func: validation.checkConcretItem, arguments: null }], require: false },
            { propertyName: "tablename", validation: [{ func: validation.correctTable, arguments: null }], require: false },
            { propertyName: "concretAmount", validation: [{ func: validation.type, arguments: "number" }, { func: validation.positiveNumber, arguments: null }], require: false },
            { propertyName: "pump", validation: [{ func: validation.recordExistInDB, arguments: { entityName: "Pumps", field: "id", exist: true } }], require: false },
            { propertyName: "pumpPipeLength", validation: [{ func: validation.type, arguments: "number" }, { func: validation.positiveNumber, arguments: null }], require: false },
            { propertyName: "pouringType", validation: [{ func: validation.recordExistInDB, arguments: { entityName: "PouringsTypes", field: "id", exist: true } }], require: false },
            { propertyName: "pouringTypeComments", validation: [{ func: validation.type, arguments: "string" }, { func: validation.maxLength, arguments: 8000 }, { func: validation.onlyLetters, arguments: null }], require: false },
            { propertyName: "comments", validation: [{ func: validation.type, arguments: "string" }, { func: validation.maxLength, arguments: 8000 }, { func: validation.onlyLetters, arguments: null }], require: false },
            { propertyName: "statusLead", validation: [{ func: validation.recordExistInDB, arguments: { entityName: "StatusesLead", field: "id", exist: true } }], require: true },
            { propertyName: "orderNumber", validation: [{ func: validation.notCheck, arguments: null }], require: false },
            { propertyName: "addedDate", validation: [{ func: validation.dateType, arguments: null }], require: true },
            { propertyName: "disable", validation: [{ func: validation.bit, arguments: null }], require: true },
            { propertyName: "deletingDate", validation: [{ func: validation.notCheck, arguments: null }], require: false },

        ]
    },
    {
        objectName: "moreProductsItems",
        values: [
            { propertyName: "LeadNumber", validation: [{ func: validation.recordExistInDB, arguments: { entityName: "Leads", field: "Id", exist: true } }], require: true },
            { propertyName: "Product", validation: [{ func: validation.recordExistInDB, arguments: { entityName: "Additions", field: "Id", exist: true } },], require: false },
            { propertyName: "Amount", validation: [{ func: validation.type, arguments: 'number' }, { func: validation.positiveNumber, arguments: null }], require: false },
            { propertyName: "AddedDate", validation: [{ func: validation.dateType, arguments: null }], require: true }
        ]
    },
    {
        objectName: "orderers",
        values: [
            { propertyName: "OrdererName", validation: [{ func: validation.onlyLetters, arguments: null }], require: true },
            { propertyName: "OrdererPhone", validation: [{ func: validation.correctPhone, arguments: null }, { func: validation.recordExistInDB, arguments: { entityName: "Orderers", field: "OrdererPhone", exist: false } }], require: true },
            { propertyName: "AddedDate", validation: [{ func: validation.dateType, arguments: "null" }], require: true },
            { propertyName: "Disable", validation: [{ func: validation.bit, arguments: null }], require: true },
            { propertyName: "DeletingDate", validation: [{ func: validation.notCheck, arguments: null }], require: false }
        ],
    },
    {
        objectName: modelNames.SUPPLIERS,
        values: [
            {
                propertyName: models.SUPPLIERS.fields.BOOKKEEPING_CODE.name,
                validation: [{ func: validation.onlyDigitsInString, arguments: null }],
                require: { create: false, update: false }, type: ValueTypes.STRING
            },
            {
                propertyName: models.SUPPLIERS.fields.CITY.name,
                validation: [{ func: validation.type, arguments: "string" }],
                require: { create: true, update: false }, type: ValueTypes.STRING
            },
            {
                propertyName: models.SUPPLIERS.fields.CONDITION_GUSHY_PAYMANT.name,
                validation: [{ func: validation.type, arguments: "string" },],
                require: { create: false, update: false }, type: ValueTypes.STRING
            },
            {
                propertyName: models.SUPPLIERS.fields.HOME_NUMBER.name,
                validation: [{ func: validation.type, arguments: "number" }],
                require: { create: true, update: false }, type: ValueTypes.NUMBER
            },
            {
                propertyName: models.SUPPLIERS.fields.USERNAME.name,
                validation: [{ func: validation.type, arguments: "string" }],
                require: { create: false, update: false }, type: ValueTypes.STRING
            },
            {
                propertyName: models.SUPPLIERS.fields.LICENSED_DEALER_NUMBER.name,
                validation: [{ func: validation.onlyDigitsInString, arguments: null }], require: { create: true, update: false }, type: ValueTypes.STRING
            },
            {
                propertyName: models.SUPPLIERS.fields.OBJECTIVE_BANK.name,
                validation: [{ func: validation.notCheck, arguments: null }],
                require: { create: false, update: false }, type: ValueTypes.STRING
            },
            {
                propertyName: models.SUPPLIERS.fields.OVLIGO.name,
                validation: [{ func: validation.type, arguments: "number" }], require: { create: false, update: false }
            },
            {
                propertyName: models.SUPPLIERS.fields.PHONE1.name,
                validation: [{ func: validation.correctPhone, arguments: null }],
                require: { create: true, update: false }, type: ValueTypes.STRING
            },
            { propertyName: models.SUPPLIERS.fields.PHONE2.name, validation: [{ func: validation.correctPhone, arguments: null }], require: { create: false, update: false } },
            {
                propertyName: models.SUPPLIERS.fields.PREFERRED_PAYMWNT_DATE.name, validation: [{ func: validation.onlyDigitsInString, arguments: null },
                { func: validation.betweenNumbers, arguments: { "min": 1, "max": 30 } }], require: { create: false, update: false }
            },
            { propertyName: models.SUPPLIERS.fields.STATUS.name, validation: [{ func: validation.type, arguments: "number" }], require: { create: true, update: false }, type: ValueTypes.NUMBER },
            { propertyName: models.SUPPLIERS.fields.STREET.name, validation: [{ func: validation.type, arguments: "string" }], require: { create: true, update: false }, type: ValueTypes.STRING },
            { propertyName: models.SUPPLIERS.fields.SUPPLIER_CODE.name, validation: [{ func: validation.onlyDigitsInString, arguments: null }], require: { create: true, update: false }, type: ValueTypes.STRING },
            { propertyName: models.SUPPLIERS.fields.SUPPLIER_NAME.name, validation: [{ func: validation.type, arguments: "string" }], require: { create: true, update: false }, type: ValueTypes.STRING },
            { propertyName: models.SUPPLIERS.fields.ZIPCODE.name, validation: [{ func: validation.onlyDigitsInString, arguments: null }], require: { create: false, update: false } },
            { propertyName: models.SUPPLIERS.fields.FAX.name, validation: [{ func: validation.onlyDigitsInString, arguments: null }], require: { create: false, update: false } },
            { propertyName: models.SUPPLIERS.fields.MAIL.name, validation: [{ func: validation.correctEmail, arguments: null }], require: { create: false, update: false } },
            { propertyName: models.SUPPLIERS.fields.NOTES.name, validation: [{ func: validation.notCheck, arguments: null }], require: { create: false, update: false } },
            { propertyName: models.SUPPLIERS.fields.MOBILE.name, validation: [{ func: validation.correctPhone, arguments: null }], require: { create: false, update: false } },

        ],
    },
    {
        objectName: "pouringsTypes",
        values: [
            { propertyName: "PouringName", validation: [{ func: validation.onlyLetters, arguments: null }], require: { create: true, update: false }, type: ValueTypes.STRING },
            { propertyName: "AddedDate", validation: [{ func: validation.dateType, arguments: null }], require: { create: true, update: false }, type: ValueTypes.DATE },
            { propertyName: "Disable", validation: [{ func: validation.bit, arguments: null }], require: { create: true, update: false }, type: ValueTypes.BIT },
            { propertyName: "DeletingDate", validation: [{ func: validation.type, arguments: "date" }], require: { create: false, update: false } }
        ]
    },
    {
        objectName: "statusesLead",
        values: [
            { propertyName: "StatusName", validation: [{ func: validation.onlyLetters, arguments: null }], require: { create: true, update: false }, type: ValueTypes.STRING },
            { propertyName: "AddedDate", validation: [{ func: validation.dateType, arguments: null }], require: { create: true, update: false }, type: ValueTypes.DATE },
            { propertyName: "Disable", validation: [{ func: validation.bit, arguments: null }], require: { create: true, update: false }, type: ValueTypes.BIT },
            { propertyName: "DeletingDate", validation: [{ func: validation.type, arguments: "date" }], require: { create: false, update: false }, type: ValueTypes.DATE }
        ]
    },
    {
        objectName: modelNames.FINISH_PRODUCTS,
        values: [
            {
                propertyName: models.FINISH_PRODUCTS.fields.NAME.name, validation: [
                    { func: validation.type, arguments: "string" },
                    { func: validation.maxLength, arguments: 20 },
                ], require: { create: true, update: false }, tye: ValueTypes.STRING
            },
            {
                propertyName: models.FINISH_PRODUCTS.fields.UNIT_OF_MEASURE.name, validation:
                    [
                        { func: validation.recordExistInDB, arguments: { entityName: modelNames.MEASURES, field: models.MEASURES.fields.ID.name, exist: true } }

                    ], require: { create: true, update: false }
            },
            {
                propertyName: models.FINISH_PRODUCTS.fields.BOOKKEEPING_CODE.name, validation: [
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.onlyDigitsInString, arguments: null }]

                , require: { create: true, update: false }
            },
        ]
    },
    {
        objectName: modelNames.PUMPS,
        values: [
            {
                propertyName: models.PUMPS.fields.NAME.name, validation: [
                    { func: validation.type, arguments: "string" },
                    { func: validation.maxLength, arguments: 20 },
                ], require: { create: true, update: false }
            },
            {
                propertyName: models.PUMPS.fields.UNIT_OF_MEASURE.name, validation: [
                    { func: validation.recordExistInDB, arguments: { entityName: modelNames.MEASURES, field: models.MEASURES.fields.ID.name, exist: true } }
                ], require: { create: true, update: false }
            },
            {
                propertyName: models.PUMPS.fields.BOOKKEEPING_CODE.name, validation: [
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.onlyDigitsInString, arguments: null }
                ], require: { create: true, update: false }
            },
            {
                propertyName: models.PUMPS.fields.ADDITION.name, validation: [
                    { func: validation.bit, arguments: null }
                ], require: { create: true, update: false }
            }
        ]
    },
    {
        objectName: modelNames.MEASURES,
        values: [
            {
                propertyName: models.MEASURES.fields.MEASURE.name, validation: [
                    { func: validation.type, arguments: "string" },
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.recordExistInDB, arguments: { entityName: modelNames.MEASURES, field: models.MEASURES.fields.MEASURE.name, exist: false } }],
                require: { create: true, update: false }, type: ValueTypes.STRING
            },
        ]
    },
    {
        objectName: "pricelistForProducts",
        values: [

            { propertyName: "PriceListId", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyDigitsInString, arguments: null }] },
            { propertyName: "ProductId", validation: [{ func: validation.required, arguments: null }, { func: validation.onlyDigitsInString, arguments: null }] },
            { propertyName: "TableName", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }] },
            { propertyName: "Price", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
            { propertyName: "Discount", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }] },
        ]
    },
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
        objectName: modelNames.CLIENTS,
        values: [
            {
                propertyName: models.CLIENTS.fields.CLIENT_CODE.name, validation: [
                    { func: validation.required, arguments: null },
                    { func: validation.onlyDigitsInString, arguments: null },
                    { func: validation.recordExistInDB, arguments: { entityName: modelNames.CLIENTS, field: models.CLIENTS.fields.CLIENT_CODE.name, exist: false } }],
                require: { create: true, update: false }, type: ValueTypes.STRING

            },
            {
                propertyName: models.CLIENTS.fields.CLIENT_NAME.name,
                validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }],
                require: { create: true, update: false }, type: ValueTypes.STRING
            },
            {
                propertyName: models.CLIENTS.fields.PRIVATE_COMPANY_NUMBER.name,
                validation: [{ func: validation.required, arguments: null }, { func: validation.onlyDigitsInString, arguments: null }],
                require: { create: true, update: false }, type: ValueTypes.STRING
            },
            {
                propertyName: models.CLIENTS.fields.BOOKKEEPING_CODE.name,
                validation: [{ func: validation.required, arguments: null }, { func: validation.onlyDigitsInString, arguments: null }],
                require: { create: false, update: false }, type: ValueTypes.STRING
            },
            {
                propertyName: models.CLIENTS.fields.DESTINATION_BANK.name,
                validation: [{ func: validation.required, arguments: null }, { func: validation.onlyDigitsInString, arguments: null }],
                require: { create: false, update: false }, type: ValueTypes.STRING
            },
            {
                propertyName: models.CLIENTS.fields.PAYMENT_TERMS_FLUENT.name,
                validation: [{ func: validation.required, arguments: null }, { func: validation.onlyDigitsInString, arguments: null }],
                require: { create: false, update: false }
            },
            // { propertyName "PreferredPaymentDate", validation: [{ func: validation.dateType, arguments: null }, { func: validation.theDateAfterToday, arguments: null }] },
            {
                propertyName: models.CLIENTS.fields.OVLIGO.name,
                validation: [{ func: validation.type, arguments: "number" }],
                require: { create: false, update: false }
            },
            {
                propertyName: models.CLIENTS.fields.RECEIPT_ISSUE_TERM.name,
                validation: [{ func: validation.required, arguments: null }, { func: validation.onlyDigitsInString, arguments: null }],
                require: { create: false, update: false }
            },
            {
                propertyName: models.CLIENTS.fields.RECEIPT_CENTRALISM.name,
                validation: [{ func: validation.required, arguments: null },
                { func: validation.onlyDigitsInString, arguments: null }],
                require: { create: false, update: false }
            },
            {
                propertyName: models.CLIENTS.fields.ACCOUNT_CLASSIFIED_CODE.name,
                validation: [{ func: validation.type, arguments: "number" }],
                require: { create: false, update: false }
            },
            {
                propertyName: models.CLIENTS.fields.STATUS.name,
                validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }],
                require: { create: true, update: false }, type: ValueTypes.NUMBER
            },
            {
                propertyName: models.CLIENTS.fields.DESCRIPTION.name,
                validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }],
                require: { create: false, update: false }
            },
            {
                propertyName: models.CLIENTS.fields.STREET.name,
                validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }],
                require: { create: true, update: false }, type: ValueTypes.STRING
            },
            {
                propertyName: models.CLIENTS.fields.HOUSE.name,
                validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }],
                require: { create: true, update: false }, type: ValueTypes.STRING
            },
            {
                propertyName: models.CLIENTS.fields.CITY.name,
                validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }], require: { create: true, update: false }, type: ValueTypes.STRING
            },
            {
                propertyName: models.CLIENTS.fields.ZIP_CODE.name,
                validation: [{ func: validation.required, arguments: null }, { func: validation.onlyDigitsInString, arguments: null }],
                require: { create: false, update: false }
            },
            {
                propertyName: models.CLIENTS.fields.PHONE1.name,
                validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }],
                require: { create: true, update: false }, type: ValueTypes.STRING
            },
            {
                propertyName: models.CLIENTS.fields.PHONE2.name, validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }],
                require: { create: false, update: false }
            },
            { propertyName: models.CLIENTS.fields.MOBILE.name, validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }], require: { create: false, update: false } },
            {
                propertyName: models.CLIENTS.fields.FAX.name, validation: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }],
                require: { create: false, update: false }
            },
            {
                propertyName: models.CLIENTS.fields.MAIL.name,
                validation: [{ func: validation.required, arguments: null }, { func: validation.correctEmail, arguments: null }], require: { create: false, update: false }
            },
            {
                propertyName: models.CLIENTS.fields.COMMENT.name,
                validation: [{ func: validation.notCheck, arguments: null }, { func: validation.type, arguments: "string" }], require: { create: false, update: false }
            },
        ]
    },
    {
        objectName: "priceList",
        values: [
            { propertyName: "name", validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }], require: true, tye: ValueTypes.STRING },
            { propertyName: "pumps", validation: [{ func: validation.required, arguments: null }, { func: validation.bit, arguments: null }] },
            { propertyName: "beton", validation: [{ func: validation.required, arguments: null }, { func: validation.bit, arguments: null }] },
            { propertyName: "sddedDate", validation: [{ func: validation.required, arguments: null }, { func: validation.dateType, arguments: null }] },
            { propertyName: "userName", validation: [{ func: validation.required, arguments: null }, { func: validation.EnglishLetters, arguments: null }] },
            { propertyName: "finish", validation: [{ func: validation.required, arguments: null }, { func: validation.bit, arguments: null }] },
            { propertyName: "disabled", validation: [{ func: validation.required, arguments: null }, { func: validation.bit, arguments: null }] }
        ]
    },
    {
        objectName: "citiesAdditions",
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
        objectName: "timeAdditions",
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
        objectName: "additionsForDistance",
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
        objectName: "truckFill",
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
        objectName: "pricesListBySupplierOrClient",
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
        objectName: "pricelistForProducts",
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
        objectName: modelNames.FINISH_PRODUCTS,
        values: [
            {
                propertyName: models.FINISH_PRODUCTS.fields.NAME.name,
                validation: [
                    { func: validation.required, arguments: null },
                    { func: validation.type, arguments: "string" },
                    { func: validation.recordExistInDB, arguments: { entityName: modelNames.FINISH_PRODUCTS, field: models.FINISH_PRODUCTS.fields.NAME.name, exist: false } }],
                require: { create: true, update: false }
            },
            {
                propertyName: models.FINISH_PRODUCTS.fields.UNIT_OF_MEASURE.name,
                validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }
                    , { func: validation.recordExistInDB, arguments: { entityName: modelNames.MEASURES, field: models.MEASURES.fields.ID.name, exist: true } }],
                require: { create: true, update: false }
            },
            {
                propertyName: models.FINISH_PRODUCTS.fields.BOOKKEEPING_CODE.name,
                validation: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }], require: { create: false, update: false }
            },
            {
                propertyName: models.FINISH_PRODUCTS.fields.ADDED_DATE.name,
                validation: [{ func: validation.required, arguments: null }, { func: validation.dateType, arguments: null }], require: { create: true, update: false }
            },
            {
                propertyName: models.FINISH_PRODUCTS.fields.DISABLED.name, validation: [{ func: validation.required, arguments: null }, { func: validation.bit, arguments: null }],
                require: { create: false, update: false }
            },
            { propertyName: models.FINISH_PRODUCTS.fields.DISABLED_DATE.name, 
                validation: [{ func: validation.dateType, arguments: null }], require: { create: false, update: false } },
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
                        { func: validation.recordExistInDB, arguments: { entityName: modelNames.MEASURES, field: models.MEASURES.fields.ID.name, exist: true } }
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
                    { func: validation.theDateBeforeToday, arguments: null },
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
                    { func: validation.theDateBeforeToday, arguments: null },

                ], require: false
            },
        ]
    },

    {
        objectName: modelNames.PUMPS,
        values: [
            {
                propertyName: models.PUMPS.fields.NAME.name, validation: [
                    { func: validation.type, arguments: "string" },
                    { func: validation.maxLength, arguments: 20 },
                ], require: false
            },
            {
                propertyName: models.PUMPS.fields.UNIT_OF_MEASURE.name, validation: [
                    { func: validation.recordExistInDB, arguments: { entityName: modelNames.MEASURES, field: models.MEASURES.fields.MEASURE.name, exist: true } }
                ], require: false
            },
            {
                propertyName: models.PUMPS.fields.BOOKKEEPING_CODE.name, validation: [
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.onlyDigitsInString, arguments: null }
                ], require: false
            },
            {
                propertyName: models.PUMPS.fields.ADDITION.name, validation: [
                    { func: validation.bit, arguments: null }
                ], require: false
            },
            {
                propertyName: models.PUMPS.fields.ADDED_DATE.name, validation: [
                    { func: validation.dateType, arguments: null },
                    { func: validation.theDateBeforeToday, arguments: null },
                ], require: false
            },
            {
                propertyName: models.PUMPS.fields.DISABLED.name, validation: [
                    { func: validation.bit, arguments: null },
                ], require: false
            },

            {
                propertyName: models.PUMPS.fields.DISABLED_DATE.name, validation: [
                    { func: validation.dateType, arguments: null },
                    { func: validation.theDateBeforeToday, arguments: null },

                ], require: false
            },
        ]
    },
    {
        objectName: modelNames.MEASURES,
        values: [
            {
                propertyName: models.MEASURES.fields.MEASURE.name, validation: [
                    { func: validation.type, arguments: "string" },
                    { func: validation.maxLength, arguments: 20 },
                    { func: validation.recordExistInDB, arguments: { entityName: modelNames.MEASURES, field: models.MEASURES.fields.MEASURE.name, exist: false } }
                ], require: true
            },
            {
                propertyName: models.MEASURES.fields.DISABLED.name, validation: [
                    { func: validation.bit, arguments: null },
                ], require: false
            },
        ]
    },
]

function getValidationsModule(object, add) {
    const model = moduleValidations.find(({ objectName }) => objectName === object)
    const validation = model.values.map(({ propertyName, validation, require }) =>
        ({ propertyName, validation: validation.filter(({ create, update }) => add ? create === true : update === true), require: add ? require.create : require.update }))
    return validation
}


module.exports = { getValidationsModule };
