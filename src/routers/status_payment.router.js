const status_paymentRouter = require("express").Router()

const status_paymentController = require("../controllers/status_payment.controller")

status_paymentRouter.get('/', status_paymentController.getStatus_payment)

module.exports=status_paymentRouter