const types = {
    INTEGER: { name: 'integer', referenceType: false },
    STRING: { name: 'string', referenceType: false },
    DATE: { name: 'date', referenceType: false },
    BOOLEAN: { name: 'bool', referenceType: false },
    FLOAT: { name: 'float', referenceType: false },
    ENTITY: { name: 'entity', referenceType: true },
    ARRAY: { name: 'array', referenceType: true },
}

const modelNames = {
    ADDITION: 'additions',
    AREAS: 'areas',
    BASIC_PRODUCTS: 'basicProducts',
    BRANCHES: 'branches',
    CEMENT_DEGREE: 'cementDegree',
    CEMENT_GRAIN: 'cementGrain',
    CEMENT_SOMECH: 'cementSomech',
    CEMENT_STRENGTH: 'cementStrength',
    CLIENTS: 'clients',
    DISTANCEADDITIONS: 'distanceAdditions',
    FINISH_PRODUCTS: 'finishProducts',
    MEASURES: 'unitOfMeasure',
    PRICELIST: 'priceList',
    PRICELIST_FOR_BUYTON_CUSTOMERS: 'priceListForBuytonCustomers',
    PRODUCTS_COMBINATIONS: 'productsCombinations',
    PRODUCTS_PRICE_LIST: 'productsPricelist',
    PUMPS: 'pumps',
    STATUS: 'status',
    SUPPLIERS: 'suppliers',
}
//clients
const models = {
    ADDITIONS: {
        entity: modelNames.ADDITION,
        fields:
        {
            ID: { name: 'id', type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            NAME: { name: 'name', type: types.STRING, insert: true, update: true, key: false, unique: true },
            UNITOFMEASURE: { name: 'unitOfMeasure', entity: modelNames.MEASURES, type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            BOOKKEEPING_CODE: { name: 'bookkeepingCode', type: types.STRING, insert: true, update: true, key: false, unique: true },
            ADDED_DATE: { name: 'addedDate', type: types.DATE, insert: false, update: false, key: false, unique: false },
            USERNAME: { name: 'userName', type: types.STRING, insert: false, update: false, key: false, unique: false },
            DISABLED: { name: 'disabled', type: types.BOOLEAN, insert: false, update: false, key: false, unique: false },
            DISABLED_DATE: { name: 'disabledDate', type: types.DATE, insert: false, update: false, key: false, unique: false },
            DISABLE_USER: { name: 'disableUser', type: types.STRING, insert: false, update: false, key: false, unique: false }
        }
        ,
        insertUrl: '/additions/create',
        updateUrl: '/additions/update',
        deleteUrl: ''
    },
    AREAS: {
        entity: modelNames.AREAS,
        fields:
        {
            ID: { name: 'id', type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            AREA_MONGO_ID: { name: 'areaIdFromMongo', type: types.STRING, insert: true, update: true, key: false, unique: true },
            AREA_NAME: { name: 'areaName', type: types.STRING, insert: true, update: true, key: false, unique: true },
            TYPE: { name: 'type', type: types.STRING, insert: true, update: true, key: false, unique: false },
            BASIC_NAME: { name: 'basicName', type: types.STRING, insert: true, update: true, key: false, unique: false },

            ADDED_DATE: { name: 'addedDate', type: types.DATE, insert: false, update: false, key: false, unique: false },

            USERNAME: { name: 'userName', type: types.STRING, insert: false, update: false, key: false, unique: false },
            DISABLED: { name: 'disabled', type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            DISABLED_DATE: { name: 'disabledDate', type: types.DATE, insert: true, update: true, key: false, unique: false },
            DISABLE_USER: { name: 'disableUser', type: types.STRING, insert: false, update: false, key: false, unique: false }
        },

        insertUrl: '/areas/insertArea',
        updateUrl: '../routers/areas/areas',
        deleteUrl: ''
    },
    BASIC_PRODUCTS: {
        //למה אין את הטבלה
        entity: modelNames.BASIC_PRODUCTS,
        fields:
        {
            KOD_PARIT: { name: 'itemCode', type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            TEUR_PARIT: { name: 'itemDescribe', type: types.STRING, insert: true, update: true, key: false, unique: true },
            SUG_BETON: { name: 'itemType', type: types.STRING, insert: true, update: true, key: false, unique: false },
            CHOZEK: { name: 'itemStrength', type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            DARGATCHASHIFA: { name: 'itemDegreeExposure', type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            SOMECH_BETON: { name: 'itemSomech', type: types.INTEGER, insert: true, update: true, key: false, unique: false }
        }
        ,
        insertUrl: '../../modules/products/basicProducts',
        updateUrl: '../../modules/products/basicProducts',
        deleteUrl: ''
    },
    BRANCHES: {
        entity: modelNames.BRANCHES,
        fields:
        {
            ID: { name: 'id', type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            SUPPLIER_CODE: { entity: modelNames.SUPPLIERS, name: 'supplierCode', type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            BRANCH_NAME: { name: 'branchName', type: types.STRING, insert: true, update: true, key: false, unique: true },
            STATUS: { name: 'status', entity: modelNames.STATUS, type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            STREET: { name: 'street', type: types.STRING, insert: true, update: true, key: false, unique: false },
            HOME_NUMBER: { name: 'homeNumber', type: types.STRING, insert: true, update: true, key: false, unique: false },
            CITY: { name: 'city', type: types.STRING, insert: true, update: true, key: false, unique: false },
            ZIPCODE: { name: 'zipCode', type: types.STRING, insert: true, update: true, key: false, unique: false },
            PHONE1: { name: 'phone1', type: types.STRING, insert: true, update: true, key: false, unique: false },
            PHONE2: { name: 'phone2', type: types.STRING, insert: true, update: true, key: false, unique: false },
            MOBILE: { name: 'mobile', type: types.STRING, insert: true, update: true, key: false, unique: false },
            FAX: { name: 'fax', type: types.STRING, insert: true, update: true, key: false, unique: false },
            MAIL: { name: 'mail', type: types.STRING, insert: true, update: true, key: false, unique: false },
            NOTES: { name: 'notes', type: types.STRING, insert: true, update: true, key: false, unique: false },
            ADDED_DATE: { name: 'addedDate', type: types.DATE, insert: false, update: false, key: false, unique: false },
            USERNAME: { name: 'userName', type: types.STRING, insert: false, update: false, key: false, unique: false },
            DISABLED: { name: 'disabled', type: types.BOOLEAN, insert: false, update: true, key: false, unique: false },
            DISABLED_DATE: { name: 'disabledDate', type: types.DATE, insert: false, update: true, key: false, unique: false },
            DISABLE_USER: { name: 'disableUser', type: types.STRING, insert: false, update: false, key: false, unique: false }
        }
        ,
        insertUrl: '/branches/insertbranch',
        updateUrl: '/branches/updatebranch',
        deleteUrl: '/branches/deletebranch'
    },
    CLIENTS: {
        entity: modelNames.CLIENTS,
        fields:
        {

            ID: { name: 'id', type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            CLIENT_CODE: { name: 'clientCode', type: types.STRING, insert: true, update: true, key: false, unique: true },
            CLIENT_NAME: { name: 'clientName', type: types.STRING, insert: true, update: true, key: false, unique: true },
            PRIVATE_COMPANY_NUMBER: { name: 'privateCompanyNumber', type: types.STRING, insert: true, update: true, key: false, unique: true },
            BOOKKEEPING_CODE: { name: 'bookkeepingCode', type: types.STRING, insert: true, update: true, key: false, unique: true },
            DESTINATION_BANK: { name: 'destinationBank', type: types.STRING, insert: true, update: true, key: false, unique: false },
            PAYMENT_TERMS_FLUENT: { name: 'paymentTermsFluent', type: types.STRING, insert: true, update: true, key: false, unique: false },
            PREFERRED_PAYMWNT_DATE: { name: 'preferredPaymentDate', type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            OVLIGO: { name: 'ovligo', type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            RECEIPT_ISSUE_TERM: { name: 'receiptIssueTerm', type: types.STRING, insert: true, update: true, key: false, unique: false },
            RECEIPT_CENTRALISM: { name: 'receiptCentralism', type: types.STRING, insert: true, update: true, key: false, unique: false },
            ACCOUNT_CLASSIFIED_CODE: { name: 'accountantClassifiedCode', type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            STATUS: { name: 'status', type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            DESCRIPTION: { name: 'description', type: types.STRING, insert: true, update: true, key: false, unique: false },
            STREET: { name: 'street', type: types.STRING, insert: true, update: true, key: false, unique: false },
            HOUSE: { name: 'house', type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            CITY: { name: 'city', type: types.STRING, insert: true, update: true, key: false, unique: false },
            ZIP_CODE: { name: 'zipCode', type: types.STRING, insert: true, update: true, key: false, unique: false },
            PHONE1: { name: 'phone1', type: types.STRING, insert: true, update: true, key: false, unique: false },
            PHONE2: { name: 'phone2', type: types.STRING, insert: true, update: true, key: false, unique: false },
            MOBILE: { name: 'mobile', type: types.STRING, insert: true, update: true, key: false, unique: false },
            FAX: { name: 'fax', type: types.STRING, insert: true, update: true, key: false, unique: false },
            MAIL: { name: 'email', type: types.STRING, insert: true, update: true, key: false, unique: false },
            COMMENT: { name: 'comment', type: types.STRING, insert: true, update: true, key: false, unique: false },
            ADDED_DATE: { name: 'addedDate', type: types.DATE, insert: false, update: false, key: false, unique: false },
            USERNAME: { name: 'userName', type: types.STRING, insert: false, update: false, key: false, unique: false },
            DISABLED: { name: 'disabled', type: types.BOOLEAN, insert: false, update: true, key: false, unique: false },
            DISABLED_DATE: { name: 'disabledDate', type: types.DATE, insert: false, update: true, key: false, unique: false },
            DISABLE_USER: { name: 'disableUser', type: types.STRING, insert: false, update: false, key: false, unique: false }

        },
        insertUrl: '/createClient/add',
        updateUrl: '/createClient/update',
        deleteUrl: ''

    },

    CEMENT_DEGREE: {
        entity: modelNames.CEMENT_DEGREE,
        fields: {
            CODE: { name: 'degreeCode' },
            DESCRIPTION: { name: 'degreeDescribe' },
            NUMBER: { name: 'degreeNumber' },
        }
    },
    CEMENT_GRAIN: {
        entity: modelNames.CEMENT_GRAIN,
        fields: {
            CODE: { name: 'grainCode' },
            DESCRIPTION: { name: 'grainDescribe' },
            NUMBER: { name: 'grainNumber' },
        }
    },
    CEMENT_SOMECH: {
        entity: modelNames.CEMENT_SOMECH,
        fields: {
            CODE: { name: 'somechCode' },
            DESCRIPTION: { name: 'somechDescribe' },
            NUMBER: { name: 'somechNumber' },
        }
    },
    CEMENT_STRENGTH: {
        entity: modelNames.CEMENT_STRENGTH,
        fields: {
            CODE: { name: 'strengthCode' },
            DESCRIPTION: { name: 'strengthDescribe' },
            NUMBER: { name: 'strengthNumber' },
        }
    },
    DISTANCE_ADDITIONS: {
        entity: modelNames.DISTANCEADDITIONS,
        fields: {
            ID: { name: 'id', type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            PRODUCT: { name: 'productId', entity: modelNames.PRODUCTS_PRICE_LIST, type: types.INTEGER, insert: false, update: false, key: false, unique: false },
            MIN_DISTANCE: { name: 'minDistance', type: types.FLOAT, insert: true, update: true, key: false, unique: false },
            PRICE: { name: 'price', type: types.FLOAT, insert: true, update: true, key: false, unique: false },
            ADDED_DATE: { name: 'addedDate', type: types.DATE, insert: false, update: false, key: false, unique: false },
            USERNAME: { name: 'userName', type: types.STRING, insert: false, update: false, key: false, unique: false },
            DISABLED: { name: 'disabled', type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            DISABLED_DATE: { name: 'disabledDate', type: types.DATE, insert: true, update: true, key: false, unique: false },
            DISABLE_USER: { name: 'disableUser', type: types.STRING, insert: false, update: false, key: false, unique: false }
        }
    },

    FINISH_PRODUCTS: {
        entity: modelNames.FINISH_PRODUCTS,
        fields:
        {
            ID: { name: 'id', type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            NAME: { name: 'name', type: types.STRING, insert: true, update: true, key: false, unique: true },
            UNIT_OF_MEASURE: { entity: modelNames.MEASURES, name: 'unitOfMeasure', type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            BOOKKEEPING_CODE: { name: 'bookkeepingCode', type: types.STRING, insert: true, update: true, key: false, unique: false },
            ADDED_DATE: { name: 'addedDate', type: types.DATE, insert: false, update: false, key: false, unique: false },
            USERNAME: { name: 'userName', type: types.STRING, insert: false, update: false, key: false, unique: false },
            DISABLED: { name: 'disabled', type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            DISABLED_DATE: { name: 'disabledDate', type: types.DATE, insert: true, update: true, key: false, unique: false },
            DISABLE_USER: { name: 'disableUser', type: types.STRING, insert: false, update: false, key: false, unique: false }

        }
        ,
        insertUrl: '/finishProducts/create',
        updateUrl: '/finishProducts/update',
        deleteUrl: ''
    },
    MEASURES: {

        entity: modelNames.MEASURES,
        fields:
        {
            ID: { name: 'id', type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            MEASURE: { name: 'measure', type: types.STRING, insert: true, update: true, key: false, unique: true },
            USERNAME: { name: 'userName', type: types.STRING, insert: false, update: false, key: false, unique: false },
            ADDED_DATE: { name: 'addedDate', type: types.DATE, insert: false, update: false, key: false, unique: false },
            DISABLED: { name: 'disabled', type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            DISABLED_DATE: { name: 'disabledDate', type: types.DATE, insert: true, update: true, key: false, unique: false },
            DISABLE_USER: { name: 'disableUser', type: types.STRING, insert: false, update: false, key: false, unique: false }
        }
        ,
        insertUrl: '/unitOfMeasure/create',
        readUrl: '/unitOfMeasure/findMeasureName',
        updateUrl: '/unitOfMeasure/update',
        deleteUrl: '/unitOfMeasure/delete'
    },
    // PRICELIST:{
    //     entity:modelNames.PRICELIST, 
    //     fields:{
    //         TITLE:{name:'title', type:types.ENTITY, entityName:modelNames.PRICELIST},
    //         PRODUCTS:{name:'products', type:types.ARRAY, entityName:modelNames.PRODUCTS_PRICE_LIST}
    //     }
    // },
    PRICELIST: {
        entity: modelNames.PRICELIST,
        fields:
        {
            ID: { name: 'id', type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            NAME: { name: 'name', type: types.STRING, insert: true, update: true, key: false, unique: true },
            PUMPS: { name: 'pumps', type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            CEMENT: { name: 'cement', type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            FINISH: { name: 'finish', type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            ADDED_DATE: { name: 'addedDate', type: types.DATE, insert: false, update: false, key: false, unique: false },
            USERNAME: { name: 'userName', type: types.STRING, insert: false, update: false, key: false, unique: false },
            DISABLED: { name: 'disabled', type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            DISABLED_DATE: { name: 'disabledDate', type: types.DATE, insert: true, update: true, key: false, unique: false },
            DISABLE_USER: { name: 'disableUser', type: types.STRING, insert: false, update: false, key: false, unique: false },
            PRODUCTS: { name: modelNames.PRODUCTS_PRICE_LIST, type: types.ARRAY, entityName: modelNames.PRODUCTS_PRICE_LIST }

        }
        ,
        insertUrl: '/insertPricelist/addPriceList',
        updateUrl: '/updatePricelist/update',
        deleteUrl: ''
    },
    PRICELIST_FOR_BUYTON_CUSTOMERS: {
        entity: modelNames.PRICELIST_FOR_BUYTON_CUSTOMERS,
        fields: {
            ID: { name: 'id', type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            PRICELIST: { entity: modelNames.PRICELIST, name: 'priceList', type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            SUPPLIER: { entity: modelNames.SUPPLIERS, name: 'supplier', type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            CLIENT: { entity: modelNames.CLIENTS, name: 'client', type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            DEBIT: { name: 'debit', type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            CREDIT: { name: 'credit', type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            AREA: { name: 'area', entity: modelNames.AREAS, type: types.STRING, insert: true, update: true, key: false, unique: false },
            START_DATE: { name: 'startDate', type: types.DATE, insert: true, update: true, key: false, unique: false },
            END_DATE: { name: 'endDate', type: types.DATE, insert: true, update: true, key: false, unique: false },
            ADDED_DATE: { name: 'addedDate', type: types.DATE, insert: false, update: false, key: false, unique: false },
            USERNAME: { name: 'userName', type: types.STRING, insert: false, update: false, key: false, unique: false },
            DISABLED: { name: 'disabled', type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            DISABLED_DATE: { name: 'disabledDate', type: types.DATE, insert: true, update: true, key: false, unique: false },
            DISABLE_USER: { name: 'disableUser', type: types.STRING, insert: false, update: false, key: false, unique: false },

        }

    },
    PRODUCTS_COMBINATIONS: {
        entity: modelNames.PRODUCTS_COMBINATIONS,
        fields:
        {
            ID: { name: 'id', type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            PARENT: { entity: modelNames.PUMPS, name: 'parent', type: types.INTEGER, insert: true, update: true, key: false, unique: true },
            CHILD: { entity: modelNames.PUMPS, name: 'child', type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            ADDED_DATE: { name: 'addedDate', type: types.DATE, insert: false, update: false, key: false, unique: false },
            USERNAME: { name: 'userName', type: types.STRING, insert: false, update: false, key: false, unique: false },
            DISABLED: { name: 'disabled', type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            DISABLED_DATE: { name: 'disabledDate', type: types.DATE, insert: true, update: true, key: false, unique: false },
            DISABLE_USER: { name: 'disableUser', type: types.STRING, insert: false, update: false, key: false, unique: false }

        }
        ,
        insertUrl: '',
        updateUrl: '',
        deleteUrl: ''
    },
    PRODUCTS_PRICE_LIST: {
        entity: modelNames.PRODUCTS_PRICE_LIST, fields: {
            ID: { name: 'id', type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            PRICELIST: { name: 'priceList', entity: modelNames.PRICELIST, type: types.INTEGER, insert: true, update: false, key: false, unique: false },
            PRODUCT: {
                name: 'product',
                entity: [modelNames.ADDITION,
                modelNames.BASIC_PRODUCTS,
                modelNames.FINISH_PRODUCTS,
                modelNames.PUMPS], type: types.STRING, insert: true, update: true, key: false, unique: false
            },
            PRODUCT_TYPE: {
                name: 'entity', type: types.STRING, insert: true, update: false, key: false, unique: false
            }, PRICE: {
                name: 'price', type: types.FLOAT, insert: true, update: true, key: false, unique: false
            },
            DISCOUNT: {
                name: 'discount', type: types.FLOAT, insert: true, update: true, key: false, unique: false
            },
            ADDED_DATE: { name: 'addedDate', type: types.DATE, insert: false, update: false, key: false, unique: false },
            USERNAME: { name: 'userName', type: types.STRING, insert: false, update: false, key: false, unique: false },
            DISABLED: { name: 'disabled', type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            DISABLED_DATE: { name: 'disabledDate', type: types.DATE, insert: true, update: true, key: false, unique: false },
            DISABLE_USER: { name: 'disableUser', type: types.STRING, insert: false, update: false, key: false, unique: false }

        }
    },
    PUMPS: {
        entity: modelNames.PUMPS,
        fields:
        {
            ID: { name: 'id', type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            NAME: { name: 'name', type: types.STRING, insert: true, update: true, key: false, unique: true },
            UNIT_OF_MEASURE: { name: 'unitOfMeasure', type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            ADDITION: { name: 'addition', type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            BOOKKEEPING_CODE: { name: 'bookkeepingCode', type: types.STRING, insert: true, update: true, key: false, unique: false },
            ADDED_DATE: { name: 'addedDate', type: types.DATE, insert: false, update: false, key: false, unique: false },
            USERNAME: { name: 'userName', type: types.STRING, insert: false, update: false, key: false, unique: false },
            DISABLED: { name: 'disabled', type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            DISABLED_DATE: { name: 'disabledDate', type: types.DATE, insert: true, update: true, key: false, unique: false },
            DISABLE_USER: { name: 'disableUser', type: types.STRING, insert: false, update: false, key: false, unique: false }
        }
        ,
        insertUrl: '/pumps/create',
        updateUrl: '/pumps/update',
        deleteUrl: ''
    },

    STATUS: {

        entity: 'Status',
        fields:
        {
            ID: { name: 'id', type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            STATUS_NAME: { name: 'statusName', type: types.STRING, insert: true, update: false, key: false, unique: true }
        }
        ,
        insertUrl: '../routers/clients/status',
        updateUrl: '../routers/clients/status'

    },

    //priceList

    // PRICELIST: {
    //     entity: modelNames.PRICELIST,
    //     fields:
    //     {

    //         //to check if it PriceListId or Id
    //         PriceListId: { type: types.INTEGER, insert: true, update: true, key: false, unique: false },
    //         ProductId: { type: types.INTEGER, insert: true, update: true, key: false, unique: true },
    //         Price: { type: types.FLOAT, insert: true, update: true, key: false, unique: false },
    //         Discount: { type: types.FLOAT, insert: true, update: true, key: false, unique: false },
    //         ADDED_DATE: { name: 'addedDate', type: types.DATE, insert: false, update: false, key: false, unique: false },
    //         USERNAME: { name: 'userName', type: types.STRING, insert: false, update: false, key: false, unique: false },
    //         DISABLED: { name: 'disabled', type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
    //         DISABLED_DATE: { name: 'disabledDate', type: types.DATE, insert: true, update: true, key: false, unique: false },
    //         DISABLE_USER: { name: 'disableUser', type: types.STRING, insert: false, update: false, key: false, unique: false }
    //     }
    //     ,
    //     insertUrl: '',
    //     updateUrl: ''
    // },
    //     insertUrl: '/insertPricelist/addPricesListBySupplierOrClient',
    //     updateUrl: '/insertPricelist/',
    //     deleteUrl: ''
    // },
    QUATATION: {
        entity: 'Quotation',
        fields:
        {
            //to check
            Id: { type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            ClientCode: { type: types.INTEGER, insert: true, update: true, key: false, unique: true },
            Date: { type: types.DATE, insert: true, update: true, key: false, unique: false },
            PriceBeforeDiscount: { type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            DiscountPercent: { type: types.FLOAT, insert: true, update: true, key: false, unique: false },
            Discount: { type: types.FLOAT, insert: true, update: true, key: false, unique: false },
            PriceAfter: { type: types.FLOAT, insert: true, update: true, key: false, unique: false },
            VATPercent: { type: types.FLOAT, insert: true, update: true, key: false, unique: false },
            VAT: { type: types.FLOAT, insert: true, update: true, key: false, unique: false },
            Total: { type: types.FLOAT, insert: true, update: true, key: false, unique: false },
            UserName: { type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            Comments: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            Contact: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            PayoffDate: { type: types.DATE, insert: true, update: true, key: false, unique: false },
            ClosingComments: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            ADDED_DATE: { name: 'addedDate', type: types.DATE, insert: false, update: false, key: false, unique: false },
            USERNAME: { name: 'userName', type: types.STRING, insert: false, update: false, key: false, unique: false },
            DISABLED: { name: 'disabled', type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            DISABLED_DATE: { name: 'disabledDate', type: types.DATE, insert: true, update: true, key: false, unique: false },
            DISABLE_USER: { name: 'disableUser', type: types.STRING, insert: false, update: false, key: false, unique: false }
        }
        ,
        insertUrl: '',
        updateUrl: '',
        deleteUrl: ''
    },
    SUPPLIERS: {
        entity: modelNames.SUPPLIERS,
        fields:
        {
            ID: { name: 'id', type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            SUPPLIER_CODE: { name: 'supplierCode', type: types.STRING, insert: true, update: true, key: false, unique: true },
            SUPPLIER_NAME: { name: 'supplierName', type: types.STRING, insert: true, update: true, key: false, unique: true },
            LICENSED_DEALER_NUMBER: { name: "licensedDealerNumber", type: types.STRING, insert: true, update: true, key: false, unique: false },
            BOOKKEEPING_CODE: { name: 'bookkeepingCode', type: types.STRING, insert: true, update: true, key: false, unique: false },
            OBJECTIVE_BANK: { name: 'objectiveBank', type: types.STRING, insert: true, update: true, key: false, unique: false },
            CONDITION_GUSHY_PAYMANT: { name: 'conditionGushyPayment', type: types.STRING, insert: true, update: true, key: false, unique: false },
            PREFERRED_PAYMWNT_DATE: { name: 'preferredPaymentDate', type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            OVLIGO: { name: 'ovligo', type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            STATUS: { name: 'status', type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            STREET: { name: 'street', type: types.STRING, insert: true, update: true, key: false, unique: false },
            HOME_NUMBER: { name: 'homeNumber', type: types.STRING, insert: true, update: true, key: false, unique: false },
            CITY: { name: 'city', type: types.STRING, insert: true, update: true, key: false, unique: false },
            ZIPCODE: { name: 'zipCode', type: types.STRING, insert: true, update: true, key: false, unique: false },
            PHONE1: { name: 'phone1', type: types.STRING, insert: true, update: true, key: false, unique: false },
            PHONE2: { name: 'phone2', type: types.STRING, insert: true, update: true, key: false, unique: false },
            MOBILE: { name: 'mobile', type: types.STRING, insert: true, update: true, key: false, unique: false },
            FAX: { name: 'fax', type: types.STRING, insert: true, update: true, key: false, unique: false },
            MAIL: { name: 'email', type: types.STRING, insert: true, update: true, key: false, unique: false },
            NOTES: { name: 'notes', type: types.STRING, insert: true, update: true, key: false, unique: false },
            ADDED_DATE: { name: 'addedDate', type: types.DATE, insert: false, update: false, key: false, unique: false },
            USERNAME: { name: 'userName', type: types.STRING, insert: false, update: false, key: false, unique: false },
            DISABLED: { name: 'disabled', type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            DISABLED_DATE: { name: 'disabledDate', type: types.DATE, insert: true, update: true, key: false, unique: false },
            DISABLE_USER: { name: 'disableUser', type: types.STRING, insert: false, update: false, key: false, unique: false }
        }
        ,
        insertUrl: '/suppliers/insertsupplier',
        updateUrl: '/suppliers/updatesupplier',
        deleteUrl: ''
    },






    // leads: {
    //     entity: 'Leads',
    //     fields:
    //     {
    //         Id: { type: types.INTEGER, insert: false, update: false, key: true, unique: true },
    //         SupplyDate: { type: types.DATE, insert: true, update: true, key: false, unique: true },
    //         SupplyHour: { type: types.DATE, insert: true, update: true, key: false, unique: true },
    //         OrderedCode: { type: types.INTEGER, insert: true, update: true, key: false, unique: true },
    //         Address: { type: types.STRING, insert: true, update: true, key: false, unique: false },
    //         ClientCode: { type: types.INTEGER, insert: true, update: true, key: false, unique: false },
    //         MapReferenceLongitude: { type: types.FLOAT, insert: true, update: true, key: false, unique: false },
    //         MapReferenceLongitude: { type: types.FLOAT, insert: true, update: true, key: false, unique: false },
    //         MapReferenceLongitude: { type: types.FLOAT, insert: true, update: true, key: false, unique: false },
    //         MapReferenceLongitude: { type: types.FLOAT, insert: true, update: true, key: false, unique: false },
    //         MapReferenceLongitude: { type: types.FLOAT, insert: true, update: true, key: false, unique: false },
    //         MapReferenceLongitude: { type: types.FLOAT, insert: true, update: true, key: false, unique: false }

    //     }
    //     ,
    //     insertUrl: '/insertPricelist/addPriceList',
    //     updateUrl: ''

    // }

}



// async function getModel() {

//     ans=models
//     return ans
// }

function getModelKey(modelName) {
    const model = getModel(modelName);
    const fields = Object.values(model.fields)
    const key = fields.find(({ key }) => key === true)
    return key.name
}
function getModel(name) {
    const allmodels = Object.values(models)
    const model = allmodels.find(({ entity }) => entity === name)
    return model
}

function getObjectModel(object, model) {
    const objectKeys = Object.keys(object)
    const fields = Object.values(model.fields).map(({ name }) => name)
    return objectKeys.every(f => fields.includes(f))

}

//TODO: decide what to do when the origin object gets an array 
//[ ] : start finding the innermodule 
function compareObjects({ data, origin, modelname }) {
    console.log({ data })
    console.log({ origin })
    const dataKeys = Object.keys(data)
    const originKeys = Object.keys(origin);
    const filteredOriginkeys = originKeys.filter(k => dataKeys.includes(k))
    console.log(filteredOriginkeys)
    const updateObject = filteredOriginkeys.reduce((obj, key) => {
        console.log(obj);
        if (key === getModelKey(modelname)) {
            // obj[key] = data[key]
            return obj;
        }
        if (!(origin[key] instanceof Object)) {
            if (data[key] !== origin[key]) {
                obj[key] = data[key]
            }
        }
        else {
            const myModel = getModel(modelname)
            const modelFields = Object.values(myModel.fields)
            const innerModel = modelFields.find(f => f.name === key).entity
            const innerKey = getModelKey(innerModel)
            if (origin[key] instanceof Array) {

            }
            else {
                let comparevalue;
                if (!(data[key] instanceof Object)) {
                    comparevalue = data[key]
                }
                else {
                    comparevalue = data[key][innerKey]
                }
                if (comparevalue !== origin[key][innerKey]) {
                    obj[key] = comparevalue
                }
                return obj;
            }
        }
        return obj
    }, {})
    console.log({ updateObject })
    return updateObject;
}

module.exports = { getModel, getModelKey, getObjectModel, compareObjects, models, modelNames, types }
