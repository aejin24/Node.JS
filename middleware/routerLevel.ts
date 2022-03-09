import express from "express";
import dotenv from "dotenv";

import pageRouter from "./routers/pages";

dotenv.config({path: __dirname + "/.env"});

const PORT: string | number = process.env.PORT || 3000;

const app = express();

app.use("/pages", pageRouter);

app.listen(PORT, () => console.log("Running on TS-Express Server\n"))
    .on("error", (err) => { throw new Error(`${err.name}: ${err.message}`) });