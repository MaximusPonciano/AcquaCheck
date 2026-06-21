'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      role: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'lifeguard'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }
    });
  },

  async down(queryInterface, Sequelize) {
    // Desfaz as alterações (Deleta a tabela inteira)
    await queryInterface.dropTable('users');
  }
};
