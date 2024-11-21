import CustomerRepository from '../repositories/customer.repository.js';

class CustomerService {
    
    constructor() {
        this.customerRepository = new CustomerRepository();
    }

    async getCustomerInfo(customerEmail) {
        return await this.customerRepository.getCustomerInfo(customerEmail);
    }

    async createCustomer(customer) {

        if (!customer) {
            throw new Error('Customer is required');
        }

        try {
            return await this.customerRepository.createCustomer(customer);
        } catch (error) {
            throw new Error('Error creating customer'+error.message);
        }
    }

    async updateCustomer(customer) {

        if (!customer) {
            throw new Error('Customer is required');
        }

        if (!customer.email) {
            throw new Error('Email is required');
        }

        try {
            return await this.customerRepository.updateCustomer(customer);
        } catch (error) {
            throw new Error('Error updating customer');

        }

    }

    async deleteCustomer(customerEmail) {
        return await this.customerRepository.deleteCustomer(customerEmail);
    }
}

export default CustomerService;