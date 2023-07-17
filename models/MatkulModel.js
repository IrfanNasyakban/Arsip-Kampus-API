import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Dosen from "./DosenModel.js";
import Mahasiswa from "./MahasiswaModel.js";

const {DataTypes} = Sequelize;

const Matkul = db.define('matkul', {
    idMatkul: {
        primaryKey: true,
        type: DataTypes.STRING,
        autoIncrement: false
    },
    namaMatkul: DataTypes.STRING,
    sks: DataTypes.INTEGER,
    semester: DataTypes.INTEGER,
    nim: DataTypes.INTEGER,
    idDosen: DataTypes.STRING
}, {
    freezeTableName: true
})

Matkul.belongsTo(Mahasiswa, {foreignKey: 'nim'})
Matkul.belongsTo(Dosen, {foreignKey: 'idDosen'})

export default Matkul;

(async()=> {
    await db.sync();
})();