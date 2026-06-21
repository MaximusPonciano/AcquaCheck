'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('attractions', [
      { name: 'Tobogã Insano', active: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Piscina de Ondas', active: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Rio Lento', active: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Escorrega Misterioso', active: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Piscina Infantil', active: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Jacuzzi Tropical', active: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Toboágua Radical', active: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Piscina de Mergulho', active: true, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('attractions', null, {});
  }
};
