import db from "../config/database.js";
import Mahasiswa from "../models/MahasiswaModel.js";

export const getMahasiswa = async (req, res) => {
  try {
    const mahasiswa = await db.query(
      "SELECT mahasiswa.nim as nim, mahasiswa.nama AS nama, mahasiswa.alamat as alamat, jurusan.namaJurusan as namaJurusan, mahasiswa.tglLahir as tglLahir, mahasiswa.email as email, mahasiswa.noHp as noHp From mahasiswa JOIN jurusan ON mahasiswa.idJurusan = jurusan.idJurusan ORDER BY mahasiswa.nim ASC"
    );
    if (mahasiswa.length > 0) {
      res.status(200).json(mahasiswa[0]);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMahasiswaById = async (req, res) => {
  try {
    const response = await Mahasiswa.findOne({
      where: {
        nim: req.params.nim,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createMahasiswa = async (req, res) => {
  const { nim, nama, alamat, idJurusan, tglLahir, email, noHp } = req.body;
  try {
    await Mahasiswa.create({
      nim: nim,
      nama: nama,
      alamat: alamat,
      idJurusan: idJurusan,
      tglLahir: tglLahir,
      email: email,
      noHp: noHp,
    });

    res.json({ msg: "Data Created" });
  } catch (error) {
    console.log(error);
  }
};

export const updateMahasiswa = async (req, res) => {
  try {
    await Mahasiswa.update(req.body, {
      where: {
        nim: req.params.nim,
      },
    });
    res.status(200).json({ msg: "Mahasiswa Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMahasiswa = async (req, res) => {
  try {
    await Mahasiswa.destroy({
      where: {
        nim: req.params.nim,
      },
    });
    res.status(200).json({ msg: "Mahasiswa Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
