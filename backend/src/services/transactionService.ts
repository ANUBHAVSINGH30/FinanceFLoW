import prisma from "../config/db.js";
import type { CreateTransactionInput, UpdateTransactionInput } from "../validators/transaction.validator.js";
import { AppError } from "../utils/appError.js";
import { NextFunction } from "express";
import { rmSync } from "node:fs";

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
        where:{
                userId
            },
            orderBy: {
                date: "desc"
            }
        });
    }

    static async getTransactionById(
        transactionId: string,
        userId: string
    ) {
        const transaction = await prisma.transaction.findFirst({
            where: {
                id: transactionId,
                userId
            },
        });

        if(!transaction){
            throw new AppError ("Transaction not found", 404);
        }

        return transaction
    }

    static async updateTransaction(
        transactionId: string,
        userId: string,
        data: UpdateTransactionInput
    ){
        const result = await prisma.transaction.updateMany({
            where: {
                id: transactionId,
                userId,
            },
            data,
        });

        if(result.count === 0) {
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


    static async deleteTransaction(
        transactionId: string,
        userId: string
    ) {    
            const result = await prisma.transaction.deleteMany({
                where: {
                    id: transactionId,
                    userId
                },
            });

            if(result.count === 0){
                throw new AppError("Transaction not found", 404);
            }
        };
}

