const { postData, getData,putData } = require('../../services/axios')
const { logToFile } = require('../../services/logger/logTxt')
const { checkObjectValidations } = require('../../services/validations/use-validations')
const values = [
    {
        entity: "PriceList",
        func: ({ Name = null, Pumps = null, Beton = null, UserName = null }) => {
            return {
                entityName: "PriceList",
                values: {
                    Name: Name,
                    Pumps: Pumps,
                    Beton: Beton,
                    AddedDate: new Date().toISOString(),
                    UserName: UserName,
                    Finish: false,
                    Disabled: false
                }
            }
        }
    },
    {
        entity: "CitiesAdditions",
        func: ({ PriceListId = null, ProductId = null, AreaId = null, Price = null, CountPrecent = null, UserName = null }) => {
            return {
                entityName: "CitiesAdditions",
                values: {
                    PriceListId: PriceListId,
                    ProductId: ProductId,
                    AreaId: AreaId,
                    Price: Price,
                    CountPrecent: CountPrecent,
                    AddedDate: new Date().toISOString(),
                    UserName: UserName
                }
            }
        }
    },
    {
        entity: "TimeAdditions",
        func: ({ PriceListId = null, ProductId = null, Price = null, CountPrecent = null, DayOfWeek = null, StartDate = null, EndDate = null, UserName = null }) => {
            return {
                entityName: "TimeAdditions",
                values: {
                    PriceListId: PriceListId,
                    ProductId: ProductId,
                    Price: Price,
                    CountPrecent: CountPrecent,
                    DayOfWeek: DayOfWeek,
                    StartDate: StartDate,
                    EndDate: EndDate,
                    AddedDate: new Date().toISOString(),
                    UserName: UserName
                }
            }
        }
    },
    {
        entity: "AdditionsForDistance",
        func: ({ PriceListId = null, ProductId = null, Distance = null, Price = null, CountPrecent = null, UserName = null }) => {
            return {
                entityName: "AdditionsForDistance",
                values: {
                    PriceListId: PriceListId,
                    ProductId: ProductId,
                    Distance: Distance,
                    Price: Price,
                    CountPrecent: CountPrecent,
                    AddedDate: new Date().toISOString(),
                    UserName: UserName
                }
            }
        }
    },
    {
        entity: "TruckFill",
        func: ({ PriceListId = null, ProductId = null, AmountTransportDiff = null, MaxTransportDiff = null, Price = null }) => {
            return {
                entityName: "TruckFill",
                values: {
                    PriceListId: PriceListId,
                    ProductId: ProductId,
                    AmountTransportDiff: AmountTransportDiff,
                    MaxTransportDiff: MaxTransportDiff,
                    Price: Price,
                    Disabled: false
                }
            }
        }
    },
    {
        entity: "PricesListBySupplierOrClient",
        func: ({ PriceListId = null, SupplierOrClient = null, Debit = null, Credit = null, AreaId = null, StartDate = null, EndDate = null, UserName = null }) => {
            return {
                entityName: "PricesListBySupplierOrClient",
                values: {
                    PriceListId: PriceListId,
                    SupplierOrClient: SupplierOrClient,
                    Debit: Debit,
                    Credit: Credit,
                    AreaId: AreaId,
                    StartDate: StartDate,
                    EndDate: EndDate,
                    AddedDate: new Date().toISOString(),
                    UserName: UserName
                }
            }
        }
    },
    {
        entity: "PricelistForProducts",
        func: ({ PriceListId = null, ProductId = null, entityName = null, Price = null, Discount = null, UserName = null }) => {
            return {
                entityName: "PricelistForProducts",
                values: {
                    PriceListId: PriceListId,
                    ProductId: ProductId,
                    TableName: TableName,
                    Price: Price,
                    Discount: Discount,
                    AddedDate: new Date().toISOString(),
                    UserName: UserName,
                    Disabled: false
                }
            }
        }
    },
    {
        entity: "FinishProducts",
        func: ({ Name = null, UnitOfMeasure = null, BookkeepingCode = null, DeleteDate = null }) => {
            return {
                entityName: "FinishProducts",
                values: {
                    Name: Name,
                    UnitOfMeasure: UnitOfMeasure,
                    BookkeepingCode: BookkeepingCode,
                    AddedDate: new Date().toISOString(),
                    Enabled: true,
                    DeleteDate: DeleteDate
                }
            }
        }
    },
    {
        entity: "Additions",
        func: ({ Name = null, UnitOfMeasure = null, BookkeepingCode = null, DeleteDate = null }) => {
            return {
                entityName: "Additions",
                values: {
                    Name: Name,
                    UnitOfMeasure: UnitOfMeasure,
                    BookkeepingCode: BookkeepingCode,
                    AddedDate: new Date().toISOString(),
                    Enabled: true,
                    DeleteDate: DeleteDate
                }
            }
        }
    }
]
async function insert(data, entityName) {
    let obj = {}
    let objectForLog = {
        name: entityName,
        description: 'insert in module',
        dataThatRecived: data
    }
    logToFile(objectForLog)
    try {
        const checkValidObj = values.find(({ entity }) => entityName === entity);
        let newObj = checkValidObj.func(data)
        if (checkValidObj) {
            _ = await checkObjectValidations(newObj.values, checkValidObj.entity)
            data = newObj.values

        }
        obj.entityName = entityName
        obj.columns = '*'
        obj.values = data
        const result = await postData('/create/createone', obj)
        if (result.data)
            return result;
        else
            throw new Error('data not found')
    }
    catch (error) {
        console.log(error,' eeeeeeeeeeeeeeeeeeeeee');
        objectForLog.error = error.message
        logToFile(objectForLog)
        throw error
    }
}
async function getProducts(entityName) {
    let objForLog = {
        name: 'detailsOfProfucts',
        description: 'getProducts in module',
        dataThatRecived: entityName
    }
    logToFile(objForLog)
    try {
    
        let obj = {}
        obj.columns = '*'
        const response = await getData(`/read/readMany/${entityName}`)
        if (response.data)
            return response;
        else
            throw new Error('data not found')
    }
    catch (error) {
        objForLog.error = error.message
        logToFile(objForLog)
        throw error
    }
}

async function updateField(id, entityName, value) {
    let objForLog;
    objForLog = {
        name: 'updateFieldInTable',
        description: 'updateField in module', id, entityName, value
    }
    logToFile(objForLog)
    let obj = {}
    try {
        const checkValidObj = values.find(({ entity }) => entityName === entity);
        let newObj = checkValidObj.func(value)
        if (checkValidObj) {
            _ = await checkObjectValidations(newObj.values, checkValidObj.entity)
            value = newObj.values
        }

        obj.entityName = entityName
        obj.condition = { Id: id }
        obj.values = value
        const response = await putData('update/updateone', obj)
        if (response) {
            return response
        }
        else
            throw new Error('data not found')
    }
    catch (error) {

        objForLog.error = error.message
        logToFile(objForLog)
        throw error
    }
}
async function getId(name, entityName) {
    let objForLog = {
        name: 'getIdForPricelistName',
        description: 'getId in module',
        pricelistName: name
    }
    logToFile(objForLog)
    try {
        let obj = {}
        obj.condition = { Name: name }
        const response = await postData(`/read/readMany/${entityName}`, obj)
        if (response.data.length > 0) {
            return response
        }
        else {
            throw new Error('data not found')
        }
    }
    catch (error) {
        console.log(error,' eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
        objForLog.error = error.message
        logToFile(objForLog)
        throw error
    }
}

async function getIdForBuytonDescribe(name, entityName) {
    let objForLog = {
        name: 'read',
        description: 'getIdForBuytonDescribe in module expects: name, tbname',
        describe: name,
        entityName
    }
    logToFile(objForLog)
    try {
        let obj = {}
        let field = entityName.substring(10)
        field = field + 'Describe'
        // let condition = `${field}='${name}'`
        obj.entityName = entityName
        obj.condition = { [field]: name }
        const response = await postData(`/read/readMany/${entityName}`, obj)
        if (response.data.length > 0)
            return response;
        else
            throw new Error('data not found')
    }
    catch (error) {
        objForLog.error = error.message
        logToFile(objForLog)
        throw error
    }
}

async function getNumber(object, tbName) {
    object = object.data[0]
    let number = tbName.substring(10) + 'Number'
    let result = `${object[number]}`
    if (result)
        return result;
    else
        throw new Error('data not found')
}

module.exports = { insert, getProducts, getId, getIdForBuytonDescribe, updateField, getNumber }