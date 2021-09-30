var DataTypes = require("sequelize").DataTypes;
var _allergene = require("./allergene/model");
var _consultation = require("./consultation/model");
var _medecin = require("./medecin/model");
var _medecin_has_service = require("./medecin/medecin_has_service");
var _medicament = require("./medicament/model");
var _medicament_has_allergie = require("./medicament/medicament_has_allergie");
var _patient = require("./patient/model");
var _patient_has_allergie = require("./patient/patient_has_allergie");
var _patient_has_service = require("./patient/patient_has_service");
var _prescription = require("./prescription/model");
var _prescription_has_medicament = require("./prescription/prescription_has_medicament");
var _service = require("./service/model");

function initModels(sequelize) {
  var allergene = _allergene(sequelize, DataTypes);
  var consultation = _consultation(sequelize, DataTypes);
  var medecin = _medecin(sequelize, DataTypes);
  var medecin_has_service = _medecin_has_service(sequelize, DataTypes);
  var medicament = _medicament(sequelize, DataTypes);
  var medicament_has_allergie = _medicament_has_allergie(sequelize, DataTypes);
  var patient = _patient(sequelize, DataTypes);
  var patient_has_allergie = _patient_has_allergie(sequelize, DataTypes);
  var patient_has_service = _patient_has_service(sequelize, DataTypes);
  var prescription = _prescription(sequelize, DataTypes);
  var prescription_has_medicament = _prescription_has_medicament(sequelize, DataTypes);
  var service = _service(sequelize, DataTypes);

  allergene.belongsToMany(medicament, { as: 'medicament_id_medicaments', through: medicament_has_allergie, foreignKey: "allergene_id", otherKey: "medicament_id" });
  allergene.belongsToMany(patient, { as: 'patient_id_patient_patient_has_allergies', through: patient_has_allergie, foreignKey: "allergene_id", otherKey: "patient_id" });
  medecin.belongsToMany(patient, { as: 'patient_id_patients', through: consultation, foreignKey: "medecin_id", otherKey: "patient_id" });
  medecin.belongsToMany(service, { as: 'service_id_services', through: medecin_has_service, foreignKey: "medecin_id", otherKey: "service_id" });
  medicament.belongsToMany(allergene, { as: 'allergene_id_allergenes', through: medicament_has_allergie, foreignKey: "medicament_id", otherKey: "allergene_id" });
  patient.belongsToMany(allergene, { as: 'allergene_id_allergene_patient_has_allergies', through: patient_has_allergie, foreignKey: "patient_id", otherKey: "allergene_id" });
  patient.belongsToMany(medecin, { as: 'medecin_id_medecins', through: consultation, foreignKey: "patient_id", otherKey: "medecin_id" });
  patient.belongsToMany(service, { as: 'service_id_service_patient_has_services', through: patient_has_service, foreignKey: "patient_id", otherKey: "service_id" });
  service.belongsToMany(medecin, { as: 'medecin_id_medecin_medecin_has_services', through: medecin_has_service, foreignKey: "service_id", otherKey: "medecin_id" });
  service.belongsToMany(patient, { as: 'patient_id_patient_patient_has_services', through: patient_has_service, foreignKey: "service_id", otherKey: "patient_id" });
  medicament_has_allergie.belongsTo(allergene, { as: "allergene", foreignKey: "allergene_id"});
  allergene.hasMany(medicament_has_allergie, { as: "medicament_has_allergies", foreignKey: "allergene_id"});
  patient_has_allergie.belongsTo(allergene, { as: "allergene", foreignKey: "allergene_id"});
  allergene.hasMany(patient_has_allergie, { as: "patient_has_allergies", foreignKey: "allergene_id"});
  prescription.belongsTo(consultation, { as: "consultation", foreignKey: "consultation_id"});
  consultation.hasMany(prescription, { as: "prescriptions", foreignKey: "consultation_id"});
  prescription.belongsTo(consultation, { as: "medecin", foreignKey: "medecin_id"});
  consultation.hasMany(prescription, { as: "medecin_prescriptions", foreignKey: "medecin_id"});
  prescription.belongsTo(consultation, { as: "patient", foreignKey: "patient_id"});
  consultation.hasMany(prescription, { as: "patient_prescriptions", foreignKey: "patient_id"});
  consultation.belongsTo(medecin, { as: "medecin", foreignKey: "medecin_id"});
  medecin.hasMany(consultation, { as: "consultations", foreignKey: "medecin_id"});
  medecin_has_service.belongsTo(medecin, { as: "medecin", foreignKey: "medecin_id"});
  medecin.hasMany(medecin_has_service, { as: "medecin_has_services", foreignKey: "medecin_id"});
  medicament_has_allergie.belongsTo(medicament, { as: "medicament", foreignKey: "medicament_id"});
  medicament.hasMany(medicament_has_allergie, { as: "medicament_has_allergies", foreignKey: "medicament_id"});
  prescription_has_medicament.belongsTo(medicament, { as: "medicament", foreignKey: "medicament_id"});
  medicament.hasMany(prescription_has_medicament, { as: "prescription_has_medicaments", foreignKey: "medicament_id"});
  consultation.belongsTo(patient, { as: "patient", foreignKey: "patient_id"});
  patient.hasMany(consultation, { as: "consultations", foreignKey: "patient_id"});
  patient_has_allergie.belongsTo(patient, { as: "patient", foreignKey: "patient_id"});
  patient.hasMany(patient_has_allergie, { as: "patient_has_allergies", foreignKey: "patient_id"});
  patient_has_service.belongsTo(patient, { as: "patient", foreignKey: "patient_id"});
  patient.hasMany(patient_has_service, { as: "patient_has_services", foreignKey: "patient_id"});
  prescription_has_medicament.belongsTo(prescription, { as: "prescription", foreignKey: "prescription_id"});
  prescription.hasMany(prescription_has_medicament, { as: "prescription_has_medicaments", foreignKey: "prescription_id"});
  prescription_has_medicament.belongsTo(prescription, { as: "consultation", foreignKey: "consultation_id"});
  prescription.hasMany(prescription_has_medicament, { as: "consultation_prescription_has_medicaments", foreignKey: "consultation_id"});
  prescription_has_medicament.belongsTo(prescription, { as: "medecin", foreignKey: "medecin_id"});
  prescription.hasMany(prescription_has_medicament, { as: "medecin_prescription_has_medicaments", foreignKey: "medecin_id"});
  prescription_has_medicament.belongsTo(prescription, { as: "patient", foreignKey: "patient_id"});
  prescription.hasMany(prescription_has_medicament, { as: "patient_prescription_has_medicaments", foreignKey: "patient_id"});
  medecin_has_service.belongsTo(service, { as: "service", foreignKey: "service_id"});
  service.hasMany(medecin_has_service, { as: "medecin_has_services", foreignKey: "service_id"});
  patient_has_service.belongsTo(service, { as: "service", foreignKey: "service_id"});
  service.hasMany(patient_has_service, { as: "patient_has_services", foreignKey: "service_id"});

  return {
    allergene,
    consultation,
    medecin,
    medecin_has_service,
    medicament,
    medicament_has_allergie,
    patient,
    patient_has_allergie,
    patient_has_service,
    prescription,
    prescription_has_medicament,
    service,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
