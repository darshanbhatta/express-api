import { Router } from "express";
import * as addPost from "src/controllers/posts/addPost.controller";

export const postRoutes = Router();

postRoutes.get("/add/:id", addPost.validator, addPost.handler);
