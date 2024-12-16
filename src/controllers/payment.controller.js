import express from 'express';
import PaymentService from '../services/payment.service.js'; 

class PaymentController {

    constructor() {
        this.paymentService = new PaymentService();
    }

    async getPaymentInfo(req, res) {
        try {
            const paymentId = parseInt(req.params.id); 
            const payment = await this.paymentService.getPaymentInfo(paymentId);
            res.status(200).json(payment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createPayment(req, res) {
        try {
            const payment = req.body;
            const newPayment = await this.paymentService.createPayment(payment);
            res.status(201).json(newPayment);
        } catch (error){
            res.status(500).json({ error: error.message });
        }
    }
    async updatePayment(req, res) {
        try {
            const paymentId = parseInt(req.params.id); 
            const paymentData = req.body;
            const updatedPayment = await this.paymentService.updatePayment(paymentId, paymentData); 
            res.status(200).json(updatedPayment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async deletePayment(req, res) {
        try {
            const paymentId = parseInt(req.params.id); 
            await this.paymentService.deletePayment(paymentId); 
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

export default PaymentController;
