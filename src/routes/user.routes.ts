import {Router } from "express";
import { UserController } from "../controllers/user.controller";
import express from 'express';
import { validateDto } from "../middlewares/validate.Dto";
import { create } from "node:domain";
import { CreateUserDTO } from '../Dto/user/user.dto';
import { ForgotPasswordDTO } from "../Dto/user/forgotPassword.dto";

const router = Router();
const userController = new UserController();

router.post("/register/me",validateDto(CreateUserDTO),  userController.createUserController.bind(userController));
router.post("/forgot-password", validateDto(ForgotPasswordDTO) ,userController.forgotPasswordController.bind(userController));


export default router;