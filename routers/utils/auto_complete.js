const express = require('express');
const router = express.Router();

const { findAuto } = require('../../modules/utils/auto_complete');

router.get('/autocomplete/:entity/:column/:word', async (req, res) => {
    try {
        console.log(req.query)
        const result = await findAuto(req.params.entity, req.params.column, req.params.word, req.query);
        if (result.status === 200) {
            res.status(200).send(result.data);
        }
        else {
            res.status(500).send(result.message);
        }
    }
    catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router;
