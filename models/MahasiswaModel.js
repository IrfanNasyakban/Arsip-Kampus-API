import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Jurusan from "./JurusanModel.js";

const {DataTypes} = Sequelize;

const Mahasiswa = db.define('mahasiswa', {
    nim: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: false
    },
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    idJurusan: DataTypes.STRING,
    tglLahir: DataTypes.STRING,
    email: DataTypes.STRING,
    noHp: DataTypes.STRING
}, {
    freezeTableName: true
})

Mahasiswa.belongsTo(Jurusan, {foreignKey: 'idJurusan'})

export default Mahasiswa;

(async()=> {
    await db.sync();
})();