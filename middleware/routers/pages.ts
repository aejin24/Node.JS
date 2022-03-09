import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { RequestParams } from "../interfaces/request";

const router = express.Router();

router.get("/:id", (req: Request<RequestParams>, res: Response, next: NextFunction) => {
    if (req.params.id === "0") {
        next("route");
    } else {
        next();
    }
}, (req: Request<RequestParams>, res: Response, next: NextFunction) => {
    res.send("id is not 0");
});

router.get("/:id", (req: Request<RequestParams>, res: Response, next: NextFunction) => {
    let id: string = req.params.id;

    res.send(`id is ${id}`);
});

router.use(((err, req, res, next) => {
    res.status(500).send("에러 처리 미들웨어");
}) as ErrorRequestHandler);
  
export default router;