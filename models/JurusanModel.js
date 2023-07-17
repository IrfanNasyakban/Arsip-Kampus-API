import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Jurusan = db.define('jurusan', {
    idJurusan: {
        primaryKey: true,
        type: DataTypes.STRING,
        autoIncrement: false
    },
    namaJurusan: DataTypes.STRING,
}, {
    freezeTableName: true
})

export default Jurusan;

(async()=> {
    await db.sync();
})();