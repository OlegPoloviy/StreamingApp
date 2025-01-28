import {Router} from "express";
import {UserController} from "../database/controllers/user-controller.js"

export const tockenRouter =  Router();

tockenRouter.post('/registration',UserController.registration);
tockenRouter.post('/login',UserController.login);
tockenRouter.post('/logout',UserController.logout);
// tockenRouter.get('/activate/:link')
// tockenRouter.get('/refresh')
tockenRouter.get('/users',UserController.getAllUsers);

