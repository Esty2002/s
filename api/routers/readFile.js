const express = require('express');
const router = express.Router();
const { readFile } = require('../modules/readfile');
const path = require('path');

router.get('/readsappapis/:filename', async (req, res) => {
    try {
        const filepath = path.join(__dirname, '../../app.js');

        const response = await readFile(filepath);

        if (response) {
            response.forEach(r => {
                r.apiRequests.forEach(a => {
                    console.log(a.arguments);
                });
            });

            res.status(201).send(response);
        }
        else {
            res.status(500).send(response);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;



