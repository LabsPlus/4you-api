-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" CHAR(50) NOT NULL,
    "email" CHAR(50) NOT NULL,
    "whatsapp" CHAR(50) NOT NULL,
    "taxid" CHAR(50) NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "status" CHAR(2) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friend" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "name" CHAR(50) NOT NULL,
    "whatsapp" CHAR(50) NOT NULL,
    "email" CHAR(50) NOT NULL,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
