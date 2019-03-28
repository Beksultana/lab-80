const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({message: 'ITEMS'})
});

router.get('/:id', (req, res) => {

});

router.post('/', (req, res) => {

});

module.exports = router;