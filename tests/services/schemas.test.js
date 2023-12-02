const {getModel} = require('../../services/schemas')

describe('GET MODELS', ()=>{
    it('should return an object', ()=>{
        const result = getModel('addition')
        expect(result).toBeDefined()
    })
})