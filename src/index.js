const path = require('path');
const express = require('express');
const { engine } = require ('express-handlebars');
const app = express();
const router = require('./routes')
const db = require('./config/db')

port = 3000;
db.connect();
app.engine('.hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views')); 

router(app)

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
