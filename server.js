const express = require('express');
const app = express.Router();
const cors = require('cors');
const items = require('./app/items');
const categories = require('./app/categories');
const places = require('./app/places');
const port = 8500;

app.use(express.json());
app.use(cors());

app.use('/items', items);
app.use('/categories', categories);
app.use('/places', places);

app.listen(port, () => {
    console.log(`Started on port ${port}!`);
});