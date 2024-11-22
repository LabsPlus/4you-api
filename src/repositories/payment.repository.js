import { PrismaClient } from "@prisma/client/extension";
import dotenv from "dotenv";

dotenv.config();

class PaymentRepository{

    constructor() {

        this.databaseUrl = process.env.DATABASE_URL;

        this.prisma = new PrismaClient({
            datasources: {
                db: {
                    url: this.databaseUrl,
                },
            },
        });
    }

    async creatPayment(payment) {
        return await this.prisma.payment.creat ({
            data: payment,
        });
    }

    async getPaymentInfo(paymentEmail){
        return await this.prisma.payment.findUnique({
             where: {
                email: paymentEmail,
            },
        });
    }
    
    async deletePayment(paymentEmail) {
        return await this.prisma.payment.delete({
            where: {
                data: paymentEmail,
            },

        });
    }
}

export default PaymentRepository;