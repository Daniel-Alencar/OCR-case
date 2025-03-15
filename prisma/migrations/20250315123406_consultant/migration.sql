/*
  Warnings:

  - Added the required column `password` to the `Consultant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Consultant" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExpiration" TIMESTAMP(3);
