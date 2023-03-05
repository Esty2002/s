const express=require('express')
const router=express.Router()
const {getAllClient,getClientsByField,getClientsById}=require('../modules/readClient')

router.get('/getAll',async(req,res)=>{
    const allClients=await getAllClient();
    res.status(200).send(allClients)
})

router.get('/findClient/:id',async(req,res)=>{
    const getClientByid=await getClientsById(req.params.id)
    res.status(200).send(getClientByid)
})

router.get('/searchClient/:field/:value',async(req,res)=>{
    const getClientByValue=await getClientsByField(req.params.field,req.params.value)
    res.status(200).send(getClientByValue)
})

module.exports=router