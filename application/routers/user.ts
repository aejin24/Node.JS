import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { writeFileSync, unlinkSync, rename } from "fs";

import { ErrorModel } from "interfaces/render";
import { CreateDeleteRequest, UpdateRequest } from "interfaces/router";
import { staticDataPath } from "../const";

const userRouter = express.Router();

userRouter.post("/create", (req: Request, res: Response, next: NextFunction) => {
    const reqBody = req.body as CreateDeleteRequest;

    try {
        writeFileSync(staticDataPath + reqBody.email, reqBody.email);
        res.redirect("/main");
    } catch (error) {
        next(Error);
    }
});

userRouter.post("/delete", (req: Request, res: Response, next: NextFunction) => {
    const reqBody = req.body as CreateDeleteRequest;

    try {
        unlinkSync(staticDataPath + reqBody.email);
        res.redirect("/main");
    } catch (error) {
        next(Error);
    }
});

userRouter.post("/update/:email", (req: Request, res: Response, next: NextFunction) => {
    let reqParams = req.params as unknown as CreateDeleteRequest;
    const reqBody = req.body as UpdateRequest;

    try {
        rename(staticDataPath + reqParams.email, staticDataPath + reqBody.new, (err) => {
            if (err) next(Error);
        });

        writeFileSync(staticDataPath + reqParams.email, reqBody.new, "utf8");
        res.redirect("/main");
    } catch (error) {
        next(Error);
    }
});

userRouter.use(((err, req, res, next) => {
    let _error: string = "";

    if (res.statusCode === 404) {
        _error = "Page Not Found";
    } else {
        _error = "Something Broken!!";
    }

    res.render("error", { _error: _error, moveTo: "MAIN", path: "/main" } as ErrorModel );
}) as ErrorRequestHandler);

export default userRouter;