import PaymentController from '../controllers/payment.controller.js';
import express from 'express';


const paymentRoutes = express.Router();


const paymentController = new PaymentController();


paymentRoutes.get("/:id",paymentController.getPaymentInfo.bind(paymentController));
paymentRoutes.post("/create",paymentController.createPayment.bind(paymentController));
paymentRoutes.put("/:id", paymentController.updatePayment.bind(paymentController));
paymentRoutes.delete("/:id",paymentController.deletePayment.bind(paymentController));


export default paymentRoutes;
