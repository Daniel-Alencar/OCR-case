/*
  Warnings:

  - You are about to drop the column `accepted` on the `Consultant` table. All the data in the column will be lost.
  - You are about to drop the column `areaOfActivity` on the `Consultant` table. All the data in the column will be lost.
  - You are about to drop the column `availability` on the `Consultant` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Consultant` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Consultant` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Consultant` table. All the data in the column will be lost.
  - You are about to drop the column `resetToken` on the `Consultant` table. All the data in the column will be lost.
  - You are about to drop the column `resetTokenExpiration` on the `Consultant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Consultant" DROP COLUMN "accepted",
DROP COLUMN "areaOfActivity",
DROP COLUMN "availability",
DROP COLUMN "description",
DROP COLUMN "password",
DROP COLUMN "phone",
DROP COLUMN "resetToken",
DROP COLUMN "resetTokenExpiration";
