
const { getAllClient, getClientsByField, getClientsById } = require('../../modules/readClient')

jest.mock('../../dal/db/sql/sql-operations', () => {
    return {
        getAll: jest.fn(() => {
            const obj={recordset:[{ id: 1, name: "Gitty", city: "Ashdod" ,disabled:"false"}, { id: 2, name: "Ruty", city: "Jerusalem" ,disabled:"false"}]}
            return obj
        }),

        getClientById: jest.fn((id) => {
            const obj={recordset:{ id, name: "Gitty" },rowsAffected:1}
            if (id==1)
                return obj
            return { recordset: null, rowsAffected: 0 }
        }),

        getClientByField: jest.fn((field, value) => {
            if (field == 'name' && value == 'Gitty')
                return { id: 1, name: "Gitty" }
            return null
        })
    }
})

describe('GET ALL CLIENTS',()=>{

    it('should execute read client once', async () => {
        _ = await getAllClient()
        const methods = jest.requireMock('../../dal/db/sql/sql-operations')
        expect(methods.getAll).toHaveBeenCalled()
    })

    it('should return all the clients that disabled=false',async()=>{
        const res=await getAllClient()
        expect(res).toBeDefined()
    })
    it('should return an array type',async()=>{
        const res=await getAllClient()
        expect(res).toBeInstanceOf(Array)
    })

})

describe('GET CLIENT BY ID',()=>{

    it('should return an object by id',async()=>{
        const res=await getClientsById(1)
        expect(res).toBeDefined()
    })

    it('get an id that undefined and return null',async()=>{
        const res=await getClientsById(2)
        expect(res).toBeFalsy()
    })
})
