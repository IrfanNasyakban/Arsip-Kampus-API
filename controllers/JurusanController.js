import Jurusan from "../models/JurusanModel.js";

export const getJurusan = async (req, res) => {
  try {
    const jurusan = await Jurusan.findAll();
    res.json(jurusan);
  } catch (error) {
    console.log(error);
  }
};

export const getJurusanById = async (req, res) => {
  try {
    const response = await Jurusan.findOne({
      where: {
        idJurusan: req.params.idJurusan,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createJurusan = async (req, res) => {
  const { idJurusan, namaJurusan } = req.body;
  try {
    await Jurusan.create({
      idJurusan: idJurusan,
      namaJurusan: namaJurusan,
    });

    res.json({ msg: "Data Created" });
  } catch (error) {
    console.log(error);
  }
};

export const updateJurusan = async (req, res) => {
  try {
    await Jurusan.update(req.body, {
      where: {
        idJurusan: req.params.idJurusan,
      },
    });
    res.status(200).json({ msg: "Jurusan Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteJurusan = async (req, res) => {
  try {
    await Jurusan.destroy({
      where: {
        idJurusan: req.params.idJurusan,
      },
    });
    res.status(200).json({ msg: "Jurusan Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
