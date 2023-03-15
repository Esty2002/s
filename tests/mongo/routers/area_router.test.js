jest.mock('../../../modules/areas', () => {
    return {
        findAreaByCode:jest.fn(()=>{
            return {areasList:[{areaName:"ashdod",point:12,radius:12,delete:false},{areaName:"jerusalem",point:45,radius:10,delete:false}]}
        })
    }
})


const request=require('supertest')

const {app}=require('../../../app')

const areas=require('../../../routers/areas-router')




describe('GET APIs',()=>{
    it('/findAreasByCode',async ()=>{
        const response=await request(app).get('/areas_router/findAreasByCode')
        // const method = jest.requireMock('../../../modules/areas')
        // expect(method.selectAreaAndPriceByItemCode).toHaveBeenCalled()
        // expect(method.selectAreaAndPriceByItemCode).toHaveBeenCalledTimes(1)
        // expect(response).toBeDefined();
        expect(response.notFound).toBeTruthy()
        expect(response.statusCode).toBe(404)
        expect(response.headers['content-type']).toBe('text/html; charset=utf-8')

        // const method = jest.requireMock('../../../modules/areas')
        // expect(method.selectAreaAndPriceByItemCode).toHaveBeenCalled()
        // expect(method.selectAreaAndPriceByItemCode).toHaveBeenCalledTimes(1)
        // expect(response).toBeDefined();
    })

   

})

