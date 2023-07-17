const { postData, getData } = require('../../services/axios')
const { logToFile } = require('../../services/logger/logTxt')
const { checkObjectValidations } = require('../../services/validations/use-validations')
const values = [
    {
        entity: "PriceList",
        func: ({ Name = null, Pumps = null, Beton = null, UserName = null }) => {
            return {
                tableName: "PriceList",
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
                tableName: "CitiesAdditions",
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
                tableName: "TimeAdditions",
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
                tableName: "AdditionsForDistance",
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
                tableName: "TruckFill",
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
                tableName: "PricesListBySupplierOrClient",
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
        func: ({ PriceListId = null, ProductId = null, TableName = null, Price = null, Discount = null, UserName = null }) => {
            return {
                tableName: "PricelistForProducts",
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
                tableName: "FinishProducts",
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
                tableName: "Additions",
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
        obj.tableName = entityName
        obj.columns = '*'
        obj.values = data
        const result = await postData('/create/create', obj)
        if (result.data)
            return result;
        else
            throw new Error('data not found')
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
        throw error
    }
}
async function getProducts(tbName) {
    let objForLog = {
        name: 'detailsOfProfucts',
        description: 'getProducts in module',
        dataThatRecived: tbName
    }
    logToFile(objForLog)
    try {
        let obj = {
            tableName: tbName,
            columns: '*'
        }
        const response = await postData('/read/readTopN', obj)
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

//i need to do validations for update field
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
            console.log(checkValidObj,' checkValidObj');
            _ = await checkObjectValidations(newObj.values, checkValidObj.entity)
            value = newObj.values
        }

        obj.tableName = entityName
        obj.condition = {Id:id}
        obj.values = value
        const response = await postData('update/update', obj)
        if (response){
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
async function getId(name, tbName) {
    let objForLog = {
        name: 'getIdForPricelistName',
        description: 'getId in module',
        pricelistName: name
    }
    logToFile(objForLog)
    try {
        let condition = `Name='${name}'`
        console.log({ condition });
        const response = await getData(`/read/readAll/${tbName}/${condition}`)
        if (response.data.length > 0){
            return response
        }
        else{
            throw new Error('data not found')
        }
    }
    catch (error) {
        objForLog.error = error.message
        logToFile(objForLog)
        throw error
    }
}

async function getIdForBuytonDescribe(name, tbName) {
    let objForLog = {
        name: 'read',
        description: 'getIdForBuytonDescribe in module expects: name, tbname',
        describe: name,
        tbName
    }
    logToFile(objForLog)
    try {
        let field = tbName.substring(10)
        field = field + 'Describe'
        let condition = `${field}='${name}'`
        const response = await getData(`/read/readAll/${tbName}/${condition}`)
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