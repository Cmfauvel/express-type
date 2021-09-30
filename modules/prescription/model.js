const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('prescription', {
    idprescription: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    consultation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'consultation',
        key: 'id'
      }
    },
    medecin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'consultation',
        key: 'medecin_id'
      }
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'consultation',
        key: 'patient_id'
      }
    }
  }, {
    sequelize,
    tableName: 'prescription',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idprescription" },
          { name: "consultation_id" },
          { name: "medecin_id" },
          { name: "patient_id" },
        ]
      },
      {
        name: "fk_prescription_consultation1_idx",
        using: "BTREE",
        fields: [
          { name: "consultation_id" },
          { name: "medecin_id" },
          { name: "patient_id" },
        ]
      },
    ]
  });
};
