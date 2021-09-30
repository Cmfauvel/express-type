/** @format */

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { db, router } = require("./modules");
const errorMiddleware = require("./middlewares/error-handling");
const { handleError, ErrorHandler } = require('./helpers/error');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true
  })
);


// ---- Gestion d'erreurs ----
app.use(errorMiddleware);

app.get('/error', (req, res) => {
    throw new ErrorHandler(500, 'Internal server error');
  })

app.use("/medapi", router);

// ---- Connexion ----
//.sync({ force: true })
db.sequelize.sync().then((req) => {
  app.listen(process.env.PORT || 3000, () => {
    console.log("server running");
  });
});