const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medicament_has_allergie', {
    medicament_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'medicament',
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
    tableName: 'medicament_has_allergie',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "medicament_id" },
          { name: "allergene_id" },
        ]
      },
      {
        name: "fk_medicament_has_allergie_allergie1_idx",
        using: "BTREE",
        fields: [
          { name: "allergene_id" },
        ]
      },
      {
        name: "fk_medicament_has_allergie_medicament1_idx",
        using: "BTREE",
        fields: [
          { name: "medicament_id" },
        ]
      },
    ]
  });
};
