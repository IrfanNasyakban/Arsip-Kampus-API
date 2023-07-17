import express from "express";
import {
    getMatkul,
    getMatkulById,
    createMatkul,
    updateMatkul,
    deleteMatkul
} from "../controllers/MatkulController.js";

const router = express.Router();

router.get('/matkul', getMatkul);
router.get('/matkul/:idMatkul', getMatkulById);
router.post('/matkul', createMatkul);
router.patch('/matkul/:idMatkul', updateMatkul);
router.delete('/matkul/:idMatkul', deleteMatkul);

export default router;