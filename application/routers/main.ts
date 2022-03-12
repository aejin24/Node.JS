import express, { Request, Response, NextFunction } from "express";

const mainRouter = express.Router();

mainRouter.get("/", (req: Request, res: Response) => {
    res.send("login success");
});

export default mainRouter;