const express = require('express')
const { getAll, deleteItem } = require('../../modules/products/productsCombinations')
const router = express.Router()
const { findPump, insertPump, updatePump, findPumpName } = require('../../modules/products/pumps')


router.get('/pumpNameById/:id', async (req, res) => {
    try {
        const response = await findPumpName(req.params.id)
        if (response.status === 200) {
            res.status(200).send(response.data)
        }
        else {
            res.status(response.status).send(response.data)
        }
    }
    catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/create', express.json(), async (req, res) => {
    try {
        const response = await insertPump(req.body)
        console.log({ response })
        if (response)
            res.status(201).send(response.data)
        else {
            res.status(500).send(response.data)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/find', express.json(), async (req, res) => {
    try {
        const response = await findPump(req.body.arr, req.body.where)

        res.status(response.status).send(response.data)

    }
    catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/update', express.json(), async (req, res) => {
    try {
        console.log(req.body.where);
        const response = await updatePump({ data: req.body.update, condition: req.body.where })
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// router.post('/delete', express.json(), async (req, res) => {

//     try {
//         console.log(req.body, "--------------------------------------------------------------------------------------");
//         const response = await updatePump({ data: { Enabled: 0, DeleteDate: new Date() }, condition: req.body })
//         if (response)
//             res.status(200).send(response)
//         else
//             res.status(500).send(response)
//     }
//     catch (error) { res.status(500).send(error.message) }
// })


router.post('/delete', express.json(), async (req, res) => {

    try {
        const addition = await findPump(['Addition'],req.body)
        const response = await updatePump({ data: { Enabled: 0, DeleteDate: new Date() }, condition: req.body })
        if (response) {
            let productsCombinationsArr = await getAll();
            if (addition.data[0].Addition)
                productsCombinationsArr = productsCombinationsArr.filter(p => p.ChildId == req.body.Id)
            else
                productsCombinationsArr = productsCombinationsArr.filter(p => p.ParentId == req.body.Id)

            productsCombinationsArr.forEach(async element => {
                resp = await deleteItem({ Id: element.Id, Disable: true })
            });

            res.status(200).send(response)
        }
        else
            res.status(500).send(response)
    }
    catch (error) { res.status(500).send(error.message) }
})

module.exports = router