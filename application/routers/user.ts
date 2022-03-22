import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";

import { ErrorModel } from "interfaces/render";

const userRouter = express.Router();

userRouter.get("/", (req: Request, res: Response, next: NextFunction) => {

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