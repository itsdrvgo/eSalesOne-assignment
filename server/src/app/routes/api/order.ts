import { controllers } from "@/app/controllers";
import { Router } from "express";

const router = Router({ mergeParams: true });

router.get("/:id", controllers.order.get);
router.post("/", controllers.order.create);

export { router as orderRouter };
