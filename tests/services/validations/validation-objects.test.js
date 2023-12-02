const {getValidationsModule} = require('../../../services/validations/validations-objects')

describe('GET VALIDATIONS MODULE', ()=>{
    it('should return an object', ()=>{
        const result = getValidationsModule('additions', false)
        console.log({result})
        expect(result).toBeDefined()
    })
})