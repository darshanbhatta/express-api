import { Response } from "express";
import { CRequest } from "src/@types/Express";

export default async (_: CRequest, res: Response): Promise<Response> => res.status(200).json({ message: "Connected!" });
