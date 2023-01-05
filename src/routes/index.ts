import express from "express";
import errorHandling from "../middlewares/error";
const router = express.Router();

import def from "../controllers/default";
import example from "./example";

router.get("/", def);
router.use("/example", example);

router.use((_, res) => res.sendStatus(404));

router.use(errorHandling);

export default router;
