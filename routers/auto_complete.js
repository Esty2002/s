const express = require('express');
const router = express.Router();

const { findAuto } = require('../modules/auto_complete');

router.get('/autocomplete/:table/:column/:word', async (req, res) => {
    try {
        console.log(req.params, "tableName");
        const result = await findAuto(req.params.table, req.params.column, req.params.word);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(400).send([])
    }
})

module.exports = router;
