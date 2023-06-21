const express = require('express');
const router = express.Router();

const { findAuto } = require('../../modules/auto_complete');

router.get('/autocomplete/:table/:column/:word/:condition', async (req, res) => {
    try {
        console.log(req.params, "tableName");
        const result = await findAuto(req.params.table, req.params.column, req.params.word, req.params.condition);
        console.log(result, "result");
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        res.status(404).send([])
    }
})

module.exports = router;
