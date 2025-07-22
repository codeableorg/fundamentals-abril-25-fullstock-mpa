const express = require("express")
const expressEjsLayouts = require("express-ejs-layouts")

const app = express()
const PORT = 3000

app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(expressEjsLayouts)

app.get("/", (_, res) => {
  res.render("home")
})

app.get("/product", (_, res) => {
  res.render("product-section")
})

app.listen(PORT, () => console.log(`Servidor FullStock escuchando en http://localhost:${PORT}`))