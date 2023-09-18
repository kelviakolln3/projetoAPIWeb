const express = require('express');
var bodyParser = require('body-parser')
const sequelize = require('./util/database');

const app = express();
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Accept', 'application/json');
    next();
});

app.get('/', (req, res, next) => {
    res.send('Hello World');
});

app.use('/pessoa', require('./routes/pessoa'));
app.use('/produto', require('./routes/produto'));
app.use('/itemCarrinho', require('./routes/itemCarrinho'));

//error handling
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});

//sync database
sequelize
    .sync()
    .then(result => {
        console.log("Database connected");
        app.listen(3000);
    })
    .catch(err => console.log(err));