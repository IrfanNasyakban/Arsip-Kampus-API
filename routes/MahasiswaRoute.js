import express from "express";
import {
    getMahasiswa,
    getMahasiswaById,
    createMahasiswa,
    updateMahasiswa,
    deleteMahasiswa
} from "../controllers/MahasiswaController.js";

const router = express.Router();

router.get('/mahasiswa', getMahasiswa);
router.get('/mahasiswa/:nim', getMahasiswaById);
router.post('/mahasiswa', createMahasiswa);
router.patch('/mahasiswa/:nim', updateMahasiswa);
router.delete('/mahasiswa/:nim', deleteMahasiswa);

export default router;