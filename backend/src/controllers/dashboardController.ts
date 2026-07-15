import { Request, Response, NextFunction } from "express";
import { DashboardService} from "../services/dashboardService.js";
import { success } from "zod";

export class DashboardController {
    static async getSummary(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try{
            const summary = await DashboardService.getSummary(
                req.userId!
            );

            return res.status(200).json({
                success: true,
                data: summary
            });
        }catch(error) {
            next(error);
        }
    };
};