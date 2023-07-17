import ArsipDosen from "../models/ArsipDosenModel.js";
import path from "path";
import fs from "fs";
import db from "../config/database.js"

export const getArsipDosen = async (req, res) => {
  try {
    const arsipDosen = await db.query("SELECT arsip_dosen.idArsip as idArsip, arsip_dosen.idDosen AS idDosen, dosen.nama as namaDosen, arsip_dosen.namaFile as namaFile, arsip_dosen.kategori as kategori, arsip_dosen.jenis as jenis, arsip_dosen.tipeFile as tipeFile, arsip_dosen.tglUpload as tglUpload, arsip_dosen.url as url From arsip_dosen JOIN dosen ON arsip_dosen.idDosen = dosen.idDosen ORDER BY arsip_dosen.idArsip ASC");
    if (arsipDosen.length > 0) {
      res.status(200).json(arsipDosen[0]);
    }
    
  } catch (error) {
    console.log(error);
  }
};

export const getArsipDosenById = async (req, res) => {
  try {
    const response = await ArsipDosen.findOne({
      where: {
        idArsip: req.params.idArsip,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createArsipDosen = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  try {
    const idArsip = req.body.idArsip;
    const idDosen = req.body.idDosen;
    const namaFile = req.body.namaFile;
    const kategori = req.body.kategori;
    const jenis = req.body.jenis;
    const tglUpload = req.body.tglUpload;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/files/${fileName}`;
    const allowedType = [".pdf", ".docx", ".doc", ".pptx", ".xlsx"];

    const tipeFile = ext.toLowerCase();

    if (!allowedType.includes(tipeFile))
      return res.status(422).json({ msg: "Invalid File" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "File must be less than 5 MB" });

    file.mv(`./public/files/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
      try {
        await ArsipDosen.create({
          idArsip: idArsip,
          idDosen: idDosen,
          namaFile: namaFile,
          kategori: kategori,
          jenis: jenis,
          tipeFile: tipeFile,
          tglUpload: tglUpload,
          files: fileName,
          url: url,
        });
        res.status(201).json({ msg: "Arsip Dosen Created Successfuly" });
      } catch (error) {
        console.log(error.message);
      }
    });
  } catch (error) {}
};

export const updateArsipDosen = async (req, res) => {
  const arsipDosen = await ArsipDosen.findOne({
    where: {
      idArsip: req.params.idArsip,
    },
  });
  if (!arsipDosen) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  let tipeFile = arsipDosen.tipeFile; // Menyimpan tipeFile dari data sebelumnya

  if (req.files === null) {
    fileName = arsipDosen.files;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".pdf", ".docx", ".doc", ".pptx", ".xlsx"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid files" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "File must be less than 5 MB" });

    const filepath = `./public/files/${arsipDosen.files}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/files/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });

    // Mengubah tipeFile berdasarkan ekstensi file yang baru diupload
    tipeFile = ext.toLowerCase();
  }

  const idDosen = req.body.idDosen;
  const namaFile = req.body.namaFile;
  const kategori = req.body.kategori;
  const jenis = req.body.jenis;
  const tglUpload = req.body.tglUpload;
  const url = `${req.protocol}://${req.get("host")}/files/${fileName}`;

  try {
    await ArsipDosen.update(
      {
        idDosen: idDosen,
        namaFile: namaFile,
        kategori: kategori,
        jenis: jenis,
        tipeFile: tipeFile, // Menggunakan tipeFile yang telah diubah
        tglUpload: tglUpload,
        files: fileName,
        url: url,
      },
      {
        where: {
          idArsip: req.params.idArsip,
        },
      }
    );
    res.status(200).json({ msg: "Arsip Dosen Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteArsipDosen = async (req, res) => {
  try {
    const arsip = await ArsipDosen.findOne({
      where: {
        idArsip: req.params.idArsip,
      },
    });

    if (!arsip) {
      return res.status(404).json({ msg: "Arsip Dosen Not Found" });
    }

    const filePath = `./public/files/${arsip.files}`;

    fs.unlink(filePath, async (err) => {
      await arsip.destroy();
      res.status(200).json({ msg: "Arsip Dosen Deleted" });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};
