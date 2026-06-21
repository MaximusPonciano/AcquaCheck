'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Maximus Ponciano',
        email: 'admin@acquacheck.com',
        password: '$2b$10$xpYCukDqWzsy9qbv5h8b4ObsthbpdkUwXHPcKPHNel1ohR8ztMncW',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'João Silva',
        email: 'joao.silva@acquacheck.com',
        password: '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJK',
        role: 'lifeguard',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Maria Santos',
        email: 'maria.santos@acquacheck.com',
        password: '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJK',
        role: 'lifeguard',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pedro Costa',
        email: 'pedro.costa@acquacheck.com',
        password: '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJK',
        role: 'manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ana Oliveira',
        email: 'ana.oliveira@acquacheck.com',
        password: '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJK',
        role: 'lifeguard',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Carlos Mendes',
        email: 'carlos.mendes@acquacheck.com',
        password: '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJK',
        role: 'lifeguard',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
