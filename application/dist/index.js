"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + "/../.env" });
const PORT = process.env.PORT;
console.log(PORT);
const app = (0, express_1.default)();
app.get("/", (req, res, next) => {
    res.send("Hello Typescript Express Server")
        .on("error", (err) => console.log(err));
});
app.listen(PORT, () => console.log("Running on TS-Express Server"));
