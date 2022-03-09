import express, { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { Main } from "@interface/render";
import { StringOrNumber } from "@customTypes/union";

dotenv.config({path: __dirname + "\\.env"});

const PORT: StringOrNumber = process.env.PORT || 3000;

const app: express.Application = express();

app.set("view engine", "pug");
app.set("views", __dirname + "\\views");

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.render("main", { _desc: "Hello Typescript" } as Main);
});

app.use(((err, req, res, next) => {
    res.status(500).send(err.message);
}) as ErrorRequestHandler);

app.listen(PORT, () => console.log("Running on TS-Express Server"))
    .on("error", (err) => { throw new Error(`${err.name}: ${err.message}`) });