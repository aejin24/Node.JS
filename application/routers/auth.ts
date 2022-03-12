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
        res.render("error", {
            _error: "Please Retry!!",
            moveTo: "LOGIN",
            path: "/"
        } as ErrorModel );

        next(Error);
    }
});

authRouter.use(((err, req, res, next) => {
    console.log("Error: Check authData and requestData match");
}) as ErrorRequestHandler);

export default authRouter;