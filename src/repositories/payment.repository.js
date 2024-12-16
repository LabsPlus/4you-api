import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

class PaymentRepository {

    constructor() {
        this.databaseUrl = process.env.DATABASE_URL;
        this.prisma = new PrismaClient({
            datasources: {
                db: {
                    url: this.databaseUrl,
                }
            }
        });
    }

    async getPaymentInfo(paymentId) { 
        try {
            return await this.prisma.payment.findUnique({
                where: {
                    id: paymentId  
                }
            });

        } catch (error) {
            throw new Error('Error getting payment info' + error.message);
        }
    }

    async createPayment(payment) {
        try {
            return await this.prisma.payment.create({
                data: payment
            });

        } catch (error) {
            throw new Error('Error creating payment' + error.message);
        }
    }

    async updatePayment(paymentId, paymentData) {
        try {
            return await this.prisma.payment.update({
                where: {
                    id: paymentId 
                },
                data: paymentData
            });
        } catch (error) {
            throw new Error('Error updating payment:' + error.message);
        }
    }


    async deletePayment(paymentId) {
        try {
            return await this.prisma.payment.delete({
                where: {
                    id: paymentId  // Alterado para ID
                }
            });

        } catch (error) {
            throw new Error('Error deleting payment ' + error.message);
        }
    }
}

export default PaymentRepository;
