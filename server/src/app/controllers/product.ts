import {
    DEFAULT_PAGINATION_LIMIT,
    DEFAULT_PAGINATION_PAGE,
} from "@/config/const";
import { queries } from "@/lib/db/queries";
import { AppError } from "@/lib/helpers";
import { CResponse, handleError } from "@/lib/utils";
import type { Request, Response } from "express";

class ProductController {
    async paginate(req: Request, res: Response) {
        try {
            const { page: pageRaw, limit: limitRaw } = req.query;

            const page =
                parseInt(pageRaw as string, 10) || DEFAULT_PAGINATION_PAGE;
            const limit =
                parseInt(limitRaw as string, 10) || DEFAULT_PAGINATION_LIMIT;

            const data = await queries.product.paginate({ page, limit });

            CResponse({ res, data });
        } catch (err) {
            handleError(err, res);
        }
    }

    async get(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id)
                throw new AppError("Product ID is required", "BAD_REQUEST");

            const data = await queries.product.get(id);
            if (!data) throw new AppError("Product not found", "NOT_FOUND");

            CResponse({ res, data });
        } catch (err) {
            handleError(err, res);
        }
    }
}

export const productController = new ProductController();
