import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import session from "express-session";
import * as productRepository from "./repositories/productRepository.js";
import * as productService from "./services/productService.js"
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cart = [];

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/product/:productId", async (req, res) => {
  const productId = req.params.productId;

  const productFound = await productService.findProductById(productId)
  
  res.render("product", { product: productFound });
});

app.get("/category/:categorySlug", async (req, res) => {
  const categorySlug = req.params.categorySlug;

  try {
    const categories = await productRepository.getCategories()
    const products  = await productRepository.getProducts()
    const categoryFound = categories.find(
      (category) => category.slug === categorySlug
    );
    const categoryId = categoryFound === undefined ? -1 : categoryFound.id;

    const productsBySlug = products.filter(
      (product) => product.categoryId === categoryId
    );

    res.render("categories", { products: productsBySlug });
  } catch (err) {
    console.error(err);
    return [];
  }
});

app.post("/cart/add", (req, res) => {
  const productId = parseInt(req.body.productId);
  const cartItem = { productId, quantity: 1 };

  if (!req.session.cart) {
    req.session.cart = [];
    req.session.cart.push(cartItem);
  } else {
    const indexProductFound = req.session.cart.findIndex(
      (product) => product.productId === productId
    );
    if (indexProductFound >= 0) {
      req.session.cart[indexProductFound].quantity++;
    } else {
      req.session.cart.push(cartItem);
    }
  }

  // donde esta el carrito? : data.json

  // veamos el carrito
  console.log(req.session);

  res.redirect("/");
});

app.listen(PORT, () =>
  console.log(`Servidor FullStock escuchando en http://localhost:${PORT}`)
);
