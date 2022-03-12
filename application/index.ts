import express from "express";
import dotenv from "dotenv";

import { PORT } from "./const";
import rootRouter from "./routers";

dotenv.config();

const app: express.Application = express();

app.set("view engine", "pug");
app.set("views", __dirname + "\\views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", rootRouter);

app.listen(PORT, () => console.log("Running on TS-Express Server")).on("error", (err) => {
        throw new Error(`${err.name}: ${err.message}`);
    });