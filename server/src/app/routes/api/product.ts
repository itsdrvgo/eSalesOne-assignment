import { controllers } from "@/app/controllers";
import { Router } from "express";

const router = Router({ mergeParams: true });

router.get("/", controllers.product.paginate);
router.get("/:id", controllers.product.get);

export { router as productRouter };
