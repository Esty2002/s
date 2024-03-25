const { ValueTypes, AppStatusTypes, ModelStatusTypes } = require('../../utils/types');
const { validation } = require('./validations-functions');
const { models, modelNames, getModelKey } = require('../../modules/utils/schemas');



const conditionOperators = {
    AND: 'and', OR: 'or'
}
const moduleValidations = [
    {
        objectName: modelNames.ADDITION,
        values: [
            {
                propertyName: models.ADDITIONS.fields.NAME.name,
                type: models.ADDITIONS.fields.NAME.type,
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: models.ADDITIONS.fields.NAME.type },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.maxLength, arguments: 20 },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.recordExistInDB, arguments: { entityName: modelNames.ADDITION, field: models.ADDITIONS.fields.NAME.name, exist: false } },
                   ],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.ADDITIONS.fields.UNITOFMEASURE.name,
                type: models.ADDITIONS.fields.UNITOFMEASURE.type,
                validation: [
                    {
                        modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE],
                        func: validation.recordExistInDB,
                        arguments: { entityName: modelNames.MEASURES, field: models.MEASURES.fields.ID.name, exist: true }
                    }
                ], require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.ADDITIONS.fields.BOOKKEEPING_CODE.name,
                type: models.ADDITIONS.fields.BOOKKEEPING_CODE.type,
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.maxLength, arguments: 20 },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.onlyDigitsInString, arguments: null },
                    {
                        modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.recordExistInMultipleDB, arguments:
                        { entityName: modelNames.ADDITION, field: models.ADDITIONS.fields.BOOKKEEPING_CODE.name, exist: false }
                    }
                ],

                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.ADDITIONS.fields.ADDED_DATE.name,
                type: models.ADDITIONS.fields.ADDED_DATE.type,
                initValue: { modelStatus: [ModelStatusTypes.CREATE], initValue: () => new Date() },
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.dateType, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.theDateBeforeToday, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => new Date() } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ],
            },
            {
                propertyName: models.ADDITIONS.fields.USERNAME.name,
                type: models.ADDITIONS.fields.USERNAME.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { status: AppStatusTypes.DEVELOP, initValue: () => 'develop' } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.ADDITIONS.fields.DISABLED.name,
                type: models.ADDITIONS.fields.DISABLED.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => false } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { initValue: () => true } }
                ]
            }, {
                propertyName: models.ADDITIONS.fields.DISABLE_USER.name,
                type: models.ADDITIONS.fields.DISABLE_USER.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { status: AppStatusTypes.DEVELOP, initValue: () => 'develop' } }
                ]
            },
            {
                propertyName: models.ADDITIONS.fields.DISABLED_DATE.name,
                type: models.ADDITIONS.fields.DISABLED_DATE.type,
                initValue: { modelStatus: [ModelStatusTypes.DELETE], initValue: () => new Date() },
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.dateType, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.theDateBeforeToday, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { initValue: () => new Date() } }
                ]
            },
        ]
    },
    {
        objectName: modelNames.BRANCHES,
        values: [
            {
                propertyName: models.BRANCHES.fields.BRANCH_NAME.name,
                type: models.BRANCHES.fields.BRANCH_NAME.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "string" }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.BRANCHES.fields.CITY.name,
                type: models.BRANCHES.fields.CITY.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "string" }], require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.BRANCHES.fields.FAX.name,
                type: models.BRANCHES.fields.FAX.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.onlyDigitsInString, arguments: null }], require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.BRANCHES.fields.HOME_NUMBER.name,
                type: models.BRANCHES.fields.HOME_NUMBER.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.BRANCHES.fields.MAIL.name,
                type: models.BRANCHES.fields.MAIL.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.correctEmail, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.BRANCHES.fields.MOBILE.name,
                type: models.BRANCHES.fields.MOBILE.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.correctPhone, arguments: null }], require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.BRANCHES.fields.NOTES.name,
                type: models.BRANCHES.fields.NOTES.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.required, arguments: null }], require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.BRANCHES.fields.PHONE1.name,
                type: models.BRANCHES.fields.PHONE1.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.correctPhone, arguments: null }], require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.BRANCHES.fields.PHONE2.name,
                type: models.BRANCHES.fields.PHONE2.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.correctPhone, arguments: null }], require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.BRANCHES.fields.STATUS.name,
                type: models.BRANCHES.fields.STATUS.type,
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: { type: "number", field: models.BRANCHES.fields.STATUS.connecteProperty } },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.recordExistInDB, arguments: { entityName: modelNames.STATUS, field: models.STATUS.fields.ID.name, exist: true } }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.BRANCHES.fields.STREET.name,
                type: models.BRANCHES.fields.STREET.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "string" }], require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: true },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.BRANCHES.fields.SUPPLIER_CODE.name,
                type: models.BRANCHES.fields.SUPPLIER_CODE.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.onlyDigitsInString, arguments:  models.BRANCHES.fields.SUPPLIER_CODE.connecteProperty },
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.recordExistInDB, arguments: { entityName: modelNames.SUPPLIERS, field: models.SUPPLIERS.fields.ID.name, exist: true } }
                ], require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: true },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.BRANCHES.fields.ZIPCODE.name,
                type: models.BRANCHES.fields.ZIPCODE.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.onlyDigitsInString, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.BRANCHES.fields.ADDED_DATE.name,
                type: models.BRANCHES.fields.ADDED_DATE.type,
                initValue: { modelStatus: [ModelStatusTypes.CREATE], initValue: () => new Date() },
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.dateType, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.theDateBeforeToday, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => new Date() } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ],
            },
            {
                propertyName: models.BRANCHES.fields.USERNAME.name,
                type: models.BRANCHES.fields.USERNAME.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { status: AppStatusTypes.DEVELOP, initValue: () => 'develop' } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.BRANCHES.fields.DISABLED.name,
                type: models.BRANCHES.fields.DISABLED.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => false } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { initValue: () => true } }
                ],
            }, {
                propertyName: models.BRANCHES.fields.DISABLE_USER.name,
                type: models.BRANCHES.fields.DISABLE_USER.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { status: AppStatusTypes.DEVELOP, initValue: () => 'develop' } }
                ],
            },
            {
                propertyName: models.BRANCHES.fields.DISABLED_DATE.name,
                type: models.BRANCHES.fields.DISABLED_DATE.type,
                initValue: { modelStatus: [ModelStatusTypes.DELETE], initValue: () => new Date() },
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.dateType, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.theDateBeforeToday, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { initValue: () => new Date() } }
                ],
            },

        ],
    },
    {
        objectName: modelNames.CLIENTS,
        values: [
            {
                propertyName: models.CLIENTS.fields.CLIENT_CODE.name,
                type: models.CLIENTS.fields.CLIENT_CODE.type, validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.required, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.onlyDigitsInString, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.recordExistInDB, arguments: { entityName: modelNames.CLIENTS, field: models.CLIENTS.fields.CLIENT_CODE.name, exist: false } },
                   ],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]

            },
            {
                propertyName: models.CLIENTS.fields.CLIENT_NAME.name,
                type: models.CLIENTS.fields.CLIENT_NAME.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.required, arguments: null },
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "string" }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.CLIENTS.fields.PRIVATE_COMPANY_NUMBER.name,
                type: models.CLIENTS.fields.PRIVATE_COMPANY_NUMBER.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.required, arguments: null },
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.onlyDigitsInString, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.CLIENTS.fields.BOOKKEEPING_CODE.name,
                type: models.CLIENTS.fields.BOOKKEEPING_CODE.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.required, arguments: null },
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.onlyDigitsInString, arguments: null }
                    ,
                {
                    modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.recordExistInMultipleDB, arguments:
                    { entityName: modelNames.CLIENTS, field: models.CLIENTS.fields.BOOKKEEPING_CODE.name, exist: false }
                }
                   
                
                ],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.CLIENTS.fields.DESTINATION_BANK.name,
                type: models.CLIENTS.fields.DESTINATION_BANK.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.required, arguments: null },
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.onlyDigitsInString, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.CLIENTS.fields.PAYMENT_TERMS_FLUENT.name,
                type: models.CLIENTS.fields.PAYMENT_TERMS_FLUENT.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.required, arguments: null },
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.onlyDigitsInString, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            // { propertyName "PreferredPaymentDate", validation: [{ func: validation.dateType, arguments: null }, { func: validation.theDateAfterToday, arguments: null }] },
            {
                propertyName: models.CLIENTS.fields.OVLIGO.name,
                type: models.CLIENTS.fields.OVLIGO.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "number" }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.CLIENTS.fields.RECEIPT_ISSUE_TERM.name,
                type: models.CLIENTS.fields.RECEIPT_ISSUE_TERM.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.required, arguments: null },
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.onlyDigitsInString, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.CLIENTS.fields.RECEIPT_CENTRALISM.name,
                type: models.CLIENTS.fields.RECEIPT_CENTRALISM.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.required, arguments: null },
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.onlyDigitsInString, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.CLIENTS.fields.ACCOUNT_CLASSIFIED_CODE.name,
                type: models.CLIENTS.fields.ACCOUNT_CLASSIFIED_CODE.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "number" }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.CLIENTS.fields.STATUS.name,
                type: models.CLIENTS.fields.STATUS.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.required, arguments: null },
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "number" }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.CLIENTS.fields.DESCRIPTION.name,
                type: models.CLIENTS.fields.DESCRIPTION.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.required, arguments: null },
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "string" }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.CLIENTS.fields.STREET.name,
                type: models.CLIENTS.fields.STREET.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.required, arguments: null },
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "string" }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.CLIENTS.fields.HOUSE.name,
                type: models.CLIENTS.fields.HOUSE.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.required, arguments: null },
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "string" }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.CLIENTS.fields.CITY.name,
                type: models.CLIENTS.fields.CITY.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.required, arguments: null },
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "string" }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.CLIENTS.fields.ZIP_CODE.name,
                type: models.CLIENTS.fields.ZIP_CODE.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.required, arguments: null },
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.onlyDigitsInString, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.CLIENTS.fields.PHONE1.name,
                type: models.CLIENTS.fields.PHONE1.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.required, arguments: null },
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.correctPhone, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.CLIENTS.fields.PHONE2.name,
                type: models.CLIENTS.fields.PHONE2.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.required, arguments: null },
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.correctPhone, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.CLIENTS.fields.MOBILE.name,
                type: models.CLIENTS.fields.MOBILE.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.required, arguments: null },
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.correctPhone, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.CLIENTS.fields.FAX.name,
                type: models.CLIENTS.fields.FAX.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.required, arguments: null },
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.correctPhone, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.CLIENTS.fields.MAIL.name,
                type: models.CLIENTS.fields.MAIL.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.required, arguments: null },
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.correctEmail, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.CLIENTS.fields.COMMENT.name,
                type: models.CLIENTS.fields.COMMENT.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.notCheck, arguments: null },
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "string" }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.CLIENTS.fields.ADDED_DATE.name,
                type: models.CLIENTS.fields.ADDED_DATE.type,
                initValue: { modelStatus: [ModelStatusTypes.CREATE], initValue: () => new Date() },
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.dateType, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.theDateBeforeToday, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => new Date() } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ],
            },
            {
                propertyName: models.CLIENTS.fields.USERNAME.name,
                type: models.CLIENTS.fields.USERNAME.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { status: AppStatusTypes.DEVELOP, initValue: () => 'develop' } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.CLIENTS.fields.DISABLED.name,
                type: models.CLIENTS.fields.DISABLED.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => false } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { initValue: () => true } }
                ],
            }, {
                propertyName: models.CLIENTS.fields.DISABLE_USER.name,
                type: models.CLIENTS.fields.DISABLE_USER.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { status: AppStatusTypes.DEVELOP, initValue: () => 'develop' } }
                ],
            },
            {
                propertyName: models.CLIENTS.fields.DISABLED_DATE.name,
                type: models.CLIENTS.fields.DISABLED_DATE.type,
                initValue: { modelStatus: [ModelStatusTypes.DELETE], initValue: () => new Date() },
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.dateType, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.theDateBeforeToday, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { initValue: () => new Date() } }
                ],
            },
        ]
    },
    {
        objectName: modelNames.FINISH_PRODUCTS,
        values: [
            {
                propertyName: models.FINISH_PRODUCTS.fields.NAME.name,
                type: models.FINISH_PRODUCTS.fields.NAME.type,
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.required, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "string" },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.recordExistInDB, arguments: { entityName: modelNames.FINISH_PRODUCTS, field: models.FINISH_PRODUCTS.fields.NAME.name, exist: false } },
                   ],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.FINISH_PRODUCTS.fields.UNIT_OF_MEASURE.name,
                type: models.FINISH_PRODUCTS.fields.UNIT_OF_MEASURE.type,
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.required, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.recordExistInDB, arguments: { entityName: modelNames.MEASURES, field: models.MEASURES.fields.ID.name, exist: true } }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.FINISH_PRODUCTS.fields.BOOKKEEPING_CODE.name,
                type: models.FINISH_PRODUCTS.fields.BOOKKEEPING_CODE.type,
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.required, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "number" },
                    {
                        modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.recordExistInMultipleDB, arguments:
                        { entityName: modelNames.FINISH_PRODUCTS, field: models.FINISH_PRODUCTS.fields.BOOKKEEPING_CODE.name, exist: false }

                    }
                    ],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },

            {
                propertyName: models.FINISH_PRODUCTS.fields.ADDED_DATE.name,
                type: models.FINISH_PRODUCTS.fields.ADDED_DATE.type,
                initValue: { modelStatus: [ModelStatusTypes.CREATE], initValue: () => new Date() },
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.dateType, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.theDateBeforeToday, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => new Date() } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ],
            },
            {
                propertyName: models.FINISH_PRODUCTS.fields.USERNAME.name,
                type: models.FINISH_PRODUCTS.fields.USERNAME.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { status: AppStatusTypes.DEVELOP, initValue: () => 'develop' } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.FINISH_PRODUCTS.fields.DISABLED.name,
                type: models.FINISH_PRODUCTS.fields.DISABLED.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => false } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { initValue: () => true } }
                ],
            }, {
                propertyName: models.FINISH_PRODUCTS.fields.DISABLE_USER.name,
                type: models.FINISH_PRODUCTS.fields.DISABLE_USER.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { status: AppStatusTypes.DEVELOP, initValue: () => 'develop' } }
                ],
            },
            {
                propertyName: models.FINISH_PRODUCTS.fields.DISABLED_DATE.name,
                type: models.FINISH_PRODUCTS.fields.DISABLED_DATE.type,
                initValue: { modelStatus: [ModelStatusTypes.DELETE], initValue: () => new Date() },
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.dateType, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.theDateBeforeToday, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { initValue: () => new Date() } }
                ],
            },
        ]
    },
    {
        objectName: modelNames.MEASURES,
        values: [
            {
                propertyName: models.MEASURES.fields.MEASURE.name,
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "string" },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.maxLength, arguments: 20 },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.recordExistInDB, arguments: { entityName: modelNames.MEASURES, field: models.MEASURES.fields.MEASURE.name, exist: false } },
                   ],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ], type: models.MEASURES.fields.MEASURE.type
            },
            {
                propertyName: models.MEASURES.fields.ADDED_DATE.name,
                initValue: { modelStatus: [ModelStatusTypes.CREATE], initValue: () => new Date() },
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.dateType, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.theDateBeforeToday, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => new Date() } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ], type: models.MEASURES.fields.ADDED_DATE.type
            },
            {
                propertyName: models.MEASURES.fields.USERNAME.name,
                type: models.MEASURES.fields.USERNAME.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { status: AppStatusTypes.DEVELOP, initValue: () => 'develop' } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.MEASURES.fields.DISABLED.name,
                type: models.MEASURES.fields.DISABLED.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => false } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { initValue: () => true } }
                ],
            }, {
                propertyName: models.MEASURES.fields.DISABLE_USER.name,
                type: models.MEASURES.fields.DISABLE_USER.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { status: AppStatusTypes.DEVELOP, initValue: () => 'develop' } }
                ],
            },
            {
                propertyName: models.MEASURES.fields.DISABLED_DATE.name,
                type: models.MEASURES.fields.DISABLED_DATE.type,
                initValue: { modelStatus: [ModelStatusTypes.DELETE], initValue: () => new Date() },
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.dateType, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.theDateBeforeToday, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { initValue: () => new Date() } }
                ],
            },
        ]
    },
    // {
    //     objectName: modelNames.PRICELIST,
    //     values: [
    //         {
    //             propertyName: models.PRICELIST.fields.TITLE.name,
    //             type:models.PRICELIST.fields.TITLE.type,
    //           entityName : models.PRICELIST.fields.TITLE.entityName,
    //             require:[
    //                 { status: ModelStatusTypes.CREATE, require: true },
    //                 { status: ModelStatusTypes.UPDATE, require: true },
    //                 { status: ModelStatusTypes.DELETE, require: true }
    //             ]
    //         },
    //         {
    //             propertyName: models.PRICELIST.fields.PRODUCTS.name,
    //             type:models.PRICELIST.fields.PRODUCTS.type,
    //             entityName : models.PRICELIST.fields.PRODUCTS.entityName,
    //             require:[
    //                 { status: ModelStatusTypes.CREATE, require: true },
    //                 { status: ModelStatusTypes.UPDATE, require: true },
    //                 { status: ModelStatusTypes.DELETE, require: true }
    //             ]
    //         }
    //     ]
    // },
    {
        objectName: modelNames.PRICELIST,
        values: [
            {
                propertyName: models.PRICELIST.fields.NAME.name,
                type: models.PRICELIST.fields.NAME.type,
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "string" },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.recordExistInDB, arguments: { entityName: modelNames.PRICELIST, field: models.PRICELIST.fields.NAME.name, exist: false } },
                    ],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.PRICELIST.fields.PUMPS.name,
                type: models.PRICELIST.fields.PUMPS.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => false } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.PRICELIST.fields.CEMENT.name,
                type: models.PRICELIST.fields.CEMENT.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => false } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.PRICELIST.fields.FINISH.name,
                type: models.PRICELIST.fields.FINISH.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => false } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.PRICELIST.fields.ADDED_DATE.name,
                initValue: { modelStatus: [ModelStatusTypes.CREATE], initValue: () => new Date() },
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.dateType, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.theDateBeforeToday, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => new Date() } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ], type: models.PRICELIST.fields.ADDED_DATE.type
            },
            {
                propertyName: models.PRICELIST.fields.USERNAME.name,
                type: models.PRICELIST.fields.USERNAME.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { status: AppStatusTypes.DEVELOP, initValue: () => 'develop' } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.PRICELIST.fields.DISABLED.name,
                type: models.PRICELIST.fields.DISABLED.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => false } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { initValue: () => true } }
                ],
            }, {
                propertyName: models.PRICELIST.fields.DISABLE_USER.name,
                type: models.PRICELIST.fields.DISABLE_USER.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { status: AppStatusTypes.DEVELOP, initValue: () => 'develop' } }
                ],
            },
            {
                propertyName: models.PRICELIST.fields.DISABLED_DATE.name,
                type: models.PRICELIST.fields.DISABLED_DATE.type,
                initValue: { modelStatus: [ModelStatusTypes.DELETE], initValue: () => new Date() },
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.dateType, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.theDateBeforeToday, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { initValue: () => new Date() } }
                ]
            },
            {
                propertyName: models.PRICELIST.fields.PRODUCTS.name,
                type: models.PRICELIST.fields.PRODUCTS.type,
                entityName: models.PRICELIST.fields.PRODUCTS.entityName,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: true },
                    { status: ModelStatusTypes.DELETE, require: true }
                ]
            }
        ]
    },


    {

        objectName: modelNames.PRICELIST_FOR_BUYTON_CUSTOMERS,
        values: [{
            propertyName: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.PRICELIST.name,
            type: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.PRICELIST.type,
            validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.recordExistInDB, arguments: { entityName: modelNames.PRICELIST, field: models.PRICELIST.fields.ID.name, exist: true } }],
            require: [
                { status: ModelStatusTypes.CREATE, require: true },
                { status: ModelStatusTypes.UPDATE, require: false },
                { status: ModelStatusTypes.DELETE, require: false }
            ]
        },
        {
            propertyName: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.SUPPLIER.name,
            type: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.SUPPLIER.type,
            validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.recordExistInDB, arguments: { entityName: modelNames.SUPPLIERS, field: models.SUPPLIERS.fields.ID.name, exist: true } }],
            require: [
                { status: ModelStatusTypes.CREATE, require: false },
                { status: ModelStatusTypes.UPDATE, require: false },
                { status: ModelStatusTypes.DELETE, require: false }
            ]
        }
            , {
            propertyName: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.CLIENT.name,
            type: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.CLIENT.type,
            validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.recordExistInDB, arguments: { entityName: modelNames.CLIENTS, field: models.CLIENTS.fields.ID.name, exist: true } }],
            require: [
                { status: ModelStatusTypes.CREATE, require: false },
                { status: ModelStatusTypes.UPDATE, require: false },
                { status: ModelStatusTypes.DELETE, require: false }
            ]
        },
        {
            propertyName: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.DEBIT.name,
            type: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.DEBIT.type,
            validation: [],
            require: [
                { status: ModelStatusTypes.CREATE, require: true, default: { initValue: (item) => item.client ? false : true } },
                { status: ModelStatusTypes.UPDATE, require: false },
                { status: ModelStatusTypes.DELETE, require: false }
            ]
        },
        {
            propertyName: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.CREDIT.name,
            type: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.CREDIT.type,
            validation: [],
            require: [
                { status: ModelStatusTypes.CREATE, require: true, default: { initValue: (item) => item.client ? true : false } },
                { status: ModelStatusTypes.UPDATE, require: false },
                { status: ModelStatusTypes.DELETE, require: false }
            ]
        },
        {
            propertyName: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.AREA.name,
            type: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.AREA.type,
            validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.recordExistInDB, arguments: { entityName: modelNames.AREAS, field: models.AREAS.fields.AREA_MONGO_ID.name, exist: true } }],
            require: [
                { status: ModelStatusTypes.CREATE, require: true },
                { status: ModelStatusTypes.UPDATE, require: false },
                { status: ModelStatusTypes.DELETE, require: false }
            ]
        }, {
            propertyName: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.START_DATE.name,
            validation: [
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.dateType, arguments: null }],
            require: [
                { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => new Date() } },
                { status: ModelStatusTypes.UPDATE, require: false },
                { status: ModelStatusTypes.DELETE, require: false }
            ], type: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.START_DATE.type
        }, {
            propertyName: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.END_DATE.name,
            validation: [
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.dateType, arguments: null }],
            require: [
                {
                    status: ModelStatusTypes.CREATE, require: true, default: {
                        initValue: () => new Date()
                    }
                },
                { status: ModelStatusTypes.UPDATE, require: false },
                { status: ModelStatusTypes.DELETE, require: false }
            ], type: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.END_DATE.type
        },
        {
            propertyName: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.ADDED_DATE.name,
            initValue: { modelStatus: [ModelStatusTypes.CREATE], initValue: () => new Date() },
            validation: [
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.dateType, arguments: null },
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.theDateBeforeToday, arguments: null }],
            require: [
                { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => new Date() } },
                { status: ModelStatusTypes.UPDATE, require: false },
                { status: ModelStatusTypes.DELETE, require: false }
            ], type: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.ADDED_DATE.type
        },
        {
            propertyName: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.USERNAME.name,
            type: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.USERNAME.type,
            require: [
                { status: ModelStatusTypes.CREATE, require: true, default: { status: AppStatusTypes.DEVELOP, initValue: () => 'develop' } },
                { status: ModelStatusTypes.UPDATE, require: false },
                { status: ModelStatusTypes.DELETE, require: false }
            ]
        },
        {
            propertyName: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.DISABLED.name,
            type: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.DISABLED.type,
            require: [
                { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => false } },
                { status: ModelStatusTypes.UPDATE, require: false },
                { status: ModelStatusTypes.DELETE, require: true, default: { initValue: () => true } }
            ],
        }, {
            propertyName: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.DISABLE_USER.name,
            type: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.DISABLE_USER.type,
            require: [
                { status: ModelStatusTypes.CREATE, require: false },
                { status: ModelStatusTypes.UPDATE, require: false },
                { status: ModelStatusTypes.DELETE, require: true, default: { status: AppStatusTypes.DEVELOP, initValue: () => 'develop' } }
            ],
        },
        {
            propertyName: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.DISABLED_DATE.name,
            type: models.PRICELIST_FOR_BUYTON_CUSTOMERS.fields.DISABLED_DATE.type,
            initValue: { modelStatus: [ModelStatusTypes.DELETE], initValue: () => new Date() },
            validation: [
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.dateType, arguments: null },
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.theDateBeforeToday, arguments: null }],
            require: [
                { status: ModelStatusTypes.CREATE, require: false },
                { status: ModelStatusTypes.UPDATE, require: false },
                { status: ModelStatusTypes.DELETE, require: true, default: { initValue: () => new Date() } }
            ]
        }
        ]
    },

    {
        objectName: modelNames.PRODUCTS_COMBINATIONS,
        values: [
            {
                propertyName: models.PRODUCTS_COMBINATIONS.fields.PARENT.name,
                type: models.PRODUCTS_COMBINATIONS.fields.PARENT.type,
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.recordExistInDB, arguments: { entityName: modelNames.PUMPS, field: models.PUMPS.fields.ID.name, exist: true } }
                ], require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.PRODUCTS_COMBINATIONS.fields.CHILD.name,
                type: models.PRODUCTS_COMBINATIONS.fields.CHILD.type,
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.recordExistInDB, arguments: { entityName: modelNames.PUMPS, field: models.PUMPS.fields.ID.name, exist: true } }
                ], require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },

            {
                propertyName: models.PRODUCTS_COMBINATIONS.fields.ADDED_DATE.name,
                type: models.PRODUCTS_COMBINATIONS.fields.ADDED_DATE.type,
                initValue: { modelStatus: [ModelStatusTypes.CREATE], initValue: () => new Date() },
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.dateType, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.theDateBeforeToday, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => new Date() } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ],
            },
            {
                propertyName: models.PRODUCTS_COMBINATIONS.fields.USERNAME.name,
                type: models.PRODUCTS_COMBINATIONS.fields.USERNAME.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { status: AppStatusTypes.DEVELOP, initValue: () => 'develop' } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.PRODUCTS_COMBINATIONS.fields.DISABLED.name,
                type: models.PRODUCTS_COMBINATIONS.fields.DISABLED.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => false } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { initValue: () => true } }
                ],
            }, {
                propertyName: models.PRODUCTS_COMBINATIONS.fields.DISABLE_USER.name,
                type: models.PRODUCTS_COMBINATIONS.fields.DISABLE_USER.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { status: AppStatusTypes.DEVELOP, initValue: () => 'develop' } }
                ],
            },
            {
                propertyName: models.PRODUCTS_COMBINATIONS.fields.DISABLED_DATE.name,
                type: models.PRODUCTS_COMBINATIONS.fields.DISABLED_DATE.type,
                initValue: { modelStatus: [ModelStatusTypes.DELETE], initValue: () => new Date() },
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.dateType, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.theDateBeforeToday, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { initValue: () => new Date() } }
                ],
            },
        ]
    },
    {
        objectName: modelNames.PRODUCTS_PRICE_LIST,
        values: [
            {
                propertyName: models.PRODUCTS_PRICE_LIST.fields.PRICELIST.name,
                type: models.PRODUCTS_PRICE_LIST.fields.PRICELIST.type,
                validation: [
                    { modelStatus: [ModelStatusTypes.ADD, ModelStatusTypes.UPDATE], func: validation.recordExistInDB, arguments: { entityName: modelNames.PRICELIST, field: models.PRICELIST.fields.ID.name, exist: true } },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "number" }
                ], require: [
                    { status: ModelStatusTypes.ADD, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.PRODUCTS_PRICE_LIST.fields.PRODUCT.name,
                type: models.PRODUCTS_PRICE_LIST.fields.PRODUCT.type,
                validation: [
                ], require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.PRODUCTS_PRICE_LIST.fields.PRODUCT_TYPE.name,
                type: models.PRODUCTS_PRICE_LIST.fields.PRODUCT_TYPE.type,
                validation: [

                ], require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.PRODUCTS_PRICE_LIST.fields.PRICE.name,
                type: models.PRODUCTS_PRICE_LIST.fields.PRICE.type,
                validation: [

                ], require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.PRODUCTS_PRICE_LIST.fields.DISCOUNT.name,
                type: models.PRODUCTS_PRICE_LIST.fields.DISCOUNT.type,
                validation: [

                ], require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => 0 } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.PRODUCTS_PRICE_LIST.fields.ADDED_DATE.name,
                type: models.PRODUCTS_PRICE_LIST.fields.ADDED_DATE.type,
                initValue: { modelStatus: [ModelStatusTypes.CREATE], initValue: () => new Date() },
                validation: [
                    { modelStatus: [ModelStatusTypes.UPDATE], func: validation.dateType, arguments: null },
                    { modelStatus: [ModelStatusTypes.UPDATE], func: validation.theDateBeforeToday, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => new Date() } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.PRODUCTS_PRICE_LIST.fields.USERNAME.name,
                type: models.PRODUCTS_PRICE_LIST.fields.USERNAME.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { status: AppStatusTypes.DEVELOP, initValue: () => 'develop' } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.PRODUCTS_PRICE_LIST.fields.DISABLED.name,
                type: models.PRODUCTS_PRICE_LIST.fields.DISABLED.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => false } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { initValue: () => true } }
                ],
            }, {
                propertyName: models.PRODUCTS_PRICE_LIST.fields.DISABLE_USER.name,
                type: models.PRODUCTS_PRICE_LIST.fields.DISABLE_USER.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { status: AppStatusTypes.DEVELOP, initValue: () => 'develop' } }
                ],
            },
            {
                propertyName: models.PRODUCTS_PRICE_LIST.fields.DISABLED_DATE.name,
                type: models.PRODUCTS_PRICE_LIST.fields.DISABLED_DATE.type,
                initValue: { modelStatus: [ModelStatusTypes.DELETE], initValue: () => new Date() },
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.dateType, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.theDateBeforeToday, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { initValue: () => new Date() } }
                ],
            },
        ]
    },
    {
        objectName: modelNames.PUMPS,
        values: [
            {
                propertyName: models.PUMPS.fields.NAME.name,
                type: models.PUMPS.fields.NAME.type,
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "string" },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.maxLength, arguments: 20 },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.recordExistInDB, arguments: { entityName: modelNames.PUMPS, field: models.PUMPS.fields.NAME.name, exist: false } },
                ], require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.PUMPS.fields.UNIT_OF_MEASURE.name,
                type: models.PUMPS.fields.UNIT_OF_MEASURE.type,
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.recordExistInDB, arguments: { entityName: modelNames.MEASURES, field: models.MEASURES.fields.ID.name, exist: true } }
                ], require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.PUMPS.fields.BOOKKEEPING_CODE.name,
                type: models.PUMPS.fields.BOOKKEEPING_CODE.type, validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.maxLength, arguments: 20 },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.onlyDigitsInString, arguments: null },
                    {
                        modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.recordExistInMultipleDB, arguments:
                        { entityName: modelNames.PUMPS, field: models.PUMPS.fields.BOOKKEEPING_CODE.name, exist: false }
                          
                    }
                   
                ],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.PUMPS.fields.ADDITION.name,
                type: models.PUMPS.fields.ADDITION.type, validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.bit, arguments: null }
                ], require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.PUMPS.fields.ADDED_DATE.name,

                type: models.PUMPS.fields.ADDED_DATE.type,
                initValue: { modelStatus: [ModelStatusTypes.CREATE], initValue: () => new Date() },
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.dateType, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.theDateBeforeToday, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => new Date() } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ],
            },
            {
                propertyName: models.PUMPS.fields.USERNAME.name,
                type: models.PUMPS.fields.USERNAME.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { status: AppStatusTypes.DEVELOP, initValue: () => 'develop' } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.PUMPS.fields.DISABLED.name,
                type: models.PUMPS.fields.DISABLED.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => false } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { initValue: () => true } }
                ],
            }, {
                propertyName: models.PUMPS.fields.DISABLE_USER.name,
                type: models.PUMPS.fields.DISABLE_USER.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { status: AppStatusTypes.DEVELOP, initValue: () => 'develop' } }
                ],
            },
            {
                propertyName: models.PUMPS.fields.DISABLED_DATE.name,
                type: models.PUMPS.fields.DISABLED_DATE.type,
                initValue: { modelStatus: [ModelStatusTypes.DELETE], initValue: () => new Date() },
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.dateType, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.theDateBeforeToday, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { initValue: () => new Date() } }
                ],
            },
        ]
    },
    {
        objectName: modelNames.SUPPLIERS,
        values: [
            {
                propertyName: models.SUPPLIERS.fields.BOOKKEEPING_CODE.name,
                type: models.SUPPLIERS.fields.BOOKKEEPING_CODE.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.onlyDigitsInString, arguments: null },
                {
                    modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.recordExistInMultipleDB, arguments:
                    { entityName: modelNames.SUPPLIERS, field: models.SUPPLIERS.fields.BOOKKEEPING_CODE.name, exist: false }

                }
                   ],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.SUPPLIERS.fields.CITY.name,
                type: models.SUPPLIERS.fields.CITY.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "string" }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.SUPPLIERS.fields.CONDITION_GUSHY_PAYMANT.name,
                type: models.SUPPLIERS.fields.CONDITION_GUSHY_PAYMANT.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "string" },],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.SUPPLIERS.fields.HOME_NUMBER.name,
                type: models.SUPPLIERS.fields.HOME_NUMBER.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "string" }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },

            {
                propertyName: models.SUPPLIERS.fields.LICENSED_DEALER_NUMBER.name,
                type: models.SUPPLIERS.fields.LICENSED_DEALER_NUMBER.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.onlyDigitsInString, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.SUPPLIERS.fields.OBJECTIVE_BANK.name,
                type: models.SUPPLIERS.fields.OBJECTIVE_BANK.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.notCheck, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.SUPPLIERS.fields.OVLIGO.name,
                type: models.SUPPLIERS.fields.OVLIGO.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "number" }], require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.SUPPLIERS.fields.PHONE1.name,
                type: models.SUPPLIERS.fields.PHONE1.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.correctPhone, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.SUPPLIERS.fields.PHONE2.name,
                type: models.SUPPLIERS.fields.PHONE2.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.correctPhone, arguments: null }], require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.SUPPLIERS.fields.PREFERRED_PAYMWNT_DATE.name,
                type: models.SUPPLIERS.fields.PREFERRED_PAYMWNT_DATE.type,
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.onlyDigitsInString, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.betweenNumbers, arguments: { "min": 1, "max": 30 } }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.SUPPLIERS.fields.STATUS.name,
                type: models.SUPPLIERS.fields.STATUS.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "number" }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.SUPPLIERS.fields.STREET.name,
                type: models.SUPPLIERS.fields.STREET.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "string" }], require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.SUPPLIERS.fields.SUPPLIER_CODE.name,
                type: models.SUPPLIERS.fields.SUPPLIER_CODE.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.onlyDigitsInString, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.SUPPLIERS.fields.SUPPLIER_NAME.name,
                type: models.SUPPLIERS.fields.SUPPLIER_NAME.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.type, arguments: "string" },
                { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.recordExistInDB, arguments: { entityName: modelNames.SUPPLIERS, field: models.SUPPLIERS.fields.SUPPLIER_NAME.name, exist: false } },
                ],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.SUPPLIERS.fields.ZIPCODE.name,
                type: models.SUPPLIERS.fields.ZIPCODE.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.onlyDigitsInString, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.SUPPLIERS.fields.FAX.name,
                type: models.SUPPLIERS.fields.FAX.type,
                validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.onlyDigitsInString, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.SUPPLIERS.fields.MAIL.name,
                type: models.SUPPLIERS.fields.MAIL.type, validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.correctEmail, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.SUPPLIERS.fields.NOTES.name,
                type: models.SUPPLIERS.fields.NOTES.type, validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.notCheck, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.SUPPLIERS.fields.MOBILE.name,
                type: models.SUPPLIERS.fields.MOBILE.type, validation: [{ modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.correctPhone, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.SUPPLIERS.fields.ADDED_DATE.name,
                type: models.SUPPLIERS.fields.ADDED_DATE.type,
                initValue: { modelStatus: [ModelStatusTypes.CREATE], initValue: () => new Date() },
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.dateType, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.theDateBeforeToday, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => new Date() } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ],
            },
            {
                propertyName: models.SUPPLIERS.fields.USERNAME.name,
                type: models.SUPPLIERS.fields.USERNAME.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { status: AppStatusTypes.DEVELOP, initValue: () => 'develop' } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: false }
                ]
            },
            {
                propertyName: models.SUPPLIERS.fields.DISABLED.name,
                type: models.SUPPLIERS.fields.DISABLED.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: true, default: { initValue: () => false } },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { initValue: () => true } }
                ],
            }, {
                propertyName: models.SUPPLIERS.fields.DISABLE_USER.name,
                type: models.SUPPLIERS.fields.DISABLE_USER.type,
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { status: AppStatusTypes.DEVELOP, initValue: () => 'develop' } }
                ],
            },
            {
                propertyName: models.SUPPLIERS.fields.DISABLED_DATE.name,
                type: models.SUPPLIERS.fields.DISABLED_DATE.type,
                initValue: { modelStatus: [ModelStatusTypes.DELETE], initValue: () => new Date() },
                validation: [
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.dateType, arguments: null },
                    { modelStatus: [ModelStatusTypes.CREATE, ModelStatusTypes.UPDATE], func: validation.theDateBeforeToday, arguments: null }],
                require: [
                    { status: ModelStatusTypes.CREATE, require: false },
                    { status: ModelStatusTypes.UPDATE, require: false },
                    { status: ModelStatusTypes.DELETE, require: true, default: { initValue: () => new Date() } }
                ],
            },

        ]
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
            {
                propertyName: "DeletingDate", validation: [{ func: validation.type, arguments: "date" }], require: {
                    create: false, update: false
                }, type: ValueTypes.DATE
            }
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
]



function getValidationsModule({ object, modelstatus }) {
    console.log({ modelstatus, object })
    const model = moduleValidations.find(({ objectName }) => objectName === object)
    const validation = model.values.map(({ propertyName, type, entityName, validation, require, initValue }) =>
    ({
        propertyName, type,
        initValue: initValue ? initValue.modelStatus.find(item => item === modelstatus) ? initValue.initValue : undefined : undefined,
        validation: validation ? validation.filter(({ modelStatus }) => modelStatus.includes(modelstatus)).map(({ modelStatus, ...rest }) => rest) : undefined,
        entityName: entityName ?? undefined,
        require: require.find(({ status }) => status === modelstatus)
    }))
    return validation
}


module.exports = { getValidationsModule, conditionOperators };
