const { modelNames } = require('../../../modules/utils/schemas')
const {getValidationsModule} = require('../../../services/validations/validations-objects')
const { ModelStatusTypes } = require('../../../utils/types')

describe('GET VALIDATIONS MODULE', ()=>{
    it('should return an object', ()=>{
        const result = getValidationsModule(modelNames.ADDITION, ModelStatusTypes.CREATE)
        console.log({result})
        expect(result).toBeDefined()
    })
})