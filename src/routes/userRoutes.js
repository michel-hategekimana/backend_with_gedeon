import express from "express"
import Controller from "../controller/userController.js"
import { EmailExist } from "../midleware/validation.js"

const router=express.Router()
router.post("/user",EmailExist,Controller.signup)

export default router