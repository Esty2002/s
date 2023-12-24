const { clone, cloneObject } = require('../../../modules/utils/code')


describe('CLONEOBJECT', ()=>{
    it('should return a cloned string', ()=>{
        let message = 'hello world'
        const clonedMessage = cloneObject(message)
        expect(clonedMessage).toEqual(message)
    })

    it('should return a cloned String object', ()=>{
        let message =new String('hello world')
        const clonedMessage = cloneObject(message)
        expect(clonedMessage).toEqual(message)
    })
    it('should return a cloned number', ()=>{
        let number = 57
        const clonedNumber = cloneObject(number)
        expect(clonedNumber).toEqual(number)
    })

    it('should return a cloned Number object', ()=>{
        let number =new Number(55)
        const clonedNumber = cloneObject(number)
        expect(clonedNumber).toEqual(number)
    })
})


describe('CLONE', () => {
    it('should return a cloned object', () => {
        const origin = { id: 45, name: 'sara', innerArray: [{ key: 45, value: 'pop' }, { key: 50, value: 'splice' }] , update:true}
        let response = clone(origin)
        expect(response).toBeDefined()
    })
})

