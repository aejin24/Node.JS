import express from "express";
import dotenv from "dotenv";

import { PORT } from "./const";
import { mainRouter } from "./routers";

dotenv.config();

const app: express.Application = express();

app.set("view engine", "pug");
app.set("views", __dirname + "\\views");

app.use("/", mainRouter);

app.listen(PORT, () => console.log("Running on TS-Express Server"))
    .on("error", (err) => {
        throw new Error(`${err.name}: ${err.message}`) 
    });