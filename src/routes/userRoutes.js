import express from "express"
import Controller from "../controller/userController.js"
import { EmailExist } from "../midleware/validation.js"
import { verifyAccess } from "../midleware/verifyAccess.js"

const router=express.Router()
router.post("/user",EmailExist,Controller.signup)
router.post("/user/login",Controller.login)
router.delete("/user/:id",Controller.deleteOneUser)
router.get("/users",verifyAccess("provider"),Controller.getAllUsers)
router.get("/user/:id",Controller.getOneUser)
router.patch("/user/:id",Controller.updateOneUser)
router.delete("/users",Controller.deleteAllUsers)

export default router