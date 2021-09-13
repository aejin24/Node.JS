const express      = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser("23423456325659562@!@#!@#"));

app.get("/count", (req, res) => {
    let count;
    if(req.signedCookies.count){
        count = parseInt(req.signedCookies.count);
    }else{
        count = 0;
    }
    count += 1;

    res.cookie("count", count, {signed: true});
    res.send("count: " + count);
});

app.listen(5000, console.log("Running on 5000"));