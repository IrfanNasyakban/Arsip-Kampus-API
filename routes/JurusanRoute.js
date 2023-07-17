import express from "express";
import {
    getJurusan,
    getJurusanById,
    createJurusan,
    updateJurusan,
    deleteJurusan
} from "../controllers/JurusanController.js";

const router = express.Router();

router.get('/jurusan', getJurusan);
router.get('/jurusan/:idJurusan', getJurusanById);
router.post('/jurusan', createJurusan);
router.patch('/jurusan/:idJurusan', updateJurusan);
router.delete('/jurusan/:idJurusan', deleteJurusan);

export default router;