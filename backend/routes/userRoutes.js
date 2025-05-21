import express from 'express'
import { LoginUser, Logout, registerUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",LoginUser);
userRouter.post("/logout",Logout);

export default userRouter;