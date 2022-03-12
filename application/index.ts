import express from "express";
import dotenv from "dotenv";

import { PORT } from "./const";
import { authRouter, mainRouter } from "./routers";

dotenv.config();

const app: express.Application = express();

app.set("view engine", "pug");
app.set("views", __dirname + "\\views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", mainRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => console.log("Running on TS-Express Server"))
    .on("error", (err) => {
        throw new Error(`${err.name}: ${err.message}`) 
    });