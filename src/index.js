const path = require("path");
const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const route = require("./routes");
const db = require("./config/db");
const bodyParser = require("body-parser");
const bb = require("express-busboy");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    secret: "bien",
    resave: true,
    saveUninitialized: true,
  })
);

port = 3000;
db.connect();
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

route(app);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
