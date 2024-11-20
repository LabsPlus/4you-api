import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

class CustomerRepository {

    constructor() {

        this.databaseUrl = process.env.DATABASE_URL;
        this.prisma = new PrismaClient(
            {
                datasources: {
                    db: {
                        url: this.databaseUrl,
                    }
                }
            }
        );
    }

    async getCustomerInfo(customerEmail) {
        return await this.prisma.customer.findUnique({
            where: {
                email: customerEmail
            }
        });
    }

    async createCustomer(customer) {
        return await this.prisma.customer.create({
            data: customer
        });
    }

    async updateCustomer(customer) {
        return await this.prisma.customer.update({
            where: {
                email: customer.email
            },
            data: customer
        });
    }

    async deleteCustomer(customerEmail) {
        return await this.prisma.customer.delete({
            where: {
                email: customerEmail
            }
        });
    }
}

export default CustomerRepository;