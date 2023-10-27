import express from "express";
import example from "../controllers/example";

const router = express.Router();

router.post("/add", example.addTest.validator, example.addTest.handler);

export default router;
