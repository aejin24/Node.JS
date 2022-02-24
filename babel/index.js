import express from "express";
import constant from "@constant/constant";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send(`Hello Babel. My Name is ${constant.NAME}`);
});

app.listen(PORT, () => {
    console.log(`Connected ${PORT} port`);
});