const express      = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser("23423456325659562@!@#!@#"));


let products = {
    1: {title: "The history of web 1"},
    2: {title: "The next web"}
}

app.get("/products", (req, res) => {
    let output = "<h1>Products</h1> <ul>";
    for(const product in products){
        output += `
            <li>
                <a href="/cart/${product}">${products[product].title}</a>
            </li>
        `;
    }
    output += "</ul> <a href='/cart'>Cart</a>";
    res.send(output);
});

app.get("/cart/:id", (req, res) => {
    let id = req.params.id;
    let cart;
    /**
     * cart = {
     *  1: 1 //제품 id, 카트에 담긴 제품 수
     * }
    */

    if(req.signedCookies.cart) cart = req.signedCookies.cart;
    else cart = {};

    if(!cart[id]) cart[id] = 0;
    cart[id] = parseInt(cart[id]) + 1;

    res.cookie("cart", cart, {signed: true});
    res.redirect("/cart");
});

app.get("/cart", (req, res) => {
    let cart = req.signedCookies.cart;
    let output = "<h1>Cart</h1> <ul>";

    if(!cart) res.render("Empty!");
    else {
        for(const id in cart){
            output += `<li>${products[id].title} (${cart[id]})</li>`;
        }
        output += "</ul> <a href='/products'>Product List</a>"
    }
    res.send(output);
});

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