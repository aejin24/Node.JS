import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { readFileSync } from "fs";

import { ErrorModel } from "interfaces/render";
import { staticDataPath } from "../const";

const mainRouter = express.Router();

mainRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = readFileSync(staticDataPath, "utf8").toString().split("\n");

        res.render("main", { _data: data});
    } catch (error) {
        console.log(error);
        next(Error);
    }
});

mainRouter.use(((err, req, res, next) => {
    let _error: string = "";

    if (res.statusCode === 404) {
        _error = "Page Not Found";
    } else {
        _error = "Something Broken!!";
    }

    res.render("error", { _error: _error, moveTo: "MAIN", path: "/main" } as ErrorModel );
}) as ErrorRequestHandler);

export default mainRouter;