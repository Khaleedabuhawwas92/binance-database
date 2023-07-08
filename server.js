const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// simple route

app.get("/", (req, res) => {
   res.json({ message: " Ahmad Fuck you 00100" });
});
app.get("/omar", (req, res) => {
   res.json({ message: "wolocom to omar " });
});
const db = require("./app/models");

db.mongoose
   .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // tls: true,
      // tlsCAFile: './ca-certificate.crt',
   })
   .then(() => {
      console.log("Connected to the database!");
   })
   .catch((err) => {
      console.log(err);
      process.exit();
   });

require("./app/routes/symbols.routes")(app);
require('./app/routes/checking.routes')(app);
// require('./app/routes/myQuizes.routes')(app);
// require('./app/routes/dailyCash.routes')(app);
// require('./app/routes/user.routes')(app);
// require('./app/routes/discraption.routes')(app);
// require('./app/routes/question.routes')(app);
// require('./app/routes/courses.routes')(app);
// require('./app/routes/authorization.routes')(app);
// require('./app/routes/authorization.routes')(app);
// require('./app/routes/orderList.routes')(app);
app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
   );
   next();
});

app.all("*", (req, res, next) => {
   res.status(404).json({
      status: "false",
      message: "Page is Not FOUND",
   });
});

// set port, listen for request
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}.`);
});
