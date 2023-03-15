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


        // const response = await request(app).get('/areas/findAreasByCode/1')
        // console.log(response);
        // const method = jest.requireMock('../../../modules/areas')
        // expect(method.findAreaByCode).toHaveBeenCalled()
        // expect(method.findAreaByCode).toHaveBeenCalledTimes(1)
        // expect(response).toBeDefined();
        const response=await request(app).get('/areas/findAreasByCode/1')
        const method = jest.requireMock('../../../modules/areas')
        expect(method.findAreasByCode).toHaveBeenCalled()
        expect(method.findAreasByCode).toHaveBeenCalledTimes(1)
        expect(response).toBeDefined();
        expect(response.notFound).toBeTruthy()
        expect(response.statusCode).toBe(404)
        expect(response.headers['content-type']).toBe('text/html; charset=utf-8')

    })

   

})

