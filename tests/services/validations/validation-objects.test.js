const { modelNames, models } = require('../../../modules/utils/schemas')
const {getValidationsModule} = require('../../../services/validations/validations-objects')
const { ModelStatusTypes } = require('../../../utils/types')

describe('GET VALIDATIONS MODULE', ()=>{
    it('should return an object', ()=>{
        const result = getValidationsModule(modelNames.ADDITION, ModelStatusTypes.UPDATE)
        console.log(result.find(({propertyName})=>propertyName===models.ADDITIONS.fields.BOOKKEEPING_CODE.name).validation[2])
        expect(result).toBeDefined()
    })
})