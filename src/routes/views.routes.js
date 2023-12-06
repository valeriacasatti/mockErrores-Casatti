import { Router } from "express";
import { ViewsController } from "../controllers/views.controller.js";
import { checkRole } from "../middlewares/auth.js";

const router = Router();

//shop
router.get("/shop", ViewsController.shop);
//real time products
router.get("/realTimeProducts", ViewsController.products);
//chat
router.get("/chat", checkRole(["user"]), ViewsController.chat);
//cart
router.get("/cart", ViewsController.cart);
//sign up
router.get("/signup", ViewsController.signup);
//login
router.get("/login", ViewsController.login);
//profile
router.get("/profile", ViewsController.profile);

export { router as viewsRouter };
