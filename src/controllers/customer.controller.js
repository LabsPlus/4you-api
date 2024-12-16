
import * as yup from 'yup';
import CustomerService from '../services/customer.service.js';
import { EncryptJWT } from 'jose';
import { TextEncoder } from 'util';
import bcrypt from 'bcryptjs';




class CustomerController {

    constructor() {
        this.customerService = new CustomerService();
    }

    validateCreateCustomer(customer) {
        const schema = yup.object().shape({
            name: yup.string().required('Name is required'),

            email: yup.string()
                .email('Invalid Email')
                .required('Email is required'),

            password: yup.string()
                .required('Password is required')
                .min(6, 'Password must contain at least 6 characters')
                .matches(/[@!#$%¨?&*]/, 'Password must contain at least 1 special character')
                .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
                .matches(/[a-z]/, 'Password must contain at least one lowercase letter'),

            phone: yup.string()
                .required('Phone is required')
                .matches(/^\+[1-9]{1}[0-9]{1,14}$/, 'Invalid phone number, expected format: +[country code][number]'),

            taxid: yup.string()
                .required('Taxid is required')
                .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Invalid CPF, expected format: XXX.XXX.XXX-XX'),

            birth_date: yup.date()
                .min(new Date(1900, 0, 1))
                .required('Birth date is required'),
        });

        return schema.validate(customer, { abortEarly: false });
    }

    // Validação para atualização de cliente
    validateUpdateCustomer(customer) {
        const schema = yup.object().shape({
            name: yup.string().optional(),

            email: yup.string()
                .optional()
                .email('Invalid Email'),

            phone: yup.string()
                .optional()
                .matches(/^\+[1-9]{1}[0-9]{1,14}$/, 'Invalid phone number, expected format: +[country code][number]'),

            taxid: yup.string()
                .optional()
                .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Invalid CPF, expected format: XXX.XXX.XXX-XX'),

            birth_date: yup.date()
                .optional()
                .min(new Date(1900, 0, 1)),

            payment_date: yup.date().optional(),

            customer_id: yup.string()
                .optional()
                .uuid('Invalid customer ID format'),

            payer_email: yup.string()
                .optional()
                .email('Invalid email format'),

            payer_phone: yup.string()
                .optional()
                .matches(/^\+[1-9]{1}[0-9]{1,14}$/, 'Invalid phone number, expected format: +[country code][number]'),

            payer_taxid: yup.string()
                .optional()
                .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Invalid CPF, expected format: XXX.XXX.XXX-XX'),

            payer_description: yup.string()
                .optional()
                .max(100, 'Description cannot be longer than 100 characters'),

            payer_password: yup.string()
                .optional()
                .min(6, 'Password must contain at least 6 characters')
                .matches(/[@!#$%¨?&*]/, 'Password must contain at least 1 special character')
                .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
                .matches(/[a-z]/, 'Password must contain at least one lowercase letter'),
        });

        return schema.validate(customer, { abortEarly: false });
    }


    async login(req, res) {
            try {
                const { email, password } = req.body;

                const schema = yup.object().shape({
                    email: yup.string()
                        .email()
                        .required('Email is required'),

                    password: yup.string()
                        .required('Password is required')
                });

                await schema.validate({ email, password });

                const customer = await this.customerService.getCustomerInfo(email);

                if (!customer) {
                    return res.status(401).json({ message: 'Invalid email or password' });
                }

                const passwordValid = await bcrypt.compare(password, customer.password);

                if (!passwordValid) {
                    return res.status(401).json({ message: 'Invalid password' });
                }

                const secret = new TextEncoder().encode(process.env.JWT_SECRET);

                const jwt = await new EncryptJWT({ email: customer.email })
                    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
                    .setIssuedAt()
                    .setIssuer('your-issuer')
                    .setExpirationTime('1h')
                    .encrypt(secret);

                return res.json({ token: jwt });
            } catch (error) {
                if (error instanceof yup.ValidationError) {
                    return res.status(400).json({ message: error.errors.join(', ') });
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

                await this.validateCreateCustomer(customer);

                customer.birth_date = new Date(customer.birth_date);

                const hashedPassword = await bcrypt.hash(customer.password, 10);

                customer.password = hashedPassword;

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

                await this.validateUpdateCustomer(customerData);


                const updatedCustomer = await this.customerService.updateCustomer(customerEmail, customerData);
                res.status(200).json(updatedCustomer);
            } catch (error) {
                console.error('Error updating customer:', error); // Mostra o erro completo
                if (error instanceof yup.ValidationError) {
                    return res.status(400).json({ error: error.errors });
                }
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