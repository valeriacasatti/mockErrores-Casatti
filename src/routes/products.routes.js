import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";

const router = Router();

//get products
router.get("/", ProductsController.getProducts);
//add product
router.post("/", ProductsController.addProduct);
//get product by id
router.get("/:pid", ProductsController.getProductById);
//update product
router.put("/:pid", ProductsController.updateProduct);
//delete product
router.delete("/:pid", ProductsController.deleteProduct);

//MOCKING PRODUCTS
router.post("/mockingproducts", ProductsController.getMockingProducts);

export { router as productsRouter };
