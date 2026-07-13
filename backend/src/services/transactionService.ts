import prisma from "../config/db.js";
import type { CreateTransactionInput } from "../validators/transaction.validator.js";

export class TransactionServices {
    static async createTransaction(
        data: CreateTransactionInput,
        userId: string
    ) {
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

    static async getTransactions(userId: string) {
    return prisma.transaction.findMany({
        where: {
            userId
        },
        orderBy: {
            date: "desc"
        }
    });
}
}