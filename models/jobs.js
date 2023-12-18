'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jobs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Jobs.init({
    namaPekerjaan: DataTypes.STRING,
    namaPerusahaan: DataTypes.STRING,
    tanggalPosting: DataTypes.DATE,
    eligibility: DataTypes.STRING,
    kondisi: DataTypes.STRING,
    audiens: DataTypes.STRING,
    tanggalMulai: DataTypes.STRING,
    lokasi: DataTypes.STRING,
    jobDescription: DataTypes.STRING,
    jobRequirement: DataTypes.STRING,
    gaji: DataTypes.INTEGER,
    informasiPerusahaan: DataTypes.STRING,
    keahlian: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Jobs',
  });
  return Jobs;
};