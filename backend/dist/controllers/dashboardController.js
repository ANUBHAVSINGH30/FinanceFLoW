import { DashboardService } from "../services/dashboardService.js";
export class DashboardController {
    static async getSummary(req, res, next) {
        try {
            const { month, year } = req.validatedQuery;
            const summary = await DashboardService.getSummary(req.userId, month, year);
            return res.status(200).json({
                success: true,
                data: summary
            });
        }
        catch (error) {
            next(error);
        }
    }
    ;
    static async getCategoryBreakdown(req, res, next) {
        try {
            const { month, year } = req.validatedQuery;
            const breakdown = await DashboardService.getCategoryBreakdown(req.userId, month, year);
            return res.status(200).json({
                success: true,
                data: breakdown
            });
        }
        catch (error) {
            next(error);
        }
    }
    ;
    static async getMonthlyTrend(req, res, next) {
        try {
            const { year } = req.validatedQuery;
            const montly = await DashboardService.getMonthlyTrend(req.userId, year);
            return res.status(200).json({
                success: true,
                data: montly
            });
        }
        catch (error) {
            next(error);
        }
    }
    ;
}
;
