import { Request, Response, NextFunction } from "express";
import { DashboardService} from "../services/dashboardService.js";


import type { DashboardQuery } from "../validators/dashboard.validator.js";

export class DashboardController {
    static async getSummary(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try{
            const { month, year } = req.validatedQuery as DashboardQuery;

            const summary = await DashboardService.getSummary(
                req.userId!,
                month,
                year
            );

            return res.status(200).json({
                success: true,
                data: summary
            });
        }catch(error) {
            next(error);
        }
    };

    static async getCategoryBreakdown(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try{
            const { month, year } = req.validatedQuery as DashboardQuery;

            const breakdown = await DashboardService.getCategoryBreakdown(
                req.userId!,
                month,
                year
            );

            return res.status(200).json({
                success : true,
                data: breakdown
            });
        }catch(error){
            next(error);
        }
    };


    // static async getMonthlyTrend(
    //     req: Request,
    //     res: Response,
    //     next: NextFunction
    // ) {
    //     try{
    //         const montly = await DashboardService.getMonthlyTrend(
    //             req.userId!
    //         );

    //         return res.status(200).json({
    //             success: true,
    //             data: montly
    //         })
    //     }catch(error){
    //         next(error);
    //     }
    // };
};