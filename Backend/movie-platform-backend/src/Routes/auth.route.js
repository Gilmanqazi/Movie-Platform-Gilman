const express = require("express")
const authRouter = express.Router()
const authController = require("../controllers/auth.controller")
const identifyUser = require("../middlewares/auth.Middleware")


authRouter.post("/register",authController.registerController)
authRouter.post("/login",authController.loginController)
authRouter.post("/logout",identifyUser,authController.logOutController)
authRouter.get("/me",identifyUser,authController.getMe)


module.exports = authRouter