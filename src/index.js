const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(expressEjsLayouts);

app.get("/", (_, res) => {
  res.render("home");
});

app.get("/product/:productId", (req, res) => {
  const productId = req.params.productId;

  const filePath = path.join(__dirname, "..", "/data", "data.json");
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const { products } = JSON.parse(data);

    const productFound = products.find(
      (product) => product.id === parseInt(productId)
    );

    console.log(productFound);
    res.render("product", {product : productFound});
  });
});

app.get("/category/:categorySlug", (req, res) => {
  const categorySlug = req.params.categorySlug;
  const filePath = path.join(__dirname, "..", "/data", "data.json");

  console.log(categorySlug); // polos
  console.log(filePath);

  // leer data.json
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const { categories, products } = JSON.parse(data);

    const categoryFound = categories.find(
      (category) => category.slug === categorySlug
    );
    const categoryId = categoryFound === undefined ? -1 : categoryFound.id;
    console.log(categoryId);
    // polos => 1

    const productsBySlug = products.filter(
      (product) => product.categoryId === categoryId
    );
    console.log(productsBySlug);

    res.render("categories", { products: productsBySlug });
  });
});

app.listen(PORT, () =>
  console.log(`Servidor FullStock escuchando en http://localhost:${PORT}`)
);
