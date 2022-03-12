import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";

import { RequestParams } from "interfaces/request";
import { Main } from "interfaces/render";

const mainRouter = express.Router();

mainRouter.get("/", (req: Request<RequestParams>, res: Response, next: NextFunction) => {
    res.render("main", { _desc: "wow" } as Main);
});

mainRouter.use(((err, req, res, next) => {
    res.status(500).send("Something Broken");
}) as ErrorRequestHandler);
  
export default mainRouter;