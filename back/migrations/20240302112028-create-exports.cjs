'use strict';

/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize');
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('exports', {
      // Model attributes are defined here
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            validate: {
                isUUID: 4,
            },
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        },
        year: {
            type: Sequelize.INTEGER
        },
        quantity:{
            type: Sequelize.FLOAT
        },
        evalApproved:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }   
    },
        {
            tableName: "exports"
        });

    // Add association between exports and companies
    await queryInterface.addColumn('exports', 'companyId', {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'companies',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // Remove association column
    await queryInterface.removeColumn('exports', 'companyId');

    // Drop exports table
    await queryInterface.dropTable('exports');
  }
};
