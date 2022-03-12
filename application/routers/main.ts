import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const mainRouter = express.Router();

mainRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.render("main");
});

mainRouter.use(((err, req, res, next) => {
    res.status(500).send(err);
}) as ErrorRequestHandler);
  
export default mainRouter;