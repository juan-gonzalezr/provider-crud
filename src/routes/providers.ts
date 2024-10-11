import { Router } from "express";
import {
  createProvider,
  deleteProvider,
  getAllProvider,
  getProvider,
  updateProvider,
  validateProvider,
} from "../controllers/providersController";

const router = Router();

router.post('/provider', createProvider);
router.get('/provider', getAllProvider);
router.put('/provider/:id',updateProvider);
router.get('/provider/:id',getProvider);
router.delete('/provider/:id',deleteProvider);
router.put('/provider/:id/validate',validateProvider);

export default router;