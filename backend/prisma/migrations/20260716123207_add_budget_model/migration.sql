/*
  Warnings:

  - You are about to drop the column `limit` on the `Budget` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,category,month,year]` on the table `Budget` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `month` on the `Budget` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `year` on the `Budget` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Budget_userId_category_month_key";

-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "limit",
ADD COLUMN     "amount" DECIMAL(14,2) NOT NULL,
DROP COLUMN "month",
ADD COLUMN     "month" INTEGER NOT NULL,
DROP COLUMN "year",
ADD COLUMN     "year" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Budget_userId_category_month_year_key" ON "Budget"("userId", "category", "month", "year");
