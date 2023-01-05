import { Controller, CRequest } from "src/@types/Express";
import { Response } from "express";
import { celebrate, Joi, Segments } from "celebrate";

const _celebrate = celebrate({
    [Segments.BODY]: {
        test: Joi.string().required(),
    },
});

async function addTestDocument (req: CRequest, res: Response): Promise<Response> {
    const { test } = req.body;
    const db = req.app.get("db");

    await db.models.tests.create({
        test,
    });

    return res.status(200).json({
        message: "Test added",
    });
}

const controller: Controller = [_celebrate, addTestDocument];

export default controller;
