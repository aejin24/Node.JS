import express from "express";
import dotenv from "dotenv";

dotenv.config({path: __dirname + "/../.env"});

const PORT = process.env.PORT;

const app: express.Application = express();

app.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("Hello Typescript Express Server");
});

app.listen(PORT, () => console.log("Running on TS-Express Server"))
    .on("error", (err) => { throw new Error(`${err.name}: ${err.message}`) });