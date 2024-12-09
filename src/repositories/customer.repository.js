import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

class CustomerRepository {
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

    async getCustomerInfo(customerEmail) {
        try {
            return await this.prisma.customer.findUnique({
                where: {
                    email: customerEmail
                }
            });
        } catch (error) {
            throw new Error('Error getting customer info: ' + error.message);
        }
    }

    async createCustomer(customer) {
        try {
            return await this.prisma.customer.create({
                data: customer
            });
        } catch (error) {
            throw new Error('Error creating customer: ' + error.message);
        }
    }
    async updateCustomer(customerEmail, customerData) {
        try {
            return await this.prisma.customer.update({
                where: {
                    email: customerEmail,
                },
                data: customerData,
            });
        } catch (error) {
            throw new Error('Error updating customer: ' + error.message);
        }
    }
    

    async deleteCustomer(customerEmail) {
        try {
            return await this.prisma.customer.delete({
                where: {
                    email: customerEmail
                }
            });
        } catch (error) {
            throw new Error('Error deleting customer: ' + error.message);
        }
    }
}

export default CustomerRepository;