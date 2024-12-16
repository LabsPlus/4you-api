import PaymentRepository from "../repositories/payment.repository.js";


class PaymentService {

    constructor() {
        this.paymentRepository = new PaymentRepository();
    }

    async getPaymentInfo(paymentId) { // alterado para id
        try {
            return await this.paymentRepository.getPaymentInfo(paymentId)

        } catch (error) {
            throw new Error('Error fetching payment info' + error.message);
        }
    }

    async createPayment(payment) {
        if(!payment) {
            throw new Error('Payment is required');
        }
        try {
            return await this.paymentRepository.createPayment(payment);

        } catch (error) {
            throw new Error('Error creating payment' + error.message);
        }
    }

    async updatePayment(paymentId, paymentData) {
        if (!paymentId || !paymentData) {
            throw new Error('Payment ID and ata are required');
        }
        try {
            return await this.paymentRepository.updatePayment(paymentId, paymentData) 
        } catch (error) {
            throw new Error('Error updating payment:' + error.message);
        }
    }


    async deletePayment(paymentId) {
        try {
            return await this.paymentRepository.deletePayment(paymentId);

        } catch (error) {
            throw new Error('Error deleting payment ' + error.message);
        }
    }
}

export default PaymentService;
