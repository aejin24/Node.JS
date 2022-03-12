import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { Error } from "interfaces/render";
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
        } as Error );
    }
});

authRouter.use(((err, req, res, next) => {
    res.status(500).send(err);
}) as ErrorRequestHandler);

export default authRouter;