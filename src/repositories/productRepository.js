import fs from "fs/promises";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function getProducts() {
  try {
    const filePath = path.join(__dirname, "..", "..", "/data", "data.json")
    console.log(filePath)
    const data = await fs.readFile(filePath, "utf-8")
    const { products } = JSON.parse(data);
    return products
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function getCategories() {
  try {
    const filePath = path.join(__dirname, "..", "..", "/data", "data.json")
    console.log(filePath)
    const data = await fs.readFile(filePath, "utf-8")
    const { categories } = JSON.parse(data);
    return categories
  } catch (err) {
    console.error(err)
    return []
  }
}
