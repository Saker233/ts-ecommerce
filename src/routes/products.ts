import { Router } from "express";
import { errorHandler } from "../error-handler.js";
import { createProduct } from "../controllers/products.js";
import authMiddleware from "../middlewares/auth.js";

const productsRoutes:Router = Router()

productsRoutes.post('/', [authMiddleware],errorHandler(createProduct))

export default productsRoutes