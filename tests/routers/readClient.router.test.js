const request=require('supertest')
const {app}=require('../../app')

jest.mock('../../modules/readClient',()=>{
    return{

        getAllClient:jest.fn(()=>{
            return [{id:1,name:"Gitty",city:"Ashdod"},{id:2,name:"Ruty",city:"Jerusalem"}]
        }),

        getClientById:jest.fn((id)=>{
            return {id:id,name:"Gitty"}
        })

    }
})