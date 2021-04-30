'use strict';
/**
 * @typedef {import('sequelize').Sequelize} Sequelize
 * @typedef {import('sequelize').QueryInterface} QueryInterface
 */
module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns
   */
  up: (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;
    return Promise.all([
      queryInterface.createTable('skills', {
        ID: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        Title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Rate: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        UserID: {
          type: DataTypes.UUID,
          references: {
            model: {
              tableName: "users"
            },
            key: "ID"
          },
          allowNull: false
        },
        CreatedAt: {
          type: DataTypes.DATE,
        },
        UpdatedAt: {
          type: DataTypes.DATE,
        },
      }),
    ]);
  },

  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns
   */
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('skills'),
    ]);
  }
};
