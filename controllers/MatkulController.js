import db from "../config/database.js";
import Matkul from "../models/MatkulModel.js";

export const getMatkul = async (req, res) => {
  try {
    const matkul = await db.query(
      "SELECT matkul.idMatkul as idMatkul, matkul.namaMatkul AS namaMatkul, matkul.sks as sks, matkul.semester as semester, mahasiswa.nama as namaMahasiswa, dosen.nama as namaDosen From matkul JOIN mahasiswa ON matkul.nim = mahasiswa.nim JOIN dosen ON matkul.idDosen = dosen.idDosen ORDER BY matkul.idMatkul ASC"
    );
    if (matkul.length > 0) {
      res.status(200).json(matkul[0]);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMatkulById = async (req, res) => {
  try {
    const response = await Matkul.findOne({
      where: {
        idMatkul: req.params.idMatkul,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createMatkul = async (req, res) => {
  const { idMatkul, namaMatkul, sks, semester, nim, idDosen } = req.body;
  try {
    await Matkul.create({
      idMatkul: idMatkul,
      namaMatkul: namaMatkul,
      sks: sks,
      semester: semester,
      nim: nim,
      idDosen: idDosen,
    });

    res.json({ msg: "Data Created" });
  } catch (error) {
    console.log(error);
  }
};

export const updateMatkul = async (req, res) => {
  try {
    await Matkul.update(req.body, {
      where: {
        idMatkul: req.params.idMatkul,
      },
    });
    res.status(200).json({ msg: "Matkul Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMatkul = async (req, res) => {
  try {
    await Matkul.destroy({
      where: {
        idMatkul: req.params.idMatkul,
      },
    });
    res.status(200).json({ msg: "Matkul Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
