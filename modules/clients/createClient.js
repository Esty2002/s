const { postData } = require('../../services/axios')
const { logToFile } = require('../../services/logger/logTxt')
const { checkObjectValidations } = require('../../services/validations/use-validations')

const values = [{
    entity: "Clients",
    func: ({ ClientCode = null, ClientName = null, PrivateCompanyNumber = null, BookkeepingNumber = null,
        DestinationBank = null, PaymentTermsFluent = null, PreferredPaymentDate = null, Ovligo = null, ReceiptIssueTerm = null,
        ReceiptCentralism = null, AccountantClassifiedCode = null, Status = null, Description = null, Street = null, House = null, City = null, ZipCode = null,
        Telephone1 = null, Telephone2 = null, MobilePhone = null, Fax = null, Email = null, Comments = null, UserThatAdd = null }) => {
        return {
            tableName: "Clients",
            values: {
                ClientCode: ClientCode,
                ClientName: ClientName,
                PrivateCompanyNumber: PrivateCompanyNumber,
                BookkeepingNumber: BookkeepingNumber,
                DestinationBank: DestinationBank,
                PaymentTermsFluent: PaymentTermsFluent,
                PreferredPaymentDate: PreferredPaymentDate,
                Ovligo: Ovligo,
                ReceiptIssueTerm: ReceiptIssueTerm,
                ReceiptCentralism: ReceiptCentralism,
                AccountantClassifiedCode: AccountantClassifiedCode,
                Status: Status,
                Description: Description,
                Street: Street,
                House: House,
                City: City,
                ZipCode: ZipCode,
                Telephone1: Telephone1,
                Telephone2: Telephone2,
                MobilePhone: MobilePhone,
                Fax: Fax,
                Email: Email,
                Comments: Comments,
                CreationDate: new Date().toISOString(),
                UserThatAdd: UserThatAdd,
                Disabled: false
            }
        }
    }
}
]

async function addOneClient(obj,entityname) {
    let objectForLog = {
        name: 'addOneClient',
        description: 'addOneClient in modules',
        dataThatRecived: obj
    }
    logToFile(objectForLog)
    try {
        const checkValidObj=values.find(({entity})=>entity===entityname)
        let newObj=checkValidObj.func(obj)
        if(checkValidObj){
            _=await checkObjectValidations(newObj.values,checkValidObj.entity)
            obj=newObj.values
        }
        let object = {}
        // object.columns = '*'
        // object.condition = { ClientCode: obj.ClientCode }

        // let unique = await postData('/read/readOne/Clients', object)
        // objectForLog.name = 'addOneClient'
        // objectForLog.description = 'check if the recived object is unique'

        object = {}
        object.entityName = 'Clients'
        object.values = obj
        // if (unique.data.length === 0) {
            objectForLog.result = true
            logToFile(objectForLog)
            const result = await postData('/create/createone', object)
            if (result.data)
                return result;
            else
                throw new Error('data not found')
        // }
        // else {
        //     objectForLog.result = false
        //     logToFile(objectForLog)
        //     throw new Error('the client is already exist!')
        // }
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
        throw error;
    }
}

module.exports = { addOneClient }