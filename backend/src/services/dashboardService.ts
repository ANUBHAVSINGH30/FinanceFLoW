import prisma from "../config/db.js";

export class DashboardService{
    static async getSummary(userId: string, month: number, year: number) {

        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

        const [
            incomeSummary,
            expenseSummary,
            transactionCount,
            ] = await Promise.all([
            prisma.transaction.aggregate({
                where: {
                    userId,
                    type: "income",
                    date: {
                        gte: startOfMonth,
                        lte: endOfMonth,
                    },
                },
                _sum: {
                    amount: true,
                },
            }),

            prisma.transaction.aggregate({
                where: {
                    userId,
                    type: "expense",
                    date: {
                        gte: startOfMonth,
                        lte: endOfMonth,
                    },
                },
                _sum: {
                    amount: true,
                },
            }),

            prisma.transaction.count({
                where: {
                    userId,
                    date: {
                        gte: startOfMonth,
                        lte: endOfMonth,
                    },
                },
            }),
        ]);

        const totalIncome = incomeSummary._sum.amount?.toNumber() ?? 0;
        const totalExpense = expenseSummary._sum.amount?.toNumber() ?? 0;
        
        const balance = totalIncome - totalExpense;

        return {
            totalIncome,
            totalExpense,
            transactionCount,
            balance
        }
    };


    static async getCategoryBreakdown(userId: string, month: number, year: number){
        
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);
        
        const categoryBreakdown = await prisma.transaction.groupBy({
            where: {
                userId,
                type: "expense",
                date: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                },
            },
            by: ["category"],

            _sum: {
                amount: true
            },
            orderBy: {
                _sum: {
                    amount: "desc"
                }
            }
        });

        return categoryBreakdown.map((item) => ({
            category: item.category,
            amount: item._sum.amount?.toNumber() ?? 0,
        }));
    };


//     static async getMonthlyTrend(userId: string){
//         const monthlyTrend = await prisma.transaction.
//     }
}