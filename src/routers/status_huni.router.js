const status_huniRouter = require("express").Router()

const status_huniController = require("../controllers/status_huni.controller")

status_huniRouter.get('/', status_huniController.getStatus_huni)

module.exports=status_huniRouter