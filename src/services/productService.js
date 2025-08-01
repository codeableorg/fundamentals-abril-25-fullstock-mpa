import * as productRepository from "../repositories/productRepository.js"

export async function findProductById(productId) {
  const products = await productRepository.getProducts()
  const productFound = products.find(
        (product) => product.id === parseInt(productId)
      );
  return productFound
}