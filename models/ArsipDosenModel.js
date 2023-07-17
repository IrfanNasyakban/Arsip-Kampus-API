import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Dosen from "./DosenModel.js";

const {DataTypes} = Sequelize;

const ArsipDosen = db.define('arsip_dosen', {
    idArsip: {
        primaryKey: true,
        type: DataTypes.STRING,
        autoIncrement: false
    },
    idDosen: DataTypes.STRING,
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

ArsipDosen.belongsTo(Dosen, {foreignKey: 'idDosen'})

export default ArsipDosen;

(async()=> {
    await db.sync();
})();