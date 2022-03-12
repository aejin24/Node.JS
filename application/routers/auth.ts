import express, { Request, Response } from "express";

import { Error } from "interfaces/render";
import { UserModel } from "interfaces/router";
import { authData } from "../const";

const authRouter = express.Router();

authRouter.post("/login", (req: Request, res: Response) => {
    const reqBody = req.body as UserModel;

    if (reqBody.email === authData.email && reqBody.password === authData.password) {
        res.redirect("/main");
    } else {
        res.render("error", {
            _error: "Please Retry!!",
            moveTo: "LOGIN",
            path: "/"
        } as Error );
    }
});

export default authRouter;