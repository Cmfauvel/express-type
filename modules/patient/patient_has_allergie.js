const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('patient_has_allergie', {
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'patient',
        key: 'id'
      }
    },
    allergene_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'allergene',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'patient_has_allergie',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "patient_id" },
          { name: "allergene_id" },
        ]
      },
      {
        name: "fk_patient_has_allergie_allergie1_idx",
        using: "BTREE",
        fields: [
          { name: "allergene_id" },
        ]
      },
      {
        name: "fk_patient_has_allergie_patient1_idx",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
    ]
  });
};
