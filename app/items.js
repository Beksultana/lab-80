const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');
const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});
const upload = multer({storage});

const createRouter = connection => {
    const router = express.Router();

    router.get('/', (req, res) => {
        connection.query('SELECT `id`, `title`, `image` FROM items', (err, result) => {
            if (err) {
                res.status(500).send({error: "Database error"});
            }
            res.send(result)
        })
    });

    router.get('/:id', (req, res) => {
        connection.query('SELECT * FROM items WHERE `id` = ?', req.params.id, (err, result) => {
            if (err) {
                res.status(500).send({error: "Database error"});
            }
            res.send(result[0])
        })
    });

    router.delete('/:id', (req, res) => {
        connection.query('DELETE FROM `items` WHERE `id` = ?', req.params.id, (err, result) => {
            if (err) {
                res.status(500).send({error: "Database error"});
            }
            res.send(result[0])
        })
    });

    router.post('/', upload.single('image'), (req,res) => {
        const items = req.body;
        if (req.file) {
            items.image = req.file.filename
        }

        connection.query('INSERT INTO `items` (`title`, `description`, `image`, `category_id`, `place_id`) VALUES (?,?,?,?,?)',
            [items.title, items.description, items.image, items.category_id, items.place_id],
            (err , result) => {
                if (err) {
                    res.status(500).send({error: 'Database error'})
                }
                res.send({message: 'OK'});
            });
    });
    return router
};

module.exports = createRouter;