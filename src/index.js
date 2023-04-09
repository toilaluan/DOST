const path = require('path');
const express = require('express');
const { engine } = require ('express-handlebars');
const app = express();
const route = require('./routes')
const db = require('./config/db')
const bodyParser = require('body-parser')
const session = require('express-session');

app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'))
port = 3000;
db.connect();
app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views')); 

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(session({
  secret: 'bien',
  resave : true,
  saveUninitialized: true,  
  })
)

route(app)

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
