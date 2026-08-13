import prisma from "../config/db.js";
export class DashboardService {
    static async getSummary(userId, month, year) {
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);
        const [incomeSummary, expenseSummary, transactionCount, lifetimeIncome, lifetimeExpense,] = await Promise.all([
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
        ]);
        const totalIncome = incomeSummary._sum.amount?.toNumber() ?? 0;
        const totalExpense = expenseSummary._sum.amount?.toNumber() ?? 0;
        const overallIncome = lifetimeIncome._sum.amount?.toNumber() ?? 0;
        const overallExpense = lifetimeExpense._sum.amount?.toNumber() ?? 0;
        const balance = overallIncome - overallExpense;
        return {
            totalIncome,
            totalExpense,
            transactionCount,
            balance
        };
    }
    ;
    static async getCategoryBreakdown(userId, month, year) {
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
    }
    ;
    static async getMonthlyTrend(userId, year) {
        const startofYear = new Date(year, 0, 1);
        const endofYear = new Date(year, 11, 31, 23, 59, 59, 999);
        const transaction = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: startofYear,
                    lte: endofYear,
                },
            },
            orderBy: {
                type: "asc"
            },
        });
        const monthlyTrend = Array.from({ length: 12 }, (_, index) => ({
            month: new Date(0, index).toLocaleString("default", {
                month: "short",
            }),
            income: 0,
            expense: 0,
        }));
        for (const transactions of transaction) {
            const monthIndex = transactions.date.getMonth();
            if (transactions.type === "income") {
                monthlyTrend[monthIndex].income += transactions.amount.toNumber();
            }
            else {
                monthlyTrend[monthIndex].expense += transactions.amount.toNumber();
            }
        }
        return monthlyTrend;
    }
}
