'use strict';

// const fs = require('fs');
// const path = require('path');
const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const initModels = require('./init-models');
const express = require("express");
const router = express.Router();

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.models = initModels(sequelize);
const models = db.models;

//import router et api = router;

const medecinApi = require("./medecin/route");
const medicamentApi = require("./medicament/index");
const patientApi = require("./patient/index");
const serviceApi = require("./service/index");
const prescriptionApi = require("./prescription/index");
const consultationApi = require("./consultation/index");
const allergeneApi = require("./allergene/index")

router.use(medecinApi);
// router.use(medicamentApi);
// router.use(patientApi);
// router.use(serviceApi);
// router.use(prescriptionApi);
// router.use(allergeneApi);
// router.use(consultationApi);

// module.exports = router;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = { db, router, models };
