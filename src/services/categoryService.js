import * as productRepository from "../repositories/productRepository.js"

export async function findCategoryBySlug(slug) {
  const categories = await productRepository.getCategories()
  const products  = await productRepository.getProducts()
  const categoryFound = categories.find(
    (category) => category.slug === slug
  );
  const categoryId = categoryFound === undefined ? -1 : categoryFound.id;

  const productsBySlug = products.filter(
    (product) => product.categoryId === categoryId
  );

  return  productsBySlug

}