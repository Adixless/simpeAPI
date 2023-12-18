'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namaPekerjaan: {
        type: Sequelize.STRING
      },
      namaPerusahaan: {
        type: Sequelize.STRING
      },
      tanggalPosting: {
        type: Sequelize.DATE
      },
      eligibility: {
        type: Sequelize.STRING
      },
      kondisi: {
        type: Sequelize.STRING
      },
      audiens: {
        type: Sequelize.STRING
      },
      tanggalMulai: {
        type: Sequelize.STRING
      },
      lokasi: {
        type: Sequelize.STRING
      },
      jobDescription: {
        type: Sequelize.STRING
      },
      jobRequirement: {
        type: Sequelize.STRING
      },
      gaji: {
        type: Sequelize.INTEGER
      },
      informasiPerusahaan: {
        type: Sequelize.STRING
      },
      keahlian: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Jobs');
  }
};