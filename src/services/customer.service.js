import CustomerRepository from '../repositories/customer.repository.js';
import bcrypt from 'bcryptjs';


class CustomerService {

    constructor() {
        this.customerRepository = new CustomerRepository();
    }

    async getCustomerInfo(customerEmail) {
        try {

            const customer = await this.customerRepository.getCustomerInfo(customerEmail);
            
            if (!customer) {
                throw new Error('Customer not found');
            }
            return customer;
        } catch (error) {
            throw new Error('Error fetching customer info' + error.message);
        }
    }

    async createCustomer(customer) {

        if (!customer) {
            throw new Error('Customer is required');
        }

        try {
            return await this.customerRepository.createCustomer(customer);
        } catch (error) {
            throw new Error('Error creating customer');
        }
    }

    async updateCustomer(customerEmail, customerData) {
        try {
            return await this.customerRepository.updateCustomer(customerEmail, customerData);
        } catch (error) {
            throw new Error('Error updating customer: ' + error.message);
        }
    }
    

    async deleteCustomer(customerEmail) {
        try {
            return await this.customerRepository.deleteCustomer(customerEmail);
        } catch (error) {
            throw new Error('Error deleting customer' + error.message);
        }
    }
}

export default CustomerService;
