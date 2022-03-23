import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { readdirSync, readFileSync } from "fs";

import { ErrorModel } from "interfaces/render";
import { CreateDeleteRequest } from "interfaces/router";
import { staticDataPath } from "../const";

const mainRouter = express.Router();

mainRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
    try {
        const datas = readdirSync(staticDataPath, "utf8").toString().split(",");

        res.render("main", { _data: datas });
    } catch (error) {
        next(Error);
    }
});

mainRouter.get("/:email", (req: Request, res: Response, next: NextFunction) => {
    try {
        const datas = readdirSync(staticDataPath, "utf8").toString().split(",");

        let reqParams = req.params as unknown as CreateDeleteRequest;
        let getData = readFileSync(staticDataPath + reqParams.email, "utf-8").toString();
        
        res.render("main", { _data: datas, _desc: getData });
    } catch (error) {
        next(Error);
    }
});

mainRouter.use(((err, req, res, next) => {
    console.log(err);

    let _error: string = "";

    if (res.statusCode === 404) {
        _error = "Page Not Found";
    } else {
        _error = "Something Broken!!";
    }

    res.render("error", { _error: _error, moveTo: "MAIN", path: "/main" } as ErrorModel );
}) as ErrorRequestHandler);

export default mainRouter;