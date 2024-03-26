const express = require('express');
const router = express.Router();


const { getAllBranches, getBranchById, insertOneBranch, updateDetail, deleteBranches, checkUnique, getBranchesByCondition } = require('../../modules/suppliers/branches');

router.post('/deletebranches', express.json(), async (req, res) => {
    try {
        const response = await deleteBranches(req.body)
        if (response)
            res.status(response.status).send(response.data)

    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/getallbranches', async (req, res) => {
    try {
        const response = await getAllBranches()
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/getBranchesWithCondition', async (req, res) => {

    try {
        const filter = {}
        console.log({ q: req.query });
        const response = await getBranchesByCondition(req.query)
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/getBranchById/:id', async (req, res) => {

    try {
       
        const response = await getBranchById({Id: req.params.id})
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})



router.post('/insertbranch', express.json(), async (req, res) => {
    try {
       
        const response = await insertOneBranch(req.body)
        if (response)
            res.status(201).send(response.data)
        else {

            res.status(500).send(response)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

router.put('/updatebranch', express.json(), async (req, res) => {
    try {
        const response = await updateDetail( req.body)
        if (response)
            res.status(200).send(response.data)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

router.get('/checkUnique/:supplierCode/:branchname', async (req, res) => {
    try {
        const response = await checkUnique({ supplierCode: req.params.supplierCode, branchName: req.params.branchname })
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

})

module.exports = router;
