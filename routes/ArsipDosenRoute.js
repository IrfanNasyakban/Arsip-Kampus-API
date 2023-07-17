import express from "express";
import {
    getArsipDosen,
    getArsipDosenById,
    createArsipDosen,
    updateArsipDosen,
    deleteArsipDosen
} from "../controllers/ArsipDosenController.js";

const router = express.Router();

router.get('/arsip-dsn', getArsipDosen);
router.get('/arsip-dsn/:idArsip', getArsipDosenById);
router.post('/arsip-dsn', createArsipDosen);
router.patch('/arsip-dsn/:idArsip', updateArsipDosen);
router.delete('/arsip-dsn/:idArsip', deleteArsipDosen);

export default router;