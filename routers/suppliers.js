const express = require('express')
const router = express.Router()

const { getallsuppliers,insertsuppliers } = require('../modules/suppliers')

router.get('/getallsuppliers', async (req, res) => {
    const result = await getallsuppliers()
    // console.log({ result });
})
router.post('/insertsuppliers',express.json(), async (req, res) => {
    console.log("insert_supliers________________");
    console.log(req.body);
    console.log("req.body");
    const result = await insertsuppliers(req.body)
    console.log({ result });
})



module.exports = router;
