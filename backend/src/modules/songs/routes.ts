import { Router } from "express";
import { getSongs } from "./controller";

const router = Router();

router.get("/", getSongs);

export default router;