import ArsipMahasiswa from "../models/ArsipMahasiswaModel.js";
import path from "path";
import fs from "fs";
import db from "../config/database.js"

export const getArsipMhs = async (req, res) => {
  try {
    const ArsipMahasiswa = await db.query("SELECT arsip_mahasiswa.idArsip as idArsip, arsip_mahasiswa.nim AS nim, mahasiswa.nama as namaMahasiswa, arsip_mahasiswa.namaFile as namaFile, arsip_mahasiswa.kategori as kategori, arsip_mahasiswa.jenis as jenis, arsip_mahasiswa.tipeFile as tipeFile, arsip_mahasiswa.tglUpload as tglUpload, arsip_mahasiswa.url as url From arsip_mahasiswa JOIN mahasiswa ON arsip_mahasiswa.nim = mahasiswa.nim ORDER BY arsip_mahasiswa.idArsip ASC");
    if (ArsipMahasiswa.length > 0) {
      res.status(200).json(ArsipMahasiswa[0]);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getArsipMhsById = async (req, res) => {
  try {
    const response = await ArsipMahasiswa.findOne({
      where: {
        idArsip: req.params.idArsip,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createArsipMhs = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  try {
    const idArsip = req.body.idArsip;
    const nim = req.body.nim;
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
        await ArsipMahasiswa.create({
          idArsip: idArsip,
          nim: nim,
          namaFile: namaFile,
          kategori: kategori,
          jenis: jenis,
          tipeFile: tipeFile,
          tglUpload: tglUpload,
          files: fileName,
          url: url,
        });
        res.status(201).json({ msg: "Arsip Mahasiswa Created Successfuly" });
      } catch (error) {
        console.log(error.message);
      }
    });
  } catch (error) {}
};

export const updateArsipMhs = async (req, res) => {
  const arsipMhs = await ArsipMahasiswa.findOne({
    where: {
      idArsip: req.params.idArsip,
    },
  });
  if (!arsipMhs) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  let tipeFile = arsipMhs.tipeFile; // Menyimpan tipeFile dari data sebelumnya

  if (req.files === null) {
    fileName = arsipMhs.files;
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

    const filepath = `./public/files/${arsipMhs.files}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/files/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });

    // Mengubah tipeFile berdasarkan ekstensi file yang baru diupload
    tipeFile = ext.toLowerCase();
  }

  const nim = req.body.nim;
  const namaFile = req.body.namaFile;
  const kategori = req.body.kategori;
  const jenis = req.body.jenis;
  const tglUpload = req.body.tglUpload;
  const url = `${req.protocol}://${req.get("host")}/files/${fileName}`;

  try {
    await ArsipMahasiswa.update(
      {
        nim: nim,
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
    res.status(200).json({ msg: "Arsip Mahasiswa Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteArsipMhs = async (req, res) => {
  try {
    const arsip = await ArsipMahasiswa.findOne({
      where: {
        idArsip: req.params.idArsip,
      },
    });

    if (!arsip) {
      return res.status(404).json({ msg: "Arsip Mahasiswa Not Found" });
    }

    const filePath = `./public/files/${arsip.files}`;

    fs.unlink(filePath, async (err) => {
      await arsip.destroy();
      res.status(200).json({ msg: "Arsip Mahasiswa Deleted" });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};
