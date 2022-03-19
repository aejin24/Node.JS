import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express";

import { ErrorModel } from "interfaces/render";
import { UserModel } from "interfaces/router";
import { authData } from "../const";

const authRouter = express.Router();

authRouter.post("/login", (req: Request, res: Response, next: NextFunction) => {
    const reqBody = req.body as UserModel;

    if (reqBody.email === authData.email && reqBody.password === authData.password) {
        res.redirect("/main");
    } else {
        next(Error);
    }
});

authRouter.use(((err, req, res, next) => {
    let _error: string = "";

    if (res.statusCode === 404) {
        _error = "Page Not Found";
    } else {
        _error = "Something Broken!!";
    }

    res.render("error", { _error: _error, moveTo: "LOGIN", path: "/" } as ErrorModel );
}) as ErrorRequestHandler);

export default authRouter;