import { Model } from "mongoose";
import { IPost, PostModel } from "./posts.model";

export type IModels = {
    posts: Model<IPost>;
};

export const models: IModels = {
    posts: PostModel,
};
