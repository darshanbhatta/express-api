import express from "express";
import exampleController from "../controllers/example";


const router = express.Router();

router.post("/add", exampleController.addTest);

export default router;
