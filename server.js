const express = require('express');
const cors = require('cors');
const items = require('./app/items');
const categories = require('./app/categories');
const places = require('./app/places');
const mysql = require('mysql');

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'user2',
    password : '1qaz@WSX29',
    database : 'items'
});

const port = 8500;

app.use('/items', items(connection));
app.use('/categories', categories(connection));
app.use('/places', places(connection));


connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);

    app.listen(port, () => {
        console.log(`Server started on ${port} port`)
    });
});
