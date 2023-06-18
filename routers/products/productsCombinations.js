const express = require('express');
const router = express.Router();
const { insertRow, getAll} = require('../../modules/products/productsCombinations')
const { findPump } = require('../../modules/products/pumps')


router.post('/getByType', express.json(), async (req, res) => {
    try {
        const response = await findPump(req.body.arr, req.body.where)
        if (response)
            res.status(201).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/insertRow', express.json(), async (req, res) => {
    try {
        const response = await insertRow(req.body)
        if (response)
            res.status(201).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/readAll', async (req, res) => {
    try {
        const response = await getAll()
        if (response)
            res.status(201).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
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