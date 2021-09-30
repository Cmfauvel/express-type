const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medecin_has_service', {
    medecin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'medecin',
        key: 'id'
      }
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'service',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'medecin_has_service',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "medecin_id" },
          { name: "service_id" },
        ]
      },
      {
        name: "fk_medecin_has_service_service1_idx",
        using: "BTREE",
        fields: [
          { name: "service_id" },
        ]
      },
      {
        name: "fk_medecin_has_service_medecin1_idx",
        using: "BTREE",
        fields: [
          { name: "medecin_id" },
        ]
      },
    ]
  });
};
