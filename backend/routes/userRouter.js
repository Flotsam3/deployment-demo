import express from "express";
import * as user from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

// create / post
userRouter.post("/user/register", user.createUserController);

// login
userRouter.post("/user/login", user.loginUserController);

// Charge off

userRouter.post("/user/transaction/getMoney", authMiddleware, user.chargeOffController);

// Pay in 

userRouter.post("/user/transaction/postMoney", authMiddleware, user.payInController);

// get / read
userRouter.get("/user", user.getAllUsersController);

// get / read user data
userRouter.get("/user/data", authMiddleware, user.getUserDataController);

// delete all
userRouter.delete("/user", user.deleteAllUsersController);

export default userRouter;
