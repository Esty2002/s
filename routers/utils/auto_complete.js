const express = require('express');
const router = express.Router();

const { findAuto } = require('../../modules/auto_complete');

router.get('/autocomplete/:table/:column/:word', async (req, res) => {
    try {
        console.log(req.params, "tableName");
        const result = await findAuto(req.params.table, req.params.column, req.params.word);
        console.log(result,"result");
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        res.status(404).send([])
    }
})

module.exports = router;
