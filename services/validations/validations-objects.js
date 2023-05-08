const {validation}=require('./validations-functions');

const objectsForValidations =
{
    leads: {
        supplyDate: [{ func: validation.required, arguments: null }, { func: validation.dateType, arguments: "date" }, { func: validation.correctDate, arguments: null }],
        supplyHour: [{ func: validation.correctHour, arguments: null }],
        ordererName: [{ func: validation.required, arguments: null }, { func: validation.containsOnlyLetters, arguments: null }],
        ordererPhone: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }],
        supplyAddress: {
            city: [{ func: validation.googlemaps, arguments: null }],
            street: [{ func: validation.googlemaps, arguments: null }],
            houseNumber: [{ func: validation.googlemaps, arguments: null }],
            mapReference: [{ func: validation.notCheck, arguments: null }]
        },
        clientId: [{ func: validation.dataExistsInTable, arguments: null }],
        concretType: [{ func: validation.correctConcretAtributes, arguments: null }],
        concretAmount: [{ func: validation.type, arguments: "number" }, { func: validation.positiveNumber, arguments: null }],
        moreConcretItems: [{ func: validation.dataExistsInTable, arguments: { server: "mongo", tableName: "products" } }],
        concretAdditionIsProsprective: [{ func: validation.type, arguments: "boolean" }],
        pumpId: [{ func: validation.dataExistsInTable, arguments: { server: "sql", tableName: "pumps" } }],
        morePumpItems: [{ func: validation.dataExistsInTable, arguments: { server: "sql", tableName: "pumps" } }],
        pouringType: [{ func: validation.HebrewLetters, arguments: null }, { func: validation.dataNotExistsInTable, arguments: { server: "sql", tableName: "pouringType" } }],
        notes: [{ func: validation.maxLength, arguments: 30000 }],
        serialNumber: [{ func: validation.notCheck, arguments: null }],
        leadStatus: [{ func: validation.notCheck, arguments: null }],
        disable: [{ func: validation.notCheck, arguments: null }]
    },
    clients: {
        serialNumber: [{ func: validation.notCheck, arguments: null }],
        clientCode: [{ func: validation.required, arguments: null }],
        clientName: [{ func: validation.required, arguments: null }],
        privaetCompanyNumber: [{ func: validation.required, arguments: null }],
        bookkeepingNumber: [{ func: validation.notCheck, arguments: null }],
        destinationBank: [{ func: validation.notCheck, arguments: null }],
        paymentTermsFluent: [{ func: validation.notCheck, arguments: null }],
        preferredPaymentDate: [{ func: validation.type, arguments: "number" }],
        ovligo: [{ func: validation.type, arguments: "number" }],
        receiptIssueTerm: [{ func: validation.notCheck, arguments: null }],
        receiptCentralism: [{ func: validation.notCheck, arguments: null }],
        accountantClassifiedCode: [{ func: validation.type, arguments: "number" }],
        status: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }],
        description: [{ func: validation.notCheck, arguments: null }],
        street: [{ func: validation.required, arguments: null }, { func: validation.googlemaps, arguments: [] }],
        house: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: ["number"] }, { func: validation.googlemaps, arguments: [] }],
        city: [{ func: validation.required, arguments: null }, { func: validation.googlemaps, arguments: null }],
        zipCode: [{ func: validation.notCheck, arguments: null }],
        telephone1: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }],
        telephone2: [{ func: validation.correctPhone, arguments: null }],
        mobilePhone: [{ func: validation.correctPhone, arguments: null }],
        fax: [{ func: validation.onlyNumbersInString, arguments: null }],
        email: [{ func: validation.correctEmail, arguments: null }],
        comments: [{ func: validation.notCheck, arguments: null }],
        creationDate: [{ func: validation.required, arguments: null }],
        userThatAdd: [{ func: validation.required, arguments: null }]
    }
    , suppliers: {
        serialNumber: [{ func: validation.notCheck, arguments: null }],
        SupplierCode: [{ func: validation.required, arguments: null }, { func: validation.maxLength, arguments: 50 }, { func: validation.unique, arguments: { server: "sql", tableName: "suppliers" } }],
        supplierName: [{ func: validation.required, arguments: null }, { func: validation.maxLength, arguments: 50 }, { func: validation.unique, arguments: { server: "sql", tableName: "suppliers" } }],
        licensedDealerNumber: [{ func: validation.required, arguments: null }, { func: validation.maxLength, arguments: 20 }],
        BokkeepingNumber: [{ func: validation.maxLength, arguments: 20 }],
        ObjectiveBank: [{ func: validation.maxLength, arguments: 20 }],
        ConditionGushyPayment: [{ func: validation.maxLength, arguments: 20 }],
        PreferredPaymentDate: [{ func: validation.type, arguments: "date" }],
        Ovligo: [{ func: validation.type, arguments: "number" }],
        Status: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }],
        Street: [{ func: validation.required, arguments: null }, { func: validation.maxLength, arguments: 20 }],
        HomeNumber: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }],
        City: [{ func: validation.required, arguments: null }, { func: validation.maxLength, arguments: 20 }],
        ZipCode: [{ func: validation.maxLength, arguments: 20 }],
        Phone1: [{ func: validation.required, arguments: null }, { func: validation.maxLength, arguments: 20 }],
        Phone2: [{ func: validation.maxLength, arguments: 20 }],
        Mobile: [{ func: validation.maxLength, arguments: 20 }],
        Fax: [{ func: validation.maxLength, arguments: 20 }],
        Mail: [{ func: validation.maxLength, arguments: 50 }],
        Notes: [{ func: validation.maxLength, arguments: 30000 }],
        CreationDate: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "date" }],
        Disabled: [{ func: validation.bit, arguments: null }],
        DisabledDate: [{ func: validation.type, arguments: "date" }],
        DisableUser: [{ func: validation.maxLength, arguments: 20 }]
    },
    BasicDetails: {
        serialNumber: [{ func: validation.notCheck, arguments: null }],
        ClientCode: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }],
        DateReceipt: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "date" }],
        TotalSum: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "float" }],
        UserName: [{ func: validation.required, arguments: null }],
        Comments: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }, { func: validation.maxLength, arguments: 50 }],
        InsertDate: [{ func: validation.required, arguments: null }],
        Disabled: [{ func: validation.bit, arguments: null }],
        DeleteDate: [{ func: validation.type, arguments: "date" }]

    },
    cash: {
        serialNumber: [{ func: validation.notCheck, arguments: null }],
        ReceiptNumber: [{}],
        SumOfCash: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "float" }],
        Disabled: [{ func: validation.bit, arguments: null }],
        DeleteDate: [{ func: validation.type, arguments: "date" }]
    },
    cheque: {
        serialNumber: [{ func: validation.notCheck, arguments: null }],
        SumOfCheque: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "float" }],
        BankNumber: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }],
        BankBranch: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }],
        AccountNumber: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }, { func: validation.specificLength, arguments: 5 }],
        UntilDate: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "date" }],
        DocumentUrl: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }],
        Disabled: [{ func: validation.bit, arguments: null }],
        DeleteDate: [{ func: validation.type, arguments: "date" }]

    },
    areas: {
        serialNumber: [{ func: validation.notCheck, arguments: null }],
        SupplierOrClientCode: [{ func: validation.required, arguments: null }, { func: validation.unique, arguments: { server: "mongo", tableName: "area" } }, { func: validation.minLength, arguments: 20 }],
        areaName: [{ func: validation.required, arguments: null }, { func: validation.dataExistsInTable, arguments: { server: "mongo", tableName: "area" } }, { func: validation.minLength, arguments: 20 }]

    }



    , branches: {
        serialNumber: [{ func: validation.notCheck, arguments: null }],
        SupplierCode: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "date" }],
        BranchName: [{ func: validation.required, arguments: null }, { func: validation.maxLength, arguments: 50 }, { func: validation.unique, arguments: { server: "sql", tableName: "suppliers" } }],
        Status: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }],
        Street: [{ func: validation.required, arguments: null }, { func: validation.maxLength, arguments: 20 }],
        HomeNumber: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "number" }],
        City: [{ func: validation.required, arguments: null }, { func: validation.maxLength, arguments: 20 }],
        ZipCode: [{ func: validation.maxLength, arguments: 20 }],
        Phone1: [{ func: validation.required, arguments: null }, { func: validation.maxLength, arguments: 20 }],
        Phone2: [{ func: validation.maxLength, arguments: 20 }],
        Mobile: [{ func: validation.maxLength, arguments: 20 }],
        Fax: [{ func: validation.maxLength, arguments: 20 }],
        Mail: [{ func: validation.maxLength, arguments: 50 }],
        Notes: [{ func: validation.maxLength, arguments: 50 }],
        CreationDate: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "date" }],
        Disabled: [{ func: validation.bit, arguments: null }],
        DisabledDate: [{ func: validation.type, arguments: "date" }],
        DisableUser: [{ func: validation.maxLength, arguments: 20 }]

    },
    credit: {
        serialNumber: [{ func: validation.notCheck, arguments: null }],
        ReceiptNumber: [{ func: validation.required, arguments: null }],
        SumOfCredit: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "float" }],
        CreditNumber: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }, { func: validation.specificLength, arguments: 16 }],
        CardType: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }],
        OwnerCard: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }, { func: validation.maxLength, arguments: 40 }],
        IdOwnerCard: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }, { func: validation.specificLength, arguments: 9 }],
        Validity: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }, { func: validation.specificLength, arguments: 4 }],
        PaymentMethod: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }],
        PaymentsSum: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "int" }],
        CardName: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }],
        Disabled: [{ func: validation.required, arguments: null }, { func: validation.bit, arguments: null }]
    },
    standingOrder: {
        serialNumber: [{ func: validation.notCheck, arguments: null }],
        ReceiptNumber: [{ func: validation.required, arguments: null }],
        SumOfStandingOrder: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "float" }],
        StandingOrderType: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }],
        AccountNumberOrCard: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }, { func: validation.betweenLength, arguments: { min: 4, max: 5 } }],
        UntilDate: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "date" }],
        ProofBackFromBank: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }],
        Disabled: [{ func: validation.required, arguments: null }, { func: validation.bit, arguments: null }],
    },
    bankTransfer: {
        serialNumber: [{ func: validation.notCheck, arguments: null }],
        ReceiptNumber: [{ func: validation.required, arguments: null }],
        SumOfBankTransfer: [{ func: validation.required, arguments: null }],
        TransferDate: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "float" }],
        Proof: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }],
        ProofNumber: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }],
        AccountNumber: [{ func: validation.required, arguments: null }, { func: validation.type, arguments: "string" }, { func: validation.specificLength, arguments: 5 }],
        Disabled: [{ func: validation.bit, arguments: null }]
    },
    priceList: {
        serialNumber: [{ func: validation.notCheck, arguments: null }],
        priceListCode: [{ func: validation.required, arguments: null }, { func: validation.unique, arguments: { server: "sql", tableName: "priceList" } }, { func: validation.minLength, arguments: 20 }],
        areaName: [{ func: validation.required, arguments: null }, { func: validation.dataExistsInTable, arguments: { server: "sql", tableName: "priceList" } }, { func: validation.minLength, arguments: 20 }]
    },

    
    orderers: {
        SerialNumber: [{ func: validation.notCheck, arguments: null }],
        OrdererName: [{ func: validation.required, arguments: null }, { func: validation.containsOnlyLetters, arguments: null }],
        OrdererPhone: [{ func: validation.required, arguments: null }, { func: validation.correctPhone, arguments: null }],
        AddedDate: [{ func: validation.notCheck, arguments: null }],
        Disable: [{ func: validation.bit, arguments: null }],
        DeletingDate: [{ func: validation.type, arguments: "date" }]
    },
    pouringType: {
        SerialNumber: [{ func: validation.notCheck, arguments: null }],
        PouringName: [{ func: validation.required, arguments: null }, { func: validation.containsOnlyLetters, arguments: null }],
        AddedDate: [{ func: validation.notCheck, arguments: null }],
        Disable: [{ func: validation.bit, arguments: null }],
        DeletingDate: [{ func: validation.type, arguments: "date" }]
    },
    statusLead: {
        SerialNumber: [{ func: validation.notCheck, arguments: null }],
        StatusName: [{ func: validation.required, arguments: null }, { func: validation.containsOnlyLetters, arguments: null }],
        AddedDate: [{ func: validation.notCheck, arguments: null }],
        Disable: [{ func: validation.bit, arguments: null }],
        DeletingDate: [{ func: validation.type, arguments: "date" }]
    }

};

module.exports = { objectsForValidations };