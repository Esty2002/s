const express = require('express');
const router = express.Router();
const { insert, getAll, updateNames, deleteItem } = require('../../modules/products/productsCombinations')
const { findPump } = require('../../modules/products/pumps');


// router.post('/getByType', express.json(), async (req, res) => {
//     try {
//         const response = await findPump(req.body.arr, req.body.where)
//         if (response)
//             res.status(200).send(response)
//         else {
//             res.status(500).send(response)
//         }
//     } catch (error) {
//         res.status(500).send(error.message)
//     }
// })

router.post('/create', express.json(), async (req, res) => {
    try {
        const response = await insert(req.body)
        if (response.status === 201 || response.status === 204)
            res.status(response.status).send(response.data)
        else {
            res.status(500).send(response.data)
        }
    } catch (error) {
        if (error.message === 'resource exists') {
            res.status(409).send(error.message)
        }
        else
            res.status(500).send(error)
    }
})

router.get('/readAll', async (req, res) => {
    try {
        const response = await getAll()
        if (response.status === 200)
            res.status(200).send(response.data)
        else {
            console.log(response.status, response.data)
            res.status(500).send(response.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post('/deleteItem', express.json(), async (req, res) => {
    try {
        const response = await deleteItem(req.body)
        console.log({ status: response.status })
        if (response.status === 200) {
            res.status(200).send(response.data)
        }
        else {
            res.status(response.status).send(response.data)
        }
    }
    catch (error) {
        res.status(500).send(error)
    }
})

router.post('/updateNames', express.json(), async (req, res) => {
    try {
        const response = await updateNames(req.body)

        if (response)
            res.status(201).send(response.data)
        else {
            res.status(500).send(false)
        }
    } catch (error) {
        res.status(500).send(error)
    }
})
//!
// router.get('/readChildrenByParent', async (req, res) => {
//     try {
//         const response = await getChildrenByParent(req.query.id)
//         if (response)
//             res.status(201).send(response)
//         else {
//             res.status(500).send(response)
//         }
//     } catch (error) {
//         res.status(500).send(error.message)
//     }
// })
//!
// router.get('/readParentByChild', async (req, res) => {
//     try {
//         const response = await getParentByChild(req.query.id)
//         if (response)
//             res.status(201).send(response)
//         else {
//             res.status(500).send(response)
//         }
//     } catch (error) {
//         res.status(500).send(error.message)
//     }
// })



module.exports = router