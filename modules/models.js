const types = {
    INTEGER: 'integer',
    STRING: 'string',
    DATE: 'date',
    BOOLEAN: 'bool',
    FLOAT: 'float'
}
//clients
const models = {
    measure: {
        entity: 'UnitOfMeasure',
        fields:
        {
            Id: { type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            Measure: { type: types.STRING, insert: true, update: true, key: false, unique: true },
            // Disable: { type: types.BOOLEAN, insert: true, update: true, key: false, unique: true }
            Disable: { type: types.STRING, insert: true, update: true, key: false, unique: true }
        }
        ,
        insertUrl: '/unitOfMeasure/create',
        readUrl:'/unitOfMeasure/findMeasureName',
        updateUrl: '/unitOfMeasure/update',
        deleteUrl:'/unitOfMeasure/delete'
    },
    client: {
        entity: 'Clients',
        fields:
        {

            Id: { type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            ClientCode: { type: types.STRING, insert: true, update: true, key: false, unique: true },
            ClientName: { type: types.STRING, insert: true, update: true, key: false, unique: true },
            PrivateCompanyNumber: { type: types.STRING, insert: true, update: true, key: false, unique: true },
            BookkeepingNumber: { type: types.STRING, insert: true, update: true, key: false, unique: true },
            DestinationBank: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            PaymentTermsFluent: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            PreferredPaymentDate: { type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            Ovligo: { type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            ReceiptIssueTerm: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            ReceiptCentralism: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            AccountantClassifiedCode: { type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            Status: { type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            Description: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            Street: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            House: { type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            City: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            ZipCode: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            Telephone1: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            Telephone2: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            MobilePhone: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            Fax: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            Email: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            Comments: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            // CreationDate: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            // UserThatAdd: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            // Disabled: { type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            // DeletionDate: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            // UserThatDelete: { type: types.STRING, insert: true, update: true, key: false, unique: false }

        },
        insertUrl: '/createClient/add',
        updateUrl: '/createClient/update',
        deleteUrl:''

    },
    status: {

        entity: 'Status',
        fields:
        {
            Id: { type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            StatusName: { type: types.STRING, insert: true, update: false, key: false, unique: true }
        }
        ,
        insertUrl: '../routers/clients/status',
        updateUrl: '../routers/clients/status'

    },
    //areas
    areas: {
        entity: 'Areas',
        fields:
        {
            Id: { type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            AreaIdFromMongo: { type: types.STRING, insert: true, update: true, key: false, unique: true },
            AreaName: { type: types.STRING, insert: true, update: true, key: false, unique: true }
        },

        insertUrl: '/areas/insertArea',
        updateUrl: '../routers/areas/areas',
        deleteUrl:''
    },
    //priceList
    priceList: {
        entity: 'PriceList',
        fields:
        {
            Id: { type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            Name: { type: types.STRING, insert: true, update: true, key: false, unique: true },
            Pumps: { type: types.BOOLEAN, insert: true, update: true, key: false, unique: true },
            Beton: { type: types.BOOLEAN, insert: true, update: true, key: false, unique: true },
            AddedDate: { type: types.DATE, insert: true, update: true, key: false, unique: false },
            UserName: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            Disabled: { type: types.BOOLEAN, insert: true, update: true, key: false, unique: false }

        }
        ,
        insertUrl: '/insertPricelist/addPriceList',
        updateUrl: '/updatePricelist/update',
        deleteUrl:''
    },
    price: {
        entity: 'Prices',
        fields:
        {
            //to check if it PriceListId or Id
            PriceListId: { type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            ProductId: { type: types.INTEGER, insert: true, update: true, key: false, unique: true },
            Price: { type: types.FLOAT, insert: true, update: true, key: false, unique: false },
            Discount: { type: types.FLOAT, insert: true, update: true, key: false, unique: false },
            AddedDate: { type: types.DATE, insert: true, update: true, key: false, unique: false },
            UserName: { type: types.STRING, insert: true, update: true, key: false, unique: true },
            Disabled: { type: types.BOOLEAN, insert: true, update: true, key: false, unique: false }
        }
        ,
        insertUrl: '',
        updateUrl: ''
    },
    pricesListBySupplierOrClient: {
        entity: 'PricesListBySupplierOrClient',
        fields:
        {

            Id: { type: types.INTEGER, insert: true, update: true, key: false, unique: true },
            PriceListId: { type: types.INTEGER, insert: true, update: true, key: false, unique: true },
            SupplierOrClient: { type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            Debit: { type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            Credit: { type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            AreaId: { type: types.STRING, insert: true, update: true, key: false, unique: true },
            StartDate: { type: types.DATE, insert: true, update: true, key: false, unique: false },
            EndDate: { type: types.DATE, insert: true, update: true, key: false, unique: false },
            AddedDate: { type: types.DATE, insert: true, update: true, key: false, unique: false },
            UserName: { type: types.STRING, insert: true, update: true, key: false, unique: false }
        }
        ,
        insertUrl: '/insertPricelist/addPricesListBySupplierOrClient',
        updateUrl: '/insertPricelist/',
        deleteUrl:''
    },
    quotation: {
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
            AddedDate: { type: types.DATE, insert: true, update: true, key: false, unique: false },
            Disabled: { type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            DisabledDate: { type: types.DATE, insert: true, update: true, key: false, unique: false }
        }
        ,
        insertUrl: '',
        updateUrl: '',
        deleteUrl:''
    },
    suppliers: {
        entity: 'Suppliers',
        fields:
        {
            Id: { type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            SupplierCode: { type: types.STRING, insert: true, update: true, key: false, unique: true },
            SupplierName: { type: types.STRING, insert: true, update: true, key: false, unique: true },
            LicensedDealerNumber: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            BookkeepingNumber: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            ObjectiveBank: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            ConditionGushyPayment: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            PreferredPaymentDate: { type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            Ovligo: { type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            Status: { type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            Street: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            HomeNumber: { type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            City: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            ZipCode: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            Phone1: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            Phone2: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            Mobile: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            Fax: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            Mail: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            Notes: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            CreationDate: { type: types.DATE, insert: true, update: true, key: false, unique: false },
            insertUser: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            Disabled: { type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            DisabledDate: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            DisableUser: { type: types.STRING, insert: true, update: true, key: false, unique: false },
        }
        ,
        insertUrl: '/suppliers/insertsupplier',
        updateUrl: '/suppliers/updatesupplier',
        deleteUrl:''
    },
    branches: {
        entity: 'Branches',
        fields:
        {
            Id: { type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            SupplierCode: { type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            BranchName: { type: types.STRING, insert: true, update: true, key: false, unique: true },
            Status: { type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            Street: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            HomeNumber: { type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            City: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            ZipCode: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            Phone1: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            Phone2: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            Mobile: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            Fax: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            Mail: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            Notes: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            CreationDate: { type: types.DATE, insert: true, update: true, key: false, unique: false },
            UserThatInsert: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            Disabled: { type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            DisabledDate: { type: types.DATE, insert: true, update: true, key: false, unique: false },
            DisableUser: { type: types.STRING, insert: true, update: true, key: false, unique: false },
        }
        ,
        insertUrl: '/branches/insertbranch',
        updateUrl: '/branches/updatebranch',
        deleteUrl:'/branches/deletebranches'
    },
    finishProducts: {
        entity: 'FinishProducts',
        fields:
        {
            Id: { type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            Name: { type: types.STRING, insert: true, update: true, key: false, unique: true },
            UnitOfMeasure: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            BookkeepingCode: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            AddedDate: { type: types.DATE, insert: true, update: true, key: false, unique: false },
            Disabled: { type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            DisabledDate: { type: types.DATE, insert: true, update: true, key: false, unique: false },
            DisabledUser:{type: types.STRING, insert:false, update:false, key:false, unique:false}

        }
        ,
        insertUrl: '/finishProducts/create',
        updateUrl: '/finishProducts/update',
        deleteUrl:''
    },
    pumps: {
        entity: 'Pumps',
        fields:
        {
            Id: { type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            Name: { type: types.STRING, insert: true, update: true, key: false, unique: true },
            UnitOfMeasure: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            Addition: { type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            BookkeepingCode: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            AddedDate: { type: types.DATE, insert: true, update: true, key: false, unique: false },
            Disabled: { type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            DisabledDate: { type: types.DATE, insert: true, update: true, key: false, unique: false },
            DisabledUser:{type: types.STRING, insert:false, update:false, key:false, unique:false}
        }
        ,
        insertUrl: '/pumps/create',
        updateUrl: '/pumps/update',
        deleteUrl:''
    },
    additions: {
        entity: 'Additions',
        fields:
        {
            Id: { type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            Name: { type: types.STRING, insert: true, update: true, key: false, unique: true },
            UnitOfMeasure: { type: types.STRING, insert: true, update: true, key: false, unique: true },
            BookkeepingCode: { type: types.STRING, insert: true, update: true, key: false, unique: true },
            AddedDate: { type: types.DATE, insert: false, update: false, key: false, unique: false },
            Disabled: { type: types.BOOLEAN, insert: true, update: true, key: false, unique: false },
            DisabledDate: { type: types.DATE, insert: true, update: true, key: false, unique: false },
            DisabledUser:{type: types.STRING, insert:false, update:false, key:false, unique:false}
        }
        ,
        insertUrl: '/additions/create',
        updateUrl: '/additions/update',
        deleteUrl:''
    },
    basicProducts: {
        //למה אין את הטבלה
        entity: 'BasicProducts',
        fields:
        {
            KodParit: { type: types.INTEGER, insert: false, update: false, key: true, unique: true },
            TeurParit: { type: types.STRING, insert: true, update: true, key: false, unique: true },
            SugBeton: { type: types.STRING, insert: true, update: true, key: false, unique: false },
            Chozek: { type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            DargatChasifa: { type: types.INTEGER, insert: true, update: true, key: false, unique: false },
            SomechBeton: { type: types.INTEGER, insert: true, update: true, key: false, unique: false }
        }
        ,
        insertUrl: '../../modules/products/basicProducts',
        updateUrl: '../../modules/products/basicProducts',
        deleteUrl:''
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


async function getModel(name) {
    // console.log("name",name);
    for (let n in models) {
        // console.log("n",n);
        if (n == name)
            ans = models[n]
    }
    // console.log("ans", ans);
    return ans
}

module.exports = { getModel }
