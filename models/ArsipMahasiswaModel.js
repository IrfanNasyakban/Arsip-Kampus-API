import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Mahasiswa from "./MahasiswaModel.js";

const {DataTypes} = Sequelize;

const ArsipMahasiswa = db.define('arsip_mahasiswa', {
    idArsip: {
        primaryKey: true,
        type: DataTypes.STRING,
        autoIncrement: false
    },
    nim: DataTypes.INTEGER,
    namaFile: DataTypes.STRING,
    kategori: DataTypes.STRING,
    jenis: DataTypes.STRING,
    tipeFile: DataTypes.STRING,
    tglUpload: DataTypes.STRING,
    files: DataTypes.STRING,
    url: DataTypes.STRING
}, {
    freezeTableName: true
})

ArsipMahasiswa.belongsTo(Mahasiswa, {foreignKey: 'nim'})

export default ArsipMahasiswa;

(async()=> {
    await db.sync();
})();