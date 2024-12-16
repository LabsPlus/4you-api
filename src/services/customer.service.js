import CustomerRepository from '../repositories/customer.repository.js';
import bcrypt from 'bcryptjs';


class CustomerService {

    constructor() {
        this.customerRepository = new CustomerRepository();
    }

    async getCustomerInfo(customerEmail) {

        if (!customerEmail) {
            throw new Error('Customer is required');
        }

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
            throw new Error('Customer data is required');
        }

        if (!customer.password) {
            throw new Error('Password is required');
        }

        try {

            customer.password = await bcrypt.hash(customer.password, 10);

            return await this.customerRepository.createCustomer(customer);
        } catch (error) {
            throw new Error('Error creating customer');
        }
    }

    async updateCustomer(customerEmail, customerData) {

        if(!customerEmail) {
            throw new Error('Email is required');
        }
        if(!customerData) {
            throw new Error('Customer data is required');
        }

        try {

         if('password' in customerData) {
            throw new Error('Password cannot be updated');
         }
            return await this.customerRepository.updateCustomer(customerEmail, customerData);
        } catch (error) {
            throw new Error('Error updating customer: ' + error.message);
        }
    }
    

    async deleteCustomer(customerEmail) {
        if(!customerEmail) {
            throw new Error('Customer email is required');
        }

        try {
            return await this.customerRepository.deleteCustomer(customerEmail);
        } catch (error) {
            throw new Error('Error deleting customer' + error.message);
        }
    }
}

export default CustomerService;
