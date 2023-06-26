const express = require('express');
const router = express.Router();

const { findAuto } = require('../../modules/utils/auto_complete');

router.get('/autocomplete/:table/:column/:word/:condition', async (req, res) => {
    try {
        const result = await findAuto(req.params.table, req.params.column, req.params.word, req.params.condition);
        console.log(result.data,"res1");
        if (result.status === 200) {
            res.status(200).send(result.data);
        }
        else {
            res.status(500).send(result.message);
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).send([])
    }
})

module.exports = router;
