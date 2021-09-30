const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('prescription_has_medicament', {
    prescription_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'prescription',
        key: 'idprescription'
      }
    },
    consultation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'prescription',
        key: 'consultation_id'
      }
    },
    medecin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'prescription',
        key: 'medecin_id'
      }
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'prescription',
        key: 'patient_id'
      }
    },
    medicament_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'medicament',
        key: 'id'
      }
    },
    nb_prise: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    frequence: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'prescription_has_medicament',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "prescription_id" },
          { name: "consultation_id" },
          { name: "medecin_id" },
          { name: "patient_id" },
          { name: "medicament_id" },
        ]
      },
      {
        name: "fk_prescription_has_medicament_medicament1_idx",
        using: "BTREE",
        fields: [
          { name: "medicament_id" },
        ]
      },
      {
        name: "fk_prescription_has_medicament_prescription1_idx",
        using: "BTREE",
        fields: [
          { name: "prescription_id" },
          { name: "consultation_id" },
          { name: "medecin_id" },
          { name: "patient_id" },
        ]
      },
    ]
  });
};
