/*
  Warnings:

  - You are about to drop the column `whatsapp` on the `Customer` table. All the data in the column will be lost.
  - The `status` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `whatsapp` on the `Friend` table. All the data in the column will be lost.
  - The `payment_status` column on the `Payment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusCustomer" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('COMPLETED', 'PENDING', 'FAILED');

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "whatsapp",
ADD COLUMN     "phone" CHAR(50) NOT NULL DEFAULT '',
DROP COLUMN "status",
ADD COLUMN     "status" "StatusCustomer" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Friend" DROP COLUMN "whatsapp",
ADD COLUMN     "phone" CHAR(50) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "payment_status",
ADD COLUMN     "payment_status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "payer_phone" SET DEFAULT '';
