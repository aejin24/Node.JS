import express, { Request, Response, ErrorRequestHandler } from "express";

import authRouter from "./auth";
import mainRouter from "./main";

const rootRouter = express.Router();

rootRouter.get("/", (req: Request, res: Response) => {
    res.render("main");
});

rootRouter.use("/auth", authRouter);
rootRouter.use("/main", mainRouter);

rootRouter.use(((err, req, res, next) => {
    res.status(500).send(err);
}) as ErrorRequestHandler);
  
export default rootRouter;