import { Request, Response } from "express";

export default async (req: Request, res: Response): Promise<Response> =>
    res.status(200).json({ message: "Connected!" });
