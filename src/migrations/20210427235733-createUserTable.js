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
      queryInterface.createTable('users', {
        ID: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        Name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Phone: {
          type: DataTypes.STRING,
        },
        Line: {
          type: DataTypes.STRING,
        },
        Description: {
          type: DataTypes.TEXT,
        },
        BirthDate: {
          type: DataTypes.DATE,
        },
        Address: {
          type: DataTypes.TEXT,
        },
        ProfileImage: {
          type: DataTypes.TEXT,
        },
        BackgroundImage: {
          type: DataTypes.TEXT,
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
      queryInterface.dropTable('users'),
    ]);
  }
};
