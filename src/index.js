const path = require('path');
const express = require('express');
const { engine } = require ('express-handlebars');
const app = express();
const route = require('./routes')
const db = require('./config/db')

app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'))
port = 3000;
db.connect();
app.engine('.hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views')); 

route(app)

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
