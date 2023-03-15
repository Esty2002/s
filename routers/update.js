const express = require('express');
const router = express.Router();
const { updateColumns } = require('../modules/update')

router.post('/update', express.json(), async (req, res) => {
    // let ans = await updateColumns(table, column, value, columnCond, valueCond)
    // res.status(200).send(ans)
    console.log('req.body', req.body);
    res.status(200).send(true)
})

module.exports = router;
