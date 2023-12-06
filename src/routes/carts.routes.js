import { Router } from "express";
import { CartsController } from "../controllers/carts.controller.js";
import { checkRole } from "../middlewares/auth.js";

const router = Router();

//get all carts
router.get("/", CartsController.getCarts);

//add cart
router.post("/", CartsController.addCart);

//get cart id
router.get("/:cid", CartsController.getCartById);

//delete cart
router.delete("/:cid", CartsController.deleteCart);

//agregar productos al arreglo del carrito seleccionado (solo users)
router.post("/:cid/products/:pid", CartsController.addProduct);

//eliminar product del cart
router.delete("/:cid/products/:pid", CartsController.deleteProductCart);

//actualizar quantity del product en el cart
router.put("/:cid/products/:pid", CartsController.updateProductCart);

//purchase
router.post("/:cid/purchase", CartsController.purchaseCart);

export { router as cartsRouter };
