import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Dosen = db.define('dosen', {
    idDosen: {
        primaryKey: true,
        type: DataTypes.STRING,
        autoIncrement: false
    },
    nama: DataTypes.STRING,
    nip: DataTypes.STRING,
    alamat: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    noHp: DataTypes.STRING
}, {
    freezeTableName: true
})

export default Dosen;

(async()=> {
    await db.sync();
})();