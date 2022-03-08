"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + "/../.env" });
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.set("view engine", "pug");
app.set("views", __dirname + "/../views");
app.get("/", (req, res, next) => {
    res.render("main", { _desc: "Hello Typescript" });
});
app.use(((err, req, res, next) => {
    res.status(500).send("Somthing broken!");
}));
app.listen(PORT, () => console.log("Running on TS-Express Server"))
    .on("error", (err) => { throw new Error(`${err.name}: ${err.message}`); });
