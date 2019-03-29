const express = require('express');
const router = express.Router();

const createRouter = connection => {
    router.get('/', (req, res) => {

        connection.query('SELECT * FROM place', (err, result) => {
            if (err) {
                res.status(500).send({error: "Database error"});
            }
            res.send(result)
        })
    });

    router.get('/:id', (req, res) => {

        connection.query('SELECT * FROM place WHERE id = ?', req.params.id, (err, result) => {
            if (err) {
                res.status(500).send({error: "Database error"});
            }
            res.send(result[0])
        })
    });

    router.delete('/:id', (req, res) => {
        connection.query('DELETE FROM place WHERE id = ?', req.params.id, (err, result) => {
            if (err) {
                res.status(500).send({error: "Database error"});
            }
            res.send(result[0])
        })
    });

    router.post('/', (req,res) => {

        const places = req.body;
        connection.query('INSERT INTO place (`title`, `description`) VALUES (?,?)',
            [places.title, places.description],
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