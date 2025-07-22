const express = require("express")

const app = express()
const PORT = 3000

app.get("/", (_, res) => {
  res.end("Hola Codeable")
})

app.listen(PORT, () => console.log(`Servidor FullStock escuchando en http://localhost:${PORT}`))