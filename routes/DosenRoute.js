import express from "express";
import {
    getDosen,
    getDosenById,
    createDosen,
    updateDosen,
    deleteDosen
} from "../controllers/DosenController.js";

const router = express.Router();

router.get('/dosen', getDosen);
router.get('/dosen/:idDosen', getDosenById);
router.post('/dosen', createDosen);
router.patch('/dosen/:idDosen', updateDosen);
router.delete('/dosen/:idDosen', deleteDosen);

export default router;