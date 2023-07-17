import express from "express";
import {
    getArsipMhs,
    getArsipMhsById,
    createArsipMhs,
    updateArsipMhs,
    deleteArsipMhs
} from "../controllers/ArsipMahasiswaController.js";

const router = express.Router();

router.get('/arsip-mhs', getArsipMhs);
router.get('/arsip-mhs/:idArsip', getArsipMhsById);
router.post('/arsip-mhs', createArsipMhs);
router.patch('/arsip-mhs/:idArsip', updateArsipMhs);
router.delete('/arsip-mhs/:idArsip', deleteArsipMhs);

export default router;