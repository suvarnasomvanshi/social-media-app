import express from "express";
import { getAlluser } from "../controllers/user-controller";

const router = express.Router();

router.get("/",getAlluser);

export default router