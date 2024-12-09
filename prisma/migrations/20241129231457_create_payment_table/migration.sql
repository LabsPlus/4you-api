-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,
    "payment_method" CHAR(50) NOT NULL,
    "payment_status" CHAR(50) NOT NULL,
    "payer_email" CHAR(50) NOT NULL,
    "payer_phone" CHAR(50) NOT NULL,
    "payer_taxid" CHAR(50) NOT NULL,
    "payer_description" CHAR(50) NOT NULL,
    "payer" CHAR(50) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
