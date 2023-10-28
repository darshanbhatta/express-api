import express from "express";
import example from "../controllers/example";

const router = express.Router();

router.get("/add/:id", example.addTest.validator, example.addTest.handler);

export default router;
