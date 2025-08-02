import * as productService from "../services/productService.js"

export async function getProduct(req, res) {
  const productId = req.params.productId;

  const productFound = await productService.findProductById(productId)
  
  res.render("product", { product: productFound });
}