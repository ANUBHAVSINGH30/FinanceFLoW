import prisma from "../config/db.js";
import { AppError } from "../utils/appError.js";
//create Transaction.
export class TransactionServices {
    static async createTransaction(data, userId) {
        const transaction = await prisma.transaction.create({
            data: {
                title: data.title,
                amount: data.amount,
                type: data.type,
                category: data.category,
                date: data.date,
                note: data.note,
                isRecurring: data.isRecurring,
                userId,
            },
        });
        return transaction;
    }
    //get transaction business logic
    static async getTransactions(userId, page, limit, search, category, type, startDate, endDate, sortBy = "date", orderby = "desc") {
        const skip = (page - 1) * limit;
        const where = {
            userId,
            ...(search && {
                OR: [
                    {
                        title: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        note: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                ],
            }),
            ...(category && {
                category,
            }),
            ...(type && {
                type,
            }),
            ...(startDate &&
                endDate && {
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            }),
        };
        const total = await prisma.transaction.count({
            where,
        });
        const transactions = await prisma.transaction.findMany({
            where,
            orderBy: [
                {
                    [sortBy]: orderby
                },
                {
                    createdAt: "desc"
                },
            ],
            skip,
            take: limit,
        });
        return {
            transactions,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    //get transaction by ID
    static async getTransactionById(transactionId, userId) {
        const transaction = await prisma.transaction.findFirst({
            where: {
                id: transactionId,
                userId
            },
        });
        if (!transaction) {
            throw new AppError("Transaction not found", 404);
        }
        return transaction;
    }
    //update transaction
    static async updateTransaction(transactionId, userId, data) {
        const result = await prisma.transaction.updateMany({
            where: {
                id: transactionId,
                userId,
            },
            data,
        });
        if (result.count === 0) {
            throw new AppError("Transaction not found", 404);
        }
        const updateTransaction = await prisma.transaction.findFirst({
            where: {
                id: transactionId,
                userId
            },
        });
        if (!updateTransaction) {
            throw new AppError("Transaction not found", 404);
        }
        return updateTransaction;
    }
    //delete transaction
    static async deleteTransaction(transactionId, userId) {
        const result = await prisma.transaction.deleteMany({
            where: {
                id: transactionId,
                userId
            },
        });
        if (result.count === 0) {
            throw new AppError("Transaction not found", 404);
        }
    }
    ;
}
