/*
  Warnings:

  - Added the required column `date` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
