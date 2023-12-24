const { validation , getFunctionArguments} = require('../../../services/validations/validations-functions')
const { getData } = require('../../../services/axios')

 jest.mock('../../../services/axios', ()=>(
    {
        getData:jest.fn(()=>{
            console.log('mock')
            return {data:[123]}
        })
    }
 ))
 


describe('RECORD EXISTS IN DB', () => {
    it('should return true when get paramenter exist is true', async () => {
        const response = await validation.recordExistInDB(123, { entityName: 'tryexist', field: 'data', exist: true })
        expect(getData).toHaveBeenCalled()
        expect(response).toBeTruthy()
    })
})

describe('GET FUNCTION ARGUMENTS', ()=>{
    it('should return the function arguments', ()=>{
        const response = getFunctionArguments('recordExistInDB')
        expect(response).toBeUndefined()
    })
})