/*
  Warnings:

  - Made the column `password` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `Friend` required. This step will fail if there are existing NULL values in that column.
  - Made the column `payer_password` on table `Payment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "password" SET NOT NULL;

-- AlterTable
ALTER TABLE "Friend" ALTER COLUMN "password" SET NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "payer_password" SET NOT NULL;
