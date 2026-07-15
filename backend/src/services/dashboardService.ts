import prisma from "../config/db.js";

export class DashboardService{
    static async getSummary(userId: string) {
        const [
            incomeSummary,
            expenseSummary,
            transactionCount,
            ] = await Promise.all([
            prisma.transaction.aggregate({
                where: {
                    userId,
                    type: "income",
                },
                _sum: {
                    amount: true,
                },
            }),

            prisma.transaction.aggregate({
                where: {
                    userId,
                    type: "expense",
                },
                _sum: {
                    amount: true,
                },
            }),

            prisma.transaction.count({
                where: {
                    userId,
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
    }
}