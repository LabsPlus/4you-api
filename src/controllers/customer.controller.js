import express from 'express';
import * as yup from 'yup';
import CustomerService from '../services/customer.service.js';  // Importe corretamente o CustomerService
import { EncryptJWT } from 'jose';
import { TextEncoder } from 'util';




class CustomerController {

    constructor() {
        this.customerService = new CustomerService();
    }

    validateCustomer(customer) {

        const schema = yup.object().shape({

            name: yup.string().required('Name is required'),

            email: yup.string()
                .email('Invalid Email')
                .required("Email is required"),

            password: yup.string()
                .required('Password is required')
                .min(6, 'password must contain at lest 6 caracters')
                .matches(/[@!#$%¨?&*]/, 'Password must contain at least 1 special character')
                .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
                .matches(/[a-z]/, 'Password must contain at least one lowercase letter'),

            phone: yup.string()
                .required('Phone is required')
                .matches(/^\+[1-9]{1}[0-9]{1,14}$/, 'Invalid phone number, expected format: +[country code][number]'),

            taxid: yup.string()
                .required('Taxid is required')
                .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Invalid CPF, expected format: XXX.XXX.XXX-XX')
        });

        return schema.validate(customer, { abortEarly: false });
    }

    async login(req,res) {
        try {
            const {email, password} = req.body;
            const schema = yup.object().shape({
                email: yup.string()
                .email()
                .required('Email is required'),

                password: yup.string()
                .required('Password is required')
            });
            await schema.validate({email, password});

            const customer = await this.customerService.getCustomerInfo(email);

            if(!customer) {
                return res.status(401).json({ message: 'Inavlid email or password'});
            }

            const passwordValid = await bcrypt.compare(password, customer.password);
            if(!passwordValid) {
                return res.status(401).json({ message: 'Invalid email or password'});
            }

            const secret = new TextEncoder().encode('your-secret-key');

            const jwt = await new EncryptJWT({ email: customer.email})
            .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
            .setIssuedAt()
            .setIssuer('your-issuer')
            .setExpirationTime('1h') 
            .encrypt(secret);

            return res.json({ token: jwt});
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return res.status(400).json({ message: error.errors.join(', ')});
            } 
            return res.status(500).json({ error: error.message });
            
        } 

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

            await this.validateCustomer(customer);

            const newCustomer = await this.customerService.createCustomer(customer);

            res.status(201).json(newCustomer);

        } catch (error) {
            console.error('Error creating customer', error.message);

            if (error instanceof yup.ValidationError) {

                return res.status(400).json({ error: error.errors });
            }
            res.status(500).json({ error: error.message });
        }
    }

    async updateCustomer(req, res) {
        try {
            const customerEmail = req.params.email;
            const customerData = req.body;

            if (!customerData || !customerEmail) {
                return res.status(400).json({ error: 'Email and customer data are required' });
            }

            const updatedCustomer = await this.customerService.updateCustomer(customerEmail, customerData);
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