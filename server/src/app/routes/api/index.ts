import { Router } from "express";
import { orderRouter } from "./order";
import { productRouter } from "./product";

const router = Router();

router.use("/orders", orderRouter);
router.use("/products", productRouter);

export { router as apiRouter };
