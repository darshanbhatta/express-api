import { Router } from "express";
import { postRoutes } from "./posts.routes";
import { errorMiddleware } from "src/middlewares/error.middleware";

const router = Router();
router.use("/posts", postRoutes);

router.use((_, res) => res.sendStatus(404));
router.use(errorMiddleware);

export default router;
