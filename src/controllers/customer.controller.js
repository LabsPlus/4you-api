import express from 'express';
import CustomerService from '../services/customer.service.js';

class CustomerController {

    constructor() {
        this.customerService = new CustomerService();
    }

    async getCustomerInfo(req, res) {
        try {
            const customerEmail = req.params.email;
            const customer = await this.customerService.getCustomerInfo(customerEmail);
            res.status(200).json(customer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createCustomer(req, res) {
        try {
            const customer = req.body;
            const newCustomer = await this.customerService.createCustomer(customer);
            res.status(201).json(newCustomer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateCustomer(req, res) {
        try {
            const customer = req.body;
            const updatedCustomer = await this.customerService.updateCustomer(customer);
            res.status(200).json(updatedCustomer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteCustomer(req, res) {
        try {
            const customerEmail = req.params.email;
            await this.customerService.deleteCustomer(customerEmail);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default CustomerController;