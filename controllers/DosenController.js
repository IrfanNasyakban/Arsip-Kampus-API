import Dosen from "../models/DosenModel.js";
import path from "path";
import fs from "fs";

export const getDosen = async (req, res) => {
  try {
    const dosen = await Dosen.findAll();
    res.json(dosen);
  } catch (error) {
    console.log(error);
  }
};

export const getDosenById = async (req, res) => {
  try {
    const response = await Dosen.findOne({
      where: {
        idDosen: req.params.idDosen,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createDosen = async (req, res) => {
  const { idDosen, nama, nip, alamat, gender, email, noHp } = req.body;
  try {
    await Dosen.create({
      idDosen: idDosen,
      nama: nama,
      nip: nip,
      alamat: alamat,
      gender: gender,
      email: email,
      noHp: noHp,
    });

    res.json({ msg: "Data Created" });
  } catch (error) {
    console.log(error);
  }
};

export const updateDosen = async (req, res) => {
  try {
    await Dosen.update(req.body, {
      where: {
        idDosen: req.params.idDosen,
      },
    });
    res.status(200).json({ msg: "Dosen Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteDosen = async (req, res) => {
  try {
    await Dosen.destroy({
      where: {
        idDosen: req.params.idDosen,
      },
    });
    res.status(200).json({ msg: "Dosen Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
