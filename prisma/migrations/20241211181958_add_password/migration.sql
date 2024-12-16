-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "password" TEXT;

-- AlterTable
ALTER TABLE "Friend" ADD COLUMN     "password" TEXT;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "payer_password" TEXT;
