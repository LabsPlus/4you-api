import CustomerController from "../controllers/customer.controller.js";
import express from "express";

const customerRoutes = express.Router();

const customerController = new CustomerController();

customerRoutes.get("/:email", customerController.getCustomerInfo.bind(customerController));
customerRoutes.post("/create", customerController.createCustomer.bind(customerController));
customerRoutes.patch("/:email", customerController.updateCustomer.bind(customerController));
customerRoutes.delete("/:email", customerController.deleteCustomer.bind(customerController));
customerRoutes.post("/login", customerController.login.bind(customerController));

export default customerRoutes;